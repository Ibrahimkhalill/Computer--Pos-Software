import React from "react";
import "./sale_transaction_report.css";
import { useEffect, useState } from "react";
import ExportExcel from "../../components/ExportExcel";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Sale_Transaction_ReportSecond = () => {
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);
  const [selectedCustomerID, setSelectedCustomerID] = useState([]);
  const [allInvoice, setAllInvoice] = useState([]);
  const [selectedInvoiceNo, setSelectedInvoiceNo] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCustomerIDForSearch, setSelectedCustomerIDForSearch] =
    useState("");

  const [invoice, setInvoice] = useState([]);
  const [name, setName] = useState([]);
  const [id, setId] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [address, setAddress] = useState([]);
  const [total, setTotal] = useState([]);
  const [paid, setPaid] = useState([]);
  const [due, setDue] = useState([]);
  const [duePay, setDuePay] = useState([]);
  const [date, setDate] = useState([]);
  const [cash, setCash] = useState([]);

  const handleClickTable = (item) => {
    setInvoice(item.name);
    setName(item.cid);
    setId(item.mobile_no);
    setMobile(item.address);
    setAddress(item.sum_total);
    setTotal(item.sum_paid);
    setPaid(item.sum_due);
    setDue(item.address);
    setDuePay(item.sum_total);
    setDate(item.sum_paid);
    setCash(item.sum_due);
    setSelectedRow(item);
  };

  useEffect(() => {
    document.title = "Sale Transaction Report";
    setIsLoaded(true);
    const fetchData = async () => {
      const response_getAllSaleTable = await fetch(
        "http://194.233.87.22:5001/api/transaction_report/getTransactionReport",
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

      const response_getAllCustomer = await fetch(
        "http://194.233.87.22:5001/api/transaction_report/getAllCustomerFromTransaction",
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
        ({ customer_name: actualValue }) => actualValue
      );
      setAllCustomer([...new Set(product_getAllCustomer)]);
      console.log(product_getAllCustomer);

      //Error const response_getAllInvoice = await fetch('http://194.233.87.22:5001/api/customer/getDistinctCustomerChallanNo');
      const response_getAllInvoice = await fetch(
        "http://194.233.87.22:5001/api/transaction_report/getAllChallansFromTransaction",
        {
          method: "POST",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getAllInvoice = await response_getAllInvoice.json();
      console.log(datas_getAllInvoice);
      const product_getAllInvoice = datas_getAllInvoice.map(
        ({ challan: actualValue }) => actualValue
      );

      setAllInvoice([...new Set(product_getAllInvoice)]);
      console.log(product_getAllInvoice);
      setIsLoaded(false);
    };
    fetchData();
  }, []);

  const handleClickSearchShowAll = () => {
    setIsLoaded(true);
    const fetchData = async () => {
      const response_getTransactionTableAllData = await fetch(
        "http://194.233.87.22:5001/api/transaction_report/getTransactionReport",
        {
          method: "POST",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      console.log(
        "http://194.233.87.22:5001/api/transaction_report/getTransactionReport"
      );
      const datas_getTransactionTableAllData =
        await response_getTransactionTableAllData.json();
      console.log(datas_getTransactionTableAllData);

      setRows(datas_getTransactionTableAllData);
      console.log(datas_getTransactionTableAllData);
      setIsLoaded(false);
    };

    // Call the function
    fetchData();
  };

  const handleKeyDownCustomerName = (event) => {
    setSelectedCustomerName(event.target.value);
    const fetchData = async () => {
      const response_getSelectedCustomer = await fetch(
        "http://194.233.87.22:5001/api/transaction_report/getCustomerCIDFromTransaction?name=" +
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

      const datas_getSelectedCustomer =
        await response_getSelectedCustomer.json();
      const product_getSelectedCustomerID = datas_getSelectedCustomer.map(
        ({ cid: actualValue }) => actualValue
      );

      setSelectedCustomerID([...new Set(product_getSelectedCustomerID)]);
      console.log(product_getSelectedCustomerID);
    };

    // Call the function
    fetchData();
  };

  const handleClickSearchbyCustomerNameID = () => {
    const fetchData = async () => {
      setIsLoaded(true);
      const response_getSelectedCustomerbyNameID = await fetch(
        "http://194.233.87.22:5001/api/transaction_report/getTransactionsByCustomerAndCID?name=" +
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
      setIsLoaded(false);
    };

    // Call the function
    fetchData();
  };

  const handleKeyDownInvoiceNo = (event) => {
    setSelectedInvoiceNo(event.target.value);

    const fetchData = async () => {
      setIsLoaded(true);

      const response_getSelectedInvoice = await fetch(
        "http://194.233.87.22:5001/api/customer/getDistinctCustomerChallanNo" +
          selectedInvoiceNo,
        {
          method: "POST",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedInvoice = await response_getSelectedInvoice.json();
      console.log(datas_getSelectedInvoice);
      const product_getSelectedInvoiceNo = datas_getSelectedInvoice.map(
        ({ challan_no: actualValue }) => actualValue
      );

      setSelectedInvoiceNo([...new Set(product_getSelectedInvoiceNo)]);
      console.log(product_getSelectedInvoiceNo);
      setIsLoaded(false);
    };

    // Call the function
    fetchData();
  };

  const handleClickSearchbyInvoiceNo = (event) => {
    setIsLoaded(true);
    const fetchData = async () => {
      const response_getSelectedInvoiceForSearch = await fetch(
        "http://194.233.87.22:5001/api/transaction_report/getTransactionsByChallanNo?challan=" +
          selectedInvoiceNo,
        {
          method: "POST",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      //console.log('link');
      const datas_getSelectedInvoiceForSearch =
        await response_getSelectedInvoiceForSearch.json();
      console.log(datas_getSelectedInvoiceForSearch);

      setRows(datas_getSelectedInvoiceForSearch);
      setIsLoaded(false);
    };

    // Call the function
    fetchData();
  };

  const handleDelete = () => {
    if (!selectedRow) {
      alert("Please select a row first!");
      return;
    }

    const deleteData = async () => {
      setIsLoaded(true);
      await fetch(
        "http://194.233.87.22:5001/api/transaction_report/deleteTransactionByChallanAndCashMemo?challan=" +
          selectedRow.challan +
          "&cash_mamo_no=" +
          selectedRow.cash_mamo_no,
        {
          method: "DELETE",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      sleep(1000).then(() => {
        setIsLoaded(false);
      });

      setIsLoaded(true);
      const response_getTransactionTableAllDataAfterDelete = await fetch(
        "http://194.233.87.22:5001/api/transaction_report/getTransactionReport",
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
      
      setIsLoaded(false);
      sleep(1000).then(() => {
        setRows(datas_getTransactionTableAllDataAfterDelete);
        console.log(datas_getTransactionTableAllDataAfterDelete);
      });
      toast.success("Delete Successfull.")
    };

    // Call the function
    deleteData();
  };

  return (
    <div className="full_div_sale_transaction_page">
      <div className="first_row_div_sale_transaction_page">
        <div className="container_search_sale_transaction_page">
          <div className="container_search_column-1_sale_transaction_page">
            <div>
              <label className="label_sale_tr_report_sale_transaction_page">
                Customer
              </label>
              <input
                className="input_sale_transaction_page"
                id="customer_name_sale_transaction"
                onSelect={handleKeyDownCustomerName}
                onChange={(event) =>
                  setSelectedCustomerName(event.target.value)
                }
                list={"selectcustomername"}
              />
              <datalist id="selectcustomername">
                {allCustomer.length > 0 &&
                  allCustomer.map((allCustomer, index) => {
                    return <option key={index}>{allCustomer}</option>;
                  })}
              </datalist>

              <label className="label_sale_tr_report_sale_transaction_page">
                ID
              </label>
              <select
                className="input_sale_transaction_page"
                id="customer_id_sale_transaction"
                onSelect={(event) =>
                  setSelectedCustomerIDForSearch(event.target.value)
                }
                onChange={(event) =>
                  setSelectedCustomerIDForSearch(event.target.value)
                }
              >
                {selectedCustomerID.length > 0 &&
                  selectedCustomerID.map((selectedCustomerID, index) => {
                    return <option key={index}>{selectedCustomerID}</option>;
                  })}
              </select>
              <button
                className="button_sale_transaction_page"
                onClick={handleClickSearchbyCustomerNameID}
              >
                Search
              </button>
            </div>
          </div>

          <div className="container_search_column-2_sale_transaction_page">
            <label className="label_sale_tr_report_sale_transaction_page">
              Invoice No
            </label>
            <input
              className="input_sale_transaction_page"
              id="search_by_invoice"
              onSelect={(event) => setSelectedInvoiceNo(event.target.value)}
              onChange={(event) => setSelectedInvoiceNo(event.target.value)}
              list={"select_invoice_no"}
            />
            <datalist id="select_invoice_no">
              {allInvoice.length > 0 &&
                allInvoice.map((allInvoice, index) => {
                  return <option key={index}>{allInvoice}</option>;
                })}
            </datalist>

            <button
              className="button_sale_transaction_page"
              type="button"
              onClick={(event) =>
                handleClickSearchbyInvoiceNo(event.target.value)
              }
            >
              Search
            </button>
          </div>
        </div>

        <div className="container_search_column-3_sale_transaction_page">
          <button
            className="show_all_button_sale_transaction_page"
            onClick={handleClickSearchShowAll}
          >
            Show All
          </button>
          <div className="last_div_sale_transaction">
            {/* <div className="delete_item_sale_transaction">

            <button
              className="button_sale_transaction_page"
              onClick={handleDelete}
            >
              <MdDelete/>
              
            </button>
            <span>Delete</span>
            </div> */}
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
                      cursor:"pointer"
                    }}
                    type="submit"
                    onClick={handleDelete}
                  >
                    <MdDelete className="delete_colorsale"/>
                  </button>
                  <div style={{ paddingTop: "0.5vw" }}>Delete</div>
                </div>
            <div>
              <ExportExcel excelData={rows} fileName={"Excel Export"} />
            </div>
          </div>
        </div>
      </div>
      <span
        style={{ fontSize: "1.5vw", fontWeight: "bold", marginLeft: "2vw" }}
      >
        Invoice Base sales Transaction Report
      </span>
      <div className="second_row_div_sale_transaction_page">
        <div className="table-wrapper_sale_transaction_page">
          {isLoaded ? (
            <div className="rotating_lines_sale_transaction_page">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="50"
                visible={true}
              />
            </div>
          ) : (
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>Invoice</th>
                <th>Customer Name</th>
                <th>ID</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Due </th>
                <th>Due Pay</th>
                <th>Date</th>
                <th>Cash Memo </th>
              </tr>
              <tbody>
                {rows.length > 0 &&
                  rows.map((item) => (
                    <tr
                      className="row_sale_transaction_page"
                      tabIndex="0"
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
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Sale_Transaction_ReportSecond;
