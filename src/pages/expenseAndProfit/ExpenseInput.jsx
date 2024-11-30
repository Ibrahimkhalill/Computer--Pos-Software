import React from "react";
import "./expense-input.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as SaveSvg } from "../svg/save.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpenseInput = () => {
  const [selectedType, setSelectedType] = useState([]);
  const [type, setType] = useState([]);
  const [expenseName, setExpenseName] = useState([]);
  const [date, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [paid, setPaid] = useState([]);
  const [due, setDue] = useState([]);
  const [typeExpance, setTypeExpance] = useState("Expance")

  const [purchaseId, setPurchaseId] = useState([]);
  const [selectedOption, setSelectedOption] = useState("ExpanceInput");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTypeFrom = () => {
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

      setSelectedType(datas_getSelectedType);
    };

    fetchData();
  };

  // http://194.233.87.22:5001/api/expense_report/postExpenseReportRowFromExpenseInput?type=&name=&amount=&paid=&due=&date=
  const handleSave = async () => {
    console.log(type, expenseName, date, total, paid, due);

    if (!type) {
      toast.warning("Type value not Found");
      return;
    }
    if (!expenseName) {
      toast.warning("Please FIll the Expance Name");
      return;
    }
    if (!total) {
      toast.warning("Please Fill the Total Cost");
      return;
    }
    if (!paid) {
      toast.warning("Please Fill The Paid Amount");
      return;
    }
    if (!due) {
      toast.warning("Please Fill The Due Amount");
      return;
    }
    if (!date) {
      toast.warning("Please Fill the Date");
      return;
    }

    try {
      await fetch(
        "http://194.233.87.22:5001/api/expense_report/postExpenseReportRowFromExpenseInput?type=" +
          type +
          "&name=" +
          expenseName +
          "&amount=" +
          total +
          "&paid=" +
          paid +
          "&due=" +
          due +
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

      const purchaseIdResponse = await fetch(
        "http://194.233.87.22:5001/api/expense_report/getMaxID",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      if (!purchaseIdResponse.ok) {
        throw new Error("Failed to fetch purchase ID");
      }
      const datas_getpurchaseId = await purchaseIdResponse.json();
      console.log(datas_getpurchaseId);
      const datas_purchaseId = datas_getpurchaseId.map(
        ({ id: actualValue }) => actualValue
      );

      setPurchaseId([...new Set(datas_purchaseId)]);

      // http://194.233.87.22:5001/api/cash_book/postCashBookRowFromSuppplierReportPage?out_taka=&taka=&type=&challan_no=&pur_ID=&comment=&date=
      await fetch(
        "http://194.233.87.22:5001/api/cash_book/postCashBookRowFromSuppplierReportPage?out_taka=" +
          total +
          "&taka=" +
          "0" +
          "&type=" +
          typeExpance +
          "&challan_no=" +
          "None" +
          "&pur_ID=" +
          datas_purchaseId +
          "&comment=" +
          expenseName +
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
      toast.success("Data saved successfully");
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleReset = () => {
    setData("");
    setDue("");
    setExpenseName("");
    setPaid("");
    setTotal("");
    setType("");
  };

  const handleSaveAndReset = () => {
    handleSave();
    handleReset();
  };

  useEffect(() => {
    setDue(total - paid);
  }, [total - paid]);

  return (
    <div className="full_div_expense_input">
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
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2vw",
          marginTop: "5vw",
        }}
      >
        Expense Opration
      </div>
      <div className="first_row_div_expense_input">
        <div className="container_search_column1_expense_input">
          <div className="input_field_expense_input">
            <label className="label_field_expense_input">*Type</label>
            <select
              className="select_field_expense_input"
              onClick={handleTypeFrom}
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              {selectedType.length > 0 && selectedType.map((item) => (
                <option key={item.id}>{item.type}</option>
              ))}
            </select>
          </div>

          <div className="input_field_expense_input">
            <label className="label_field_expense_input">Expense Name</label>
            <input
              className="input_field_for_expance_input"
              value={expenseName}
              onChange={(event) => setExpenseName(event.target.value)}
            />
          </div>
          <div className="input_field_expense_input">
            <label className="label_field_expense_input">Date</label>
            <input
              type="date"
              className="input_field_for_expance_input"
              value={date}
              onChange={(event) => setData(event.target.value)}
            />
          </div>
        </div>
        <div className="container_search_column2_expense_input">
          <div className="custom_search_column2_expense_input">
            <div className="input_field_expense_input">
              <label className="label_field_expense_input">Total Cost</label>
              <input
                className="input_field_for_expance_input"
                value={total}
                onChange={(event) => setTotal(event.target.value)}
              />
            </div>
            <div className="input_field_expense_input">
              <label className="label_field_expense_input">Paid</label>
              <input
                className="input_field_for_expance_input"
                value={paid}
                onChange={(event) => setPaid(event.target.value)}
              />
            </div>
            <div className="input_field_expense_input">
              <label className="label_field_expense_input">Due</label>
              <input
                className="input_field_for_expance_input"
                value={due}
                onChange={(event) => setDue(event.target.value)}
              />
            </div>
          </div>
          <div className="button-field">
            <div className="input_field_expense_input">
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
                  onClick={handleSaveAndReset}
                >
                  <SaveSvg />
                </button>
                <div style={{ marginTop: "0.4vw" }}>Save</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ExpenseInput;
