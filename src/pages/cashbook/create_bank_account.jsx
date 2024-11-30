import React, { useEffect, useState } from "react";
import "./create_bank_account.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateBankAccount = () => {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);
    const [formData, setFormData] = useState({
        account_number: "",
        account_holder: "",
        bank_name: "",
        branch_name: "",
    });

    useEffect(() => {
        fetchBankAccounts();
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    const fetchBankAccounts = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/get-bank-accounts/"
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setBankAccounts(data);
            setLoading(false);
            console.log(data);
        } catch (error) {
            console.error("Error fetching bank accounts:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:8000/api/create-bank-account/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (response.ok) {
                console.log("Bank account created successfully!");
                toast.success("Bank account created successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                });
                setFormData({
                    account_number: "",
                    account_holder: "",
                    bank_name: "",
                    branch_name: "",
                });
                fetchBankAccounts();
            } else {
                console.error(
                    "Error creating bank account:",
                    response.statusText
                );
                toast.error(`Error: ${response.statusText}`, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } catch (error) {
            console.error("Error creating bank account:", error.message);
            toast.error(`Error: ${error.message}`, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    return (
        <>
           
            <ToastContainer autoClose={2000} />
            <div className="container">
                <div className="first_row">
                    <div className="bank_information">
                        Bank Account Information
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="first_column">
                                <div>
                                    <div className="input_field_create_bank_account">
                                        <label className="label_field_create_bank_account">
                                            *Account Number
                                        </label>
                                        <input
                                            className="input_create_bank_account"
                                            type="number"
                                            name="account_number"
                                            value={formData.account_number}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="input_field_create_bank_account">
                                        <label className="label_field_create_bank_account">
                                            *Branch Name
                                        </label>
                                        <input
                                            type="text"
                                            className="input_create_bank_account"
                                            name="branch_name"
                                            value={formData.branch_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="input_field_create_bank_account">
                                        <label className="label_field_create_bank_account">
                                            *Bank Name
                                        </label>
                                        <input
                                            type="text"
                                            className="input_create_bank_account"
                                            name="bank_name"
                                            value={formData.bank_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* <br /> */}
                                <div className="flex_class">
                                    <div className="input_field_create_bank_account">
                                        <label className="label_field_create_bank_account">
                                            *Account Holder
                                        </label>
                                        <input
                                            className="input_create_bank_account"
                                            type="text"
                                            name="account_holder"
                                            value={formData.account_holder}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="input_field_create_bank_account">
                                        <div className="flex-end">
                                            <button
                                                className="button_create_bank_account"
                                                type="submit"
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="button_create_bank_account"
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevents form submission
                                                    fetchBankAccounts(); // Add your logic for Show All functionality
                                                }}
                                            >
                                                Show All
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* <div style={{
                        display: "flex",
                        flexDirection: "row",
                        position: "absolute",
                        
                        bottom: "0.5vw",
                        left: "38vw"
                        
                    }}>
                        <button
                            className="button_create_bank_account"
                            onClick={fetchBankAccounts}
                        >
                            Show All
                        </button>
                       
                    </div> */}
                    </div>
                </div>
                <div className="second_row ">
                    <div className="table_bank_account">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <table border={3} cellSpacing={2} cellPadding={10}>
                                <tr>
                                    <th>Account Number</th>

                                    <th>Bank Name</th>
                                    <th>Branch Name</th>
                                    <th>Account Holder</th>
                                </tr>

                                <tbody>
                                    {bankAccounts.map((data) => (
                                        <tr
                                            className="row_sale_transaction_page"
                                            tabIndex="0"
                                            onClick={() =>
                                                setSelectedRow((prevRow) =>
                                                    prevRow &&
                                                    prevRow.id === data.id
                                                        ? null
                                                        : data
                                                )
                                            }
                                            key={data.id}
                                        >
                                            <td>{data.account_number}</td>

                                            <td>{data.bank_name}</td>
                                            <td>{data.branch_name}</td>
                                            <td>{data.account_holder}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateBankAccount;
