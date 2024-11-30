import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./investor-operation.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExcelExport from '../../components/ExportExcel';
import { ReactComponent as SaveSvg } from "../svg/save.svg";
import { ReactComponent as ResetSvg } from "../svg/reset.svg";
import { ReactComponent as UpdateSvg } from "../svg/update.svg";

const InvestorOpration = () => {
  const [selectedOption, setSelectedOption] = useState("InvestorOpration");
  const [id, setId] = useState([]);
  const [updateid, setUpdatedid] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [invest, setInvest] = useState("");
  const [target_from_date, setTarget_from_date] = useState("");
  const [target_to_date, setTarget_to_date] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [updatedname, setUpdatedName] = useState("");
  const [updatedmobile, setUpdatedMobile] = useState("");
  const [updatedaddress, setUpdatedAddress] = useState("");
  const [updatedinvest, setUpdatedInvest] = useState("");
  const [updatedtarget_from_date, setUpdatedTarget_from_date] = useState("");
  const [updatedtarget_to_date, setUpdatedTarget_to_date] = useState("");


  const [nameError, setNameError] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [addressFocused, setAddressFocused] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [mobileFocused, setMobileFocused] = useState("");
  const [investError, setInvestError] = useState("");
  const [investFocused, setInvestFocused] = useState("");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response_getinvestoTableAllData = await fetch(
          "http://194.233.87.22:5001/api/investor/getInvestor",
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );
        const datas_getinvestorTableAllData =
          await response_getinvestoTableAllData.json();
        console.log(datas_getinvestorTableAllData);
        setRows(datas_getinvestorTableAllData);
      } catch (error) {
        console.error("Error fetching investor data:", error);
      } finally {
        setIsLoading(false);
      }
      try {
        const response = await fetch(
          "http://194.233.87.22:5001/api/investor/getDistinctIDOfInvestor",
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        const data = await response.json();
        if (data.length > 0) {
          const lastId = data[data.length - 1].id;
          setId(lastId + 1);
        } else {
          setId(1);
        }
      } catch (error) {
        console.error("Error fetching ID data:", error);
      }
    };

    fetchData();
  }, []);



  const handelClickFetchDateFormAndToSearch = async () => {
    try {
      setIsLoading(true);
      const response_getinvestoTableAllData = await fetch(
        `http://194.233.87.22:5001/api/investor/getInvestorByDateToDate?fromdate=${fromDate}&todate=${toDate}`,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getinvestorsearchTableAllData =
        await response_getinvestoTableAllData.json();
  
      setRows(datas_getinvestorsearchTableAllData);
    } catch (error) {
      console.error("Error fetching investor data by date range:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handelClickshowall = async () => {
    try {
      setIsLoading(true);
      const response_getinvestoTableAllData = await fetch(
        "http://194.233.87.22:5001/api/investor/getInvestor",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getinvestorTableAllData =
        await response_getinvestoTableAllData.json();
      console.log(datas_getinvestorTableAllData);
      setRows(datas_getinvestorTableAllData);
    } catch (error) {
      toast.error("Error fetching investor data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      if (!name) {
        setNameError("You can't leave the empty");
        setNameFocused(true);
        return;
      }

      // Validate Address
      if (!address) {
        setAddressError("You can't leave the empty");
        setAddressFocused(true);
        return;
      }

      // Validate Mobile
      if (!mobile) {
        setMobileError("You can't leave the empty");
        setMobileFocused(true);
        return;
      }

      // Validate Invested Amount
      if (!invest) {
        setInvestError("You can't leave the empty");
        setInvestFocused(true);
        return;
      }

      const response_saveData = await fetch(
        `http://194.233.87.22:5001/api/investor/postInvestorRowFromInvestor?id=${id}&name=${name}&address=${address}&mobile=${mobile}&invest=${invest}&target_from_date=${target_from_date}&target_to_date=${target_to_date}&entry_date=${target_to_date}`,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const saveData = await response_saveData.json();

      console.log(saveData);

      setIsLoading(false);

      if (response_saveData.ok) {
        toast.success("Data is Saved");
        setName("");
        setAddress("");
        setMobile("");
        setInvest("");
        setTarget_from_date("");
        setTarget_to_date("");
      } else {
        toast.error("Failed to save data. Please check the input.");
      }
    } catch (error) {
      
      toast.error("Failed to save data. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleallsave = async () => {
    await handleSave();
    await handelClickshowall();
  };

  const handleClickTable = (item) => {
    setUpdatedid(item.id);
    setUpdatedName(item.name);
    setUpdatedAddress(item.address);
    setUpdatedMobile(item.mobile);
    setUpdatedInvest(item.invest);
    setUpdatedTarget_from_date(item.target_from_date);
    setUpdatedTarget_to_date(item.target_to_date);
  };

  const handlupdated = async () => {
    try {
      setIsLoading(true);
      const response_saveData = await fetch(
        ` http://194.233.87.22:5001/api/investor/updateInvestorFromInvestorOperationById?id=${updateid}&address=${address}&mobile=${mobile}&invest=${invest}&target_from_date=${target_from_date}&target_to_date=${target_to_date}`,
        {
          method: "PUT",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );


      setIsLoading(false);

      if (response_saveData.ok) {
        toast.success("Data is updated");
        setUpdatedid("");
        setUpdatedName("");
        setUpdatedAddress("");
        setUpdatedMobile("");
        setUpdatedInvest("");
        setUpdatedTarget_from_date("");
        setUpdatedTarget_to_date("");
      } else {
        toast.error("Failed to Updated data.");
      }
    } catch (error) {
      
      toast.error("Failed to Updated data. Please try again later.");
      setIsLoading(false);
    }
  };

  const handallupdated = async () => {
    await handlupdated();
    await handelClickshowall();
  };

  const handleReset = () => {
    setUpdatedid("");
    setUpdatedName("");
    setUpdatedAddress("");
    setUpdatedMobile("");
    setUpdatedInvest("");
    setUpdatedTarget_from_date("");
    setUpdatedTarget_to_date("");
  };

  return (
    <div className="full_row_div_investor_operation">
      <ToastContainer position="top-center" autoClose={1000} />
      <div className="radio_buttons_btr_operations">
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

      <div className="first_row_div_investor_operation">
        <div
          style={{ fontWeight: "bold", fontSize: "1vw", paddingBottom: "0vw" }}
        >
          Investor Setup
        </div>
        <div className="container_search_investor_setup">
          <div className="investor_setup_search1">
            <div className="input_field_investor_operation">
              <label>*ID</label>
              <input value={id} readOnly />
            </div>
            <div className="input_field_investor_operation">
          
              <label>*Investor Name</label>
              <div className="input-error">
              <input
                type="text"
                className="investor_input"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setNameError("");
                }}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                style={{
                  borderColor: nameError ? 'red' : nameFocused ? 'red' : '',
                }}
              /> 
              
              {nameError && <div className="investor_error" style={{ color: 'red', fontSize:".7vw" }}>{nameError}</div>}
              </div>
            </div>
            <div className="input_field_investor_operation">
              <label>*Investor Address</label>
              <div className="input-error">
              <input
                type="text"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                  setAddressError("");
                }}
                onFocus={() => setAddressFocused(true)}
                onBlur={() => setAddressFocused(false)}
                style={{
                  borderColor: addressError ? 'red' : addressFocused ? 'red' : '',
                }}
              />
              {addressError && <div style={{ color: 'red',fontSize:".7vw" }}>{addressError}</div>}
              </div>
            </div>
            <div className="input_field_investor_operation">
          <label>*Mobile</label>
          <div className="input-error">
          <input
            type="text"
            value={mobile}
            onChange={(event) => {
              setMobile(event.target.value);
              setMobileError("");
            }}
            onFocus={() => setMobileFocused(true)}
            onBlur={() => setMobileFocused(false)}
            style={{
              borderColor: mobileError ? 'red' : mobileFocused ? 'red' : '',
            }}
          />
          {mobileError && <div style={{ color: 'red',fontSize:".7vw" }}>{mobileError}</div>}
          </div>
        </div>
          </div>
          <div className="investor_setup_search2">
          <div className="input_field_investor_operation">
          <label>*Invested Amount</label>
          <div className="input-error">
          <input
            type="number"
            value={invest}
            onChange={(event) => {
              setInvest(event.target.value);
              setInvestError("");
            }}
            onFocus={() => setInvestFocused(true)}
            onBlur={() => setInvestFocused(false)}
            style={{
              borderColor: investError ? 'red' : investFocused ? 'red' : '',
            }}
          />
         
          {investError && <div className="error-messages" style={{ color: 'red', fontSize:".7vw" }}>{investError}</div>}
          </div>
        </div>
            <div className="investor_targeted_period_box">
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1vw",
                  paddingBottom: "1vw",
                }}
              >
                Targeted Period:
              </div>
              <div className="investor_targeted_period_flex_row">
                <div className="input_field_investor_operation">
                  <label>Form Date:</label>
                  <input
                    type="date"
                    onChange={(event) => {
                      setTarget_from_date(event.target.value);
                    }}
                  />
                </div>
                <div className="input_field_investor_operation">
                  <label>To Date:</label>
                  <input
                    type="date"
                    onChange={(event) => {
                      setTarget_to_date(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="investor_setup_search3">
            <div >
              {/* <button onClick={handleallsave}>Save</button> */}
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
                  onClick={handleallsave}
                >
                  <SaveSvg style={{ cursor: "pointer" }} />
                </button>
                <div style={{ paddingTop: "0.4vw" }}>Save</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_investor_operation">
        <div className="investor_target_date_search">
          <div className="investor_target_date_search">
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1vw",
                paddingRight: "2vw",
              }}
            >
              Target Date Search
            </div>
            <div>
              <div className="input_field_investor_operation">
                <label>Form Date:</label>
                <input
                  type="date"
                  onChange={(event) => {
                    setFromDate(event.target.value);
                  }}
                />
              </div>
              <div className="input_field_investor_operation">
                <label>To Date:</label>
                <input
                  type="date"
                  onChange={(event) => {
                    setToDate(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input_field_investor_operation">
              <button onClick={handelClickFetchDateFormAndToSearch} >Search</button>
            </div>
          </div>
          <div className="input_field_investor_operation">
            <button onClick={handelClickshowall} >Show All</button>
          </div>
        </div>
      </div>
      <div className="third_row_div_investor_operation">
        <div className="table_wrapper_investor_operation">
          <table border={3} cellSpacing={2} cellPadding={10}>
            <tr>
              <th>ID</th>
              <th>Investor Name</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Amount</th>
              <th>Date From</th>
              <th>Date To</th>
              <th>Total Sale</th>
              <th>Percentage</th>
              <th>Investor Inco..</th>
            </tr>
            <tbody>
              {rows.length > 0 && rows.map((item) => (
                <tr key={item?.id} className="row" tabIndex="0" onClick={() => handleClickTable(item)}>
                  <td >{item.id}</td>
                  <td >{item.name}</td>
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
      <div className="forth_row_div_investor_operation">
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1vw",
          }}
        >
          Investor Update
        </div>
        <div className="container_investor_update">
          <div className="investor_update_column">
            <div className="investor_update_column1">
              <div className="input_field_investor_operation">
                <label>*ID</label>
                <input value={updateid} />
              </div>
              <div className="input_field_investor_operation">
                <label>*Investor Name</label>
                <input value={updatedname} onChange={(event) => {
                  setUpdatedName(event.target.value);
                }} />
              </div>
              <div className="input_field_investor_operation">
                <label>*Investor Address</label>
                <input value={updatedaddress} onChange={(event) => {
                  setUpdatedAddress(event.target.value);
                }} />
              </div>
              <div className="input_field_investor_operation">
                <label>*Mobile</label>
                <input value={updatedmobile} onChange={(event) => {
                  setUpdatedMobile(event.target.value);
                }} />
              </div>
            </div>
            <div className="investor_update_column2">
             
              <div className="input_field_investor_operation">
                <label>*Terget From Date</label>
                <input type="date" value={updatedtarget_from_date}
                  onChange={(event) => {
                    setUpdatedTarget_from_date(event.target.value);
                  }} />
              </div>
              <div className="input_field_investor_operation">
                <label>*Invested Amount</label>
                <input value={updatedinvest} onChange={(event) => {
                  setUpdatedInvest(event.target.value);
                }} />
              </div>
              
            </div>
            <div className="investor_update_column3">
              <div className="input_field_investor_operation">
                <label>*To Date</label>
                <input type="date"
                  onChange={(event) => {
                    setUpdatedTarget_to_date(event.target.value);
                  }} value={updatedtarget_to_date} />
              </div>
              <div className="flex_center_investor">
                {/* <button onClick={handallupdated} >Update</button> */}
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
                  onClick={handallupdated}
                >
                  <UpdateSvg style={{ cursor: "pointer" }} />
                </button>
                <div style={{ paddingTop: "0.4vw" }}>Update</div>
              </div>
              </div>
            </div>
          </div>
          <div className="custom_button_investor_operation">
            <div >
              <ExcelExport excelData={rows} fileName={"Excel Export"} />
            </div>
            <div >
              {/* <button onClick={handleReset} >Reset</button> */}
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
                  <ResetSvg style={{ cursor: "pointer" }} />
                </button>
                <div style={{ paddingTop: "0.4vw" }}>Reset</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorOpration;
