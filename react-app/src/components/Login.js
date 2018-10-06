import React, { Component } from 'react';
import './NewQuestion.css';
import ReactDOM from 'react-dom';

class Login extends Component {
  constructor() {
    super();
    
    this.state = {
      data: []
    }
    
  }

  handleSubmit (event) {
    var uname=document.getElementById("username").value;
    var pswd=document.getElementById("pswd").value;
    var rpswd="";
    fetch('http://localhost:8080/user/'+uname, {
     method: 'GET'
   }).then(response => response.json())
    .then(data => {this.setState({data: data})
      if(data=="-1"){
        console.log("No such user");
      }
      else{
        rpswd=this.state.data.Password;
        if(rpswd==pswd){
            if(this.state.data.Admin=="Y"){
              localStorage.setItem("admin",true);  
            }
            else{
              localStorage.setItem("admin",false);
            }
            console.log("Login successfull");
            localStorage.setItem("loggedin",true);
            localStorage.setItem("user",this.state.data.Username);
            localStorage.setItem("score",this.state.data.Score);
            localStorage.setItem("Generalscore",this.state.data.GeneralScore);
            localStorage.setItem("Moviescore",this.state.data.MovieScore);
            localStorage.setItem("Politicsscore",this.state.data.PoliticsScore);
            localStorage.setItem("Sportsscore",this.state.data.SportsScore);
            window.location.reload();
        }
        else{
          console.log("Password incorrect"); 
        }
      }
  });
    return;
  }



  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        <bindr/><br/>
        <div className="formContainer">
         

            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" id="username"/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" id="pswd"/>
            </div>
                <button type="submit" className="btn btn-default" onClick={ (e) => this.handleSubmit(e) }>Submit</button>
       
        </div>



      </div>
    );
  }
}

export default Login;
