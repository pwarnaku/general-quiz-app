import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

//font awesom icons
import { FaRegBookmark } from 'react-icons/fa';
import{ FaCheck } from 'react-icons/fa';

class QuizSummary extends Component {
    constructor (props){
        super(props);
        this.state ={
            score:0,
            numberOfQuestions:0,
            numberOfAnsweredQuestions:0,
            correctAnswers:0,
            wrongAnswers:0,
            usedHints:0,
            usedFiftyFifty:0

        };
    }
    //seting the sate from play.js
    componentDidMount()
    {
        //pulling out the state from the location objecr just to reduce the code!
        // this is the another way to do this : const { score, numberOfQuestions, numberOfAnsweredQuestions,correctAnswers,wrongAnswers,usedHints,usedFiftyFifty } = this.state;
        const { state, score } =this.props.location;
        this.setState({

            score: (state.score / state.numberOfQuestions) *100,
            numberOfQuestions:state.numberOfQuestions,
            numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            usedHints:state.usedHints ,
            usedFiftyFifty:state.usedFiftyFifty
        });
    }
    render() {

        //destructoring the state usig location object
        const { state, score } =this.props.location;
        let stats,remark;
        const userScore = this.state.score;

        //Check how many marks user got and setting a unigue message(stat)
        if (userScore <=30){
            remark ='You need more practice!';
        }else if (userScore >30 && userScore <= 50){
            remark ='Better next time!!';
        }else if (userScore<=70 && userScore>50){
            remark ='You can do better!';
        }else if(userScore >= 71 && userScore<=84){
            remark ='Great Job!! :D';
        }else if (userScore >84){
            remark ='Genius!!!'
        }


        //if user has completed a quiz
        // includes lables in the summary page with output of the quiz
        if(state!== undefined){
           stats=(
               <Fragment>
                  <div style={{textAlign:"center"}}>
                 <FaCheck className="sumicon"></FaCheck>
                </div>

               <h1 className="sumr-h1"> Quiz has ended.</h1>

               <div className ="conatiner">

            
           <h4>{remark}</h4>

          
           <h2>Your Score:46%</h2>
           <div classname="list">
           <span className="stat left">Total number of questions:</span>
           <span className="right">15</span>
           <br/>
           <span className="stat left">Total number of answered questions:</span>
           <span className="right">{this.state.numberOfAnsweredQuestions-1}</span>
           <br/>
           <span className="sp">Total number of correct answers:</span>
           <span className="right">{this.state.correctAnswers}</span>
           <br/>
           <span className="stat left">Total number of wrong answers:</span>
           <span className="right">{this.state.wrongAnswers}</span>
           </div>
         <div>
               <ul>
                   <li>
                       <Link className="left"  style={{float: 'left'}} to="/">Back to Home</Link>
                   </li>
                   <li>
                       <Link className="right" style={{float: 'right'}}to="/play/quiz">Play Again</Link>
                   </li>
               </ul>
           </div>

               </div>
               </Fragment>
               
           )

        }else{
           stats =(
               <section>
               <h1 className="no-stats"> No Stats Available</h1>
               <ul>
                   <li>
                       <Link to="/">Back to Home</Link>
                   </li>
                   <li>
                       <Link to="/play/quiz">Play Again</Link>
                   </li>
               </ul>
               </section>
           )

        }
      
        return (
            
            //setting the title of the page
            <Fragment>
                <Helmet><title>Summary - quiz app</title></Helmet>
                {stats}
             </Fragment>
            
        
        )
    }
}
export default QuizSummary;
