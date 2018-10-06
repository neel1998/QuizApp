import React, { Component } from 'react';
import './ViewQuestion.css';

class ViewUsers extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/user/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  handleSubmit(event){
    this.state.data.map(
    function(item, key) {
    if(document.getElementById(item.id).checked){
      fetch('http://localhost:8080/user/'+item.id, {
        method: 'DELETE'
      }).then(response=>{
          if(response.status >= 200 && response.status < 300)
              {
                window.location.reload();
                // this.render();
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
              <th>Name</th>
              <th>UserName</th>
              <th>Movie Score</th>
              <th>General Score</th>
              <th>Politics Score</th>
              <th>Sports Score</th>
              <th>Total Score</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.Name}</td>
                      <td>{item.Username}</td>
                      <td>{item.MovieScore}</td>
                      <td>{item.GeneralScore}</td>
                      <td>{item.PoliticsScore}</td>
                      <td>{item.SportsScore}</td>
                      <td>{item.Score}</td>
                      <td>{item.Rank}</td>
                      <td><input type="radio" id={item.id}/></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
       <button type="submit" className="btn btn-default" onClick={ (e) => this.handleSubmit(e) }>Submit</button>
      </div>
    );
  }
}

export default ViewUsers;
