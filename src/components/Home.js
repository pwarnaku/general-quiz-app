import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


//font awesome icons
import { FaMedapps } from 'react-icons/fa';


/*
This functional component is the main page of the quiz app
Things I used,
1. Fragments - to group a list of children without adding extra nodes to the DOM.
2. React Helmet - to manage the document head. 
It works in a browser and supports rendering on a server,
 dynamically set the page title, language, and metadata

 Most of the div tags have classnames for styling purposes
*/

const Home = () => (
   <Fragment>
       <Helmet><title>Quiz - Home</title></Helmet>
      
       <div className="home">
          <section>
             {/**bulp icon in the main page */}
              <div style={{textAlign:"center"}}>
                 <FaMedapps className="bulb"></FaMedapps>
              </div>
              <h1 className ="main-h1">General Quiz App</h1>
              <div className = "play-btn-container">
                  <ul>
                      {/*This link allows users to  go to the instruction page*/}
                      <li><Link className="play-btn" to="/play/instructions">Play</Link></li> 
                  </ul>
               </div>
               {/*container of login and register buttons */}
               <div className="auth-container">

                    {/*These links allow users to  go to the Login and Register pages 
                    Not implemented just added these buttons :) */}
                    <Link to="/login" className="auth-btns" id="login-btn">Login</Link>
                    <Link to="/register" className="auth-btns" id="register-btn">Register</Link>

               </div>
               
          </section>
       </div>
   </Fragment>
    
)

export default Home;