import React, { Component } from 'react';
import './NewQuestion.css';

class NewQuestion extends Component {
  constructor() {
    super();
    this.state = {
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
      submitted: false,
      quizTopic: false,
    }
    this.handleQChange = this.handleQChange.bind(this);
    this.handle1Change = this.handle1Change.bind(this);
    this.handle2Change = this.handle2Change.bind(this);
    this.handle3Change = this.handle3Change.bind(this);

    this.handleAns1Change = this.handleAns1Change.bind(this);
    this.handleAns2Change = this.handleAns2Change.bind(this);
    this.handleAns3Change = this.handleAns3Change.bind(this);
    
    this.handleCatChange = this.handleCatChange.bind(this);
    this.handleQnoChange = this.handleQnoChange.bind(this);
    this.handleQNChange = this.handleQNChange.bind(this);


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/question', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.setState({submitted: true});
          document.getElementById("Q").value="";
          document.getElementById("Op1").value="";
          document.getElementById("Op2").value="";
          document.getElementById("Op3").value="";
          document.getElementById("O1").checked=false;
          document.getElementById("O2").checked=false;
          document.getElementById("O3").checked=false;
        }
      });

  }
  handleSubmit2(event){
  	console.log(this.state.quizTopic);
  	this.setState({quizTopic:true});
  	console.log(this.state.quizTopic);
  }
  handleQNChange(event) {
    this.state.formData.QuizName = event.target.value;
  }
  handleQChange(event) {
    this.state.formData.Que = event.target.value;
  }
  handle1Change(event) {
    this.state.formData.Op1 = event.target.value;
  }
  handle2Change(event) {
    this.state.formData.Op2 = event.target.value;
  }
  handle3Change(event) {
    this.state.formData.Op3 = event.target.value;
  }
  handleAns1Change(event) {
    if(document.getElementById("O1").checked==true){
      this.state.formData.Ans1 = 1;
    }
    else{
      this.state.formData.Ans1 = 0; 
    }
  }
  handleAns2Change(event) {
    if(document.getElementById("O2").checked==true){
      this.state.formData.Ans2 = 1;
    }
    else{
      this.state.formData.Ans2 = 0; 
    }
  }
  handleAns3Change(event) {
    if(document.getElementById("O3").checked==true){
      this.state.formData.Ans3 = 1;
    }
    else{
      this.state.formData.Ans3 = 0; 
    }
  }
  handleCatChange(event) {
    this.state.formData.Category = event.target.value;
  }
   handleQnoChange(event) {
    this.state.formData.QuizNo = event.target.value;
  }

  render() {
  	if(this.state.quizTopic){
	    return (
	      <div className="App">
	        <header className="App-header">
	          <h1 className="App-title">Create a Question</h1>
	        </header>
	        <br/><br/>
	        <div className="formContainer">
	          <form>
	            <div className="form-group">
	                <label>Question</label>
	                <input type="text" id="Q" className="form-control" value={this.state.Que} onChange={this.handleQChange}/>
	            </div>

	            <div className="form-group">
	                <label>Option1</label>
	                <input type="text" id="Op1" className="form-control" value={this.state.Op1} onChange={this.handle1Change}/>
	            </div>

	            <div className="form-group">
	                <label>Option2</label>
	                <input type="text" id="Op2" className="form-control" value={this.state.Op2} onChange={this.handle2Change}/>
	            </div>

	            <div className="form-group">
	                <label>Option3</label>
	                <input type="text" id="Op3" className="form-control" value={this.state.Op3} onChange={this.handle3Change}/>
	            </div>

	            <div className="form-group">
	                <label>Answer</label><br/>
	                <input type="checkbox" id="O1" value="1" name="answer" onChange={this.handleAns1Change}/>Option 1<br/>
	                <input type="checkbox" id="O2" value="2" name="answer" onChange={this.handleAns2Change}/>Option 2<br/>
	                <input type="checkbox" id="O3" value="3" name="answer" onChange={this.handleAns3Change}/>Option 3<br/>
	            </div>
                <button className="btn btn-default" onClick={ (e)=>this.handleSubmit(e) }>Submit</button>
	          </form>
	        </div>
	      </div>
	    );
	 }
	 else{
	 	return(
	 		<div className="App">
	        <header className="App-header">
	          <h1 className="App-title">Add New Quiz</h1>
	        </header>
	        <br/><br/>
	        <div className="formContainer">
	          <form>
	            <div className="form-group">
	                <label>Quiz Name</label>
	                <input type="text" className="form-control" value={this.state.QuizName} onChange={this.handleQNChange}/>
	            </div>
	            <div className="form-group">
	                <label>Category</label>
	                 <br/>
	                <input type="radio" value="sport" name="category" onChange={this.handleCatChange}/>Sports<br/>
	                <input type="radio" value="general" name="category" onChange={this.handleCatChange}/>General<br/>
	                <input type="radio" value="movie" name="category" onChange={this.handleCatChange}/>Movies<br/>
	                <input type="radio" value="politics" name="category" onChange={this.handleCatChange}/>Politics<br/>
	            </div>
                <button className="btn btn-default" onClick={ (e)=>this.handleSubmit2(e) }>Add Question</button>
	          </form>
	        </div>
	      </div>
	 	);
	 }
  }
}

export default NewQuestion;
