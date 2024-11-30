import React from "react";
import "./services.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Services = () => {
  const location = useLocation();
  // product related state
  const [productCode, setProductCode] = useState([]);
  const [productCodeList, setProductCodeList] = useState([]);
  const [productName, setProductName] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [serialNumber, setSerialNumber] = useState(1);
  const [tableData, setTableData] = useState([]);
  // Customer releted State
  const [customerName, setCustomerName] = useState([]);
  const [customerID, setCustomerID] = useState([]);
  const [customerMobile, setCustomerMobile] = useState([]);
  const [customerAddress, setCustomerAddress] = useState([]);
  const [customerTotal, setCustomerTotal] = useState([]);
  const [customerPaid, setCustomerPaid] = useState([]);
  const [customerDue, setCustomerDue] = useState([]);

  const [rows, setRows] = useState([]);
  const [customerServiceId, setCustomerServiceId] = useState([]);
  const [serviceId, setServiceId] = useState("");
  // current date
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'
    return formattedDate;
  });

  console.log(productCode, productName, quantity);

  // Customer Informartion

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        const product_getAllCustomer = datas_getAllCustomer.map(
          ({ name: actualValue }) => actualValue
        );
        setRows([...new Set(product_getAllCustomer)]);

        console.log(product_getAllCustomer);
        // fetch name
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleKeyDownCustomerName = (event) => {
    setCustomerName(event.target.value);
    const fetchData = async () => {
      // selected customer id
      const response_getSelectedCustomerId = await fetch(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerID?customername=" +
          customerName,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getSelectedCustomerId =
        await response_getSelectedCustomerId.json();

      const product_getSelectedCustomerID = datas_getSelectedCustomerId.map(
        ({ cid: actualValue }) => actualValue
      );

      setCustomerID([...new Set(product_getSelectedCustomerID)]);
      // select mobile

      const response_getSelectedCustomerMobile = await fetch(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerMobile?customername=" +
          customerName,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getSelectedCustomerMobile =
        await response_getSelectedCustomerMobile.json();

      const product_getSelectedCustomerMobile =
        datas_getSelectedCustomerMobile.map(
          ({ mobile_no: actualValue }) => actualValue
        );

      setCustomerMobile([...new Set(product_getSelectedCustomerMobile)]);

      // select address
      const response_getSelectedCustomerAddress = await fetch(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerAddress?customername=" +
          customerName,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getSelectedCustomerAddress =
        await response_getSelectedCustomerAddress.json();

      const product_getSelectedCustomerAddress =
        datas_getSelectedCustomerAddress.map(
          ({ address: actualValue }) => actualValue
        );

      setCustomerAddress([...new Set(product_getSelectedCustomerAddress)]);

      // Select Total
      const response_getSelectedCustomerTotal = await fetch(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerTotal?customername=" +
          customerName,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getSelectedCustomerTotal =
        await response_getSelectedCustomerTotal.json();

      const product_getSelectedCustomerTotal =
        datas_getSelectedCustomerTotal.map(
          ({ total: actualValue }) => actualValue
        );

      setCustomerTotal([...new Set(product_getSelectedCustomerTotal)]);

      // Select Paid
      const response_getSelectedCustomerPaid = await fetch(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerPaid?customername=" +
          customerName,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getSelectedCustomerPaid =
        await response_getSelectedCustomerPaid.json();

      const product_getSelectedCustomerPaid = datas_getSelectedCustomerPaid.map(
        ({ paid: actualValue }) => actualValue
      );

      setCustomerPaid([...new Set(product_getSelectedCustomerPaid)]);

      // select due
      const response_getSelectedCustomerDue = await fetch(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerDue?customername=" +
          customerName,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getSelectedCustomerDue =
        await response_getSelectedCustomerDue.json();

      const product_getSelectedCustomerDue = datas_getSelectedCustomerDue.map(
        ({ due: actualValue }) => actualValue
      );

      setCustomerDue([...new Set(product_getSelectedCustomerDue)]);
    };

    fetchData();
  };
  // Total

  const totalPrice = customerTotal.reduce(
    (total, item) => total + item.total,
    0
  );
  const totalPaid = customerPaid.reduce((paid, item) => paid + item.paid, 0);
  const totalDue = customerDue.reduce((due, item) => due + item.due, 0);

  // Handle Product Code
  const handleProductCode = () => {
    const fetchData = async () => {
      try {
        const response_getProductCode = await fetch(
          "http://194.233.87.22:5001/api/stock/getDistinctProductCode",
          {
            method: "POST",
            headers: {
              "x-access-token": location.state.accessToken,
            },
          }
        );

        if (!response_getProductCode.ok) {
          throw new Error("Failed to fetch product codes");
        }

        const datas_getProductCode = await response_getProductCode.json();

        setProductCodeList(datas_getProductCode);
      } catch (error) {
        console.error("Error fetching product codes:", error);
      }
    };

    fetchData();
  };

  // Insert Product Data Into Table
  const handleClickProductTable = () => {
    const newRow = {
      serial: serialNumber,
      productCode: productCode,
      productName: productName,
      quantity: quantity,
    };
    setTableData([...tableData, newRow]);
    setProductCode(""); // Clear the input fields
    setCustomerName("");
    setQuantity("");
    setSerialNumber(serialNumber + 1);
  };

  // Handle Service Id
  const handleServiceId = () => {
    const fetchData = async () => {
      try {
        const response_getServiceId = await fetch(
          "http://194.233.87.22:5001/api/service_report/getLastServiceId",
          {
            method: "POST",
            headers: {
              "x-access-token": location.state.accessToken,
            },
          }
        );

        const datas_getServiceId = await response_getServiceId.json();
        setCustomerServiceId(datas_getServiceId);
      } catch (error) {
        console.error("Error fetching product codes:", error);
      }
    };

    fetchData();
  };

  // Current date

  return (
    <div className="full_div_service">
      <div className="first_row_div_service">
        <div className="add_to_cart_service">
          <div>
            <div className="input_field_service">
              <label className="label_customer_service">*Product Code</label>
              <input
                className="input_add_to_cart_service"
                value={productCode}
                onChange={(event) => {
                  setProductCode(event.target.value);
                }}
                onSelect={handleProductCode}
                list="options"
                autoComplete="off"
              />
              <datalist id="options">
                {productCodeList.map((product, index) => (
                  <option key={index} value={product.product_code} />
                ))}
              </datalist>
            </div>
            <div className="input_field_service">
              <label className="label_customer_service">*Product Name</label>
              <input
                className="input_add_to_cart_service"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              ></input>
            </div>
            <div className="input_field_service">
              <label className="label_customer_service">*Quantity</label>
              <input
                className="input_add_to_cart_service"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="add_cart_button_div">
            <button
              className="button_addCart"
              onClick={handleClickProductTable}
            >
              +
            </button>
            <h5 className="header_button">Add to Cart</h5>
          </div>
        </div>
        <div className="customer_information_service">
          <div className="customer_information_service_div_1">
            <h4 className="header_customer_information_service">
              Customer Information
            </h4>
            <div className="permanent_customer_with_check_box">
              <h6 className="header_customer_information_service">
                Permanent Customer
              </h6>
              <input type="checkbox" />
            </div>
            <div className="input_field_service">
              <label className="label_customer_service">*Name</label>
              <input
                className="input_customer"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                onSelect={handleKeyDownCustomerName}
                list="customname"
                autoComplete="off"
              />
              <datalist id="customname">
                {rows.map((cname, index) => {
                  return <option key={index}>{cname}</option>;
                })}
              </datalist>
            </div>

            <div className="input_field_service">
              <label className="label_customer_service">*ID</label>
              {/* <select className="select_customer lg"></select> */}
              <select
                className="select_customer lg"
                onSelect={(event) => setCustomerID(event.target.value)}
              >
                {customerID.map((customerid, index) => {
                  return <option key={index}>{customerid}</option>;
                })}
              </select>
              <button className="button_permanent_customer sm">+</button>
            </div>

            <div className="input_field_service">
              <label className="label_customer_service">*Mobile</label>
              <select
                className="select_customer"
                onSelect={(event) => setCustomerMobile(event.target.value)}
              >
                {customerMobile.map((customermobile, index) => {
                  return <option key={index}>{customermobile}</option>;
                })}
              </select>
            </div>
            <div className="input_field_service">
              <label className="label_customer_service">*Address</label>
              <select
                className="select_customer"
                onSelect={(event) => setCustomerAddress(event.target.value)}
              >
                {customerAddress.map((customeraddress, index) => {
                  return <option key={index}>{customeraddress}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="customer_information_service_div_2">
            <div className="input_field_service">
              <label className="label_customer_service">Total:</label>
              <select
                className="select_customer"
                onSelect={(event) => setCustomerTotal(event.target.value)}
              >
                {customerTotal.map((customertotal, index) => {
                  return <option key={index}>{customertotal}</option>;
                })}
              </select>
            </div>
            <div className="input_field_service">
              <label className="label_customer_service">Paid:</label>
              <select
                className="select_customer"
                onSelect={(event) => setCustomerPaid(event.target.value)}
              >
                {customerPaid.map((customerpaid, index) => {
                  return <option key={index}>{customerpaid}</option>;
                })}
              </select>
            </div>
            <div className="input_field_service">
              <label className="label_customer_service">Due:</label>
              <select
                className="select_customer"
                onSelect={(event) => setCustomerDue(event.target.value)}
              >
                {customerDue.map((customerdue, index) => {
                  return <option key={index}>{customerdue}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_service">
        <div className="row_2_column_1_service">
          <div className="table_wrapper_service">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Product Code</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.serial}</td>
                    <td>{data.productCode}</td>
                    <td>{data.productName}</td>
                    <td>{data.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row_2_column_2_service">
          <h5 className="header_service_summary">Service Summary</h5>
          <div className="input_field_service">
            <label className="label_customer_service">*Service ID</label>
            <input
              className="input_customer"
              value={serviceId}
              onChange={(event) => {
                setServiceId(event.target.value);
              }}
              onSelect={handleServiceId}
              list="serviceid"
              autoComplete="off"
            />
            <datalist id="serviceid">
              {customerServiceId.map((service, index) => (
                <option key={index} value={service.last_service_id} />
              ))}
            </datalist>
          </div>
          <div className="input_field_service">
            <label className="label_customer_service">
              Service Devices Name
            </label>
            <input className="input_customer"></input>
          </div>
          <div className="input_field_service service_problem">
            <label className="label_customer_service">Problem</label>
            <textarea cols="30" rows="5"></textarea>
          </div>
          <div className="input_field_service">
            <label className="label_customer_service">*Service Charge</label>
            <input className="input_customer"></input>
          </div>
          <div className="input_field_service">
            <label className="label_customer_service">*Paid</label>
            <input className="input_customer"></input>
          </div>
          <div className="input_field_service">
            <label className="label_customer_service">*Due</label>
            <input className="input_customer"></input>
          </div>
          <div className="input_field_service">
            <label className="label_customer_service">*Recive Date</label>
            <input
              className="input_customer"
              type="date"
              value={currentDate}
              onChange={(event) => setCurrentDate(event.target.value)}
            ></input>
          </div>
          <div className="input_field_service">
            <label className="label_customer_service">*Delivery Date</label>
            <input className="input_customer" type="date"></input>
          </div>
          <div className="servies_button">
            <div className="approve_summary_service_button">
              <button className="button_addCart"> Approve Entry</button>
            </div>
            <div className="reset_summary_service_button">
              <button className="button_addCart"> Reset </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
