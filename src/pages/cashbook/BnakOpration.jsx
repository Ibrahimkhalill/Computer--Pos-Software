import React from "react";
import "./bank-opration.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as SaveSvg } from "../svg/save.svg";

const BankOpration = () => {
  const location = useLocation();

  const [allAccountNumber, setallAccountNumber] = useState([]);
  const [SelectedAccountNumber, setSelectedAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [holder, setHolder] = useState("");
  const [taka, setTaka] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("BankOpration");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectChangeType = (event) => {
    setAccountType(event.target.value);
  };

  const handleSelectChangeDeposit = (event) => {
    setTransactionType(event.target.value);
  };

  const handleSave = async () => {
    if (!allAccountNumber) {
      toast.error("Plz Selected Any Account Number");
      return;
    }
    if (!bank) {
      toast.error("Fill Bank Name");
      return;
    }
    if (!branch) {
      toast.error("Fill Brach Name");
      return;
    }
    if (!holder) {
      toast.error("Fill Bank Holder");
      return;
    }
    if (!accountType) {
      toast.error("Fill Account Type");
      return;
    }
    if (!transactionType) {
      toast.error("Fill TransactionType");
      return;
    }
    if (!taka) {
      toast.error("Fill Amount");
      return;
    }
    if (!comment) {
      toast.error("Fill Comment");
      return;
    }
    if (!date) {
      toast.error("Fill The Date");
      return;
    }
    try {
      console.log(
        allAccountNumber,
        bank,
        branch,
        holder,
        accountType,
        transactionType,
        transactionType,
        taka,
        comment,
        date
      );
      await fetch(
        "http://194.233.87.22:5001/api/bank_deposit_withdraw/postBank_deposit_withdraw_Row?account=" +
          allAccountNumber +
          "&bank=" +
          bank +
          "&branch=" +
          branch +
          "&holder=" +
          holder +
          "&type=" +
          accountType +
          "&style=" +
          transactionType +
          "&taka=" +
          taka +
          "&comment=" +
          comment +
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
      toast.success("Data Save Successfully");
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_getAllAccountNumber = await fetch(
          "http://194.233.87.22:5001/api/bank_account/getDistinctAccount",
          {
            method: "POST",

            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );
        const datas_getAllAccountNumber =
          await response_getAllAccountNumber.json();
        const customer_getAccNo = datas_getAllAccountNumber.map(
          ({ account: actualValue }) => actualValue
        );
        setallAccountNumber([...new Set(customer_getAccNo)]);
        // setallAccountNumber(datas_getAllAccountNumber);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // Pop Up Window
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="full_div_bank_opration">
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
      <div className="first_row_div_bank_opration">
        <div className="container_save_bank_opration">
          <div className="container_search_column1_bank_opration">
            <div className="input_filed_bank_opration">
              <h5 className="create_bank_account_header">
                Create Bank Account
              </h5>
              <Button
                className="bankaccount_button"
                style={{ width: "4.5vw" }}
                onClick={showModal}
              >
                +
              </Button>
            </div>
            <div className="input_filed_bank_opration">
              <label>*Account Number</label>
              <select
                name="account"
                // value={SelectedAccountNumber}
                value={allAccountNumber}
                // onSelect={handelClickSearchAccountNumber}
                onChange={(event) => setallAccountNumber(event.target.value)}
              >
                {allAccountNumber.length > 0 &&
                  allAccountNumber.map((accountNumber, index) => {
                    return <option key={index}>{accountNumber}</option>;
                  })}
              </select>
            </div>
            <div className="input_filed_bank_opration">
              <label>*Bank Name</label>
              <input
                name="bank"
                value={bank}
                onChange={(event) => {
                  setBank(event.target.value);
                }}
              />
            </div>
            <div className="input_filed_bank_opration">
              <label>*Branch Name</label>
              <input
                value={branch}
                onChange={(event) => {
                  setBranch(event.target.value);
                }}
              />
            </div>
            <div className="input_filed_bank_opration">
              <label>*Account Holder</label>
              <input
                value={holder}
                onChange={(event) => {
                  setHolder(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="container_search_column2_bank_opration">
            <div>
              <div className="input_filed_bank_opration">
                <label>*Type</label>
                <select
                  id="account-type"
                  value={accountType}
                  onChange={handleSelectChangeType}
                >
                  <option value="" disabled>
                    Select account type...
                  </option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
              </div>
              <div className="input_filed_bank_opration">
                <label>*Deposit / Withdraw</label>
                <select
                  value={transactionType}
                  onChange={handleSelectChangeDeposit}
                >
                  <option value="" disabled>
                    Select transaction type...
                  </option>

                  <option value="Deposit">Deposit</option>
                  <option value="Withdraw">withdraw</option>
                </select>
              </div>
              <div className="input_filed_bank_opration">
                <label>*Taka</label>
                <input
                  value={taka}
                  onChange={(event) => {
                    setTaka(event.target.value);
                  }}
                />
              </div>
              <div className="input_filed_bank_opration">
                <label>Comment</label>
                <input
                  value={comment}
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                />
              </div>
              <div className="input_filed_bank_opration">
                <label>*Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                />
              </div>
              <div className="flex_end">
                {/* <button onClick={handleSave}>Save</button> */}
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
                    onClick={handleSave}
                  >
                    <SaveSvg style={{ cursor: "pointer" }} />
                  </button>
                  <div style={{ paddingTop: "0.4vw" }}>Save</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="popup-window">
        <Modal
          title="Account Setup"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={700}
          height={600}
          style={{
            top: 35,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <div className="container_bank_account_setup">
            <div className="container_first_row_divbank_account_setup">
              <div style={{ fontSize: "1vw", fontWeight: "bold" }}>
                Bank Account Information
              </div>
              <div className="bank_account_input_field_container">
                <div>
                  <div className="input_field_bank_account_setup">
                    <label>*Account Number</label>
                    <input />
                  </div>
                  <div className="input_field_bank_account_setup">
                    <label>*Bank Name</label>
                    <select></select>
                  </div>
                  <div className="input_field_bank_account_setup">
                    <label>*Branch Name</label>
                    <select></select>
                  </div>
                </div>
                <div>
                  <div className="input_field_bank_account_setup">
                    <label>*Account Holder</label>
                    <select></select>
                  </div>
                  <div className="container_div_button_saparetor">
                    <div >
                      {/* <button>Save</button> */}
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
                        >
                          <SaveSvg style={{ cursor: "pointer" }} />
                        </button>
                        <div style={{ paddingTop: "0.4vw" }}>Save</div>
                      </div>
                    </div>
                    <div className="input_field_bank_account_setup">
                      <button>Show All</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container_tabel_bank_account_setup">
              <table border={3} cellSpacing={2} cellPadding={10}>
                <tr>
                  <th>Account Number</th>
                  <th>Bnak Name</th>
                  <th>Branch Name</th>
                  <th>Account Holder</th>
                </tr>
                <tbody>
                  {
                    // rows.map((item) =>
                    //     <tr  key={item.id}>
                    //         <td >{item.serial}</td>
                    //         <td >{item.challan_no}</td>
                    //         <td>{item.customer_name}</td>
                    //         <td>{item.cid}</td>
                    //         <td>{item.product_code}</td>
                    //         <td>{item.product_name}</td>
                    //
                    //     </tr>
                    // )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default BankOpration;
