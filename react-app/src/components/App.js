import React, { Component } from 'react';
import ViewQuestion from './ViewQuestion';
import NewQuestion from './NewQuestion';
import SportQuiz from './SportQuiz';
import MovieQuiz from './MovieQuiz';
import GeneralQuiz from './GeneralQuiz';
import PoliticsQuiz from './PoliticsQuiz';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import ViewUsers from './ViewUsers';
import LeaderBoard from './LeaderBoard'
import GeneralLeader from './GeneralLeader'
import MovieLeader from './MovieLeader'
import SportsLeader from './SportsLeader'
import PoliticsLeader from './PoliticsLeader'
import Quiz1 from './Quiz1';
import EditQuestion from './EditQuestion'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
	setState(){
		var temp=localStorage.getItem("loggedin");
		if(temp=="true"){
			this.logIn=true;
		}
		else{
			this.logIn=false;
		}
		var temp2=localStorage.getItem("admin");
		if(temp2=="true"){
			this.admin=true;
		}
		else{
			this.admin=false;
		}
    this.user=localStorage.getItem("user");
    this.score=localStorage.getItem("score");
		console.log(this.logIn);
	}
	componentWillMount() {
	    this.setState();
  }
  componentDidMount() {
	    this.setState();
  }
handleLogout(){
     localStorage.setItem("loggedin",false);
     localStorage.setItem("admin",false);
     window.location.reload();
     this.setState();
     this.render();
     return;
}
SetTopicGeneral(){
	localStorage.setItem("Category","general");
}
SetTopicSports(){
	localStorage.setItem("Category","sport");
}
SetTopicPolitics(){
	localStorage.setItem("Category","politics");
}
SetTopicMovie(){
	localStorage.setItem("Category","movie");
}
  render() {
  	if(!this.logIn){
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>QuizApp</Link>
                </div>
                
                	
                		<ul className="nav navbar-nav">
                		<li><Link to={'/'}>Home</Link></li>
                  		<li><Link to={'/Register'}>Register</Link></li>
                  		<li><Link to={'/Login'}>Login</Link></li>
                      </ul>
              </div>
            </nav>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <div className="navbar-brand">LeaderBoards</div>
                </div>
                
                  
                    <ul className="nav navbar-nav">
                         <li><Link to={'/GeneralLeader'}>General Category</Link></li>
                         <li><Link to={'/MovieLeader'}>Movies Category</Link></li>
                         <li><Link to={'/SportsLeader'}>Sports Category</Link></li>
                         <li><Link to={'/PoliticsLeader'}>Politics Category</Link></li>
                         <li><Link to={'/LeaderBoard'}>All</Link></li>
                      </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/Register' component={Register} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/' component={Home} />
                 <Route exact path='/LeaderBoard' component={LeaderBoard} />
                 <Route exact path='/GeneralLeader' component={GeneralLeader} />
                 <Route exact path='/MovieLeader' component={MovieLeader} />
                 <Route exact path='/SportsLeader' component={SportsLeader} />
                 <Route exact path='/PoliticsLeader' component={PoliticsLeader} />

            </Switch>
          </div>
        </Router>
      </div>
    );}
    else{
    	return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
              <h4>Welocome {this.user}</h4>
              
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>QuizApp</Link>
                </div>
                <ul className="nav navbar-nav">
                		<li><Link to={'/'}>Home</Link></li>
                	{this.admin &&
                		<ul className="nav navbar-nav">
                  		
                  	
                 		 <li><Link to={'/NewQuestion'}>Add Quiz</Link></li>
                 		 <li><Link to={'/ViewQuestion'}>View Question</Link></li>
                  		<li><Link to={'/ViewUsers'}>View Users</Link></li>
                      </ul>
                    }
                     
                      <li><Link to={'/SportQuiz'} onClick={(e)=>this.SetTopicSports(e)}>Sports Quiz</Link></li>
                      <li><Link to={'/MovieQuiz'} onClick={(e)=>this.SetTopicMovie(e)}>Movie Quiz</Link></li>
                      <li><Link to={'/PoliticsQuiz'} onClick={(e)=>this.SetTopicPolitics(e)}>Politics Quiz</Link></li>
                      <li><Link to={'/GeneralQuiz'} onClick={(e)=>this.SetTopicGeneral(e)}>General Quiz</Link></li>

                      
                  		</ul>
                  		<button type="submit" className="btn btn-default" onClick={ (e) => this.handleLogout(e) }>Logout</button>
                      </div>
                      </nav>
                      <nav className="navbar navbar-default">
                          <div className="container-fluid">
                          <div className="navbar-header">
                          <div className="navbar-brand">LeaderBoards</div>
                          </div>
                
                  
                    <ul className="nav navbar-nav">
                         <li><Link to={'/GeneralLeader'}>General Category</Link></li>
                         <li><Link to={'/MovieLeader'}>Movies Category</Link></li>
                         <li><Link to={'/SportsLeader'}>Sports Category</Link></li>
                         <li><Link to={'/PoliticsLeader'}>Politics Category</Link></li>
                         <li><Link to={'/LeaderBoard'}>All</Link></li>
                      </ul>
              </div>
            </nav>
              
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/NewQuestion' component={NewQuestion} />
                 <Route exact path='/ViewQuestion' component={ViewQuestion} />
                 <Route exact path='/SportQuiz' component={SportQuiz} />
                 <Route exact path='/MovieQuiz' component={MovieQuiz} />
                 <Route exact path='/GeneralQuiz' component={GeneralQuiz} />
                 <Route exact path='/PoliticsQuiz' component={PoliticsQuiz} />
                 <Route exact path='/LeaderBoard' component={LeaderBoard} />
                 <Route exact path='/ViewUsers' component={ViewUsers} />
                 <Route exact path='/GeneralLeader' component={GeneralLeader} />
                 <Route exact path='/MovieLeader' component={MovieLeader} />
                 <Route exact path='/SportsLeader' component={SportsLeader} />
                 <Route exact path='/PoliticsLeader' component={PoliticsLeader} />
                 <Route exact path={`/Quiz1/:topic` } component={Quiz1} />
                 <Route exact path={`/edit/:id`} component={EditQuestion} />

            </Switch>
          </div>
        </Router>
      </div>
    );
    }
  }
}

export default App;
