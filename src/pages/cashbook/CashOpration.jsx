import React from "react";
import "./cash-opration.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as SaveSvg } from "../svg/save.svg";

const CashOpration = () => {
  const [type, setType] = useState("");
  const [taka, setTaka] = useState("");
  const [commant, setComment] = useState("");
  const [callanNo, setCallanNo] = useState("None");
  const [outTaka, setOutTaka] = useState("0");
  // current date
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'
    return formattedDate;
  });
  const [selectedOption, setSelectedOption] = useState("CashOperation");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // const [date, setDate] = useState(currentDate);
  const typeOptions = ["Investment", "Deposit", "Withdraw"];

  const handleSave = async () => {
    if(!type){
      toast.error("Type field is Require");
      return;
    }
    if(!taka){
      toast.error("Taka/Money field is Require");
      return;
    }
    if(!commant){
      toast.error("Commant field is Require");
      return;
    }
    
    try {
      console.log(type, taka, commant, callanNo, outTaka, currentDate);
      await fetch(
        "http://194.233.87.22:5001/api/cash_book/postCashBookRow?taka=" +
          taka +
          "&out_taka=" +
          outTaka +
          "&type=" +
          type +
          "&challan_no=" +
          callanNo +
          "&comment=" +
          commant +
          "&date=" +
          currentDate,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      setType("");
      setTaka("");
      setComment("");
    toast.success("Data Save Successfull");

      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  // const resetInputField = () => {
  //   setType("");
  //   setTaka("");
  //   setComment("");
  // };

  // const handleResetAndSave = ()=>
  // {
  //   handleSave();
  //   resetInputField();
  //   toast.success("Data Save Successfull");
  // }
  return (
    <div className="full_div_cash_opration">
      <div className="radio_buttons_btr">
        <label>
          <Link to="/cashopration">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="CashBook"
              checked={selectedOption === "CashOperation"}
              onChange={handleRadioChange}
            />
          </Link>
          Cash Opreation
        </label>
        <label>
          <Link to="/Cashbook">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="Deposit"
              checked={selectedOption === "CashBook"}
              onChange={handleRadioChange}
            />
          </Link>
          Cash Book
        </label>
      </div>
      <div className="first_row_div_cash_opration">
        <h1>Cash Opration</h1>
        <div className="box_cash_opration">
          <div className="cash_opration_container">
            <div className="input-field_cash_opration">
              <label className="label_field_cash_opration">*Type </label>
              <input
                className="input_field_cash_opration"
                name="type"
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                }}
                list="options"
              />
              <datalist id="options">
                {typeOptions.length > 0 && typeOptions.map((option, index) => (
                  <option key={index} value={option} />
                ))}
              </datalist>
            </div>
            <div className="input-field_cash_opration">
              <label className="label_field_cash_opration">Taka/Money </label>
              <input
                className="input_field_cash_opration"
                name="taka"
                value={taka}
                onChange={(event) => {
                  setTaka(event.target.value);
                }}
              />
            </div>
            <div className="input-field_cash_opration">
              <label className="label_field_cash_opration">Commant </label>
              <input
                className="input_field_cash_opration"
                name="commant"
                value={commant}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />
            </div>
          </div>
          <div >
            {/* <button className="button_field_cash_opration" onClick={handleResetAndSave}>
              Save
            </button> */}
            <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1vw",
                  fontWeight: "bold",
                  paddingLeft: "1vw",
                }}
              >
                <button
                  style={{
                    width: "2.8vw",
                    backgroundColor: "#F5F5DC",
                    boxShadow: "0 5px #999",
                    outline: "none",
                    border: "none",
                    borderRadius: ".2vw",
                  }}
                  type="submit"
                  onClick={handleSave}
                >
                  <SaveSvg style={{ cursor: "pointer" }} />
                </button>
                <div style={{ paddingTop: "0.4vw" }}>Save</div>
              </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default CashOpration;
