import React, { Component } from 'react';
import './ViewQuestion.css';
import EditQuestion from './EditQuestion'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class ViewQuestion extends Component {
  constructor() {
    super();
    
    this.state = {
      data: [],
      
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/question/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  handleSubmit(event){
    this.state.data.map(
    function(item, key) {
    if(document.getElementById(item.id).checked){
      fetch('http://localhost:8080/question/'+item.id, {
        method: 'DELETE'
      }).then(response=>{
          if(response.status >= 200 && response.status < 300)
              {
                window.location.reload();
              }
        }
      );
    }
  }
    )
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Question</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Options</th>
              <th>Category</th>
              <th>QuizName</th>
              <th>Answer</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.Que}</td>
                      <td>
                        <tr>OPTION 1:{item.Op1}</tr>
                        <tr>OPTION 2:{item.Op2}</tr>
                        <tr>OPTION 3:{item.Op3}</tr>
                      </td>
                      <td>{item.Category}</td>
                      <td>{item.QuizName}</td>
                      <td>
                        <tr>Ans 1:{item.Ans1}</tr>
                        <tr>Ans 2:{item.Ans2}</tr>
                        <tr>Ans 3:{item.Ans3}</tr>
                      </td>
                      <td><input type="radio" id={item.id}/></td>
                      <td><Link to={`/edit/${item.id}`}>Edit</Link></td>
                  </tr>
                )
             })}
            <Route exact path={`/edit/:id`} component={EditQuestion} />
          </tbody>
       </table>
       <button type="submit" className="btn btn-default" onClick={ (e) => this.handleSubmit(e) }>Submit</button>
      </div>
    );
  }
}

export default ViewQuestion;
