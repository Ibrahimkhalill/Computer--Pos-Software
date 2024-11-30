import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa6";
import { RotatingLines } from "react-loader-spinner";
import "./sign-in.css";
import { useAuth } from '../../components/Auth';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [passShow, setPassshow] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState("user");
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // console.log(userName, password, selectedOption);
  const { login } = useAuth();

  // Handle Click From Submition
  const handleFromSignIn = async (event) => {
    event.preventDefault();

    // Input validation
    if (!userName) {
      toast.error("Username is required", {
        position: "bottom-center",
      });
      return;
    }

    if (!password) {
      toast.error("Password is required", {
        position: "bottom-center",
      });
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "bottom-center",
      });
      return;
    }

    // else if (password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters long";
    // }

    // Input validation End
    setIsLoading(true);
    try {
      await fetch("http://194.233.87.22:5001/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
          roles: [selectedRoles],
        }),
      })
        .then((res) => res.json())
        .then((resJson) => {
          const data = JSON.parse(JSON.stringify(resJson));
          console.log("text.accessToken" + data.accessToken);
         
          
          login(data.accessToken)
          navigate("/homepage", {
            state: {
              id: data.id,
              username: data.username,
              email: data.email,
              roles: data.roles,
              accessToken: data.accessToken,
            },
          });
            // Call the function
            
            
          // sleep(1000).then(() => {
          //   setIsLoading(false);
          // });
          toast("Data sent successfully!");
          // history.push('/salepage',{ data });
          
        });
    } catch (error) {
      console.error("Error saving data:" + error);
      toast("Error sending data: " + error);
    }
  };

  // Function to handle radio button selection
  const handleOptionChange = (event) => {
    setSelectedRoles(event.target.value);
  };

  return (
    <div className="full_div_sign_in_page">
      <div className="signin-container">
        {/* Centered loader */}
        {isLoading && (
          <div className="loader-container">
            <RotatingLines color="#333" height={50} width={50} />
          </div>
        )}
        <div className="signin-card">
          <h2>Sign In!</h2>
          <div className="container_users_signin">
            <div>
              <input
                type="radio"
                id="admin"
                value="admin"
                checked={selectedRoles === "admin"}
                onChange={handleOptionChange}
              />
              <label>Admin</label>
            </div>
            <div>
              <input
                type="radio"
                value="user"
                checked={selectedRoles === "user"}
                onChange={handleOptionChange}
              />
              <label>User</label>
            </div>
            <div>
              <input
                type="radio"
                value="accounts"
                checked={selectedRoles === "accounts"}
                onChange={handleOptionChange}
              />
              <label>Accounts</label>
            </div>
          </div>
          <div className="social-container">
            <Link className="social-Link" to="https://www.facebook.com/">
              <FaFacebookF />
            </Link>
            <Link className="social-Link" to="https://www.google.com/">
              <FaGoogle />
            </Link>
            <Link className="social-Link" to="https://twitter.com/">
              <FaTwitter />
            </Link>
          </div>
          <div className="input_container_signin">
            <div>
              <label>User Name</label>
            </div>
            <div>
              <input
                onChange={(event) => setUserName(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="input_container_signin">
            <div>
              <label>Password</label>
            </div>
            <div className="two">
              <input
                type={!passShow ? "password" : "text"}
                onChange={(event) => setPassword(event.target.value)}
              />
              <div
                className="showpass"
                onClick={() => setPassshow(!passShow)}
                required
              >
                {!passShow ? "Show" : "Hide"}
              </div>
            </div>
          </div>
          <div>
            <div className="signin-button">
              <button
                className="signin-button-scale"
                onClick={handleFromSignIn}
              >
                Sign In
              </button>
            </div>
          </div>
          <p className="signin_test">
            If you haven't Account! <Link className="signin_test" to="/signup">Register Here</Link>
          </p>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default SignIn;
