import React from "react";
import "./add_report.css";
import { useState, useEffect } from "react";
import ExportExcel from "../../../src/components/ExportExcel";
import { RotatingLines } from "react-loader-spinner";
import { useLocation, Link } from "react-router-dom";


const AddReport = () => {
  
  const [selectedOption, setSelectedOption] = useState("Add Report");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };


 

  return (
    <div className="full_div_deposit">
      <div className="radio_buttons_add_report">
        <label>
          <Link to="/stock/stock_operation/add_report">
            <input
              className="input_custom_add_report"
              type="radio"
              value="Add Report"
              checked={selectedOption === "Add Report"}
              onChange={handleRadioChange}
            />
          </Link>
          Add Report
        </label>
        <label>
          <Link to="">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="Personal Utilize report"
              checked={selectedOption === "Personal Utilize report"}
              onChange={handleRadioChange}
            />
          </Link>
          Personal Utilize report
        </label>
        <label>
          <Link to="">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="Damage Report"
              checked={selectedOption === "Damage Report"}
              onChange={handleRadioChange}
            />
          </Link>
          Damage Report
        </label>
        
      </div>
      <div className="first_row_div_add_report">
        <div className="container_search_column1_add_report">
        
        </div>
        <div className="container_search_column2_add_report">
          <div className="input_field_supplier">
            <label
              className="label_field_add_report"
              for="supplier-from-date-search"
            >
              From Date
            </label>
            <input
              className="input_field_add_report"
              type="date"
              id="supplier-from-date-search"
            //   onChange={(event) => setFromDate(event.target.value)}
            />
          </div>
          <div className="input_field_supplier">
            <label
              className="label_field_add_report"
              id="supplier-from-date-search"
             
            >
              Date
            </label>
            <input
              className="input_field_add_report"
              id="supplier-search"
              type="date"
            //   value={}
            // //   onChange={(event) => setSelectedSupplier(event.target.value)}
            //   list={"select_supplier"}
            />
            {/* <datalist id="select_supplier">
              {allSupplier.map((allSupplier, index) => {
                return <option key={index}>{allSupplier.company_name}</option>;
              })}
            </datalist> */}
            <button
              className="button_field_add_report"
              type="submit"
            //   onClick={(event) =>
            //     // handleClickSearchbySupplier(event.target.value)
            //   }
            >
              Search
            </button>
          </div>
        </div>
        <div className="container_search_column3_add_report">
          <div className="input_field_supplier">
            <label
              className="label_field_add_report"
              for="supplier-from-date-search"
            >
              To Date
            </label>
            <input
              className="input_field_add_report"
              type="date"
              id="supplier-search"
              // onChange={(event) => setToDate(event.target.value)}
            />
            <button
              className="button_field_add_report"
              type="submit"
            //   onClick={handelClickFetchDateFormAndToSearch}
            >
              Search
            </button>
          </div>
          <div className="input_field_supplier">
            <button
              className="button_field_add_report btn"
              type="submit"
            //   onClick={handelClickFetchShowAll}
            >
              Show All
            </button>
          </div>
        </div>
        <div className="container_search_column4_add_report">
          <div className="input_field_supplier">
            <button className="button_field_add_report btn" type="submit">
              Excel
            </button>
          </div>
        </div>
      </div>
      <div className="second_row_add_report">
        
          <div className="table_add_report">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Model</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Date</th>
                
              </tr>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                
                </tr>
                
              </tbody>
            </table>
          </div>
      
      </div>
     
    </div>
  );
};

export default AddReport;
