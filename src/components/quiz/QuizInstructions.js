import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
//import imgs
import img from '../../img/quiz.png';
import quiz1 from '../../img/quiz1.png';
import quiz2 from '../../img/quiz2.png';


//import font awesome icons 
import{ FaExclamationCircle } from 'react-icons/fa';


//this is afuntional based component for dispaying the instructions
//user can start the quiz by clicking the  start button or can go back to the home page
//Used classnames for styling purposes

export default function QuizInstructions() {
    return (
        <Fragment className="sum">

            {/**alining the icon to the center as a inline style */}
             <div style={{textAlign:"center"}}>
                 <FaExclamationCircle className="inst"></FaExclamationCircle>
              </div>
            {/**Setting the page title */}
            <Helmet><title>Quiz Instructions</title></Helmet>

            <div className="instructins-container">
                <h1 className="instr-h1">How to Play the Quiz Game</h1>
                <br/>
                <p classname="inst-p" style={{textAlign:'center'}}>Please read before you start the quiz.</p>
                
              {/**List of instructions */}     
             <ul className="inst-ul"> 
             
                <li>1.This quiz has a duration of 15 minutes and 15 quections. </li>
                    <li>2.Each quection has 5 options you need to select most appropriate option as the answer.</li>
                    <li>3.make sure you complete all the quections before the time elapes.</li>
                    <li>4.You have two 50-50 chances to select the answer</li>
                    <li>5.You have 5 hints to select the answer</li>
                    <li>6.You have 3 minutes tp complete a quiz.</li>
                    <li>7.You can start the quiz now by clicking on Start button or go back to the Home page</li>
                    <br/>
                    <h2>Good Luck!</h2>
             </ul>
             <br/>
             {/**Importing screenshots of the quiz app */}
             <img classname="imginst" src={quiz1} alt="Logo" />;
             <img classname="imginst" src={quiz2} alt="Logo" />;
            
            </div>
            
            {/*This div is for the footer of the page including 2 buttons to 
            go back to the main quiz page and other button is to start the game */}
            <div className="btns-container">
                <span className="left" style={{float: 'left'}}><Link to="/" className="btns"id="h-btn">Take me back</Link></span>
                <span className="right" style={{float: 'right'}}><Link to="/play/quiz" className="btns"id="r-btn">Start the quiz!</Link></span>
            </div>
        </Fragment>
    )
}
