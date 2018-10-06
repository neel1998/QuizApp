import React, { Component } from 'react';
import './ViewQuestion.css';
import Quiz1 from './Quiz1';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
var topics=new Set();
class SportQuiz extends Component {
  constructor() {
    super();
     this.state = {
      data: [],
      qdata: [],
      top: [],
      }
   	  this.DeleteQuiz=this.DeleteQuiz.bind(this);
  }
componentDidMount() {
    var temp=[];
    const request = new Request('http://127.0.0.1:8080/quizdata/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));

    const request2 = new Request('http://127.0.0.1:8080/question/');
    fetch(request2)
      .then(response => response.json())
        .then(data => this.setState({qdata: data}))
          .then(func=>{
            this.state.qdata.map(
                function(item,key){
                  if(item.Category=="sport"){
                    topics.add(item.QuizName);
                  }
                }
              )
            console.log(topics);
            topics.forEach(
              function(value){
                console.log(value);
                temp.push(value)
                // this.state.top.push(value);
              }
            );
            this.setState({top:temp});
            console.log(this.state.top);
          }
      );
  }
 DeleteQuiz(event,name){
 	fetch('http://localhost:8080/deletequiz/'+name+"/sport", {
        method: 'DELETE'
      }).then(response=>{
          if(response.status >= 200 && response.status < 300)
              {
                window.location.reload();
              }
        }
      );
 }
render() {
	let T=this;
    return (
      <div>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sports Quiz</h1>
        </header>
        {
          this.state.top.map(
            function(item,key){
            if(localStorage.getItem("admin")=="true"){
            	return(
            	<div>
                	<Link to={`/Quiz1/${item}`} >{item}</Link>
                	<button id={item} class="button" onClick={ (e)=>T.DeleteQuiz(e,item) }>Delete</button>
              	</div>
              )
            }
            else{
              return(
                <li><Link to={`/Quiz1/${item}`} >{item}</Link></li>
              )
            }
            }
          )
        }
        <Route exact path={`/Quiz1/:topic`} component={Quiz1} />
      </div>
      <h4 align="center">Previous Attempts</h4>
      {
        this.state.data.map(
            function(item,key){
              if(item.Username==localStorage.getItem("user") && item.Category==localStorage.getItem("Category")){
                
               
                  return(
                      <div key={key}>
                      <p align="center">You previously took {item.QuizName} with score {item.Score} </p>
                      </div>
                  );
                
               
              }
            }
        )
      }
      </div>
    );
  }
}

export default SportQuiz;
