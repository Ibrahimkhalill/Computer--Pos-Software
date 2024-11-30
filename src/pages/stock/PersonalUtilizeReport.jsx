import React from "react";
import "./personal_utilize_report.css";
import { useState, useEffect } from "react";
import ExportExcel from "../../../src/components/ExportExcel";
import { RotatingLines } from "react-loader-spinner";
import { useLocation, Link } from "react-router-dom";


const PersonalUtilizeReport = () => {
  
  const [selectedOption, setSelectedOption] = useState("PersonalUtilizeReport");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="full_div_stock_product_utilize">
      <div className="radio_buttons_btr">
        <label>
          <Link to="/stock/stock_operation/add_report">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="AddReport"
              checked={selectedOption === "AddReport"}
              onChange={handleRadioChange}
            />
          </Link>
          Add Report
        </label>
        <label>
          <Link to="/stock/stock_operation/personal_utilize_report">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="PersonalUtilizeReport"
              checked={selectedOption === "PersonalUtilizeReport"}
              onChange={handleRadioChange}
            />
          </Link>
          Personal Utilize Report
        </label>
        <label>
          <Link to="/stock/stock_operation/Damagereport">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="DamageReport"
              checked={selectedOption === "DamageReport"}
              onChange={handleRadioChange}
            />
          </Link>
          Damage Report
        </label>
      </div>
      <div className="first_row_div_stock_product_utilize">
        <div className="container_search_stock_product_utilize">
          <div className="container_search_stock_product_utilize_column1">
            <div className="input_field_stock_product_utilize">
              <label>Form</label>
              <input type="date" />
            </div>
            <div className="input_field_stock_product_utilize">
              <label>Date</label>
              <input type="date" />
              <button>Search</button>
            </div>
          </div>
          <div className="container_search_stock_product_utilize_column2">
            <div className="input_field_stock_product_utilize">
              <label>To</label>
              <input type="date" />
              <button>Search</button>
            </div>
          </div>
          <div className="container_search_stock_product_utilize_column3">
            <div className="input_field_stock_product_utilize">
              <button>Show All</button>
              <button>Excel</button>
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_stock_product_utilize">
        <div className="table_wrapper_stock_product_utilize">
          <table border={3} cellSpacing={2} cellPadding={10}>
            <tr>
              <th>Serial</th>
              <th>Product Name</th>
              <th>Model</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Date</th>
            </tr>
            <tbody>
              {/* {
 
            rows.map((item) =>
                <tr  key={item.id}>
                    
                    <td >{item.serial}</td>
                    <td >{item.challan_no}</td>
                    <td>{item.customer_name}</td>
                    <td>{item.cid}</td>
                    <td>{item.product_code}</td>
                    <td>{item.product_name}</td>
                    <td>{item.model}</td>
                   
                </tr>
            )
        } */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonalUtilizeReport;
