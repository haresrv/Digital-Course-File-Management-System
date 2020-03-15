import React from 'react';
import { MDBDataTable } from 'mdbreact';

function App(props) {
        const data = {
            columns: [
                {
                    label: 'SNo',
                    field: 'sno',
                    sort: 'asc',
                    width: 20
                },
                {
                    label: 'Question',
                    field: 'question',
                    sort: 'asc',
                    width: 400
                },
                {
                    label: 'Answer',
                    field: 'answer',
                    sort: 'asc',
                    width: 400
                },
                {
                    label: 'Entered on',
                    field: 'date',
                    sort: 'asc',
                    width: 150
                }
            ],
            rows: [
                {
                    sno: '4',
                    question: 'What are the different types of models available in SDLC?',
                    answer: 'Many models have been proposed, to carry out the software implementation efficiently. Some of them include the Waterfall Model, Agile Model, Spiral Model, Iterative Model, V-Model etc.',
                    date: '2020/03/09',
                },
                {
                    sno: '3',
                    question: 'What is SDLC OR Software Development Life Cycle?',
                    answer: 'SDLC defines a set of guidelines to develop a software product. SDLC has different phases namely: Gathering Requirements, Analysis, Planning, Development, Testing, Implementation, Maintenance, and Documentation. The order of the phases mentioned in SDLC may vary depending upon the model chosen to implement.',
                    date: '2020/03/2',
                },
                {
                    sno: '2',
                    question: 'What is the need to learn Software Engineering Concepts?',
                    answer: 'A person who can write programs does not have the knowledge to develop and implement the software in a well-defined systematic approach. Hence, there is a need for programmers to adhere to software engineering concepts such as requirements gathering, planning, development, testing, and documentation.',
                    date: '2020/02/20',
                },
                {
                    sno: '1',
                    question: 'What is Software Engineering?',
                    answer: 'Software Engineering is a process of developing a software product in a well-defined systematic approach. In other words, developing a software by using scientific principles, methods, and procedures.',
                    date: '2020/02/19',
                }
            ]
        };
  return (
      <body>
      <br/><br/>
      <div className="container-fluid" style={{marginLeft: props.expanded ? 240 : 64}}>
  <div className="row">
    <nav className="col-md-2 d-none d-md-block sidebar">
      <br/>
      <div className="sidebar-sticky">
      <ul className="nav flex-column">
      <li className="nav-item">
        <a className="nav-link active" href="#give current page href" >
      View FAQ <span className="sr-only">(current)</span>
    </a>
        <a className="nav-link active" href="#This is another page">
          Upload FAQ</a>
  </li>
      </ul>
</div>
    </nav>
    <div class="col-md-10">
        <h2 className="heading">Software Engineering</h2>
        <br/>
      <div className="row">
        <ul className="nav nav-tabs col-md-9">
          <li className="nav-item">
            <a className="nav-link active">View FAQ</a>
          </li>
        </ul>
        <div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-9">
            <MDBDataTable
                striped
                bordered
                hover
                data={data}
            />
        </div>
      </div>
    </div>
  </div>
</div>
      </body>
  );
}

export default App;
