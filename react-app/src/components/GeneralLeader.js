import React, { Component } from 'react';
import './ViewQuestion.css';

class GeneralLeader extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/board/general_score');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Leader Board Of General Quiz</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>UserName</th>
              <th>General Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.Name}</td>
                      <td>{item.Username}</td>
                      <td>{item.GeneralScore}</td>
                      
                  </tr>
                )
             })}
          </tbody>
       </table>
       
      </div>
    );
  }
}

export default GeneralLeader;
