import React from "react";
import "./bank_transaction_report.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const BankTransactionReport = () => {
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
    const [selectedOption, setSelectedOption] = useState("BankTransactionReport");

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
        try {
            console.log(
                SelectedAccountNumber,
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
                    SelectedAccountNumber +
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
                        "Content-type": "application/json",
                    },
                }
            );

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
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="full_div_bank_transaction_page">
            <div className="radio_buttons_btr">
                <label>
                    <Link to="/cashbook/banktransactionreport">
                        <input
                            className="input_custom_cashbook"
                            type="radio"
                            value="CashBook"
                            checked={selectedOption === "BankTransactionReport"}
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
                            onChange={handleRadioChange}
                        />
                    </Link>
                    Balance
                </label>
            </div>
            <div className="first_row_div_bank_transaction_page">
                <div className="container_search_column2_bank_transaction_page">
                    <div className="CreateBankAccDiv_bank_transaction_page">
                        <h5 className="create_bank_account_header">
                            Create Bank Account
                        </h5>
                        <button className="createBankAccountButton_bank_transaction_page">
                            +
                        </button>
                    </div>
                    <div className="input-field_bank_transaction_page">
                        <label className="label_container_search_column2_bank_transaction_page">
                            *Account Number
                        </label>
                        <select
                            className="select_container_search_column2_bank_transaction_page"
                            id="account_number_search"
                            name="account"
                            value={SelectedAccountNumber}
                            // onSelect={handelClickSearchAccountNumber}
                            onChange={(event) =>
                                setSelectedAccountNumber(event.target.value)
                            }
                        >
                            {allAccountNumber.map((accountNumber, index) => {
                                return (
                                    <option key={index}>{accountNumber}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="input-field_bank_transaction_page">
                        <label className="label_container_search_column2_bank_transaction_page">
                            *Bank Name
                        </label>
                        <input
                            className="input_container_search_column2_bank_transaction_page"
                            name="bank"
                            value={bank}
                            onChange={(event) => {
                                setBank(event.target.value);
                            }}
                        />
                    </div>
                    <div className="input-field_bank_transaction_page">
                        <label className="label_container_search_column2_bank_transaction_page">
                            *Branch Name
                        </label>
                        <input
                            className="input_container_search_column2_bank_transaction_page"
                            name="branch"
                            value={branch}
                            onChange={(event) => {
                                setBranch(event.target.value);
                            }}
                        />
                    </div>
                    <div className="input-field_bank_transaction_page">
                        <label className="label_container_search_column2_bank_transaction_page">
                            *Account Holder
                        </label>
                        <input
                            className="input_container_search_column2_bank_transaction_page"
                            name="holder"
                            value={holder}
                            onChange={(event) => {
                                setHolder(event.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="container_search_column3_bank_transaction_page">
                    <div>
                        <div className="input-field_bank_transaction_page">
                            <label
                                className="label_container_search_column3_bank_transaction_page"
                                for="total-price-for-customer"
                            >
                                *Type
                            </label>
                            <select
                                id="account-type"
                                value={accountType}
                                onChange={handleSelectChangeType}
                                className="select_container_search_column3_bank_transaction_page"
                            >
                                <option value="" disabled>
                                    Select account type...
                                </option>
                                <option value="Savings">Savings</option>
                                <option value="Current">Current</option>
                            </select>
                        </div>
                        <div className="input-field_bank_transaction_page">
                            <label
                                className="label_container_search_column3_bank_transaction_page"
                                for="total-price-for-customer"
                            >
                                *Deposit / Withdraw
                            </label>
                            <select
                                id="transaction-type"
                                value={transactionType}
                                onChange={handleSelectChangeDeposit}
                                className="select_container_search_column3_bank_transaction_page"
                            >
                                <option value="" disabled>
                                    Select transaction type...
                                </option>

                                <option value="Deposit">Deposit</option>
                                <option value="Withdraw">withdraw</option>
                            </select>
                        </div>
                        <div className="input-field_bank_transaction_page">
                            <label
                                className="label_container_search_column3_bank_transaction_page"
                                for="total-price-for-customer"
                            >
                                *Taka
                            </label>
                            <input
                                className="input_container_search_column3_bank_transaction_page"
                                name="taka"
                                value={taka}
                                onChange={(event) => {
                                    setTaka(event.target.value);
                                }}
                            />
                        </div>
                        <div className="input-field">
                            <label
                                className="label_container_search_column3_bank_transaction_page"
                                for="total-price-for-customer"
                            >
                                Comment
                            </label>
                            <input
                                className="input_container_search_column3_bank_transaction_page"
                                name="comment"
                                value={comment}
                                onChange={(event) => {
                                    setComment(event.target.value);
                                }}
                            />
                        </div>
                        <div className="input-field">
                            <label
                                className="label_container_search_column3_bank_transaction_page"
                                for="total-price-for-customer"
                            >
                                *Date
                            </label>
                            <input
                                className="input_container_search_column3_bank_transaction_page"
                                type="date"
                                value={date}
                                onChange={(event) => {
                                    setDate(event.target.value);
                                }}
                            />
                        </div>

                        <button
                            className="save_btn_bank_transaction_page"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BankTransactionReport;
