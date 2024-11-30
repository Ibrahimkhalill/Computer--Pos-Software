import React from "react";
import "./profit_loss.css";
import { useEffect, useState } from "react";
import ExportExcel from "../../components/ExportExcel";
import { Button } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

const ProfitLossReport = () => {
    return (
        <div className="full_div_profit_loss">
            <div className="first_row_div_profit_loss">
                <div className="column_one_profit_loss">
                    <div className="row_one_profit_loss">
                        <div className="date_search_profit_loss">
                            <label className="first_row_label_profitloss">Date:</label>
                            <input
                                className="input_date_search_profit_loss"
                                type="date"
                            ></input>
                            <button className="button_date_search_profit_loss">
                                Search
                            </button>
                        </div>
                        <div className="from_to_date_search_profit_loss">
                            <div className="from_to_date_label_profit_loss">
                                <div>
                                    <label className="first_row_label_profitloss">From Date:</label>
                                    <input
                                        className="input_date_search_profit_loss"
                                        type="date"
                                    ></input>
                                </div>
                                <div>
                                    <label className="first_row_label_profitloss">To Date:</label>
                                    <input
                                        className="input_date_search_profit_loss"
                                        type="date"
                                    ></input>
                                </div>
                            </div>
                            <button className="button_date_search_profit_loss">
                                Search
                            </button>
                        </div>

                        <button className="button_showall_profit_loss">
                            Show All
                        </button>
                    </div>
                    <h4>Product Income Report </h4>
                    <div className="row_two_profit_loss">
                        <div className="table_wrapper_profit_loss">
                            {/* {isLoaded ? (
                        <div className="rotating_lines_sale_transaction_page">
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="50"
                                visible={true}
                            />
                        </div>
                    ) : ( */}
                            <table border={3} cellSpacing={2} cellPadding={10}>
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
                                <tbody>
                                    {/* {rows.map((item) => (
                                    <tr
                                        className="row_sale_transaction_page"
                                        tabindex="0"
                                        onClick={() => handleClickTable(item)}
                                        key={item.id}
                                    >
                                        <td>{item.challan}</td>
                                        <td>{item.customer_name}</td>
                                        <td>{item.cid}</td>
                                        <td>{item.mobile_no}</td>
                                        <td>{item.address}</td>
                                        <td>{item.total}</td>
                                        <td>{item.paid}</td>
                                        <td>{item.due}</td>
                                        <td>{item.due_pay}</td>
                                        <td>{item.date}</td>
                                        <td>{item.cash_mamo_no}</td>
                                    </tr>
                                 ))} */}
                                </tbody>
                            </table>
                            {/* )} */}
                        </div>
                    </div>
                    <h4>Expense Report</h4>
                    <div className="row_three_profit_loss">
                        <div className="table_wrapper_profit_loss">
                            {/* {isLoaded ? (
                        <div className="rotating_lines_sale_transaction_page">
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="50"
                                visible={true}
                            />
                        </div>
                    ) : ( */}
                            <table border={3} cellSpacing={2} cellPadding={10}>
                                <tr>
                                    <th>New Column</th>
                                    <th>New Column</th>
                                    <th>New Column</th>
                                    <th>New Column</th>
                                    <th>New Column</th>
                                    <th>New Column</th>
                                    <th>New Column</th>
                                </tr>
                                <tbody>
                                    {/* {rows.map((item) => (
                                    <tr
                                        className="row_sale_transaction_page"
                                        tabindex="0"
                                        onClick={() => handleClickTable(item)}
                                        key={item.id}
                                    >
                                        <td>{item.challan}</td>
                                        <td>{item.customer_name}</td>
                                        <td>{item.cid}</td>
                                        <td>{item.mobile_no}</td>
                                        <td>{item.address}</td>
                                        <td>{item.total}</td>
                                        <td>{item.paid}</td>
                                        <td>{item.due}</td>
                                        <td>{item.due_pay}</td>
                                        <td>{item.date}</td>
                                        <td>{item.cash_mamo_no}</td>
                                    </tr>
                                 ))} */}
                                </tbody>
                            </table>
                            {/* )} */}
                        </div>
                    </div>
                </div>
                <div className="column_two_profit_loss">
                    <div className="section_one_column_two_profit_loss">
                        <h5>Product Profit/Loss</h5>
                        <div className="sub_section_one_column_two_profit_loss">
                            <div className="row_gap_profit_loss">
                                <label className="label_column_2_profit_loss">
                                    Total Sales Price
                                </label>

                                <div className="section_div_profit_loss">
                                    <input className="input_column_two_profit_loss"></input>
                                    <p>TK</p>
                                </div>
                            </div>
                            <div className="row_gap_profit_loss">
                                <label className="label_column_2_profit_loss">
                                    Total Purchase Price(-)
                                </label>
                                <div className="section_div_profit_loss">
                                    <input className="input_column_two_profit_loss"></input>
                                    <p>TK</p>
                                </div>
                            </div>
                            <div className="row_gap_profit_loss">
                                <label className="label_column_2_profit_loss">
                                    Total Profit / Loss:
                                </label>
                                <div className="section_div_profit_loss">
                                    <input className="input_column_two_profit_loss"></input>
                                    <p>TK</p>
                                </div>
                            </div>
                            <div className="row_gap_profit_loss">
                                <label className="label_column_2_profit_loss">
                                    Total Discount (-)
                                </label>
                                <div className="section_div_profit_loss">
                                    <input className="input_column_two_profit_loss"></input>
                                    <p>TK</p>
                                </div>
                            </div>
                            <div className="row_gap_profit_loss">
                                <label className="label_column_2_profit_loss">
                                    Total Product Income:
                                </label>
                                <div className="section_div_profit_loss">
                                    <input className="input_column_two_profit_loss"></input>
                                    <p>TK</p>
                                </div>
                            </div>
                            <button className="excel_button_profitLoss">Excel</button>
                            <div className="row_gap_profit_loss">
                                <label className="label_column_2_profit_loss">
                                    Total Service/Extra Charge
                                </label>
                                <div className="section_div_profit_loss">
                                    <input className="input_column_two_profit_loss"></input>
                                    <p>TK</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="section_two_column_two_profit_loss">
                        <h5>Total Expense</h5>
                        <div className="row_gap_profit_loss">
                            <label className="label_column_2_profit_loss">
                                Total Expense
                            </label>
                            <div className="section_div_profit_loss">
                                <input className="input_column_two_profit_loss"></input>
                                <p>TK</p>
                            </div>
                        </div>
                        <button className="excel_button_profitLoss">Excel</button>
                    </div>
                </div>
            </div>
            <div className="second_row_div_profit_loss">
                <h3>Total Loss/Profit</h3>
                <div className="label_second_row_div_profit_loss">
                    <label>Total Product Income</label>
                    <label>+</label>
                    <label>Total Service/Extra Charge</label>
                    <label>-</label>
                    <label>Total Expense</label>
                    <label>=</label>
                    <label>Total Profit / Loss</label>
                </div>
                <div className="input_section_second_row_div_profit_loss">
                    <div className="for_p_tag_profit_loss">
                        <input className="input_second_row_div_profit_loss"></input>
                        <p>Tk</p>
                    </div>
                    <div className="for_p_tag_profit_loss">
                        <input className="input_second_row_div_profit_loss"></input>
                        <p>Tk</p>
                    </div>
                    <div className="for_p_tag_profit_loss">
                        <input className="input_second_row_div_profit_loss"></input>
                        <p>Tk</p>
                    </div>
                    <div className="for_p_tag_profit_loss">
                        <input className="input_second_row_div_profit_loss"></input>
                        <p>Tk</p>
                    </div>
                    {/* <input className="input_second_row_div_profit_loss"></input>
                <input className="input_second_row_div_profit_loss"></input>
                <input className="input_second_row_div_profit_loss"></input> */}
                </div>
            </div>
        </div>
    );
};

export default ProfitLossReport;
