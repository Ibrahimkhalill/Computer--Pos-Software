import React from "react";
import "./date-base-income.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import PurchaseReportExcelExport from "../../components/ExportExcel";

const DateBaseIncome = () => {
  const [date, setDate] = useState([]);
  const [toDate, setToDate] = useState([]);
  const [formDate, setFormDate] = useState([]);
  const [stockData, setStockDate] = useState([]);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [selectedOption, setSelectedOption] = useState("DateBaseIncome");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response_getAllDateBaseIncumeTable = await fetch(
          "http://194.233.87.22:5001/api/sale_table/getSaleTable",
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        const datas_getAllDateBaseIncumeTable =
          await response_getAllDateBaseIncumeTable.json();
        setRows(datas_getAllDateBaseIncumeTable);

        const response_getAllDateBaseStockIncumeTable = await fetch(
          "http://194.233.87.22:5001/api/expense_report/getExpenseReport",
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        const datas_getAllDateBaseStockIncumeTable =
          await response_getAllDateBaseStockIncumeTable.json();
        setStockDate(datas_getAllDateBaseStockIncumeTable);
        setIsLoading(false);
        // fetch name
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  //Show ALL Data
  const handleClickSearchShowAll = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getDateBaseIncumeTableAllData = await fetch(
        "http://194.233.87.22:5001/api/sale_table/getSaleTable",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getDateBaseIncumeTableAllData =
        await response_getDateBaseIncumeTableAllData.json();
      console.log(datas_getDateBaseIncumeTableAllData);
      setRows(datas_getDateBaseIncumeTableAllData);
      console.log(datas_getDateBaseIncumeTableAllData);
      // stock data
      const response_getAllDateBaseStockIncumeTable = await fetch(
        "http://194.233.87.22:5001/api/expense_report/getExpenseReport",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getAllDateBaseStockIncumeTable =
        await response_getAllDateBaseStockIncumeTable.json();
      setStockDate(datas_getAllDateBaseStockIncumeTable);

      setIsLoading(false);
    };

    fetchData();
  };

  // http://194.233.87.22:5001/api/expense_report/getExpenseReportByOnlyDate?date=

  const handelClickFetchDateSearch = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getProductSaleDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/sale_table/getSaleTableByOnlyDate?date=" +
          date,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getProductSaleDateSearchTableAllData =
        await response_getProductSaleDateSearchTableAllData.json();
      console.log(datas_getProductSaleDateSearchTableAllData);

      setRows(datas_getProductSaleDateSearchTableAllData);
      console.log(datas_getProductSaleDateSearchTableAllData);
      // Expance Report
      const response_getStockProductSaleDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/expense_report/getExpenseReportByOnlyDate?date=" +
          date,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getStockProductSaleDateSearchTableAllData =
        await response_getStockProductSaleDateSearchTableAllData.json();
      console.log(datas_getStockProductSaleDateSearchTableAllData);

      setStockDate(datas_getStockProductSaleDateSearchTableAllData);
      setIsLoading(false);
    };

    // Call the function
    fetchData();
  };

  // form data -- to date

  // http://194.233.87.22:5001/api/expense_report/getExpenseReportByDateToDate?fromdate=&todate=
  const handelClickFetchDateFormAndToSearch = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getProductSaleDateSearchTableAllData = await fetch(
        "http://193.233.87.22:5001/api/customer/getCustomerSumOfDiscountAndSumOfExtraChargeByDateToDate?fromdate=" +
          formDate +
          "&todate=" +
          toDate,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token") 
            ),
          },
        }
      );
      const datas_getProductSaleDateSearchTableAllData =
        await response_getProductSaleDateSearchTableAllData.json();
      console.log(datas_getProductSaleDateSearchTableAllData);
      setRows(datas_getProductSaleDateSearchTableAllData);
      setIsLoading(false);
      console.log(datas_getProductSaleDateSearchTableAllData);
    };

    // Call the function
    fetchData();
  };

  //  Calculation

  const totalSalePrice = (rows.length > 0 && rows
    .reduce((totaltaka, item) => {
      if (item.rate !== undefined && item.rate !== null && item.rate !== "") {
        totaltaka += Number(item.rate);
      }
      return totaltaka;
    }, 0)
    .toFixed(2));

  console.log(totalSalePrice);

  // const totalPurchesePrice = rows
  //   .reduce((totalpurchesetaka, item) => {
  //     if (
  //       item.purchase_price !== undefined &&
  //       item.purchase_price !== null &&
  //       item.purchase_price !== ""
  //     ) {
  //       totalpurchesetaka += Number(item.purchase_price);
  //     }
  //     return totalpurchesetaka;
  //   }, 0)
  //   .toFixed(2);

  // const totalPurchesePrice = rows
  //   .reduce((totalPurcheseTaka, item) => {
  //     if (
  //       typeof item.purchase_price === "number" &&
  //       !isNaN(item.purchase_price)
  //     ) {
  //       totalPurcheseTaka += item.purchase_price;
  //     } else if (
  //       typeof item.purchase_price === "string" &&
  //       item.purchase_price.trim() !== ""
  //     ) {
  //       const numericValue = parseFloat(item.purchase_price);
  //       if (!isNaN(numericValue)) {
  //         totalPurcheseTaka += numericValue;
  //       }
  //     }
  //     return totalPurcheseTaka;
  //   }, 0)
  //   .toFixed(2);

  const totalPurchesePrice = (rows.length > 0 && rows
    .reduce((totalPurcheseTaka, item) => {
      let numericPrice = 0;

      if (
        typeof item.purchase_price === "number" &&
        !isNaN(item.purchase_price)
      ) {
        numericPrice = item.purchase_price;
      } else if (
        typeof item.purchase_price === "string" &&
        item.purchase_price.trim() !== ""
      ) {
        const numericValue = parseFloat(item.purchase_price);
        if (!isNaN(numericValue)) {
          numericPrice = numericValue;
        }
      }

      if (
        typeof item.quantity === "number" &&
        !isNaN(item.quantity) &&
        numericPrice !== 0
      ) {
        totalPurcheseTaka += numericPrice * item.quantity;
      }

      return totalPurcheseTaka;
    }, 0)
    .toFixed(2));

  // const totalPurchesePrice = rows
  //   .reduce((totalTaka, item) => {
  //     if (
  //       item.purchase_price !== undefined &&
  //       item.purchase_price !== null &&
  //       item.purchase_price !== "" &&
  //       item.quantity !== undefined &&
  //       item.quantity !== null &&
  //       item.quantity !== ""
  //     ) {
  //       totalTaka += Number(item.purchase_price) * Number(item.quantity);
  //     }
  //     return totalTaka;
  //   }, 0)
  //   .toFixed(2);

  const totalProfitAndLoss = (totalSalePrice - totalPurchesePrice).toFixed(2);

  const totalExpance = (stockData.length > 0 && stockData
    .reduce((totaltaka, item) => {
      if (
        item.amount !== undefined &&
        item.amount !== null &&
        item.amount !== ""
      ) {
        totaltaka += Number(item.amount);
      }
      return totaltaka;
    }, 0)
    .toFixed(2));

  console.log("total", totalExpance);

  return (
    <div className="full_div_date_base_income">
      <div className="radio_buttons_btr">
        <label>
          <Link to="/Datebaseincome">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="CashBook"
              checked={selectedOption === "DateBaseIncome"}
              onChange={handleRadioChange}
            />
          </Link>
          Date Base Income
        </label>
        <label>
          <Link to="/Productbaseincome">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="Deposit"
              checked={selectedOption === "ProductBaseIncome"}
              onChange={handleRadioChange}
            />
          </Link>
          Product Base Income
        </label>
      </div>
      <div className="first_row_div_date_base_income">
        <div className="column_one_date_base_income">
          <div className="row_one_date_base_income">
            <div className="conatiner_search_date_base_income">
              <div className="input_field_date_base_income">
                <label>Date:</label>
                <input
                  type="date"
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                />
                <button onClick={handelClickFetchDateSearch}>Search</button>
              </div>
              <div className="from_to_date_search_date_base_income">
                <div>
                  <div className="input_field_date_base_income">
                    <label>From Date:</label>
                    <input
                      type="date"
                      onChange={(event) => {
                        setFormDate(event.target.value);
                      }}
                    />
                  </div>
                  <div className="input_field_date_base_income">
                    <label>To Date:</label>
                    <input
                      type="date"
                      onChange={(event) => {
                        setToDate(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="input_field_date_base_income">
                  <button onClick={handelClickFetchDateFormAndToSearch}>
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="input_field_date_base_income">
              <button
                className="button_showall_date_base_income"
                onClick={handleClickSearchShowAll}
              >
                Show All
              </button>
            </div>
          </div>
          <div style={{fontSize:"1vw", fontWeight:"bold"}}>Product Income Report </div>
          <div className="row_two_date_base_income">
            <div className="table_wrapper_date_base_income1">
              {isLoading ? (
                <div className="rotating_lines_sale_transaction_page">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                  />
                </div>
              ) : (
                <table
                  style={{ width: "100vw" }}
                  border={3}
                  cellSpacing={2}
                  cellPadding={10}
                >
                  <tr>
                    <th>Invoice</th>
                    <th>Customer Name</th>
                    <th>Product Name</th>
                    <th>Type/No</th>
                    <th>Purchase Price</th>
                    <th>Sell Price</th>
                    <th>Quantity</th>
                    <th>Unit </th>
                    <th>Unit Total Tk</th>
                    <th>Sale Date</th>
                  </tr>
                  <tbody style={{ width: "2vw" }}>
                    {rows.length > 0 && rows.map((item) => (
                      <tr
                        className="row_sale_transaction_page"
                        tabindex="0"
                        // onClick={() => handleClickTable(item)}
                        key={item.id}
                      >
                        <td>{item.challan_no}</td>
                        <td>{item.customer_name}</td>

                        <td>{item.product_name}</td>
                        <td>{item.model}</td>
                        <td>{item.purchase_price}</td>
                        <td>{item.rate}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unit}</td>
                        <td>{item.total}</td>
                        <td>{item.sell_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div style={{fontSize:"1vw", fontWeight:"bold"}}>Expense Report</div>
          <div className="row_three_date_base_income">
            {stockData && stockData.length > 0 ? (
              <div className="table_wrapper_date_base_income2">
                {isLoading ? (
                  <div className="rotating_lines_sale_transaction_page">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="50"
                      visible={true}
                    />
                  </div>
                ) : (
                  <table border={3} cellSpacing={2} cellPadding={10}>
                    <thead>
                      <tr>
                        <th>Serial</th>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Paid</th>
                        <th>Due</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockData.length > 0 && stockData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.type}</td>
                          <td>{item.name}</td>
                          <td>{item.amount}</td>
                          <td>{item.paid}</td>
                          <td>{item.due}</td>
                          <td>{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : (
              <div className="table_wrapper_date_base_income2">
                <table border={3} cellSpacing={2} cellPadding={10}>
                  <tbody>
                    <tr>
                      <th>New Column</th>
                      <th>New Column</th>
                      <th>New Column</th>
                      <th>New Column</th>
                      <th>New Column</th>
                      <th>New Column</th>
                      <th>New Column</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="column_two_date_base_income">
          <div className="section_one_column_two_date_base_income">
            <div style={{ fontSize: "1vw" }}>Product Profit/Loss</div>
            <div className="sub_section_one_column_two_date_base_income">
              <div className="row_gap_date_base_income">
                <label>Total Sales Price</label>
              </div>
              <div className="input_field_date_base_income">
                <input
                  value={totalSalePrice}
                  readOnly
                  style={{ fontSize: "1vw", textAlign: "center" }}
                />
                <span style={{fontSize:"1vw"}}>TK</span>
              </div>
              <div className="row_gap_date_base_income">
                <label>Total Purchase Price(-)</label>
              </div>
              <div className="input_field_date_base_income">
                <input
                  value={totalPurchesePrice}
                  readOnly
                  style={{ fontSize: "1vw", textAlign: "center" }}
                />
                <span style={{fontSize:"1vw"}}>TK</span>
              </div>
              <div className="row_gap_date_base_income">
                <label>Total Profit / Loss:</label>
              </div>
              <div className="input_field_date_base_income">
                <input
                  value={totalProfitAndLoss}
                  readOnly
                  style={{ fontSize: "1vw", textAlign: "center" }}
                />
                <span style={{fontSize:"1vw"}}>TK</span>
              </div>
              <div className="row_gap_date_base_income">
                <label>Total Discount (-)</label>
              </div>
              <div className="input_field_date_base_income">
                <input />
                <span style={{fontSize:"1vw"}}>TK</span>
              </div>
              <div className="row_gap_date_base_income">
                <label>Total Product Income:</label>
              </div>
              <div className="input_field_date_base_income">
                <input />
                <span style={{fontSize:"1vw"}}>TK</span>
              </div>
              {/* <div className="row_gap_date_base_income">
              </div> */}
              <div >
                <PurchaseReportExcelExport
                  excelData={rows}
                  fileName={"Excel Export"}
                />
              </div>
              <div className="row_gap_date_base_income">
                <label>Total Service/Extra Charge</label>
              </div>
              <div className="input_field_date_base_income">
                <input />
                <span style={{fontSize:"1vw"}}>TK</span>
              </div>
            </div>
          </div>
          <div className="section_two_column_two_date_base_income">
            <h5 style={{ fontSize: "1vw" }}>Total Expense</h5>
            <div className="sub_section_two_column_two_date_base_income">
              <div className="row_gap_date_base_income">
                <label>Total Expense</label>
              </div>
              <div className="input_field_date_base_income">
                <input
                  value={totalExpance}
                  readOnly
                  style={{ fontSize: "1vw", textAlign: "center" }}
                />
                <span style={{fontSize:"1vw"}}>TK</span>
              </div>
              
              <div >
                <PurchaseReportExcelExport
                  excelData={stockData}
                  fileName={"Excel Export"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_date_base_income">
        <div style={{fontSize:"1vw", fontWeight:"bold"}}>Total Loss/Profit</div>
        <div className="label_second_row_div_date_base_income">
          <h5 style={{ fontSize: "1vw" }}>Total Product Income</h5>
          <h5 style={{ fontSize: "1vw" }}>+</h5>
          <h5 style={{ fontSize: "1vw" }}>Total Service/Extra Charge</h5>
          <h5 style={{ fontSize: "1vw" }}>-</h5>
          <h5 style={{ fontSize: "1vw" }}>Total Expense</h5>
          <h5 style={{ fontSize: "1vw" }}>=</h5>
          <h5 style={{ fontSize: "1vw" }}>Total Profit / Loss</h5>
        </div>
        <div className="input_section_second_row_div_date_base_income">
          <div className="input_field_date_base_income">
            <input />
            <span>Tk</span>
          </div>
          <div className="input_field_date_base_income">
            <input />
            <span>Tk</span>
          </div>
          <div className="input_field_date_base_income">
            <input></input>
            <span>Tk</span>
          </div>
          <div className="input_field_date_base_income">
            <input />
            <span>Tk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateBaseIncome;
