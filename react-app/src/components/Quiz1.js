import React, { Component } from 'react';
import './ViewQuestion.css';

class Quiz1 extends Component {
  constructor() {
    super();
    
    var x=window.location.href.split("/");
    localStorage.setItem("Topic",x[x.length-1]);
    this.quizno=""
    this.sub=false
    this.life1=0
    this.life2=0
    this.state = {
      data: [],
      scoreData: {
        Score: 0,
        GeneralScore: 0,
        SportsSCore:0,
        PoliticsScore:0,
        MovieScore:0,
        Username: "",
      },
      quizData:{
        Username :"",
        Category:"",
        QuizName: "",
        Score: 0,
      },
    }
  }
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/question/'+localStorage.getItem("Topic"));
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
   
  }
  scoreUpdate(){
      fetch('http://localhost:8080/score/'+this.state.scoreData.Username, {
         method: 'PUT',
         body: JSON.stringify(this.state.scoreData),
        })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
        }
      });
      fetch('http://localhost:8080/quizdata/'+this.state.quizData.Username+"/"+this.state.quizData.QuizName+"/"+this.state.quizData.Category, {
         method: 'PUT',
         body: JSON.stringify(this.state.quizData),
        })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
        }
      });
  }
handleSubmit(event){
  var selected1=0;
  var selected2=0;
  var selected3=0;
  var correct=0;
  var wrong=0;
  var ua=0
      this.state.data.map(
          function(item, key){ 
          	  selected1=0;
              selected2=0;
              selected3=0;	
              console.log(item.id);
              var y=[];
              var y=document.getElementsByClassName(item.id);
              
              if(y.item(0).checked){
                selected1=1;
                y.item(0).checked=false;
              }
              if(y.item(1).checked){
                selected2=1;
                y.item(1).checked=false;
              }
              if(y.item(2).checked){
                selected3=1;
                y.item(2).checked=false;
              }
              
              if(selected1==item.Ans1 && selected2==item.Ans2 && selected3==item.Ans3){
                correct++;
              }
              else{
                if(selected1==0 && selected2==0 && selected3==0){
                  ua++;
                }
                else{
                  wrong++;
                }
              }
            }
      )
      var result="Correct : "+correct+" Wrong : "+wrong+" Un Attempted : "+ua+"";
      var s=4*correct-1*wrong+parseInt(localStorage.getItem("score"));
      localStorage.setItem("score",s);

      
      if(localStorage.getItem("Category")=="general"){
           var gs=4*correct-1*wrong+parseInt(localStorage.getItem("Generalscore"));
           localStorage.setItem("Generalscore",gs);
           this.state.scoreData.GeneralScore=gs;
      }
      else if(localStorage.getItem("Category")=="politics"){
           var gs=4*correct-1*wrong+parseInt(localStorage.getItem("Politicsscore"));
           localStorage.setItem("Politicsscore",gs);
           this.state.scoreData.PoliticsScore=gs;
      }
      else if(localStorage.getItem("Category")=="sport"){
           var gs=4*correct-1*wrong+parseInt(localStorage.getItem("Sportsscore"));
           localStorage.setItem("Sportsscore",gs);
           this.state.scoreData.SportsScore=gs;
      }
      else if(localStorage.getItem("Category")=="movie"){
      		console.log("woo");
           var gs=4*correct-1*wrong+parseInt(localStorage.getItem("Moviescore"));
           localStorage.setItem("Moviescore",gs);
           this.state.scoreData.MovieScore=gs;
      }
      
      this.state.scoreData.MovieScore=parseInt(localStorage.getItem("Moviescore"));
      this.state.scoreData.SportsScore=parseInt(localStorage.getItem("Sportsscore"));
      this.state.scoreData.GeneralScore=parseInt(localStorage.getItem("Generalscore"));
      this.state.scoreData.PoliticsScore=parseInt(localStorage.getItem("Politicsscore"));



      this.state.scoreData.Score=s;
      this.state.scoreData.Username=localStorage.getItem("user");
      
      this.state.quizData.Username=localStorage.getItem("user");
      this.state.quizData.Category=localStorage.getItem("Category");
      this.state.quizData.QuizName=localStorage.getItem("Topic");
      this.state.quizData.Score=4*correct-1*wrong;

      this.scoreUpdate();
      document.getElementById("score").innerHTML=result;
}
showAns(event,id){
	if(this.life1==0){
		this.state.data.map(
			function(item,key){
				if(item.id==id){
					var temp=document.getElementsByClassName(item.id);
					if(item.Ans1==1){
						temp.item(0).checked=true;
					}
					if(item.Ans2==1){
						temp.item(1).checked=true;
					}
					if(item.Ans3==1){
						temp.item(2).checked=true;
					}
				}
			}
		)
		this.life1=1;
	}
	else{
		window.alert("You have Already Used this lifeLine once");
	}
}
eliminate(event,id){
	if(this.life2==0){
		console.log("called");
		this.state.data.map(
			function(item,key){
				if(item.id==id){
					var temp=document.getElementsByClassName(item.id);
					if(item.Ans1==0){
						temp.item(0).disabled=true;
					}
					else if(item.Ans2==0){
						temp.item(1).disabled=true;
					}
					else if(item.Ans3==0){
						temp.item(2).disabled=true;
					}
				}
			}
		)
		this.life2=1;
	}
	else{
		window.alert("You have Already Used this lifeLine once");
	}
}
  render() {
  	var T=this;
    return (
      <div>
      <h3 id="score"></h3>
      <div className="App">
        <header className="App-header">
        </header>
         {
          this.state.data.map(
            function(item, key) {
               return (
                      <div key={key}>
                        {item.Que}<br/>
                         A. {item.Op1}
                         <input type="checkbox" value="1" class={item.id} /><br/>
                         B. {item.Op2}
                         <input type="checkbox" value="2" class={item.id}/><br/>
                         C. {item.Op3}
                         <input type="checkbox" value="3" class={item.id} /><br/>
                         <button class="button" onClick={ (e)=>T.showAns(e,item.id) }>Show Ans</button>
                         <button class="button" onClick={ (e)=>T.eliminate(e,item.id) }>Eliminate</button>
                         <hr/>
                  </div>
                )
               
              }
          )
        }
        <button type="submit" className="btn btn-default" onClick={ (e) => this.handleSubmit(e) }>Submit</button>
      </div>
      </div>
    );
  }
}

export default Quiz1;
