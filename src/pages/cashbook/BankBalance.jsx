import React from "react";
import "./bank-balance.css";
import BankBalanceExcelExport from "../../components/ExportExcel";
import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BankBalance = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fromDate, setFromDate] = useState([]);
  const [toDate, setToDate] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);
  // const [id, setId] = useState([]);
  const [accountNumber, setAccountNumber] = useState([]);
  const [bank, setBank] = useState([]);
  const [branch, setBranch] = useState([]);
  const [holder, setHolder] = useState([]);
  const [type, setType] = useState([]);
  const [taka, setTaka] = useState([]);
  const [comment, setComment] = useState([]);
  const [Date, setDate] = useState([]);
  const [selectedOption, setSelectedOption] = useState("BankBalance");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response_getAllBankBalanceTable = await fetch(
          "http://194.233.87.22:5001/api/bank_deposit_withdraw/getAllBankTransaction",
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );
        const datas_getAllBankBalanceTable =
          await response_getAllBankBalanceTable.json();

        setRows(datas_getAllBankBalanceTable);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    // Call the function
    fetchData();
  }, []);

  // Select Item
  const handleClickTable = (item) => {
    // setId(item.id);
    setAccountNumber(item.account);
    setBank(item.bank);
    setBranch(item.branch);
    setHolder(item.holder);
    setType(item.type);
    setSelectedRow(item.dw);
    setTaka(item.taka);
    setComment(item.comment);
    setDate(item.date);
    setSelectedRow(item);
  };

  //  Show all data
  const handleClickSearchShowAll = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getBankBalanceTableAllData = await fetch(
        "http://194.233.87.22:5001/api/bank_deposit_withdraw/getAllBankTransaction",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getBankBalanceTableAllData =
        await response_getBankBalanceTableAllData.json();
      console.log(datas_getBankBalanceTableAllData);
      setRows(datas_getBankBalanceTableAllData);
      console.log(datas_getBankBalanceTableAllData);
      setIsLoading(false);
    };

    // Call the function
    fetchData();
  };

  // Form date search
  const handelClickFetchDateFormAndTo = () => {
    const fetchData = async () => {
      const response_getBankBalanceDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/bank_deposit_withdraw/getAllBankDepositWithdrawWithoutStyleFromDateToDate?fromdate=" +
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
      sleep(2000).then(() => {
        setIsLoading(false);
      });
      setRows(datas_getBankBalanceDateSearchTableAllData);
      console.log(datas_getBankBalanceDateSearchTableAllData);
    };

    // Call the function
    fetchData();
  };

  // Handeling date
  const handleFormDateChange = (event) => {
    setFromDate(event.target.value);
    console.log(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
    console.log(event.target.value);
  };

  // Delete Data form table
  const handleDelete = async () => {
    if (!selectedRow) {
      alert("Please select a row first!");
      return;
    }

    const deleteData = async () => {
      setIsLoading(true);
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

      console.log("Deleted SuccessFully");

      sleep(2000).then(() => {
        setIsLoading(false);
      });

      setIsLoading(true);
      const response_getTransactionTableAllDataAfterDelete = await fetch(
        "http://194.233.87.22:5001/api/bank_deposit_withdraw/getAllBankTransaction",
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
      sleep(1000).then(() => {
        setRows(datas_getTransactionTableAllDataAfterDelete);
        console.log(datas_getTransactionTableAllDataAfterDelete);
      });
      toast.success("Successfully Deleted");
      setIsLoading(false);
    };

    // Call the function
    deleteData();
  };

  // calculation
  const totalWithdraw =
    rows.length > 0 &&
    rows.reduce((withdraw, item) => {
      if (item.dw === "Withdraw") {
        const withdrawAmount = withdraw + Math.round(item.taka);
        return withdrawAmount;
      }
      return withdraw;
    }, 0);

  const totalDeposit =
    rows.length > 0 &&
    rows.reduce((deposit, item) => {
      if (item.dw === "Deposit") {
        const depositAmount = deposit + Math.round(item.taka);
        return depositAmount;
      }
      return deposit;
    }, 0);

  const totalBalance = Number(totalDeposit) - Number(totalWithdraw);

  return (
    <div className="full_div_bank_balance">
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
              checked={selectedOption === "BankBalance"}
              onChange={handleRadioChange}
            />
          </Link>
          Balance
        </label>
      </div>
      <div className="first_row_div_bank_balance">
        <div className="container_search_column1_bank_balance">
          <div className="input_field_bank_balance_report">
            <label className="label_filed_bank_balance" htmlFor="bank-balance">
              Form
            </label>
            <input
              className="input_field_bank_balance"
              type="date"
              onChange={handleFormDateChange}
            />
          </div>
          <div className="input_field_bank_balance_report">
            <label className="label_filed_bank_balance" htmlFor="bank-balance">
              To
            </label>
            <input
              className="input_field_bank_balance"
              type="date"
              onChange={handleToDateChange}
            />
            <button
              className="button_field_bank_balance"
              onClick={handelClickFetchDateFormAndTo}
            >
              Search
            </button>
          </div>
        </div>
        <div className="container_search_column2_bank_balance">
          <div className="input_field_bank_balance_report">
            <button
              className="button_field_bank_balance"
              onClick={handleClickSearchShowAll}
            >
              Show All
            </button>
          </div>
        </div>
      </div>
      <div className="second_row_div_bank_balance loader-container_bank_balance">
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        ) : (
          <div className="table_div_bank_balance table_wrapper_bank_balance">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr className="row" tabindex="0">
                <th>ID</th>
                <th>Account Number</th>
                <th>Bank</th>
                <th>Branch</th>
                <th>Account Holder</th>
                <th>Type</th>
                <th>Deposit/withdraw</th>
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
                      <td>{item.dw}</td>
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
      <div className="third_row_div_bank_balance">
        <div className="container_view_bank_balance">
          <div className="input_field_bank_balance_report">
            <label className="label_filed_bank_balance" htmlFor="bank-balance">
              Withdraw:
            </label>
            <input
              className="input_field_bank_balance"
              value={totalWithdraw}
              style={{ fontSize: "1vw", textAlign: "center" }}
            />
          </div>
          <div className="input_field_bank_balance_report">
            <label className="label_filed_bank_balance" htmlFor="bank-balance">
              Deposit:
            </label>
            <input
              className="input_field_bank_balance"
              value={totalDeposit}
              style={{ fontSize: "1vw", textAlign: "center" }}
            />
          </div>
          <div className="input_field_bank_balance_report">
            <label className="label_filed_bank_balance" htmlFor="bank-balance">
              Balance
            </label>
            <input
              className="input_field_bank_balance"
              value={totalBalance}
              style={{ fontSize: "1vw", textAlign: "center" }}
            />
          </div>
        </div>
        <div className="container_update_bank_balance">
          <div>
            <BankBalanceExcelExport
              excelData={rows}
              fileName={"Excel Export"}
            />
            {/* <button
              className="button_field_bank_balance btn"
              onClick={handleDelete}
            >
              Delete
            </button> */}
          </div>
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
      <ToastContainer position="top-center" />
    </div>
  );
};

export default BankBalance;
