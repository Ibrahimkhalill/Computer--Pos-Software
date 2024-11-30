import React from "react";
import { Redirect } from "react-router-dom";
import angryDudeImg from "../Images/angrydude.png";
import Header from "../components/Header";
import { DO_SOMETHING_OVER } from "../constants/action-types";
import emojiLand from "./emojiLand";

const Dashboard = ({ appState, handleHeaderAction }) => {
    return appState === DO_SOMETHING_OVER ? (
      <Redirect
        push
        to={{
          pathname: "/thumbs",
          state: {
            humanType: "Cat Person",
            age: 12,
            sex: "none"
          }
        }}
      />
    ) : (
      <Header
        EmojiBg="linear-gradient(-180deg, #611A51 0%, #10096D 100%)"
        EmojiImg={angryDudeImg}
        EmojiBtnText="I'm so pissed. Click me"
        HandleHeaderAction={handleHeaderAction}
        appState={appState}
      />
    );
  };
  
  export default (Dashboard);