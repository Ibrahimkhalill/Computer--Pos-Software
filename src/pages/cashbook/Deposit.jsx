import React from "react";
import "./deposit.css";
import { useState, useEffect } from "react";
import ExportExcel from "../../../src/components/ExportExcel";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Deposit = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [fromDate, setFromDate] = useState([]);
  const [toDate, setToDate] = useState([]);
  const [id, setId] = useState([]);
  const [account, setAccNumber] = useState([]);
  const [bank, setBank] = useState([]);
  const [branch, setBranch] = useState([]);
  const [holder, setAccountHolder] = useState([]);
  const [type, setType] = useState([]);
  const [taka, setTaka] = useState([]);
  const [comment, setComment] = useState([]);
  const [date, setDate] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Deposit");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleClickTable = (item) => {
    setId(item.id);
    setAccNumber(item.account);
    setBank(item.bank);
    setBranch(item.branch);
    setAccountHolder(item.holder);
    setType(item.type);
    setTaka(item.taka);
    setComment(item.comment);
    setDate(item.date);
    setSelectedRow(item);
  };

  useEffect(() => {
    setIsLoaded(true);
    const fetchData = async () => {
      try {
        const response_getAllStockTable = await fetch(
          "http://194.233.87.22:5001/api/bank_deposit_withdraw/getBankDepositWithdraw?style=Deposit",
          {
            method: "POST",

            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        const datas_getAllStockTable = await response_getAllStockTable.json();
        setRows(datas_getAllStockTable);

        setIsLoaded(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleClickSearchShowAll = () => {
    setIsLoaded(true);
    const fetchData = async () => {
      const response_getProductTableAllData = await fetch(
        "http://194.233.87.22:5001/api/bank_deposit_withdraw/getBankDepositWithdraw?style=Deposit",
        {
          method: "POST",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getProductTableAllData =
        await response_getProductTableAllData.json();
      setRows(datas_getProductTableAllData);
      setIsLoaded(false);
    };

    // Call the function
    fetchData();
  };

  // const totalInAmount = rows.reduce(
  //   (inAmount, item) => inAmount + Math.round(item.taka),
  //   0
  // );

  const totalInAmount =
    (rows.length > 0 &&
    rows
      .reduce((productsaletaka, item) => {
        if (item.taka !== undefined && item.taka !== null && item.taka !== "") {
          productsaletaka += Number(item.taka);
        }
        return productsaletaka;
      }, 0)
      .toFixed(2));

  const handleDelete = () => {
    if (!selectedRow) {
      alert("Please select a row first!");
      return;
    }

    const deleteData = async () => {
      setIsLoaded(true);
      await fetch(
        "http://194.233.87.22:5001/api/bank_deposit_withdraw/deleteBankDepositWithdrawById?id=" +
          selectedRow.id,
        {
          method: "DELETE",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      console.log("Delete SuccessFull");

      sleep(2000).then(() => {
        setIsLoaded(false);
      });

      setIsLoaded(true);
      const response_getTransactionTableAllDataAfterDelete = await fetch(
        "http://194.233.87.22:5001/api/bank_deposit_withdraw/getBankDepositWithdraw?style=Deposit",
        {
          method: "POST",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getTransactionTableAllDataAfterDelete =
        await response_getTransactionTableAllDataAfterDelete.json();
      setIsLoaded(false);
      sleep(2000).then(() => {
        setRows(datas_getTransactionTableAllDataAfterDelete);
        toast.success("Successfully Deleted");
      });

      setIsLoaded(false);
    };

    // Call the function
    deleteData();
  };

  const handleClickSearchFromDateAndToDate = (event) => {
    setIsLoaded(true);
    const fetchData = async () => {
      const response_getSaleTableFromDateAndToDate = await fetch(
        "http://194.233.87.22:5001/api/bank_deposit_withdraw/getAllBankDepositWithdrawFromDateToDate?fromdate=" +
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

      const datas_getSaleTableFromDateAndToDate =
        await response_getSaleTableFromDateAndToDate.json();
      sleep(2000).then(() => {
        setIsLoaded(false);
      });
      setRows(datas_getSaleTableFromDateAndToDate);
    };
    fetchData();
  };

  return (
    <div className="full_div_deposit">
      <div className="radio_buttons_btr">
        <label>
          <Link to="/cashbook/banktransactionreport">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="CashBook"
              checked={selectedOption === "BankOpration"}
              onChange={handleRadioChange}
            />
          </Link>
          Bank Operation
        </label>
        <label>
          <Link to="/cashbook/banktransactionreport/deposit">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="Deposit"
              checked={selectedOption === "Deposit"}
              onChange={handleRadioChange}
            />
          </Link>
          Deposit
        </label>
        <label>
          <Link to="/cashbook/banktransactionreport/withdraw">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="Withdraw"
              checked={selectedOption === "Withdraw"}
              onChange={handleRadioChange}
            />
          </Link>
          Withdraw
        </label>
        <label>
          <Link to="/cashbook/banktransactionreport/bankbalance">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="BankBalance"
              checked={selectedOption === "Balance"}
              onChange={handleRadioChange}
            />
          </Link>
          Balance
        </label>
      </div>
      <div className="first_row_div_deposit">
        <div className="container_search_deposite">
          <div className="input_filed_deposit">
            <label> Date From </label>
            <input
              type="date"
              onChange={(event) => setFromDate(event.target.value)}
            />
          </div>
          <div className="input_filed_deposit">
            <label> to </label>
            <input
              type="date"
              onChange={(event) => setToDate(event.target.value)}
            />
          </div>
          <div className="input_filed_deposit">
            <button onClick={handleClickSearchFromDateAndToDate}>Search</button>
          </div>
        </div>
        <div className="input_filed_deposit">
          <button onClick={handleClickSearchShowAll}>Show All</button>
        </div>
      </div>
      <div className="second_row_div_deposit rotating_lines_deposit">
        {isLoaded ? (
          <div>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          </div>
        ) : (
          <div className="table_wrapper_deposit">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>ID</th>
                <th>Account Number</th>
                <th>Bank</th>
                <th>Branch</th>
                <th>Account Holder</th>
                <th>Type</th>
                <th>Taka</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
              <tbody>
                {rows.length > 0 &&
                  rows.map((item) => (
                    <tr
                      className="row"
                      tabindex="0"
                      onClick={() => handleClickTable(item)}
                      key={item.id}
                    >
                      <td>{item.id}</td>
                      <td>{item.account}</td>
                      <td>{item.bank}</td>
                      <td>{item.branch}</td>
                      <td>{item.holder}</td>
                      <td>{item.type}</td>
                      <td>{item.taka}</td>
                      <td>{item.comment}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="third_row_div_deposit">
        <div className="input_filed_deposit">
          <label> Total Taka</label>
          <input
            value={totalInAmount}
            style={{ fontSize: "1vw", textAlign: "center" }}
          />
        </div>
        <div className="container_button_deposite">
          <div>
            <ExportExcel excelData={rows} fileName={"Excel Export"} />
          </div>
          <div>
            {/* <button className="depsit-delete" onClick={handleDelete}>
              Delete
            </button> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1vw",
                fontWeight: "bold",
                marginLeft: "1vw",
              }}
            >
              <button
                style={{
                  width: "3vw",
                  backgroundColor: "#F5F5DC",
                  outline: "none",
                  border: "none",
                  borderRadius: ".2vw",
                  boxShadow: "0 5px #999",
                  cursor: "pointer",
                }}
                type="submit"
                onClick={handleDelete}
              >
                <MdDelete className="delete_colorsale" />
              </button>
              <div style={{ paddingTop: "0.5vw" }}>Delete</div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Deposit;
