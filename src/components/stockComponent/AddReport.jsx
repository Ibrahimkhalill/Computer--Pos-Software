import React from "react";
import "./add_report.css";
import { useState, useEffect } from "react";
import ExportExcel from "../../../src/components/ExportExcel";
import { RotatingLines } from "react-loader-spinner";
import { useLocation, Link } from "react-router-dom";

const AddReport = () => {
  const [selectedOption, setSelectedOption] = useState("AddReport");
  const [items, setItems] = useState([]);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const handelClickFetchDateFormAndToSearch = () => {
    // Handle the click event and use the fromDate and toDate values as needed
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
  };

  //creating dummy product:
  useEffect(() => {
    let dummyData = [];
    for (let i = 0; i <= 100; i++) {
      let num = 0;
      num = num + i;
      let data = {
        Product_code: num,
        Brand_name: "Brand_name" + i,
        Product_name: "Product_name" + i,
        Rack_no: "Rack_no" + i,
        Category: "Category" + i,
        Model: "Model" + i,
        Purchase_price: "Purchase_price" + i,
        Sell_price: "Sell_price" + i,
        Unit: "Unit" + i,
        Warrenty: "Warrenty" + i,
        Product_color: "Product_color" + i,
        Product_size: "Product_size" + i,
      };
      dummyData.push(data);
    }
    setItems(dummyData);
  }, []);
  return (
    <div className="full_div_add_report">
      {/* <div className="radio_buttons_add_report">
        <label>
          <Link to="/stock/stock_operation/add_report">
            <input
              className="input_custom_add_report"
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
              checked={selectedOption === "PersonalUtilizereport"}
              onChange={handleRadioChange}
            />
          </Link>
          Personal Utilize report
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
        
      </div> */}
      <div className="first_row_div_add_report">
        <div className="flex-column">
          <div className="container_search_column1_add_report">
            <div className="input_field_supplier">
              <label className="label_field_add_report">From Date</label>
              <input
                className="input_field_add_report"
                type="date"
                id="supplier-from-date-search"
                onChange={(event) => setFromDate(event.target.value)}
              />
            </div>
            <div className="input_field_supplier">
              <label
                className="label_field_add_report"
                htmlFor="add-report-to-date-search"
              >
                To Date
              </label>
              <input
                className="input_field_add_report"
                type="date"
                id="add-report-to-date-search"
                onChange={(event) => setToDate(event.target.value)}
              />
              <button
                className="button_field_add_report"
                type="submit"
                onClick={handelClickFetchDateFormAndToSearch}
              >
                Search
              </button>
            </div>
          </div>
          <div className="container_search_column2_add_report">
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
        </div>

        <div className="container_search_column3_add_report">
          <div className="input_field_supplier">
            <button
              className="button_field_add_report btn"
              type="submit"
              //   onClick={handelClickFetchShowAll}
            >
              Show All
            </button>
          </div>
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
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Model</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {/* <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr> */}
              {items &&
                items.length > 0 &&
                items.map((d) => (
                  <tr key={d.Code} className="addProduct_tr">
                    <td className="addProduct_t">{d.Product_code}</td>
                    <td className="addProduct_td">{d.Brand_name}</td>
                    <td className="addProduct_td">{d.Product_name}</td>
                    <td className="addProduct_td">{d.Rack_no}</td>
                    <td className="addProduct_td">{d.Category}</td>
                    <td className="addProduct_td">{d.Model}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddReport;
