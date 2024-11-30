import React from "react";
import "./investor-income.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ReactComponent as SheetsSvg } from "../svg/sheets.svg";
import { ReactComponent as UpdateSvg } from "../svg/update.svg";
import { ReactComponent as SaveSvg } from "../svg/save.svg";
import { ReactComponent as ResetSvg } from "../svg/reset.svg";

const InvestorIncome = () => {
  const [toDate, setToDate] = useState([]);
  const [fromDate, setFromDate] = useState([]);
  const [rows, setRows] = useState([]);
  const [investor, setInvestor] = useState([]);
  const [id, setId] = useState("");
  const [investorName, setInvestorName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState([]);
  const [investorAmount, setInvestorAmount] = useState("");
  const [Percentage, setPercentage] = useState("");
  const [totalSalePrice, setTotalSalePrice] = useState("");

  const [investorIncume, setInvestorIncume] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("InvestorIncome");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // http://194.233.87.22:5001/api/investor/getInvestorByDateToDate?fromdate=2019-04-17&todate=2023-12-31
  //From Data and To date
  const handelClickFetchDateFormAndToSearch = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getProductSaleDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/customer/getCustomerByFromDateToDate?fromdate=" +
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
      const datas_getProductSaleDateSearchTableAllData =
        await response_getProductSaleDateSearchTableAllData.json();
      console.log(datas_getProductSaleDateSearchTableAllData);

      // setIsLoading(false);
      setIsLoading(false);
      setRows(datas_getProductSaleDateSearchTableAllData);
      console.log(datas_getProductSaleDateSearchTableAllData);

      //  Second Table
      // const response_getInvestorIncumeDateSearchTableAllData = await fetch(
      //   "http://194.233.87.22:5001/api/investor/getInvestorByDateToDate?fromdate=" +
      //     fromDate +
      //     "&todate=" +
      //     toDate,
      //   {
      //     method: "POST",
      //     headers: {
      //       "x-access-token": JSON.parse(
      //         localStorage.getItem("x-access-token")
      //       ),
      //     },
      //   }
      // );
      // const datas_getInvestorIncumeDateSearchTableAllData =
      //   await response_getInvestorIncumeDateSearchTableAllData.json();
      // console.log(datas_getInvestorIncumeDateSearchTableAllData);

      // setInvestor(datas_getInvestorIncumeDateSearchTableAllData);
    };

    // Call the function
    fetchData();
  };

  const handleSearchInvestorReport = async () => {
    const response_getInvestorIncumeDateSearchTableAllData = await fetch(
      "http://194.233.87.22:5001/api/investor/getInvestorByDateToDate?fromdate=" +
        fromDate +
        "&todate=" +
        toDate,
      {
        method: "POST",
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      }
    );
    const datas_getInvestorIncumeDateSearchTableAllData =
      await response_getInvestorIncumeDateSearchTableAllData.json();
    console.log(datas_getInvestorIncumeDateSearchTableAllData);

    setInvestor(datas_getInvestorIncumeDateSearchTableAllData);
  };

  // data in Input field

  const DataInInputField = (item) => {
    setId(item.id);
    setInvestorName(item.name);
    setAddress(item.address);
    setMobileNo(item.mobile);
    setInvestorAmount(item.invest);
    setPercentage(item.percentage);
    setInvestorIncume(item.investor_income)
    setTotalSalePrice(item.total_sale)
  };

  const handleReset = () => {
    setId([]);
    setInvestorName([]);
    setAddress([]);
    setMobileNo([]);
    setInvestorAmount([]);
    setPercentage("");
    setInvestorIncume([]);
  };

  // const totalPrice = rows.reduce((total, item) => total + item.total, 0);
  const totalPrice = (rows.length > 0 && rows
    .reduce((totaltaka, item) => {
      if (
        item.total !== undefined &&
        item.total !== null &&
        item.total !== ""
      ) {
        totaltaka += Number(item.total);
      }
      return totaltaka;
    }, 0)
    .toFixed(2));

  // http://194.233.87.22:5001/api/investor/updateInvestorById?total_sale=&percentage=&investor_income=&id=

  const handleSaveData = async () => {
    
    if(!id){
      toast.warning("Please select investor row");
      return;
    }
    if (totalPrice===0 ) {
      // alert("Please fill in all required fields");
      toast.warning("Please fill the totalprice fields");
      return;
    }
    if (!Percentage) {
      // alert("Please fill in all required fields");
      toast.warning("Please fill the Percentage fields");
      return;
    }
    if (!investorIncume ) {
      // alert("Please fill in all required fields");
      toast.warning("Please fill the investorIncome fields");
      return;
    }
    
    setIsLoading(true);
    await fetch(
      "http://194.233.87.22:5001/api/investor/updateInvestorById?total_sale=" +
      totalPrice +
        "&percentage=" +
        Percentage +
        "&investor_income=" +
        investorIncume +
        "&id=" +
        id,
      {
        method: "PUT",
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      }
    );
    toast.success("Data Save Successfully");
    setIsLoading(false);
  };

  // Updated 

  const handleUpdateData = async () => {
    
    if(!id){
      toast.warning("Please select investor row");
      return;
    }
    if (!totalSalePrice) {
      // alert("Please fill in all required fields");
      toast.warning("Please fill the totalprice fields");
      return;
    }
    if (!Percentage) {
      // alert("Please fill in all required fields");
      toast.warning("Please fill the Percentage fields");
      return;
    }
    if (!investorIncume ) {
      // alert("Please fill in all required fields");
      toast.warning("Please fill the investorIncome fields");
      return;
    }
    
    setIsLoading(true);
    await fetch(
      "http://194.233.87.22:5001/api/investor/updateInvestorById?total_sale=" +
      totalSalePrice +
        "&percentage=" +
        Percentage +
        "&investor_income=" +
        investorIncume +
        "&id=" +
        id,
      {
        method: "PUT",
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      }
    );
    toast.success("Data Successfully Updated");
    setIsLoading(false);
  };

  const calculatePercentage = () => {
    console.log(totalPrice, Percentage);

    const result = (parseFloat(totalPrice) * parseFloat(Percentage)) / 100;
    setInvestorIncume(result);
    console.log(result);
  };

  return (
    <div className="full_div_investor_income">
      <div className="radio_buttons_btr">
        <label>
          <Link to="/Investoropration">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="CashBook"
              checked={selectedOption === "InvestorOpration"}
              onChange={handleRadioChange}
            />
          </Link>
          Investor Opration
        </label>
        <label>
          <Link to="/Investorincome">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="Deposit"
              checked={selectedOption === "InvestorIncome"}
              onChange={handleRadioChange}
            />
          </Link>
          Investor Income Setup
        </label>
      </div>
      <div className="first_div_investor_income">
        <div className="container_search_investor_income">
          <div className="container_search1_investor_income">
            <div
              style={{
                fontSize: "1vw",
                fontWeight: "bold",
                color: "#ac6262",
                textDecoration: "underline",
              }}
            >
              Product Income Based Search
            </div>
            <div className="box_container">
              <div className="date_search_investor_income">
                <div className="input_field_investor_income">
                  <label>Form Date</label>
                  <input
                    type="date"
                    onChange={(event) => {
                      setFromDate(event.target.value);
                    }}
                  />
                </div>
                <div className="input_field_investor_income">
                  <label>To Date</label>
                  <input
                    type="date"
                    onChange={(event) => {
                      setToDate(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input_field_investor_income">
                <button onClick={handelClickFetchDateFormAndToSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="container_search2_investor_income">
            <div
              style={{
                fontSize: "1vw",
                fontWeight: "bold",
                color: "#ac6262",
                textDecoration: "underline",
              }}
            >
              Investor Based Search
            </div>
            <div className="box_container">
              <div className="date_search_investor_income">
                <div className="input_field_investor_income">
                  <label>Form Date</label>
                  <input
                    type="date"
                    onChange={(event) => {
                      setFromDate(event.target.value);
                    }}
                  />
                </div>
                <div className="input_field_investor_income">
                  <label>To Date</label>
                  <input
                    type="date"
                    onChange={(event) => {
                      setToDate(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="input_field_investor_income">
                <button onClick={handleSearchInvestorReport}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="second_div_investor_income">
        <div
          style={{ fontWeight: "bold", fontSize: "1vw", paddingBottom: "0vw" }}
        >
          Product Income Report:
        </div>

        <div className="table_wrapper_investor_income">
          {isLoading ? (
            <div className="rotating_lines_sale_transaction_page">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="40"
                visible={true}
              />
            </div>
          ) : (
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>Invoice</th>
                <th>Customer Name</th>
                <th>Customer ID</th>
                <th>Mobile No.</th>
                <th>Address</th>
                <th>Total Price</th>
                <th>Discount</th>
                <th>Service/Extra Charge</th>
                <th>Total</th>
                <th>Sale Date</th>
                <th>Shop</th>
              </tr>
              <tbody>
                {rows.length > 0 && rows.map((item) => (
                  <tr key={item.id}>
                    <td>{item.challan_no}</td>
                    <td>{item.name}</td>
                    <td>{item.cid}</td>
                    <td>{item.mobile_no}</td>
                    <td>{item.address}</td>
                    <td>{item.total_product_price}</td>
                    <td>{item.discount}</td>
                    <td>{item.extra_charge}</td>
                    <td>{item.total}</td>
                    <td>{item.sell_date}</td>
                    <td>{item.shop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="third_div_investor_income">
        <div
          style={{ fontWeight: "bold", fontSize: "1vw", paddingBottom: "0vw" }}
        >
          Investors Report:
        </div>
        <div className="table_wrapper_investor_income">
          <table border={3} cellSpacing={2} cellPadding={10}>
            <tr>
              <th>ID</th>
              <th>Investor Name</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Amount</th>
              <th>Date Form</th>
              <th>Date To</th>
              <th>Total Sale</th>
              <th>Percentage</th>
              <th>Investor Income</th>
            </tr>
            <tbody>
              {investor.length > 0 && investor.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => DataInInputField(item)}
                  className="row"
                  tabindex="0"
                >
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.address}</td>
                  <td>{item.invest}</td>
                  <td>{item.target_from_date}</td>
                  <td>{item.target_to_date}</td>
                  <td>{item.total_sale}</td>
                  <td>{item.percentage}</td>
                  <td>{item.investor_income}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="forth_div_investor_income">
        <div
          style={{ fontWeight: "bold", fontSize: "1vw", paddingBottom: "0vw" }}
        >
          Investor Money Setup
        </div>
        <div className="investor_incume_money_setup_update">
          <div className="investor_incume_money_setup_update_column1">
            <div className="input_field_investor_income">
              <label>ID</label>
              <input
                onChange={(event) => setId(event.target.value)}
                value={id}
              />
            </div>
            <div className="input_field_investor_income">
              <label>Investor Name</label>
              <input
                onChange={(event) => setInvestorName(event.target.value)}
                value={investorName}
              />
            </div>
            <div className="input_field_investor_income">
              <label>Investor Address</label>
              <input
                onChange={(event) => setAddress(event.target.value)}
                value={address}
              />
            </div>
            <div className="input_field_investor_income">
              <label>Mobile</label>
              <input
                onChange={(event) => setMobileNo(event.target.value)}
                value={mobileNo}
              />
            </div>
            <div className="input_field_investor_income">
              <label>Investor Amount</label>
              <input
                onChange={(event) => setInvestorAmount(event.target.value)}
                value={investorAmount}
              />
            </div>
          </div>
          <div className="investor_incume_money_setup_update_column2">
            <div className="input_field_investor_income">
              <label>Total Sale Price</label>
             
              <input
                style={{ textAlign: "center", fontSize: "1vw" }}
                
                value={rows ? `${totalPrice}`: `${totalSalePrice}`}
                onChange={(event) => setTotalSalePrice(event.target.value)}
                // readOnly
              />
              <span style={{fontSize:"1vw"}}>TK.</span>
            </div>
            <div className="input_field_investor_income">
              <label>*Percentage</label>
              <input onChange={(event) => setPercentage(event.target.value)} value={Percentage}/>
              <span style={{fontSize:"1vw"}}>%</span>
            </div>
            <div className="input_field_investor_income custom_investor_income_position">
              <button onClick={calculatePercentage}>Show Outcome</button>
            </div>
            <div className="input_field_investor_income">
              <label>*Investor Income</label>
              <input
                onChange={(event) => setInvestorIncume(event.target.value)}
                value={investorIncume}
              />
              <span style={{fontSize:"1vw"}}>TK.</span>
            </div>
          </div>
          <div className="investor_incume_money_setup_update_column3">
            <div>
              {/* <button onClick={handleUpdateData}>Save</button> */}
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
                  onClick={handleSaveData}
                >
                  <SaveSvg />
                </button>
                <div style={{ paddingTop: "0.4vw", fontSize: "1vw" }}>Save</div>
              </div>
            </div>
            <div>
              {/* <button onClick={handleUpdateData}>Update</button> */}
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
                  onClick={handleUpdateData}
                >
                  <UpdateSvg />
                </button>
                <div style={{ paddingTop: "0.4vw", fontSize: "1vw" }}>
                  Update
                </div>
              </div>
            </div>
            <div>
              {/* <button onChange={handleReset}>Reset</button> */}

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
                    boxShadow: "0 5px #999",
                    outline: "none",
                    border: "none",
                    borderRadius: ".2vw",
                  }}
                  type="submit"
                  onClick={handleReset}
                >
                  <ResetSvg />
                </button>
                <div style={{ paddingTop: "0.4vw", fontSize: "1vw" }}>
                  Reset
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

export default InvestorIncome;
