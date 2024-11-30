import React from "react";
import "./stock-product-damage.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const StockProductDamage = () => {
  const [selectedOption, setSelectedOption] = useState("DamageReport");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="full_div_stock_product_damage">
      {/* <div className="radio_buttons_btr">
        <label>
          <Link to="/stock/stock_operation/add_report">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="CashBook"
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
              value="Deposit"
              checked={selectedOption === "PersonalUtilizeReport"}
              onChange={handleRadioChange}
            />
          </Link>
          Personal Utilize Report
        </label>
        <label>
          <Link to="/stock/stock_operation/">
            <input
              className="input_custom_cashbook"
     Damagereport         type="radio"
              value="Withdraw"
              checked={selectedOption === "DamageReport"}
              onChange={handleRadioChange}
            />
          </Link>
          Damage Report
        </label>
      </div> */}
      <div className="first_row_div_stock_product_damage">
        <div className="container_search_stock_product_damage">
          <div className="container_search_stock_product_damage_column1">
            <div className="input_field_stock_product_damage">
              <label>Form</label>
              <input type="date" />
            </div>
            <div className="input_field_stock_product_damage">
              <label>Date</label>
              <input type="date" />
              <button>Search</button>
            </div>
          </div>
          <div className="container_search_stock_product_damage_column2">
            <div className="input_field_stock_product_damage">
              <label>To</label>
              <input type="date" />
              <button>Search</button>
            </div>
          </div>
          <div className="container_search_stock_product_damage_column3">
            <div className="input_field_stock_product_damage">
              <button>Show All</button>
              <button>Excel</button>
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_stock_product_damage">
        <div className="table_wrapper_stock_product_damage">
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

export default StockProductDamage;
