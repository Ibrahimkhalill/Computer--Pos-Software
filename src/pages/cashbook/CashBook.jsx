import React from "react";
import "./cash-book.css";
import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import CashBookExcelExport from "../../../src/components/ExportExcel";
import { Link } from "react-router-dom";


const CashBook = () => {
  
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState([]);
  const [fromDate, setFromDate] = useState([]);
  const [toDate, setToDate] = useState([]);
  const [selectedOption, setSelectedOption] = useState("CashBook");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response_getAllSaleTable = await fetch(
          "http://194.233.87.22:5001/api/cash_book/getCashBook",
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        const datas_getAllSaleTable = await response_getAllSaleTable.json();

        setRows(datas_getAllSaleTable);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    // Call the function
    fetchData();
  }, []);
  //  Show all data
  const handleClickSearchShowAll = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getCashBookTableAllData = await fetch(
        "http://194.233.87.22:5001/api/cash_book/getCashBook",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getCashBookTableAllData =
        await response_getCashBookTableAllData.json();
      console.log(datas_getCashBookTableAllData);
      setRows(datas_getCashBookTableAllData);
      console.log(datas_getCashBookTableAllData);
      setIsLoading(false);
    };

    // Call the function
    fetchData();
  };
  // 1st date search
  const handelClickFetchDate = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getCashBookDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/cash_book/getCashBookByOnlyDate?date=" +
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

      const datas_getCashBookDateSearchTableAllData =
        await response_getCashBookDateSearchTableAllData.json();
      console.log(datas_getCashBookDateSearchTableAllData);
      sleep(2000).then(() => {
        setIsLoading(false);
      });
      setRows(datas_getCashBookDateSearchTableAllData);
      console.log(datas_getCashBookDateSearchTableAllData);
    };

    // Call the function
    fetchData();
  };


  const handleDateChange = (event) => {
    setDate(event.target.value);
    console.log(event.target.value);
  };

  // First date search end

  // Form date search
  const handelClickFetchDateFormAndTo = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getCashBookDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/cash_book/getCashBookByFromDateToDate?fromdate=" +
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
      const datas_getCashBookDateSearchTableAllData =
        await response_getCashBookDateSearchTableAllData.json();
      console.log(datas_getCashBookDateSearchTableAllData);
      sleep(2000).then(() => {
        setIsLoading(false);
      });
      setRows(datas_getCashBookDateSearchTableAllData);
      console.log(datas_getCashBookDateSearchTableAllData);
    };

    // Call the function
    fetchData();
  };

  const handleFormDateChange = (event) => {
    setFromDate(event.target.value);
    console.log(event.target.value);
  };
  const handleToDateChange = (event) => {
    setToDate(event.target.value);
    console.log(event.target.value);
  };

  // Clicking table data show thous data in input field
  // const totalInAmount =  rows.reduce(
  //   (inAmount, item) => inAmount + Math.round(item.taka),
  //   0
  // );

  const totalInAmount = (rows.length > 0 && rows
    .reduce((totaltaka, item) => {
      if (
        item.taka !== undefined &&
        item.taka !== null &&
        item.taka !== ""
      ) {
        totaltaka += Number(item.taka);
      }
      return totaltaka;
    }, 0)
    .toFixed(2));

  // const totalOutAmount = rows.reduce(
  //   (outAmount, item) => outAmount + Math.round(item.out_taka),
  //   0
  // );

  const totalOutAmount = (rows.length > 0 && rows
    .reduce((paidtaka, item) => {
      if (item.out_taka !== undefined && item.out_taka !== null && item.out_taka !== "") {
        paidtaka += Number(item.out_taka);
      }
      return paidtaka;
    }, 0)
    .toFixed(2));

  const totalCashTaka = (totalInAmount - totalOutAmount).toFixed(2);
 
  return (
    <div className="full_div_cash_book_report">
      <div className="radio_buttons_btr">
        <label>
          <Link to="/Cashopration">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="CashBook"
              checked={selectedOption === "CashOpration"}
              onChange={handleRadioChange}
            />
          </Link>
          Cash Opreation
        </label>
        <label>
          <Link to="/cashbook">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="Deposit"
              checked={selectedOption === "CashBook"}
              onChange={handleRadioChange}
            />
          </Link>
          Cash Book
        </label>
      </div>
      <div className="first_row_div_cash_book_report">
        <div className="container_search_column1_cash_book_report">
          <div className="input_field_cash_report">
            <label className="label_field_cash_book_report">Date</label>
            <input
              className="input_field_cash_book_report"
              type="date"
              value={date}
              onChange={handleDateChange}
            />
            <button
              className="button_field_cash_book_report"
              onClick={handelClickFetchDate}
            >
              Search
            </button>
          </div>
          <div className="input_field_cash_report">
            <label className="label_field_cash_book_report">From</label>
            <input
              className="input_field_cash_book_report"
              type="date"
              onChange={handleFormDateChange}
            />
          </div>
          <div className="input_field_cash_report">
            <label className="label_field_cash_book_report">To</label>
            <input
              className="input_field_cash_book_report"
              type="date"
              onChange={handleToDateChange}
            />
            <button
              className="button_field_cash_book_report"
              onClick={handelClickFetchDateFormAndTo}
            >
              Search
            </button>
          </div>
        </div>
        <div className="container_search_column2_cash_book_report">
          <div className="input_field_cash_report">
            <button
              className="button_field_cash_book_report"
              onClick={handleClickSearchShowAll}
            >
              Show All
            </button>
          </div>
        </div>
      </div>
      <div className="second_row_div_cash_book_report loader-container_cash_book_report">
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        ) : (
          <div className="table_div table_wrapper_cash_book_report">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr className="row" tabindex="0">
                <th>Serial</th>
                <th>In Amount</th>
                <th>Out Amount</th>
                <th>Type</th>
                <th>Invoice No</th>
                <th>ID</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>

              <tbody>
                {rows.length > 0 && rows.map((item) => (
                  <tr className="row" tabindex="0" key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.taka}</td>
                    <td>{item.out_taka}</td>
                    <td>{item.type}</td>
                    <td>{item.challan_no}</td>
                    <td>{item.pur_ID}</td>
                    <td>{item.comment}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="third_row_div_cash_book_report">
        <div className="container_view_cash_book_report">
          <div className="contaier_view_column1_cash_book_report">
            <div className="input_field_cash_report">
              <label className="label_field_cash_book_report">
                Total In Amount:
              </label>
              <input
                className="input_field_cash_book_report"
                value={totalInAmount}
                style={{fontSize:"1vw", textAlign:"center"}}
              />
            </div>
            <div className="input_field_cash_report">
              <label className="label_field_cash_book_report">
                Total Out Amount:
              </label>
              <input
                className="input_field_cash_book_report"
                value={totalOutAmount}
                style={{fontSize:"1vw", textAlign:"center"}}
              />
            </div>
            <div className="input_field_cash_report">
              <label className="label_field_cash_book_report">
                Total Cash Taka:
              </label>
              <input
                className="input_field_cash_book_report"
                value={totalCashTaka}
                style={{fontSize:"1vw", textAlign:"center"}}
              />
            </div>
          </div>
          <div >
            <CashBookExcelExport excelData={rows} fileName={"Excel Export"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashBook;
