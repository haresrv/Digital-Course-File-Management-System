
var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");


app.use(cors())
app.use(bodyParser.json());


var mysqlConnection = mysql.createConnection({
  host: "vigilante.cpvubvpsiihe.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "vishalvinod",
  database: "courses"
});

mysqlConnection.connect(err => {
  if (!err) console.log("Connection succeeded.");
  else
    console.log("Unsuccessful \n Error : " + JSON.stringify(err, undefined, 2));
});

app.get('/',function(req,res){res.json("HI")})


app.get("/all",function(req,res)
{
    mysqlConnection.query(
        "select * from FACULTY_ENTITY",
        function(rerr,rrows,rfields){
          res.json(rrows);
        }
      )
    
})

app.get("/allcourses",function(req,res)
{
    mysqlConnection.query(
        "select * from C0URSE_ENTITY",
        function(rerr,rrows,rfields){
          res.json(rrows);
        }
      )
    
})

app.get('/det',function(req,res){res.json("HID")})

app.get("/detbyname/:name" ,function(req,res){
  // res.writeHead(200, { "content-type": "text/html" });
  var name=req.params.name;
  mysqlConnection.query(
    "select faculty_id as fid from FACULTY_ENTITY where Name = ?",
    [name],
    function(err, rows, fields) {

      // var string = JSON.stringify(rows);
      // console.log(string);
      // json = JSON.parse(string);
      // idf = json[0].faculty_id;
      if(rows.length==0)
      {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(rows)
        return
      }
      let idf=rows[0].fid;
      //console.log(typeof(idf));
      console.log("ID : " + idf); 
      mysqlConnection.query(
        "select count(*)as count from FACULTY_COURSE_RELATION where faculty_id=?",
        [idf],
        function(cerr,crows,cfields){
         cout=crows[0].count;
         mysqlConnection.query(
          "select course_id,Name,yeartaken,semtaken,role from FACULTY_COURSE_RELATION NATURAL JOIN C0URSE_ENTITY where faculty_id=?",
          [idf],
          function(cerr,crows,cfields){
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(crows)
          }
         )
        }
      );
    
    });
});

app.post('/d',function(req,res)
{
  // Facultyid  TODO_Description Deadline done 

  var {todos} = req.body
   for(var i=0;i<todos.length;i++)
{
      index=todos[i].index
      value=(todos[i].value)
      date=todos[i].date
}}
)


app.get("/detbyyear/:name/:year",function(req,res)
{
  var name=req.params.name;
  var year=req.params.year;
  console.log(name);
  console.log(year);
  mysqlConnection.query(
   "select faculty_id as fid from FACULTY_ENTITY where Name=?",
    [name],
    function(err,rows,fields){
      ide=rows[0].fid;
      console.log(ide);
      mysqlConnection.query(
        "select course_id,yeartaken,semtaken from FACULTY_COURSE_RELATION where faculty_id=? and yeartaken=?",
        [ide,year],
        function(rerr,rrows,rfields){
          res.json(rrows);
        }
      )
    })
})


app.get("/id/:name",function(req,res){
  var name=req.params.name;
  var year=req.params.year;
  var sem=req.params.sem;
  mysqlConnection.query(
    "select faculty_id as fid from FACULTY_ENTITY where Name=?",
     [name],
     function(err,rows,fields){
       res.json(rows)
     })})


app.get("/detbysem/:name/:year/:sem",function(req,res){
  var name=req.params.name;
  var year=req.params.year;
  var sem=req.params.sem;
  mysqlConnection.query(
    "select faculty_id as fid from FACULTY_ENTITY where Name=?",
     [name],
     function(err,rows,fields){
       ide=rows[0].fid;
       console.log(ide);
       mysqlConnection.query(
         "select course_id,yeartaken,semtaken from FACULTY_COURSE_RELATION where faculty_id=? and yeartaken=? and semtaken=?",
         [ide,year,sem],
         function(rerr,rrows,rfields){
           res.json(rrows);
         }
       )
     })
})

app.listen(process.env.PORT || 8001);
