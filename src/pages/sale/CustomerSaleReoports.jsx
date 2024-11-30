import React from "react";
import "./customer-sale-reports.css";
import { useState, useEffect } from "react";
import CustomerSaleExportExcel from "../../components/ExportExcel";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { ReactComponent as ResetSvg } from "../svg/reset.svg";
import { MdDelete } from "react-icons/md";

const CustomerSaleReoports = () => {
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const [selectedCustomerName, setSelectedCustomerName] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);
  const [selectedCustomerID, setSelectedCustomerID] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Table data entry on input field useState
  const [customerTable, setCustomerTable] = useState([]);
  const [cidTable, setCidTable] = useState([]);
  const [phoneTable, setPhoneTable] = useState([]);
  const [addressTable, setAddressTable] = useState([]);
  const [totalPaidTable, setTotalPaidTable] = useState([]);
  const [paidTable, setPaidTable] = useState([]);
  const [dueTable, setDueTable] = useState([]);
  // Select shop
  const [selectedShop, setSelectedShop] = useState([]);

  // Due Callection
  const [selectEmployeeCallection, setSelectEmployeeCallection] = useState([]);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response_getAllSaleTable = await fetch(
          "http://194.233.87.22:5001/api/customer/getSelectedDataOfCustomerByCIDAndGroupBy",
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
        const response_getAllCustomer = await fetch(
          "http://194.233.87.22:5001/api/customer/getDistinctCustomerName",
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        const datas_getAllCustomer = await response_getAllCustomer.json();
        console.log(datas_getAllCustomer);
        const product_getAllCustomer = datas_getAllCustomer.map(
          ({ name: actualValue }) => actualValue
        );
        setAllCustomer([...new Set(product_getAllCustomer)]);

        console.log(product_getAllCustomer);
        // fetch name
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  // Customer name field search
  const handleKeyDownCustomerName = (event) => {
    setSelectedCustomerName(event.target.value);
    // setIsLoading(true);
    const fetchData = async () => {
      const response_getSelectedCustomer = await fetch(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerNonZeroCID?customername=" +
          selectedCustomerName,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      console.log(response_getSelectedCustomer);
      const datas_getSelectedCustomer =
        await response_getSelectedCustomer.json();
      console.log(datas_getSelectedCustomer);
      const product_getSelectedCustomerID = datas_getSelectedCustomer.map(
        ({ cid: actualValue }) => actualValue
      );

      setSelectedCustomerID([...new Set(product_getSelectedCustomerID)]);
      console.log(product_getSelectedCustomerID);
      // setIsLoading(false);
    };

    fetchData();
  };

  // Searching customer auto genarated Name and Id search
  const handleClickSearchbyCustomerNameID = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getSelectedCustomerbyNameID = await fetch(
        "http://194.233.87.22:5001/api/customer/getSelectedDataOfCustomerByNameAndIDGroupBy?name=" +
          selectedCustomerName +
          "&id=" +
          selectedCustomerID,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedCustomerbyNameID =
        await response_getSelectedCustomerbyNameID.json();

      console.log(datas_getSelectedCustomerbyNameID);

      setRows(datas_getSelectedCustomerbyNameID);
      setIsLoading(false);
    };

    // Call the function
    fetchData();
  };

  // Show all data from data base

  const handleClickSearchShowAll = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getCustomerTableAllData = await fetch(
        "http://194.233.87.22:5001/api/customer/getSelectedDataOfCustomerByCIDAndGroupBy",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getCustomerTableAllData =
        await response_getCustomerTableAllData.json();
      console.log(datas_getCustomerTableAllData);
      setRows(datas_getCustomerTableAllData);
      console.log(datas_getCustomerTableAllData);
      setIsLoading(false);
    };

    fetchData();
  };

  // Select Shop name
  const handleClickSearchByShopName = () => {
    const fetchData = async () => {
      const response_getSelectedShopName = await fetch(
        "http://194.233.87.22:5001/api/shop_set/getAllDistinctShopName",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedShopName =
        await response_getSelectedShopName.json();

      console.log(datas_getSelectedShopName);

      setSelectedShop(datas_getSelectedShopName);
    };

    fetchData();
  };

  useEffect(() => {
    handleClickSearchByShopName();
  }, []);

  // Select Employee Callection name
  const fetchEmployeeNames = async () => {
    try {
      const response_getSelectedEmployeeName = await fetch(
        "http://194.233.87.22:5001/api/employee/getAllEmployeeName",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedEmployeeName =
        await response_getSelectedEmployeeName.json();
      setSelectEmployeeCallection(datas_getSelectedEmployeeName);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectedEmployeeNameId = async (e) => {
    const name = e.target.value;
    setSelectedEmployeeName(name);

    try {
      const response_getSelectedEmployeeNameId = await fetch(
        `http://194.233.87.22:5001/api/employee/getEmployeeIDByName?name=${name}`,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const data_getSelectedEmployeeName =
        await response_getSelectedEmployeeNameId.json();
      if (data_getSelectedEmployeeName.length > 0) {
        const employeeId = data_getSelectedEmployeeName[0].id;
        setSelectedEmployeeId(employeeId);
      } else {
        setSelectedEmployeeId("Not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Clicking table data show thous data in input field
  const [selectedID, setSelectedID] = useState(null);
  const handleClickTable = (item) => {
    setSelectedID(item.cid);
    setCustomerTable(item.name);
    setCidTable(item.cid);
    setPhoneTable(item.mobile_no);
    setAddressTable(item.address);
    setTotalPaidTable(item.sum_total);
    setPaidTable(item.sum_paid);
    setDueTable(item.sum_due);
  };

  // Price related work
  // const totalPrice = rows.reduce((total, item) => total + item.sum_total, 0);
  // const totalPaid = rows.reduce((paid, item) => paid + item.sum_paid, 0);
  // const totalDue = rows.reduce((due, item) => due + item.sum_due, 0);

  // calculation

  const totalPrice = (rows.length > 0 && rows
    .reduce((totaltaka, item) => {
      if (
        item.sum_total !== undefined &&
        item.sum_total !== null &&
        item.sum_total !== ""
      ) {
        totaltaka += Number(item.sum_total);
      }
      return totaltaka;
    }, 0)
    .toFixed(2));

  const totalPaid = (rows.length > 0 && rows
    .reduce((paidtaka, item) => {
      if (
        item.sum_paid !== undefined &&
        item.sum_paid !== null &&
        item.sum_paid !== ""
      ) {
        paidtaka += Number(item.sum_paid);
      }
      return paidtaka;
    }, 0)
    .toFixed(2));

  const totalDue =(rows.length > 0 && rows
    .reduce((duetaka, item) => {
      if (
        item.sum_due !== undefined &&
        item.sum_due !== null &&
        item.sum_due !== ""
      ) {
        duetaka += Number(item.sum_due);
      }
      return duetaka;
    }, 0)
    .toFixed(2));

  // Reset button work

  const HandleClickResetButton = () => {
    setCustomerTable([]);
    setCidTable([]);
    setPhoneTable([]);
    setAddressTable([]);
    setTotalPaidTable([]);
    setPaidTable([]);
    setDueTable([]);
  };

  return (
    <div className="full_div_customer_sale_report">
      <div className="first_row_div_customer_sale_report">
        <div className="container_search_column1_customer_sale_report">
          <div
            style={{
              fontWeight: "bold",
              paddingBottom: "0.6vw",
              color: "green",
              fontSize: "1vw",
            }}
          >
            This Feature Work Only for Permanent Customer
          </div>
          <div className="container_search_customer_sale_report">
            <div className="search_customer">
              <label
                className="label_field_customer_sale"
                for="customer_name_by_sales_report_search"
              >
                Customer
              </label>
              <input
                className="input_field_customer_sale_report"
                id="customer_name_by_sales_report_search"
                onSelect={handleKeyDownCustomerName}
                onChange={(event) =>
                  setSelectedCustomerName(event.target.value)
                }
                list={"selectcustomername"}
              />
              <datalist id="selectcustomername">
                 {allCustomer.length > 0 && allCustomer.map((allCustomer, index) => {
                  return <option key={index}>{allCustomer}</option>;
                })}
              </datalist>

              <label
                className="label_field_customer_sale"
                for="customer_id_by_sales_report_search"
              >
                ID
              </label>
              <select
                className="select_field_customer_sale_report"
                id="customer_id_by_sales_report_search"
                onSelect={(event) => setSelectedCustomerID(event.target.value)}
              >
                {selectedCustomerID.length > 0 && selectedCustomerID.map((customerID, index) => {
                  return <option key={index}>{customerID}</option>;
                })}
              </select>

              <button
                className="button_field_customer_sale_report"
                type="submit"
                onClick={handleClickSearchbyCustomerNameID}
              >
                Search
              </button>
            </div>
            <div className="container_search_column2_customer_sale_report">
              <button
                className="button_field_customer_sale_report"
                type="submit"
                onClick={handleClickSearchShowAll}
              >
                Show All
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_customer_sale_report loader-container_customer_sale_report">
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="64"
            visible={true}
          />
        ) : (
          <div className="table_wrapper_customer_sale_report">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr className="row" tabindex="0">
                <th>Customer Name</th>
                <th>Customer ID</th>
                <th>Moblile No.</th>
                <th>Address</th>
                <th>Total Product Price</th>
                <th>Total Discount</th>
                <th>Total Service/Extra Charge</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Due</th>
              </tr>

              <tbody>
                {rows.length > 0 && rows.map((item) => (
                  <tr
                  className={
                    selectedID === item.cid ? "rows selected" : "rows"
                  }
                    tabindex="0"
                    onClick={() => handleClickTable(item)}
                    key={item.id}
                  >
                    <td>{item.name}</td>
                    <td>{item.cid}</td>
                    <td>{item.mobile_no}</td>
                    <td>{item.address}</td>
                    <td>{item.sum_total_product_price}</td>
                    <td>{item.sum_discount}</td>
                    <td>{item.sum_extra_charge}</td>
                    <td>{item.sum_total}</td>
                    <td>{item.sum_paid}</td>
                    <td>{item.sum_due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="third_row_div_customer_sale_report">
        <div className="container_view_update_customer_sale_report">
          <div className="container_view_customer_sale_report">
            <div className="input-field_customer_sale">
              <label
                className="label_field_customer_sale"
                for="customer_total_money"
              >
                Total
              </label>
              <input
                style={{ fontSize: "1vw", width: "8vw", textAlign: "center" }}
                className="input_field_customer_sale_report"
                id="customer_total_money"
                value={totalPrice}
                readOnly
              />
            </div>
            <div className="input-field_customer_sale">
              <label
                className="label_field_customer_sale"
                for="customer_total_paid"
              >
                Paid
              </label>
              <input
                style={{ fontSize: "1vw", width: "8vw", textAlign: "center" }}
                className="input_field_customer_sale_report"
                id="customer_total_paid"
                value={totalPaid}
                readOnly
              />
            </div>
            <div className="input-field_customer_sale">
              <label
                className="label_field_customer_sale"
                for="customer_total_due"
              >
                Due
              </label>
              <input
                style={{ fontSize: "1vw", width: "8vw", textAlign: "center" }}
                className="input_field_customer_sale_report"
                id="customer_total_due"
                value={totalDue}
                readOnly
              />
            </div>

            <div>
              <CustomerSaleExportExcel
                excelData={rows}
                fileName={"Excel Export"}
              />
            </div>
          </div>
          <div className="container_update_customer_sale_report">
            <div className="container_update_column1_customer_sale_report">
              <div className="input_feild_customer_sale">
                <label className="label_field_customer_sale">
                  Customer Name
                </label>
                <input
                  className="input_field_customer_sale_report"
                  id="reset_update_by_product_sale_price"
                  value={customerTable}
                />
              </div>
              <div className="input_feild_customer_sale">
                <label className="label_field_customer_sale">Customer ID</label>
                <input
                  className="input_field_customer_sale_report"
                  id="reset_update_by_product_sale_price"
                  value={cidTable}
                />
              </div>
              <div className="input_feild_customer_sale">
                <label className="label_field_customer_sale">
                  Mobile / Phone
                </label>
                <input
                  className="input_field_customer_sale_report"
                  value={phoneTable}
                />
              </div>
              <div className="input_feild_customer_sale">
                <label className="label_field_customer_sale">Address</label>
                <input
                  className="input_field_customer_sale_report"
                  value={addressTable}
                />
              </div>
            </div>
            <div className="container_update_column2_customer_sale_report">
              <div>
                <div className="input_feild_customer_sale">
                  <label className="label_field_customer_sale">Total *</label>
                  <input
                    className="input_field_customer_sale_report"
                    value={totalPaidTable}
                  />
                </div>
                <div className="input_feild_customer_sale">
                  <label className="label_field_customer_sale">Paid *</label>
                  <input
                    className="input_field_customer_sale_report"
                    value={paidTable}
                  />
                </div>
                <div className="input_feild_customer_sale">
                  <label className="label_field_customer_sale">Due</label>
                  <input
                    className="input_field_customer_sale_report"
                    value={dueTable}
                  />
                </div>
                <div className="input_feild_customer_sale">
                  <select
                  style={{width:"10vw"}}
                    className="select_field_customer_sale_report"
                    onClick={handleClickSearchByShopName}
                  >
                    {selectedShop.map((item) => (
                      <option key={item.id}>{item.shop_name}</option>
                    ))}
                  </select>
                  <button style={{width:"8vw"}} className="button_field_customer_sale_report">
                    View Full History
                  </button>
                </div>
              </div>
            </div>
            <div className="container_update_column3_customer_sale_report">
              {/* <button
                className="button_field_customer_sale_report"
                onClick={HandleClickResetButton}
              >
                Reset
              </button> */}
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
                      width: "3vw",
                      backgroundColor: "#F5F5DC",
                      outline: "none",
                      border: "none",
                      borderRadius: ".2vw",
                      boxShadow: "0 5px #999",
                    }}
                    type="submit"
                    onClick={HandleClickResetButton}
                  >
                    <ResetSvg />
                  </button>
                  <div style={{ paddingTop: "0.4vw" }}>Reset</div>
                </div>
            </div>
          </div>
        </div>
        <div className="container_due_payment_customer_sale_report">
          <div style={{fontSize:"1.5vw", fontWeight:"bold"}}>Customer Due Payment</div>
          <div className="container_due_payment_customer_sale_report_boxs">
            <div className="container_due_payment_customer_sale_report_box1">
              <div className="input_field_customer_sale">
                <label className="label_field_customer_sale">
                  Payment Type *
                </label>
                <div className="custom_select">
                  <select className="select_field_customer_sale_report">
                    <option value="Hand Cash">Hand Cash</option>
                    <option value="Bank Payment">Bank Payment</option>
                  </select>
                </div>
              </div>
              <div className="input_field_customer_sale">
                <label className="label_field_customer_sale">Cheque No</label>
                <input className="input_field_customer_sale_report" />
              </div>
              <div className="input_field_customer_sale">
                <label className="label_field_customer_sale">Bank Name</label>
                <input className="input_field_customer_sale_report" />
              </div>
              <div className="input_field_customer_sale">
                <label className="label_field_customer_sale">TK *</label>
                <input className="input_field_customer_sale_report" />
              </div>
              <div className="input_field_customer_sale">
                <label className="label_field_customer_sale">Date</label>
                <input
                  className="input_field_customer_sale_report"
                  type="date"
                />
              </div>
              <div className="input_field_customer_sale">
                <label className="label_field_customer_sale">
                  Collection By
                </label>
                <div className="custom_select">
                  <select
                    className="select_field_customer_sale_report"
                    onChange={handleSelectedEmployeeNameId}
                    onClick={fetchEmployeeNames}
                  >
                    {selectEmployeeCallection.map((employee) => (
                      <option key={employee.id} value={employee.name}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input_field_customer_sale">
                <label className="label_field_customer_sale">Employee ID</label>
                <div className="custom_select">
                  <input
                    className="input_field_customer_sale_report"
                    value={selectedEmployeeId}
                    readOnly
                  />
                </div>
              </div>
              <div className="input_field_customer_sale">
                <label className="label_field_customer_sale">Area</label>
                <input className="input_field_customer_sale_report" />
              </div>
            </div>
            <div className="container_due_payment_customer_sale_report_box2">
            <button
            style={{ width: "7vw", height: "3vw" }}
            className="button_field_customer_sale_report btn_customer_sale_report"
          >
            Submit
          </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CustomerSaleReoports;
