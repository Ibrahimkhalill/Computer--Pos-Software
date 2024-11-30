import React from "react";
import "./marketing-sale-report.css";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import PurchaseReportExcelExport from "../../components/ExportExcel";

const MarketingSaleReport = () => {
  const [rows, setRows] = useState([]);
  const [customerName, setCustomerName] = useState([]);
  const [customerId, setCustomerId] = useState([]);
  const [customerAll, setCustomerAll] = useState([]);
  const [employeeAll, setEmployeeAll] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [allInvoice, setAllInvoice] = useState([]);
  const [invoiceSearch, setInvoiceSearch] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [selectedOption, setSelectedOption] = useState("MarketingSaleReport");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response_getAllMarketingSaleTable = await fetch(
          "http://194.233.87.22:5001/api/money_collection/getAllFromMoneyCollectionByTypeSale",
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        const datas_getAllMarketingSaleTable =
          await response_getAllMarketingSaleTable.json();
        setRows(datas_getAllMarketingSaleTable);
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
      const response_getMarketingSaleReportTableAllData = await fetch(
        "http://194.233.87.22:5001/api/money_collection/getAllFromMoneyCollectionByTypeSale",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getMarketingSaleReportTableAllData =
        await response_getMarketingSaleReportTableAllData.json();
      console.log(datas_getMarketingSaleReportTableAllData);
      setRows(datas_getMarketingSaleReportTableAllData);
      console.log(datas_getMarketingSaleReportTableAllData);
      setIsLoading(false);
    };

    fetchData();
  };

  // Customer Name
  const handleSearchCustomerName = () => {
    const fetchData = async () => {
      const response_getSelectedCustomerName = await fetch(
        "http://194.233.87.22:5001/api/customer/getDistinctCustomerName",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedCustomerName =
        await response_getSelectedCustomerName.json();
      console.log(datas_getSelectedCustomerName);
      const product_getSelectedCustomerName = datas_getSelectedCustomerName.map(
        ({ name: actualValue }) => actualValue
      );

      setCustomerAll([...new Set(product_getSelectedCustomerName)]);
      console.log(product_getSelectedCustomerName);
    };

    fetchData();
  };

  const handleKeyDownCustomer = (event) => {
    setCustomerName(event.target.value);

    const fetchData = async () => {
      const response_getSelectedCustomer = await fetch(
        "http://194.233.87.22:5001/api/transaction_report/getCustomerCIDFromTransaction?name=" +
          customerName,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedCustomer =
        await response_getSelectedCustomer.json();
      console.log(datas_getSelectedCustomer);
      const product_getSelectedCustomerID = datas_getSelectedCustomer.map(
        ({ cid: actualValue }) => actualValue
      );

      setCustomerId([...new Set(product_getSelectedCustomerID)]);
      console.log(product_getSelectedCustomerID);
    };

    fetchData();
  };

  const handleClickSearchbyCustomerNameId = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getSelectedProductNameID = await fetch(
        "http://194.233.87.22:5001/api/money_collection/getAllFromTransactionByCustomerNameAndCIDAndSaleType?cid=" +
          customerId[0] +
          "&customer_name=" +
          customerName,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      console.log(response_getSelectedProductNameID);
      const datas_getSelectedProductbyNameID =
        await response_getSelectedProductNameID.json();

      console.log(datas_getSelectedProductbyNameID);

      setRows(datas_getSelectedProductbyNameID);
      setIsLoading(false);
    };

    // Call the function
    fetchData();
  };

  // Employee Name
  const handleSearchEmployeeName = () => {
    const fetchData = async () => {
      const response_getSelectedEmployeeName = await fetch(
        "http://194.233.87.22:5001/api/employee/getAllEmployeeName",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedEmployeeName =
        await response_getSelectedEmployeeName.json();
      console.log(datas_getSelectedEmployeeName);
      const product_getSelectedEmployeeName = datas_getSelectedEmployeeName.map(
        ({ name: actualValue }) => actualValue
      );

      setEmployeeAll([...new Set(product_getSelectedEmployeeName)]);
      console.log(product_getSelectedEmployeeName);
    };

    fetchData();
  };

  const handleKeyDownEmployee = (event) => {
    setEmployeeName(event.target.value);

    const fetchData = async () => {
      const response_getSelectedEmployee = await fetch(
        "http://194.233.87.22:5001/api/employee/getEmployeeIDByName?name=" +
          employeeName,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedEmployee =
        await response_getSelectedEmployee.json();
      console.log(datas_getSelectedEmployee);
      const product_getSelectedEmployeeID = datas_getSelectedEmployee.map(
        ({ id: actualValue }) => actualValue
      );

      setEmployeeId([...new Set(product_getSelectedEmployeeID)]);
      console.log(product_getSelectedEmployeeID);
    };

    fetchData();
  };

  const handleClickSearchbyEmployeeNameID = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getSelectedEmployeeNameID = await fetch(
        "http://194.233.87.22:5001/api/money_collection/getAllByNameAndEmployeeIDAndtype?employee_name=" +
          employeeName +
          "&employee_ID=" +
          employeeId,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedEmployeeNameID =
        await response_getSelectedEmployeeNameID.json();

      console.log(datas_getSelectedEmployeeNameID);

      setRows(datas_getSelectedEmployeeNameID);
      setIsLoading(false);
    };

    // Call the function
    fetchData();
  };

  // Date Form & To search
  const handelClickFetchDateFormAndToSearch = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getMarketingSalesDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/money_collection/getMoneyCollectionFromDateToDate?fromdate=" +
          fromDate +
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
      const datas_getMarketingSalesDateSearchTableAllData =
        await response_getMarketingSalesDateSearchTableAllData.json();
      setRows(datas_getMarketingSalesDateSearchTableAllData);
    };

    setIsLoading(false);
    fetchData();
  };

  // Invoice
  // http://194.233.87.22:5001/api/transaction_report/getAllChallansFromTransaction
  const handleAllInvoiceData = () => {
    const fetchData = async () => {
      const response_getSelectedInvoice = await fetch(
        "http://194.233.87.22:5001/api/transaction_report/getAllChallansFromTransaction",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedInvoice = await response_getSelectedInvoice.json();
      console.log(datas_getSelectedInvoice);
      const product_getSelectedInvoice = datas_getSelectedInvoice.map(
        ({ challan: actualValue }) => actualValue
      );

      setAllInvoice([...new Set(product_getSelectedInvoice)]);
      console.log(product_getSelectedInvoice);
    };

    fetchData();
  };
  // Invoice Search
  // http://194.233.87.22:5001/api/money_collection/getAllFromTransactionByChallanAndSaleType?challan_no=
  const handelClickFetchInvoiceSearch = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getProductSaleInvoiceSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/money_collection/getAllFromTransactionByChallanAndSaleType?challan_no=" +
          invoiceSearch,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getProductSaleInvoiceSearchTableAllData =
        await response_getProductSaleInvoiceSearchTableAllData.json();
      setRows(datas_getProductSaleInvoiceSearchTableAllData);
      setIsLoading(false);
      console.log(datas_getProductSaleInvoiceSearchTableAllData);
      // show all
    };

    // Call the function
    fetchData();
  };

  // calculation

  const totalPrice =
    rows.length > 0 &&
    rows
      .reduce((totaltaka, item) => {
        if (
          item.total !== undefined &&
          item.total !== null &&
          item.total !== ""
        ) {
          totaltaka += Number(item.total);
        }
        return totaltaka;
      }, 0)
      .toFixed(2);

  const totalPaid =
    rows.length > 0 &&
    rows
      .reduce((paidtaka, item) => {
        if (item.paid !== undefined && item.paid !== null && item.paid !== "") {
          paidtaka += Number(item.paid);
        }
        return paidtaka;
      }, 0)
      .toFixed(2);

  const totalDue =
    rows.length > 0 &&
    rows
      .reduce((duetaka, item) => {
        if (item.due !== undefined && item.due !== null && item.due !== "") {
          duetaka += Number(item.due);
        }
        return duetaka;
      }, 0)
      .toFixed(2);

  useEffect(() => {
    handleSearchCustomerName();
    handleSearchEmployeeName();
    handleAllInvoiceData();
  }, []);

  return (
    <div className="full_div_markting_sale_report">
      <div className="radio_buttons_btr">
        <label>
          <Link to="/marketingsalesreport">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="CashBook"
              checked={selectedOption === "MarketingSaleReport"}
              onChange={handleRadioChange}
            />
          </Link>
          Marketing Sales Report
        </label>
        <label>
          <Link to="/marktingduereport">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="Deposit"
              checked={selectedOption === "MarketingDueReport"}
              onChange={handleRadioChange}
            />
          </Link>
          Due Collection Report
        </label>
      </div>
      <div className="first_row_div_markting_sale_report">
        <div className="contaniner_search_markting_sale_report">
          <div className="container_search_field_markting_sale_report1">
            <div className="search_markting_sale_report_column1">
              <div className="input_field_markting_sale_report">
                <label>Customer Name</label>
                <input
                  onSelect={handleKeyDownCustomer}
                  onChange={(event) => {
                    setCustomerName(event.target.value);
                  }}
                  list="customernamesale"
                />
                <datalist id="customernamesale">
                  {customerAll.length > 0 &&
                    customerAll.map((customername, index) => {
                      return <option key={index}>{customername}</option>;
                    })}
                </datalist>
              </div>
              <div className="input_field_markting_sale_report">
                <label>Employee Name</label>
                <input
                  onSelect={handleKeyDownEmployee}
                  onChange={(event) => {
                    setEmployeeName(event.target.value);
                  }}
                  list="employeenamesale"
                />
                <datalist id="employeenamesale">
                  {employeeAll.length > 0 &&
                    employeeAll.map((employeename, index) => {
                      return <option key={index}>{employeename}</option>;
                    })}
                </datalist>
              </div>
              <div className="input_field_markting_sale_report">
                <label>Form Date</label>
                <input
                  type="date"
                  onChange={(event) => {
                    setFromDate(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="search_markting_sale_report_column2">
              <div className="input_field_markting_sale_report">
                <label>ID</label>
                <select
                  onSelect={(event) => {
                    setCustomerId(event.target.value);
                  }}
                >
                  {customerId.length > 0 &&
                    customerId.map((customerid, index) => {
                      return <option key={index}>{customerid}</option>;
                    })}
                </select>
                <button onClick={handleClickSearchbyCustomerNameId}>
                  Search
                </button>
              </div>
              <div className="input_field_markting_sale_report">
                <label>ID</label>
                <select
                  onSelect={(event) => {
                    setEmployeeId(event.target.value);
                  }}
                >
                  {employeeId.length > 0 &&
                    employeeId.map((employeeid, index) => {
                      return <option key={index}>{employeeid}</option>;
                    })}
                </select>
                <button onClick={handleClickSearchbyEmployeeNameID}>
                  Search
                </button>
              </div>
              <div className="input_field_markting_sale_report">
                <label>To</label>
                <input
                  type="date"
                  onChange={(event) => {
                    setToDate(event.target.value);
                  }}
                />
                <button onClick={handelClickFetchDateFormAndToSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="container_search_field_markting_sale_report2">
            <div className="search_markting_sale_report_column3">
              <div className="input_field_markting_sale_report">
                <label>Invoice No.</label>
                <input
                  value={invoiceSearch}
                  onChange={(event) => {
                    setInvoiceSearch(event.target.value);
                  }}
                  list="invoicedata"
                />
                <datalist id="invoicedata">
                  {allInvoice.length > 0 &&
                    allInvoice.map((invoicedata, index) => {
                      return <option key={index}>{invoicedata}</option>;
                    })}
                </datalist>
                <button onClick={handelClickFetchInvoiceSearch}>Search</button>
              </div>
            </div>
            <div className="search_markting_sale_report_column4">
              <div className="input_field_markting_sale_report">
                <button onClick={handleClickSearchShowAll}>Show All</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_markting_sale_report">
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        ) : (
          <div className="table_wrapper_markting_sale_report">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>Serial</th>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Invoice</th>
                <th>Customer Name</th>
                <th>Customer ID</th>
                <th>Mobile No</th>
                <th>Address</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Cash Type</th>
                <th>Cheque Number</th>
                <th>Bank Name</th>
                <th>Area</th>
                <th>Date</th>
              </tr>
              <tbody>
                {rows.length > 0 &&
                  rows.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.employee_name}</td>
                      <td>{item.employee_ID}</td>
                      <td>{item.challan_no}</td>
                      <td>{item.customer_name}</td>
                      <td>{item.cid}</td>
                      <td>{item.mobile_no}</td>
                      <td>{item.address}</td>
                      <td>{item.total}</td>
                      <td>{item.paid}</td>
                      <td>{item.due}</td>
                      <td>{item.cash_type}</td>
                      <td>{item.cheque_card_no}</td>
                      <td>{item.bank_name}</td>
                      <td>{item.area}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="third_row_div_markting_sale_report">
        <div className="container_views_markting_sale_report">
          <div className="input_field_markting_sale_report">
            <label>Total (Tk.)</label>
            <input
              value={totalPrice}
              readOnly
              style={{ width: "9vw", fontSize: "1vw", textAlign: "center" }}
            />
          </div>
          <div className="input_field_markting_sale_report">
            <label>Paid (Tk.)</label>
            <input
              value={totalPaid}
              readOnly
              style={{ width: "9vw", fontSize: "1vw", textAlign: "center" }}
            />
          </div>
          <div className="input_field_markting_sale_report">
            <label>Due (Tk.)</label>
            <input
              value={totalDue}
              readOnly
              style={{ width: "9vw", fontSize: "1vw", textAlign: "center" }}
            />
          </div>
        </div>
        <div>
          <PurchaseReportExcelExport
            excelData={rows}
            fileName={"Excel Export"}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketingSaleReport;
