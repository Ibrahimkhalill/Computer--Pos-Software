import React from "react";
import "./stockNavbar.css";
import { useState } from "react";

const StockNavBar = ({ reportViewFunction, viewReport }) => {
  const [selectedOption, setSelectedOption] = useState("AddReport");
  return (
    <div>
      <div className="radio_buttons_btr">
        <label
          className={`${
            selectedOption === " AddReport"
              ? "StockNavBar_input Active_btn "
              : "StockNavBar_input"
          }`}
        >
          <input
            type="radio"
            value="AddReport"
            checked={selectedOption === "AddReport"}
            onClick={() => {
              reportViewFunction("AddReport");
              setSelectedOption("AddReport");
            }}
          />
          Add Report
        </label>
        <label
          className={`${
            selectedOption === " StockProductUtilize"
              ? "StockNavBar_input Active_btn"
              : "StockNavBar_input"
          }`}
        >
          <input
            type="radio"
            value="StockProductUtilize"
            checked={selectedOption === "StockProductUtilize"}
            onClick={() => {
              reportViewFunction("StockProductUtilize");
              setSelectedOption("StockProductUtilize");
            }}
          />
          Personal Utilize Report
        </label>
        <label
          className={`${
            selectedOption === " StockProductDamage"
              ? "StockNavBar_input Active_btn"
              : "StockNavBar_input"
          }`}
        >
          <input
            type="radio"
            value="StockProductDamage"
            checked={selectedOption === "StockProductDamage"}
            onClick={() => {
              reportViewFunction("StockProductDamage");
              setSelectedOption("StockProductDamage");
            }}
          />
          Damage Report
        </label>
      </div>
    </div>
  );
};

export default StockNavBar;

{
  /* <button
          className={`StockNavBar_btn ${
            viewReport === "AddReport" && "Active_btn"
          }`}
          onClick={() => reportViewFunction("AddReport")}
        >
          {" "}
          Add Report
        </button>
        <button
          className={`StockNavBar_btn ${
            viewReport === "StockProductUtilize" && "Active_btn"
          }`}
          onClick={() => reportViewFunction("StockProductUtilize")}
        >
          Personal Utilize Report
        </button>
        <button
          className={`StockNavBar_btn ${
            viewReport === "StockProductDamage" && "Active_btn"
          }`}
          onClick={() => reportViewFunction("StockProductDamage")}
        >
          Damage Report
        </button> */
}
