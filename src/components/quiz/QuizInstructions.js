import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
//import imgs
import img from '../../img/quiz.png';

//import font awesome icons 
import{ FaExclamationCircle } from 'react-icons/fa';


//this is afuntional based component for dispaying the instructions
//user can start the quiz by clicking the  start button or can go back to the home page

export default function QuizInstructions() {
    return (
        <Fragment className="sum">

             <div style={{textAlign:"center"}}>
                 <FaExclamationCircle className="inst"></FaExclamationCircle>
              </div>
            
            <Helmet><title>Quiz Instructions</title></Helmet>
            <div className="instructins-container">
                <h1 className="instr-h1">How to Play the Quiz Game</h1>
                <br/>
                <p classname="inst-p" style={{textAlign:'center'}}>Please read before you start the quiz.</p>
                
                   
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
            <img classname="imginst" src={img} alt="Logo" />;
            </div>
            
            {/*This div is for the footer of the page including 2 buttons to 
            go back to the main quiz page and other button is to start the game */}
            <div className="auth-container">
                <span className="left" style={{float: 'left'}}><Link to="/" className="auth-btns"id="login-btn">Take me back</Link></span>
                <span className="right" style={{float: 'right'}}><Link to="/play/quiz" className="auth-btns"id="register-btn">Start the quiz!</Link></span>
            </div>
        </Fragment>
    )
}
