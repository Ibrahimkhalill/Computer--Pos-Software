import React from "react";
import "./expense-report.css";
import { RotatingLines } from "react-loader-spinner";
import { ReactComponent as UpdateSvg } from "../svg/update.svg";
import { ReactComponent as SaveSvg } from "../svg/save.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InvestorExportExcel from "../../components/ExportExcel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpenseReport = () => {
  const [rows, setRows] = useState([]);
  const [allType, setAllType] = useState([]);
  const [type, setType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fromDate, setFromDate] = useState([]);
  const [toDate, setToDate] = useState([]);
  // Update data state
  const [expanceName, setExpanceName] = useState([]);
  const [totalCost, setTotalCost] = useState([]);
  const [date, setDate] = useState([]);
  const [paid, setPaid] = useState([]);
  const [due, setDue] = useState([]);
  const [id, setID] = useState([]);
  const [purchaseId, setPurchaseId] = useState(0);
  const [challanNo, setChallanNo] = useState(0);
  const [duePaid, setDuePaid] = useState("");
  const [typeExpance, setTypeExpance] = useState("Expance Due Payment");
  const [taka, setTaka] = useState(0);
  // Navbar option
  const [selectedOption, setSelectedOption] = useState("ExpanceReport");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Fatch all data
  const fetchData = async () => {
    try {
      const response_getAllExpanceTable = await fetch(
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

      const datas_getAllExpanceTable = await response_getAllExpanceTable.json();

      setRows(datas_getAllExpanceTable);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    // Call the function
    fetchData();

    handleType();
  }, []);

  // Show All Data
  const handleShowAll = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getShowAll = await fetch(
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

      const datas_getShowAll = await response_getShowAll.json();

      console.log(datas_getShowAll);

      setRows(datas_getShowAll);
      setIsLoading(false);
    };

    fetchData();
  };

  // handle All Type
  const handleType = () => {
    const fetchData = async () => {
      const response_getSelectedType = await fetch(
        "http://194.233.87.22:5001/api/expense_report/getDistinctTypeFromExpenseReport",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedType = await response_getSelectedType.json();

      console.log(datas_getSelectedType);

      setAllType(datas_getSelectedType);
    };

    fetchData();
  };

  const handleTypeSearch = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getExpenseTypeSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/expense_report/getExpenseReportByType?type=" +
          type,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getExpenseTypeSearchTableAllData =
        await response_getExpenseTypeSearchTableAllData.json();
      console.log(datas_getExpenseTypeSearchTableAllData);
      setRows(datas_getExpenseTypeSearchTableAllData);
      console.log(datas_getExpenseTypeSearchTableAllData);
      setIsLoading(false);
    };

    // Call the function
    fetchData();
  };

  // Form & To date search
  const handelClickFetchDateFormAndTo = () => {
    const fetchData = async () => {
      const response_getBankBalanceDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/expense_report/getExpenseReportByDateToDateAndType?fromdate=" +
          fromDate +
          "&todate=" +
          toDate +
          "&type=" +
          type,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getBankBalanceDateSearchTableAllData =
        await response_getBankBalanceDateSearchTableAllData.json();
      console.log(datas_getBankBalanceDateSearchTableAllData);
      setRows(datas_getBankBalanceDateSearchTableAllData);
      console.log(datas_getBankBalanceDateSearchTableAllData);
    };

    // Call the function
    fetchData();
  };

  // http://194.233.87.22:5001/api/expense_report/getExpenseReportByDateToDate?fromdate=2019-04-19&todate=2019-04-22
  const handelClickFetchOnlyDateFormAndTo = () => {
    const fetchData = async () => {
      const response_getBankBalanceDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/expense_report/getExpenseReportByDateToDate?fromdate=" +
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

      const datas_getBankBalanceDateSearchTableAllData =
        await response_getBankBalanceDateSearchTableAllData.json();
      console.log(datas_getBankBalanceDateSearchTableAllData);
      setRows(datas_getBankBalanceDateSearchTableAllData);
      console.log(datas_getBankBalanceDateSearchTableAllData);
    };
    // Call the function
    fetchData();
  };

  const handelClickFetchOnlyDate = () => {
    const fetchData = async () => {
      const response_getBankBalanceDateSearchTableAllData = await fetch(
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

      const datas_getBankBalanceDateSearchTableAllData =
        await response_getBankBalanceDateSearchTableAllData.json();
      console.log(datas_getBankBalanceDateSearchTableAllData);
      setRows(datas_getBankBalanceDateSearchTableAllData);
      console.log(datas_getBankBalanceDateSearchTableAllData);
    };

    // Call the function
    fetchData();
  };

  // calculation
  // const totalPrice = rows.reduce((total, item) => total + item.amount, 0);
  // const totalPaid = rows.reduce((paid, item) => paid + parseInt(item.paid), 0);
  // const totalDue = rows.reduce((due, item) => due + parseInt(item.due), 0);

  const totalPrice =
    rows.length > 0 &&
    rows
      .reduce((productsaletaka, item) => {
        if (
          item.amount !== undefined &&
          item.amount !== null &&
          item.amount !== ""
        ) {
          productsaletaka += Number(item.amount);
        }
        return productsaletaka;
      }, 0)
      .toFixed(2);

  const totalPaid =
    rows.length > 0 &&
    rows
      .reduce((paid, item) => {
        if (item.paid !== undefined && item.paid !== null && item.paid !== "") {
          paid += Number(item.paid);
        }
        return paid;
      }, 0)
      .toFixed(2);

  const totalDue =
    rows.length > 0 &&
    rows
      .reduce((due, item) => {
        if (item.due !== undefined && item.due !== null && item.due !== "") {
          due += Number(item.due);
        }
        return due;
      }, 0)
      .toFixed(2);

  const [selectedID, setSelectedID] = useState(null);
  // Show data in input field
  const handleUpdateDataDown = (item) => {
    setSelectedID(item.id);
    setID(item.id);
    setType(item.type);
    setExpanceName(item.name);
    setTotalCost(item.amount);
    setDate(item.date);
    setPaid(item.paid);
    setDue(item.due);
  };

  // Update Data
  // http://194.233.87.22:5001/api/expense_report/updateExpenseReportById?id=12&type=yy&name=gg&amount=100&paid=765&paid=88&date=2019-04-10
  const handleUpdateData = async () => {
    if (!id) {
      toast.warning("Please select investor row");
      return;
    }
    if (!type) {
      toast.warning("Type value not Found");
      return;
    }
    if (!expanceName) {
      toast.warning("Please FIll the Expance Name");
      return;
    }
    if (!totalCost) {
      toast.warning("Please Fill the Total Cost");
      return;
    }
    if (!paid) {
      toast.warning("Please Fill The Paid Amount");
      return;
    }
    if (!due === 0) {
      toast.warning("Please Fill The Due Amount");
      return;
    }
    if (!date) {
      toast.warning("Please Fill the Date");
      return;
    }
    setIsLoading(true);

    await fetch(
      "http://194.233.87.22:5001/api/expense_report/updateExpenseReportById?id=" +
        id +
        "&type=" +
        type +
        "&name=" +
        expanceName +
        "&amount=" +
        totalCost +
        "&paid=" +
        paid +
        "&due=" +
        due +
        "&date=" +
        date,
      {
        method: "PUT",
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      }
    );
    toast.success("Updated SuccessFully.");
    setIsLoading(false);
  };

  const handleResetInputData = () => {
    setID([]);
    setType([]);
    setExpanceName([]);
    setTotalCost([]);
    setPaid([]);
    setDue([]);
    setDate([]);
  };

  const handleUpdateAllData = async () => {
    await handleUpdateData();
    await fetchData();
    if (!id && !type && !expanceName && !totalCost && !paid && !due && !date) {
      handleResetInputData();
    }
  };

  // Save due payment

  const handleSave = async () => {
    console.log(id, type, expanceName, date, totalCost, paid, due);
    if (!id) {
      toast.warning("Please select investor row");
      return;
    }
    if (!type) {
      toast.warning("Type value not Found");
      return;
    }
    if (!expanceName) {
      toast.warning("Type value not Found");
      return;
    }
    if (!totalCost) {
      toast.warning("Type value not Found");
      return;
    }
    if (!paid) {
      toast.warning("Type value not Found");
      return;
    }
    if (!due) {
      toast.warning("Type value not Found");
      return;
    }
    if (!date) {
      toast.warning("Type value not Found");
      return;
    }

    setIsLoading(true);
    try {
      // const totalDuePaid = parseInt(paid) + parseInt(duePaid);
      // const totalDueAndPaid = parseInt(totalCost - totalDuePaid);

      await fetch(
        "http://194.233.87.22:5001/api/expense_report/updateExpenseReportById?id=" +
          id +
          "&type=" +
          type +
          "&name=" +
          expanceName +
          "&amount=" +
          totalCost +
          "&paid=" +
          paid +
          "&due=" +
          due +
          "&date=" +
          date,
        {
          method: "PUT",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      await fetch(
        "http://194.233.87.22:5001/api/cash_book/postCashBookRowFromSuppplierReportPage?out_taka=" +
          duePaid +
          "&taka=" +
          taka +
          "&type=" +
          typeExpance +
          "&challan_no=" +
          challanNo +
          "&pur_ID=" +
          purchaseId +
          "&comment=" +
          expanceName +
          "&date=" +
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
      console.log("Data saved successfully");
      setIsLoading(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleResetSave = () => {
    setDuePaid("");
  };

  const handleSaveAndUpdate = async () => {
    await handleSave();
    await fetchData();
    handleResetSave();
    toast.success("SuccessFully Paid");
  };

  useEffect(() => {
    setDue(parseFloat(totalCost - paid));
  }, [totalCost, paid]);

  return (
    <div className="full_div_expense_report">
      <div className="radio_buttons_btr">
        <label>
          <Link to="/Expenseinput">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="CashBook"
              checked={selectedOption === "ExpanceInput"}
              onChange={handleRadioChange}
            />
          </Link>
          Expense Input
        </label>
        <label>
          <Link to="/Expensereport">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="Deposit"
              checked={selectedOption === "ExpanceReport"}
              onChange={handleRadioChange}
            />
          </Link>
          Expense Report
        </label>
      </div>
      <div className="first_row_div_expense_report">
        <div className="container_search_column1_expense_report">
          <div className="input-field_expense_report">
            <label className="label_field_expense_report">*Type</label>
            <select
              className="select_field_expense_report"
              // onSelect={handleType}
              onChange={(event) => setType(event.target.value)}
            >
              {allType.length > 0 && allType.map((item) => (
                <option key={item.id}>{item.type}</option>
              ))}
            </select>
            <button
              className="button_field_expense_report"
              type="submit"
              onClick={handleTypeSearch}
            >
              Search
            </button>
          </div>
          <div className="two_way_date_expense_report_search">
            <div className="two_date_search">
              <div className="input-field_expense_report">
                <label className="label_field_expense_report">Date Form</label>
                <input
                  className="input_field_for_expense_report"
                  type="date"
                  onChange={(event) => setFromDate(event.target.value)}
                />
              </div>
              <div className="input-field_expense_report">
                <label className="label_field_expense_report">To</label>
                <input
                  className="input_field_for_expense_report"
                  type="date"
                  onChange={(event) => setToDate(event.target.value)}
                />
              </div>
            </div>
            <button
              className="button_field_expense_report"
              type="submit"
              onClick={handelClickFetchDateFormAndTo}
              style={{ width: "9vw" }}
            >
              Type & Date Search
            </button>
          </div>
        </div>
        <div className="container_search_column2_expense_report">
          <div className="two_date_search">
            <div className="input-field_expense_report">
              <label className="label_field_expense_report">From Date</label>
              <input
                className="input_field_for_expense_report"
                type="date"
                onChange={(event) => setFromDate(event.target.value)}
              />
            </div>
            <div className="input-field_expense_report">
              <label className="label_field_expense_report">Date</label>
              <input
                className="input_field_for_expense_report"
                type="date"
                onChange={(event) => setDate(event.target.value)}
              />
              <button
                className="button_field_expense_report"
                type="submit"
                onClick={handelClickFetchOnlyDate}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="container_search_column3_expense_report">
          <div className="input-field_expense_report">
            <label className="label_field_expense_report">To</label>
            <input
              className="input_field_for_expense_report"
              type="date"
              onChange={(event) => setToDate(event.target.value)}
            />
            <button
              className="button_field_expense_report"
              type="submit"
              onClick={handelClickFetchOnlyDateFormAndTo}
            >
              Search
            </button>
          </div>
          <div className="input-field_expense_report">
            <button
              className="button_field_expense_report"
              type="submit"
              onClick={handleShowAll}
            >
              Show All
            </button>
          </div>
        </div>
        <div className="container_search_column4_expense_report">
          <div className="input-field_expense_report">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "1vw",
                fontWeight: "bold",
              }}
            >
              <InvestorExportExcel excelData={rows} fileName={"Excel Export"} />
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_expense_report loader-container_expense_report">
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        ) : (
          <div className="table_wrapper_expense_report table_div_expense_report">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>Serial</th>
                <th>Type</th>
                <th>Comment</th>
                <th>Cost</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Date</th>
              </tr>
              <tbody>
                {rows.length > 0 && rows.map((item) => (
                  <tr
                    onClick={() => handleUpdateDataDown(item)}
                    // className="row"
                    className={
                      selectedID === item.id ? "rowes selected" : "rowes"
                    }
                    tabindex="0"
                    key={item.id}
                  >
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
          </div>
        )}
      </div>
      <div className="third_row_div_expense_report">
        <div className="container_view_update_expense_report">
          <div className="container_view_expense_report">
            <div className="input-field_expense_report">
              <label className="label_field_expense_report">Total Price</label>
              <input
                className="input_field_for_expense_report"
                value={totalPrice}
                style={{ fontSize: "1vw", textAlign: "center" }}
                readOnly
              />
            </div>
            <div className="input-field_expense_report">
              <label className="label_field_expense_report">Paid</label>
              <input
                className="input_field_for_expense_report"
                value={totalPaid}
                style={{ fontSize: "1vw", textAlign: "center" }}
                readOnly
              />
            </div>
            <div className="input-field_expense_report">
              <label className="label_field_expense_report">Due</label>
              <input
                className="input_field_for_expense_report"
                value={totalDue}
                style={{ fontSize: "1vw", textAlign: "center" }}
                readOnly
              />
            </div>
          </div>
          <h4 style={{ fontSize: "1.2vw" }}>Update Opration</h4>
          <div className="container_update_expense_report">
            <div className="container-update-column1_expense_report">
              <div className="input-field_expense_report">
                <label className="label_field_expense_report">*Type</label>
                <input
                  className="input_field_for_expense_report"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                />
              </div>
              <div className="input-field_expense_report">
                <label className="label_field_expense_report">
                  Expense Name
                </label>
                <input
                  className="input_field_for_expense_report"
                  value={expanceName}
                  onChange={(event) => setExpanceName(event.target.value)}
                />
              </div>
            </div>
            <div className="container-update-column2_expense_report">
              <div className="input-field_expense_report">
                <label className="label_field_expense_report">Total Cost</label>
                <input
                  className="input_field_for_expense_report"
                  value={totalCost}
                  onChange={(event) => setTotalCost(event.target.value)}
                />
              </div>
              <div className="input-field_expense_report">
                <label className="label_field_expense_report">*Date</label>
                <input
                  className="input_field_for_expense_report"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
            </div>
            <div className="container-update-column3_expense_report">
              <div className="input-field_expense_report">
                <label className="label_field_expense_report">Paid</label>
                <input
                  className="input_field_for_expense_report"
                  value={paid}
                  onChange={(event) => setPaid(event.target.value)}
                />
              </div>
              <div className="input-field_expense_report">
                <label className="label_field_expense_report">Due</label>
                <input
                  className="input_field_for_expense_report"
                  value={due}
                  onChange={(event) => setDue(event.target.value)}
                />
              </div>
            </div>
            <div className="container-update-column4_expense_report">
              <div className="input-field_expense_report">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1vw",
                    fontWeight: "bold",
                  }}
                >
                  <button
                    style={{
                      width: "2.8vw",
                      backgroundColor: "#F5F5DC",
                      outline: "none",
                      border: "none",
                      borderRadius: ".2vw",
                      boxShadow: "0 5px #999",
                    }}
                    type="submit"
                    onClick={handleUpdateAllData}
                  >
                    <UpdateSvg />
                  </button>
                  <div style={{ paddingTop: "0.4vw" }}>Update</div>
                </div>
              </div>
            </div>
            <div className="container-update-column5_expense_report">
              <h4 style={{ fontSize: "1.2vw" }}>Due Paid</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1vw",
                  fontWeight: "bold",
                }}
              >
                <div className="input-field_expense_report">
                  <label>TK</label>
                  <input
                    className="input_field_for_expense_report"
                    value={duePaid}
                    onChange={(event) => setDuePaid(event.target.value)}
                  />
                </div>
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
                    onClick={handleSaveAndUpdate}
                    style={{
                      width: "2.8vw",
                      backgroundColor: "#F5F5DC",
                      boxShadow: "0 5px #999",
                      outline: "none",
                      border: "none",
                      borderRadius: ".2vw",
                    }}
                    type="submit"
                  >
                    <SaveSvg />
                  </button>
                  <div style={{ paddingTop: "0.4vw" }}>Save</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ExpenseReport;
