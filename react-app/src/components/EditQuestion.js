import React, { Component } from 'react';
import './ViewQuestion.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class EditQuestion extends Component {
  constructor() {
    super();
    var x=window.location.href.split("/");
    this.id=parseInt(x[x.length-1]);
    this.state = {
      data: [],
      formData: {
        Que: "",
        Op1: "",
        Op2: "",
        Op3: "",
        Ans1: 0,
        Ans2: 0,
        Ans3: 0,
        Category: "",
        QuizName:"",
     },
  }
  this.handleQChange = this.handleQChange.bind(this);
  this.handle1Change = this.handle1Change.bind(this);
  this.handle2Change = this.handle2Change.bind(this);
  this.handle3Change = this.handle3Change.bind(this);

  this.handleAns1Change = this.handleAns1Change.bind(this);
  this.handleAns2Change = this.handleAns2Change.bind(this);
  this.handleAns3Change = this.handleAns3Change.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/singleQ/'+this.id);
    fetch(request)
      .then(response => response.json())
        .then(data => {
          this.setState({formData : data});
          document.getElementById("Q").value=this.state.formData.Que;
          document.getElementById("O1").value=this.state.formData.Op1;
          document.getElementById("O2").value=this.state.formData.Op2;
          document.getElementById("O3").value=this.state.formData.Op3;
          this.state.formData.Category=this.state.formData.Category;
          this.state.formData.QuizName=this.state.formData.QuizName;
      });
}
handleSubmit(event){
   fetch('http://localhost:8080/question/'+this.id, {
     method: 'PUT',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
            window.location.reload();
      });
}
handleQChange(event) {
    this.state.formData.Que = event.target.value;
    this.setState({formData : this.state.formData});
  }
  handle1Change(event) {
    this.state.formData.Op1 = event.target.value;
    this.setState({formData : this.state.formData});
  }
  handle2Change(event) {
    this.state.formData.Op2 = event.target.value;
    this.setState({formData : this.state.formData});
  }
  handle3Change(event) {
    this.state.formData.Op3 = event.target.value;
    this.setState({formData : this.state.formData});
  }
  handleAns1Change(event) {
    if(document.getElementById("A1").checked==true){
      this.state.formData.Ans1 = 1;
    }
    else{
      this.state.formData.Ans1 = 0; 
    }
    this.setState({formData : this.state.formData});
  }
  handleAns2Change(event) {
    if(document.getElementById("A2").checked==true){
      this.state.formData.Ans1 = 1;
    }
    else{
      this.state.formData.Ans1 = 0; 
    }
    this.setState({formData : this.state.formData});
  }
  handleAns3Change(event) {
    if(document.getElementById("A3").checked==true){
      this.state.formData.Ans1 = 1;
    }
    else{
      this.state.formData.Ans1 = 0; 
    }
    this.setState({formData : this.state.formData});
  }
render() {
  return (
    <div>
    <div class="formContainer">
    <form>
              <div className="form-group">
              <label>Question</label>
                  <input type="text" id="Q" className="form-control" value={this.state.formData.Que} onChange={(e)=>this.handleQChange(e)}/>
              </div>

              <div className="form-group">
                  <label>Option1</label>
                  <input type="text" id="O1" className="form-control" value={this.state.formData.Op1} onChange={(e)=>this.handle1Change(e)}/>
              </div>

              <div className="form-group">
                  <label>Option2</label>
                  <input type="text" id="O2" className="form-control" value={this.state.formData.Op2} onChange={(e)=>this.handle2Change(e)}/>
              </div>

              <div className="form-group">
                  <label>Option3</label>
                  <input type="text" id="O3" className="form-control" value={this.state.formData.Op3} onChange={(e)=>this.handle3Change(e)}/>
              </div>

              <div className="form-group">
                  <label>Answer</label><br/>
                  <input type="checkbox" id="A1" value="1" name="answer" onChange={(e)=>this.handleAns1Change(e)}/>Option 1<br/>
                  <input type="checkbox" id="A2" value="2" name="answer" onChange={(e)=>this.handleAns2Change(e)}/>Option 2<br/>
                  <input type="checkbox" id="A3" value="3" name="answer" onChange={(e)=>this.handleAns3Change(e)}/>Option 3<br/>
              </div>

              <button className="btn btn-default" onClick={ (e)=>this.handleSubmit(e) }>Submit</button>
    </form>
    </div>
    </div>
    );
  }
}

export default EditQuestion;
