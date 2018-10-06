import React, { Component } from 'react';
import './NewQuestion.css';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        Name: "",
        Username: "",
        Password: "",
        Score: 0,
        Rank: 0,
        Admin: "N",
        MovieScore:0,
        GeneralScore:0,
        PoliticsScore:0,
        SportsScore:0,
      },
      submitted: false,
      data:[]
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUnameChange = this.handleUnameChange.bind(this);
    this.handlePswdChange = this.handlePswdChange.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/user/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  handleSubmit (event) {
    var un=this.state.formData.Username;
    var f=0;
    this.state.data.map(
      function(item,key){
        if(un==item.Username){
          f=1;
        }
      }
      )
    if(f==0){
              event.preventDefault();
              fetch('http://localhost:8080/user', {
               method: 'POST',
               body: JSON.stringify(this.state.formData),
             })
                .then(response => {
                  if(response.status >= 200 && response.status < 300){
                    window.alert("Registered Successfully");
                    window.loction.reload();
                  }
                });

   }
   else{
      // document.getElementById("alert").value="Username Already Taken";
      window.alert("Username Already taken");
   }
}
  handleNameChange(event) {
    this.state.formData.Name = event.target.value;
  }
  handleUnameChange(event) {
    this.state.formData.Username = event.target.value;
  }
  handlePswdChange(event) {
    this.state.formData.Password = event.target.value;
  }
  

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Register</h1>
        </header>
        <bindr/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={this.state.Name} onChange={this.handleNameChange}/>
            </div>

            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.Username} onChange={this.handleUnameChange}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.Password} onChange={this.handlePswdChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
          <h3 id="alert"></h3>
        </div>

        

      </div>
    );
  }
}

export default Register;
