import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import M from 'materialize-css';

//font awesome icons
import { FaRegClock } from 'react-icons/fa';
import { FaAllergies } from 'react-icons/fa';
import { FaMedapps } from 'react-icons/fa';

//question and answers json file
import questions from'../../questions.json';

//components
import isEmpty from '../../utils/is-empty';

//audio clips
import Correct from '../../assests/sounds/Correct.mp3';
import Clicking from '../../assests/sounds/Clicking.mp3';
import Wrong from '../../assests/sounds/Error.mp3';

{/*This is a class based component for handling main functions in the quiz app */}

class Play extends Component {

   constructor(props) {
       super(props);
    
       //setting the initial values for the attriutes
    this.state = {
        questions,
        curentQuestion:{},
        nextQuestion:{},
        previousQuestion:{},
        answer:'',
        numberOfQuestions:15,
        numberOfAnsweredQuestions:0,
        currentQuestionIndex:0,
        score:0,
        correctAnswers:0,
        wrongAnswers:0,
        hints:5,
        fiftyfifty:2,
        usedFiftyfifty: false,
        nextButtonDisabled: false,
        prevButtonDisable: true,
        prevRandomNumbers:[],
        time:{}
            
       };
       this.ineterval =null
   }
    //This method calls whenever this class component has being called
   componentDidMount(){
       //destructoring the state
       const { questions, curentQuestion,nextQuestion,previousQuestion } = this.state;

       this.displayQuestions(questions,curentQuestion, nextQuestion, previousQuestion);
       this.startTimer();
   }

   // Runs when or before a component get unmounted.
   componentWillUnmount(){
    clearInterval(this.ineterval);
   }

   //This function will handle the question.json fle to render the questions with 4 options
   // Passing properities (questions,curentQuestion,nextQuestion,previousQuestion)
   displayQuestions = (
       questions = this.state.questions, 
       curentQuestion,
       nextQuestion,
       previousQuestion) => 
   {
       let {currentQuestionIndex} = this.state;

       //check if there are no quections lefts(end of the game)
       if(!isEmpty(this.state.questions)){

        //if not, setting the current values to the passes props
        questions=this.state.questions;
        curentQuestion=questions[currentQuestionIndex];
        nextQuestion=questions[currentQuestionIndex+1];
        previousQuestion=questions[currentQuestionIndex-1];

        const answer = curentQuestion.answer;

        //Setting the current values to the props by changing the state of the properties (because this is a class based component)
        this.setState({
            curentQuestion,
            nextQuestion,
            previousQuestion,
            numberOfAnsweredQuestions:questions.length, 
            answer,
            prevRandomNumbers:[]

            //callback function to call showOptions() and handleDisabledButton() methods
        }, () => {
            this.showOptions();
            this.handleDisableButton();
        });
         

       }
   };

   //This function handles and give different sounds for wrong and right ansers by
   //assiging simple audio clips
   handleOption=(e)=>{
   if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
    setTimeout(() => {
        document.getElementById('correct-sound').play();   
    }, 500);
    
    this.correctAnswer();
   }else{
    setTimeout(() => {
        document.getElementById('wrong-sound').play();   
    }, 500);
    
    this.wrongAnswer();
   }
   };

   //This function will take user to the next quesstion
   handleNextButton =() => {
       this.playButtonSound();

        //check if there are no quections lefts(end of the game)
       if (this.state.nextQuestion !== undefined){
           //if there are questions, update the remaing number of questions and answered questions
        this.setState(prevState =>({
            currentQuestionIndex:prevState.currentQuestionIndex +1,
        }), () =>{
            this.displayQuestions(
                this.state.state, 
                this.state.curentQuestion, 
                this.state.nextQuestion, 
                this.state.previousQuestion);
        });
       }
    };

    //This function will take user to the previous quesstion
   handlePrevButton =() => {
    this.playButtonSound();

      //check if there are no quections before(Start of the game)
    if (this.state.previousQuestion !== undefined){
     this.setState(prevState =>({
         currentQuestionIndex:prevState.currentQuestionIndex -1,
     }), () =>{
         this.displayQuestions(
             this.state.state, 
             this.state.curentQuestion, 
             this.state.nextQuestion, 
             this.state.previousQuestion);
     });
    }
    };

    //This function will alow user to exit the game and take to the home page
    handleQuiteButton =() => {
        this.playButtonSound();
        
      if(window.confirm('Are you sure you want to quit')){
            //this will take to the home page (default)
            this.props.history.push('/');
     }

    }

   //checks what button is being clicked by a switch statement 
   //and calls the matching funtion for each button click
   handleButtonClick = (e) =>{

    switch(e.target.id){
        case 'nxt-btn':
            this.handleNextButton();
            break;
        case 'prev-btn':
            this.handlePrevButton();
            break;
        case 'quit-btn':
            this.handleQuiteButton();
            break;
        default:
            break;

    }
    this.playButtonSound();
   };

   //Giving button click sounds
   playButtonSound =() =>{
    document.getElementById('click-sound').play();   

   };

   //When the user hits a correct anser, a pop-up message will be appeared.
   correctAnswer = () =>{
    M.toast({
        html : 'Correct Answer!!',
        classes: 'toast-valid',
        displayLength:1500
    });

    //updtating the state values
    this.setState(prevState => ({
     
        wrongAnswers:prevState.wrongAnswers+1,
        currentQuestionIndex: prevState.currentQuestionIndex+1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1
    }),() => {
        //check whether the user has come to the last question
        if(this.state.nextQuestion === undefined){
            //if yes, calls the endQuiz() methos
            this.endQuiz();
        }else{
            //otherwise display the next question
            this.displayQuestions(
                this.state.questions, 
                this.state.curentQuestion, 
                this.state.nextQuestion, 
                this.state.previousQuestion);
    
        }

       
    });
   }

   //When the user hits a wrong answer, a pop-up message will be appeared.
   wrongAnswer = () =>{
    
    M.toast({
        html : 'Wrong Answer!!',
        classes: 'toast-invalid',
        displayLength:1500
    });
     //updtating the state values
    this.setState(prevState => ({
        score:prevState.score+1,
        correctAnswers:prevState.correctAnswers+1,
        currentQuestionIndex: prevState.currentQuestionIndex+1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1
    }),() => {
        //check whether the user has come to the last question
        if(this.state.nextQuestion === undefined){
            this.endQuiz();
        }else{
            //otherwise display the next question
            this.displayQuestions(
                this.state.questions, 
                this.state.curentQuestion, 
                this.state.nextQuestion, 
                this.state.previousQuestion);
    
        }
       });
   }

   //This will handle the 4 options for each question
   showOptions = () =>{
    const options = Array.from(document.querySelectorAll('.option'));
    options.forEach(option => {
        //by default evey option is visible
        option.style.visibility = 'visible';

    });
    this.setState({
        //by default user has not used any fifty-fifty options
        usedFiftyfifty: false
    })

   } 

   //This is tohandle hinst (bulp icon right side of the quiz)
   handleHints =() => {
       //check if there are reaming hints
       if(this.state.hints>0){
        const options = Array.from(document.querySelectorAll('.option'));
        
        //gets the index
        let indexOfAnswer;
  
        options.forEach((option,index) => {
            if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                indexOfAnswer = index;
            }
        });

        //generating random numbers to hide wrong answers
        while(true) {
            const randomNumber = Math.round(Math.random()*3);
            //Make sure if the random number is equal to the index of the correct answer 
            if(randomNumber !== indexOfAnswer && !this.state.prevRandomNumbers.includes(randomNumber)){
                options.forEach((option,index) => {
                      if (index === randomNumber){
                          //if its not the index of the correct answer, that option will be hidden
                          option.style.visibility = 'hidden';

                          //after user uses a hint,the number of hints will be deducted
                          this.setState((prevState) =>({
                              hints: prevState.hints-1,
                              prevRandomNumbers: prevState.prevRandomNumbers.concat(randomNumber)
      
                          }) );
                      }
                      
                });
                break;
            }
            //After hiding 3 options for one question, hiding will stop
            if(this.state.prevRandomNumbers.length >=3) break;
  
        }

       }
   
   }

   //This function is tohandle 50-50 option to selsct answers
   handleFiftyFifty =() =>{

        //check if there are remaining 50-50 options. By default users has 2 options for a game
       if(this.state.fiftyfifty>0 && this.state.usedFiftyfifty ===false){
           const options=document.querySelectorAll('.option');
           const randomNumbers =[];
           let indexOfAnswer;

           options.forEach((option,index) => {
               if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                  indexOfAnswer = index;  
               }
           });

           let count =0;
           do{
               //generating a random number
            const randomNumber = Math.round(Math.random()*3);

              //Make sure if the random number is equal to the index of the correct answer 
            if(randomNumber !== indexOfAnswer){
                if(randomNumbers.length<2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)){
                    randomNumbers.push(randomNumber);
                    count++;
                }else{
                    while(true){
                        const newRandomNumber = Math.round(Math.random()*3);
                        if(!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)){
                            randomNumbers.push(newRandomNumber);
                            count++;
                            break;
                        }
                    }
                }

            }
            // Oalow users to use 50-50 ony 2 times
           }while(count<2);
           options.forEach((option, index) => {
                if(randomNumbers.includes(index)){
                    option.style.visibility ='hidden';
                }
           });
           //after user uses a hint,the number of 50-50 options will be deducted
           this.setState(prevState => ({
               fiftyfifty:prevState.fiftyfifty-1,
               usedFiftyfifty: true
           }))
       }
   }
   //User has 3 mins for a game. this funtion will handle a countdown timer
   startTimer=() => {
       const counDownTime = Date.now() +180000;
       this.ineterval =setInterval(()=> {
           const now = new Date();
           const distance = counDownTime - now;

           const minutes = Math.floor((distance%(1000*60*60))/(1000*60));
           const seconds = Math.floor((distance%(1000*60))/(1000));
           //timesup
           if(distance<0){
            clearInterval(this.ineterval);
            this.setState({
                time:{
                    minutes:0,
                    seconds:0

                }
            }, () => {
                //after the time is up, endQuiz() method will be called
                this.endQuiz();
            });
           } else{
               //setting the current time
               this.setState ({
                   time:{
                       minutes,
                       seconds
                   }
               })
           }

       }, 1000)
   }

   //this function is to disable clicks on button when needded
   handleDisableButton = () =>{
       //At the begining of the quiz, the previos button is disabled
       if (this.state.previousQuestion ===undefined || this.state.currentQuestionIndex ===0){
           this.setState({
               prevButtonDisable: true
           });
       }
       else{
        this.setState({
            prevButtonDisable: false
        });
       }

       //At the end of the quiz, the next button is disabled
       if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex+1 === this.state.numberOfQuestions){
        this.setState({
            nextButtonDisabled: true
        });
    }
    else{
     this.setState({
         nextButtonDisabled: false
     });
    }
   }

   //this fuunction is handling the end of the quiz
   endQuiz =() =>{
       //alert will be displayed
       alert('Quiz has ended!!');
       const {state} = this;

       //updatting states at the end of the quiz
       const playStarts = {
           score:state.score,
           numberOfQuestions:state.componentDidMount,
           numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
           correctAnswers: state.correctAnswers,
           wrongAnswers: state.wrongAnswers,
           usedFiftyfifty : 2-state.fiftyfifty,
           usedHints: 5-state.hints
           

       };
       //after user finish the quiz or after timer is up, summary page will be dispalyed
       setTimeout(()=>{
            this.props.history.push('/play/quizsummary', playStarts);
       }, 1000)
   }

   //render method where this class component returns the UI
    render() {
        
        const { 
            curentQuestion, 
            currentQuestionIndex, 
            numberOfQuestions, 
            hints, 
            fiftyfifty,
            time
        
        } = this.state;
        return (

            /*
            This functional component is the main page of the quiz app
            Things I used,
                1. Fragments - to group a list of children without adding extra nodes to the DOM.
                2. React Helmet - to manage the document head. 
                    It works in a browser and supports rendering on a server,
                    dynamically set the page title, language, and metadata

            Most of the div tags have classnames for styling purposes
            */

            <Fragment>
                <Helmet><title>Quiz Page</title></Helmet>
            <Fragment>
                    {/**Audio clips */}
                    <audio id="correct-sound" src={Correct }></audio>
                    <audio id="wrong-sound" src={Wrong }></audio>
                    <audio id="click-sound" src={Clicking }></audio>
            </Fragment>

                <div className="quections">
                    <h2>Quiz mode</h2>

                    {/* lifeline container */}
                    <div className="lifeline-container">
                         {/*50-50 icon and assiging its methods */}
                        <p>
                            <FaAllergies onClick={this.handleFiftyFifty} className="lifeline"></FaAllergies>
                            {fiftyfifty}
                        </p>

                          {/*Hintsicon and assiging its methods */}
                        <p>
                            <FaMedapps onClick={this.handleHints} className="hints" ></FaMedapps>{hints}
                         </p>

                    </div>

                    {/* remaining number of quections  */}
                    <div>
                        <p className="timer-container">

                        <span className="left" style={{float: 'left'}}>{currentQuestionIndex +1} of {numberOfQuestions}</span>
                            <span className="clock" style={{float: 'right'}}>{time.minutes}:{time.seconds}<span><FaRegClock></FaRegClock></span></span>    
                        </p>
                    </div>

                    {/* current question number : total number of questions */}
                    <h3>{curentQuestion.question}</h3>

                     {/* Displaying for options */}
                    <div className="options-container">
                         <p onClick={this.handleOption} className="option">{curentQuestion.optionA}</p>
                         <p onClick={this.handleOption} className="option">{curentQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                         <p onClick={this.handleOption} className="option">{curentQuestion.optionC}</p> 
                         <p onClick={this.handleOption} className="option">{curentQuestion.optionD}</p>
                    </div>

                    {/**Button container for next ,previous,quite buttons*/}
                    <div className="button-container">
                        <button 
                        className ={classNames('',{'disable':this.state.prevButtonDisable})}
                        id="prev-btn" 
                        onClick ={this.handleButtonClick}> 
                        Previous
                        </button>

                        <button 
                        className ={classNames('',{'disable':this.state.nextButtonDisabled})}
                        id="nxt-btn"  
                        onClick ={this.handleButtonClick}>
                        Next
                        </button>

                        <button 
                        id="quit-btn" 
                        onClick ={this.handleButtonClick}>
                        Quit
                        </button>
                    </div>


                </div>
            </Fragment>
        )
    }
} 
export default Play;