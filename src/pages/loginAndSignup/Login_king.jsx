import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

import { FaFacebookF, FaGoogle, FaGit } from "react-icons/fa6";
import "./login_king.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router-dom';
import { RotatingLines } from "react-loader-spinner";



const Login_king = () => {
const navigate = useNavigate();

const location = useLocation()
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const [isLoggingIn, setIsLoggingIn] = useState(false);


const handleForLogin = async ()=>{
  setIsLoggingIn(true);
    let lastStatus = 'Successful';
    
    try {
        await fetch("http://194.233.87.22:5001/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-type":"application/json"
          },
          body: JSON.stringify({
            username: userName,
            password: password,
          }),
        }).then((res) => res.json())
        .then((resJson) => {
          const data = JSON.parse(JSON.stringify(resJson));
          console.log("text.accessToken" + data.accessToken);
          toast(lastStatus);
              
                navigate('/cashbook/banktransactionreport',{ state: {id: data.id,
                     username: data.username,
                     email:data.email,
                     roles:data.roles,
                     accessToken:data.accessToken} });
        })
      } catch (error) {
        toast("Error");
        console.error("Error saving data:", error);
      }

      setTimeout(() => {
        setIsLoggingIn(false);
       
        // toast.success("Logged in successfully!");
    }, 1000);
}




    return (
        <div className="full_div_login_page">
            {isLoggingIn ? (
                <div className="spinner-container">
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={true}
                    />
                </div>
            ) : null}
          <div className="login_container">
            <div className="login_card">
              <h2 className="header_login">Login</h2>
              <p className="p_login">use your email for resigistion </p>  
                <div className="social_container_login">
                  <Link className="social_link_login" to="#">
                    <FaFacebookF />
                  </Link>
                  <Link className="social_link_login" to="#">
                    <FaGoogle />
                  </Link>
                  <Link className="social_link_login" to="#">
                    <FaGit />
                  </Link>
                </div>
                <div className="login_action_fields">
                <div className="input_container_login">
                  <div><label className="label_login" >User Name</label></div>
                  <div><input 
                  className="input_login"
                  onChange={(event) => setUserName(event.target.value)}/></div>
                  
                </div>
                
                <div className="input_container_login">
                  <div><label className="label_login_pass">Password</label></div>
                  <div><input
                  className="input_login_pass"
                  onChange={(event) => setPassword(event.target.value)}/></div>
                </div>
                <div>
    
                <button
                className="button_login"
                
                 onClick={handleForLogin}
                >
                  Login
                </button>
                </div>
                </div>
    
               
                
             
            </div>
            <ToastContainer position="bottom-center"/>
          </div>
          
        </div>
      
      );
}

export default Login_king