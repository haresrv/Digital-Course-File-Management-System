"use strict";

exports.__esModule = true;
exports.TrackerEpicsColumn = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("./styles.js");

var _styles2 = _interopRequireDefault(_styles);
var ex= require('./epics.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CATEGORIES = ["Accepted", "Active", "Unstarted", "Unscheduled"];
var PIVOTAL_TRACKER = "https://www.pivotaltracker.com";
var EPICS_PARAMETERS = "?fields=:default,after_id,before_id,completed_at,label(:default,counts)";
var PROJECT_PARAMETERS = "?fields=name";

var TrackerEpicsColumn = exports.TrackerEpicsColumn = function (_React$Component) {
  _inherits(TrackerEpicsColumn, _React$Component);

  function TrackerEpicsColumn(props) {
    _classCallCheck(this, TrackerEpicsColumn);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      epics: {ex},
      project: { name: "" }
    };

    _this.getEpicHashes();
    if (_this.props.includeProjectName) {
      _this.getProjectHash();
    }
    return _this;
  }

  TrackerEpicsColumn.prototype.render = function render() {
    var _this2 = this;

    var projectId = this.props.projectId;
    var styles = Object.assign({}, _styles2.default, this.props.styles || {});

    var epicsToShow = this.sortedEpics().filter(function (epic) {
      return !epic.completed_at;
    });
    var maxTotal = this.getMaxTotal(epicsToShow);

    var projectName = "";
    if (this.props.includeProjectName) {
      projectName = _react2.default.createElement(
        "span",
        { style: styles.projectName },
        this.state.project.name
      );
    }

    return _react2.default.createElement(
      "div",
      { className: "tracker-epics-column", style: styles.column },
      projectName,
      _react2.default.createElement(
        "ul",
        { style: styles.ul },
        epicsToShow.map(function (epic) {
          var progressBar = "";
          if (_this2.totalForEpic(epic) > 0) {
            progressBar = _react2.default.createElement(
              "div",
              { style: styles.progress },
              CATEGORIES.map(function (key) {
                var style = Object.assign({}, styles["progress" + key]);
                style.width = epic.totals[key] * 100 / maxTotal + "%";
                return _react2.default.createElement(
                  "div",
                  { style: style, key: epic.id + key },
                  "\xA0"
                );
              })
            );
          }

          return _react2.default.createElement(
            "li",
            { style: styles.li, key: epic.id },
            _react2.default.createElement(
              "span",
              { style: styles.epicName },
              epic.name
            ),
            progressBar
          );
        })
      )
    );
  };

  ////////////////
  //// network/API stuff

  TrackerEpicsColumn.prototype.getEpicHashes = function getEpicHashes() {
    fetch(this.epicsEndpoint(this.props.projectId)).then(function (response) {
      return response.json();
    }).then(this.loadEpicHashes.bind(this));
  };

  TrackerEpicsColumn.prototype.loadEpicHashes = function loadEpicHashes(epics) {
    this.annotateEpics(epics);

    this.setState(function (prevState) {
      var newState = Object.assign({}, prevState);
      newState.epics = epics;
      return newState;
    });
  };

  TrackerEpicsColumn.prototype.epicsEndpoint = function epicsEndpoint(projectId) {
    var endpoint = PIVOTAL_TRACKER + "/services/v5/projects/" + projectId + "/epics" + EPICS_PARAMETERS;
    if (this.props.apiToken) {
      endpoint += "&token=" + this.props.apiToken;
    }
    return endpoint;
  };

  TrackerEpicsColumn.prototype.getProjectHash = function getProjectHash() {
    fetch(this.projectEndpoint(this.props.projectId)).then(function (response) {
      return response.json();
    }).then(this.loadProjectHash.bind(this));
  };

  TrackerEpicsColumn.prototype.loadProjectHash = function loadProjectHash(project) {
    this.setState(function (prevState) {
      var newState = Object.assign({}, prevState);
      newState.project = project;
      return newState;
    });
  };

  TrackerEpicsColumn.prototype.projectEndpoint = function projectEndpoint(projectId) {
    var endpoint = PIVOTAL_TRACKER + "/services/v5/projects/" + projectId + PROJECT_PARAMETERS;
    if (this.props.apiToken) {
      endpoint += "&token=" + this.props.apiToken;
    }
    return endpoint;
  };

  ////////////////
  //// utility methods
// id , after_id , before_id


  TrackerEpicsColumn.prototype.sortedEpics = function sortedEpics() {
    var epicsMap = {};
    this.state.epics.forEach(function (epic) {
      epicsMap[epic.id] = epic;
    });

    var firstEpic = this.state.epics.find(function (epic) {
      return epic.after_id == null;
    });
    if (!firstEpic) {
      return [];
    }

    var sorted = [firstEpic];
    var current = firstEpic;
    while (current.before_id) {
      current = epicsMap[current.before_id];
      sorted.push(current);
    }

    return sorted;
  };

  TrackerEpicsColumn.prototype.getMaxTotal = function getMaxTotal(epics) {
    var _this3 = this;

    var max = 0;
    epics.forEach(function (epic) {
      var total = _this3.totalForEpic(epic);
      max = total > max ? total : max;
    });

    return max;
  };

  TrackerEpicsColumn.prototype.annotateEpics = function annotateEpics(epics) {
    var _this4 = this;

    epics.forEach(function (epic) {
      var counts = epic.label.counts;
      epic.totals = {
        Accepted: _this4.total(counts, "accepted"),
        Active: _this4.total(counts, "rejected", "delivered", "finished", "started"),
        Unstarted: _this4.total(counts, "planned", "unstarted"),
        Unscheduled: _this4.total(counts, "unscheduled")
      };
    });
  };

  TrackerEpicsColumn.prototype.total = function total() {
    var counts = arguments[0];
    var keys = Array.prototype.slice.call(arguments, 1);

    var total = 0;
    keys.forEach(function (key) {
      total += counts.sum_of_story_estimates_by_state[key];
      total += counts.number_of_zero_point_stories_by_state[key] * 0.5;
    });
    return total;
  };

  TrackerEpicsColumn.prototype.totalForEpic = function totalForEpic(epic) {
    return CATEGORIES.reduce(function (sum, key) {
      return sum + epic.totals[key];
    }, 0);
  };

  return TrackerEpicsColumn;
}(_react2.default.Component);

;

exports.default = TrackerEpicsColumn;