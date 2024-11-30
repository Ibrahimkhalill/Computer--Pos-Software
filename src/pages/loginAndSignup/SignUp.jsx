import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa6";
import { RotatingLines } from "react-loader-spinner";
import "./sign_up_rezaul.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  // "moderator", "user"
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [selectedRoles, setSelectedRoles] = useState("user");
  const [isDisabledOTPButton, setIsDisabledOTPButton] = useState(false);
  const [passShow, setPassshow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  console.log(userName, email, password, OTP, selectedRoles);
  // Handle Click From Submition
  const handleFromSubmit = async (event) => {
    event.preventDefault();

    // Input Validtion

    const newErrors = {};

    if (!userName) {
      newErrors.userName = "Username is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!OTP) {
      newErrors.OTP = "OTP is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (selectedRoles.length === 0) {
      newErrors.selectedRoles = "Select at least one role";
    }

    // If there are validation errors, display toast messages
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((error) => {
        toast.error(error, {
          position: "bottom-center",
        });
      });
      return;
    }
    // Input Validation End
    setIsLoading(true);
    setIsDisabledOTPButton(false);

    try {
      await fetch("http://194.233.87.22:5001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          email: email,
          OTP: OTP,
          password: password,
          roles: [selectedRoles],
        }),
      }).then(async function (response) {
        const text = await response.text();
        sleep(1000).then(() => {
          setIsLoading(false);
        });

        toast(text);
        console.log(text); //here you can access it
      });

      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Hand Click Send OTP
  const handleOtp = async (event) => {
    event.preventDefault();

    // Input validation
    if (!email) {
      toast.error("Email is required", {
        position: "bottom-center",
      });
      return;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email format", {
        position: "bottom-center",
      });
      return;
    }
    // input validation end
    setIsLoading(true);
    setIsDisabledOTPButton(true);

    try {
      await fetch("http://194.233.87.22:5001/api/auth/otp", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }).then(async function (response) {
        const text = await response.text();
        sleep(1000).then(() => {
          setIsLoading(false);
        });
        toast(text);
        console.log(text); //here you can access it
      });

      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Function to handle radio button selection
  const handleOptionChange = (event) => {
    setSelectedRoles(event.target.value);
  };

  return (
    <div className="full_div_sign_up_page">
      <div className="signup-container">
        {/* Centered loader */}
        {isLoading && (
          <div className="loader-container">
            <RotatingLines color="#333" height={50} width={50} />
          </div>
        )}
        <div className="signup-card">
          <h2>Create an Account!</h2>
          <div className="container_users">
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
          <div className="input_container_signup">
            <div>
              <label>User Name</label>
            </div>
            <div>
              <input onChange={(event) => setUserName(event.target.value)} />
            </div>
          </div>
          <div className="input_container_signup">
            <div>
              <label>Email</label>
            </div>
            <div>
              <input onChange={(event) => setEmail(event.target.value)} />
            </div>
          </div>

          <div className="input_container_signup">
            <div>
              <label>Password</label>
            </div>
            <div className="two">
              <input
                type={!passShow ? "password" : "text"}
                onChange={(event) => setPassword(event.target.value)}
              />
              <div className="showpass" onClick={() => setPassshow(!passShow)}>
                {!passShow ? "Show" : "Hide"}
              </div>
            </div>
          </div>
          <div>
            <div className="input_container_signup">
              <div>
                <label>OTP</label>
              </div>
              <div className="custom_field">
                <input
                  className="input_field_signup"
                  type="text"
                  onChange={(event) => setOTP(event.target.value)}
                  required
                />

                <button
                  className="signup-button-scale"
                  disabled={isDisabledOTPButton}
                  onClick={handleOtp}
                >
                  Send
                </button>
              </div>
            </div>
            <div className="signup-button">
              <button
                className="signup-button-scale"
                onClick={handleFromSubmit}
              >
                Sign Up
              </button>
            </div>
          </div>
          <p className="signup_test">
            If you haven Account! <Link className="signup_test" to="/">Sign In</Link>
          </p>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default SignUp;
