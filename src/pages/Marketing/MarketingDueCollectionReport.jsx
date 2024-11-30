import React from "react";
import "./markting-due-collection-report.css";
import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useLocation, Link } from "react-router-dom";
import PurchaseReportExcelExport from "../../components/ExportExcel";

const MarketingDueCollectionReport = () => {
  const [rows, setRows] = useState([]);
  const [customerName, setCustomerName] = useState([]);
  const [customerId, setCustomerId] = useState([]);
  const [customerAll, setCustomerAll] = useState([]);
  const [employeeAll, setEmployeeAll] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);
  const [employeeId, setEmployeeId] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const [selectedOption, setSelectedOption] = useState("MarketingDueReport");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response_getAllMarketingDueTable = await fetch(
          "http://194.233.87.22:5001/api/money_collection/getAllFromMoneyCollectionByType",
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        const datas_getAllMarketingDueTable =
          await response_getAllMarketingDueTable.json();
        setRows(datas_getAllMarketingDueTable);
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
      const response_getMarketingDueReportTableAllData = await fetch(
        "http://194.233.87.22:5001/api/money_collection/getAllFromMoneyCollectionByType",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getMarketingDueReportTableAllData =
        await response_getMarketingDueReportTableAllData.json();
      console.log(datas_getMarketingDueReportTableAllData);
      setRows(datas_getMarketingDueReportTableAllData);
      console.log(datas_getMarketingDueReportTableAllData);
      setIsLoading(false);
    };

    fetchData();
  };

  // Customer Name
  const handleSearchCustomerName = () => {
    const fetchData = async () => {
      const response_getSelectedCustomerName = await fetch(
        "http://194.233.87.22:5001/api/transaction_report/getAllCustomerFromTransaction",
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
        ({ customer_name: actualValue }) => actualValue
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

  // const dueCollection = rows.reduce(
  //   (duecollection, item) => duecollection + Math.round(item.due_collection),
  //   0
  // );

  const dueCollection = (rows.length > 0 && rows
    .reduce((duecollection, item) => {
      if (
        item.due_collection !== undefined &&
        item.due_collection !== null &&
        item.due_collection !== ""
      ) {
        duecollection += Number(item.due_collection);
      }
      return duecollection;
    }, 0)
    .toFixed(2));

  useEffect(() => {
    handleSearchCustomerName();
    handleSearchEmployeeName();
  }, []);

  return (
    <div className="full_div_marketing_due_collection_report">
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
      <div className="first_row_marketing_due_collection_report">
        <div className="container_search_marketing_due_collection_report">
          <div className="search_field_marketing_due_collection_report1">
            <div className="search_field_marketing_due_collection1">
              <div className="input_field_marketing_due_collection_report">
                <label>Customer Name</label>
                <input
                  onSelect={handleKeyDownCustomer}
                  onChange={(event) => {
                    setCustomerName(event.target.value);
                  }}
                  list="customername"
                />
                <datalist id="customername">
                  {customerAll.length > 0 && customerAll.map((customername, index) => {
                    return <option key={index}>{customername}</option>;
                  })}
                </datalist>
              </div>
              <div className="input_field_marketing_due_collection_report">
                <label>Employee Name</label>
                <input
                  onSelect={handleKeyDownEmployee}
                  onChange={(event) => {
                    setEmployeeName(event.target.value);
                  }}
                  list="employeename"
                />
                <datalist id="employeename">
                  {employeeAll.length > 0 && employeeAll.map((employeename, index) => {
                    return <option key={index}>{employeename}</option>;
                  })}
                </datalist>
              </div>
            </div>
            <div className="search_field_marketing_due_collection2">
              <div className="input_field_marketing_due_collection_report">
                <label>ID</label>
                <select
                  onSelect={(event) => {
                    setCustomerId(event.target.value);
                  }}
                >
                  {customerId.length > 0 && customerId.map((customerid, index) => {
                    return <option key={index}>{customerid}</option>;
                  })}
                </select>
                <button onClick={handleClickSearchbyCustomerNameId}>
                  Search
                </button>
              </div>
              <div className="input_field_marketing_due_collection_report">
                <label>ID</label>
                <select
                  onSelect={(event) => {
                    setEmployeeId(event.target.value);
                  }}
                >
                  {employeeId > 0 && employeeId.map((employeeid, index) => {
                    return <option key={index}>{employeeid}</option>;
                  })}
                </select>
                <button onClick={handleClickSearchbyEmployeeNameID}>
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="search_field_marketing_due_collection_report2">
            <div className="input_field_marketing_due_collection_report">
              <button onClick={handleClickSearchShowAll}>Show All</button>
            </div>
            <div >
              <PurchaseReportExcelExport
                excelData={rows}
                fileName={"Excel Export"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_marketing_due_collection_report marketing_loder">
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        ) : (
          <div className="table_wrapper_marketing_due_collection_report">
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
                <th>Due Collection</th>
                <th>Cash Type</th>
                <th>Cheque Number</th>
                <th>Bank Name</th>
                <th>Area</th>
                <th>Date</th>
              </tr>
              <tbody>
                {rows.length > 0 && rows.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.employee_name}</td>
                    <td>{item.employee_ID}</td>
                    <td>{item.challan_no}</td>
                    <td>{item.customer_name}</td>
                    <td>{item.cid}</td>
                    <td>{item.mobile_no}</td>
                    <td>{item.address}</td>
                    <td>{item.due_collection}</td>
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
      <div className="third_row_marketing_due_collection_report">
        <div className="container_view_marketing_due_collection_report">
          <div className="input_field_marketing_due_collection_report">
            <label>Total Due Collection (TK.)</label>
            <input
              value={dueCollection}
              readOnly
              style={{ fontSize: "1vw", width: "12vw", textAlign: "center" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingDueCollectionReport;
