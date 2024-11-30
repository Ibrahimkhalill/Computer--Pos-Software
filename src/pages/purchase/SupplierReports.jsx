import React from "react";
import "./supplier-reports.css";
import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExportExcel from "../../components/ExportExcel";
import { ReactComponent as ResetSvg } from "../svg/reset.svg";
import { ReactComponent as UpdateSvg } from "../svg/update.svg";

const SupplierReports = () => {
  const [rows, setRows] = useState([]);
  const [dates, setDates] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [allInvoice, setAllInvoice] = useState([]);
  const [selectedInvoiceNo, setSelectedInvoiceNo] = useState([]);
  const [allSupplier, setAllSupplier] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState([]);
  // Update and Recet
  const [purchaseId, setPurcheseId] = useState([]);
  const [purchase, setPurchese] = useState("Purchese Due Payment");

  const [invoiceNo, setInvoiceNo] = useState([]);
  const [entryDate, setEntryDate] = useState([]);
  const [supplierName, setSupplierName] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [address, setAddress] = useState([]);
  const [purchaseDate, setPurchaseDate] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [paid, setPaid] = useState([]);
  const [due, setDue] = useState([]);
  const [TK, setTK] = useState([]);
  const [paymentOption, setPaymentOption] = useState("");
  const [shopName, setShopName] = useState([]);
  const [shop, setShop] = useState("");
  const [zeroTaka, setZeroTaka] = useState(0);
  const [none, setNone] = useState("None");
  const payment = ["Hand Cash", "Bank Payment"];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchSupplierData = async () => {
    try {
      const response_getAllSupplierTable = await fetch(
        "http://194.233.87.22:5001/api/supplier/getAllSupplier",
        {
          method: "POST",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getAllSupplierTable =
        await response_getAllSupplierTable.json();
      setRows(datas_getAllSupplierTable);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchSupplierData();
  }, []);

  // Show all
  const handelClickFetchShowAll = () => {
    setIsLoaded(true);
    const fetchData = async () => {
      try {
        const response_getAllSupplierTable = await fetch(
          "http://194.233.87.22:5001/api/supplier/getAllSupplier",
          {
            method: "POST",

            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );
        const datas_getAllSupplierTable =
          await response_getAllSupplierTable.json();
        setRows(datas_getAllSupplierTable);
        setIsLoaded(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  };

  // All invoice Search form invoice

  const handelClickFetchShowAllInvoice = () => {
    setIsLoaded(true);
    const fetchData = async () => {
      try {
        const response_getAllSupplierTable = await fetch(
          "http://194.233.87.22:5001/api/supplier/getDistinctChallans",
          {
            method: "POST",

            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );
        const datas_getAllSupplierTable =
          await response_getAllSupplierTable.json();
        setAllInvoice(datas_getAllSupplierTable);
        setIsLoaded(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  };

  // All Supplier Search form supplier
  const handelClickFetchShowAllSupplier = () => {
    setIsLoaded(true);
    const fetchData = async () => {
      try {
        const response_getAllSupplierTable = await fetch(
          "http://194.233.87.22:5001/api/supplier/getDistinctSuppliers",
          {
            method: "POST",

            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );
        const datas_getAllSupplierTable =
          await response_getAllSupplierTable.json();
        setAllSupplier(datas_getAllSupplierTable);
        setIsLoaded(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  };

  useEffect(() => {
    handelClickFetchShowAllInvoice();
    handelClickFetchShowAllSupplier();
    handelClickFetchShopName();
  }, []);

  //  Date search
  const handelClickFetchDate = () => {
    setIsLoaded(true);
    const fetchData = async () => {
      const response_getSupplierReportDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/supplier/getSupplierByOnlyDate?date=" +
          dates,
        {
          method: "POST",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSupplierReportDateSearchTableAllData =
        await response_getSupplierReportDateSearchTableAllData.json();
      console.log(datas_getSupplierReportDateSearchTableAllData);
      setRows(datas_getSupplierReportDateSearchTableAllData);
      console.log(datas_getSupplierReportDateSearchTableAllData);
      setIsLoaded(false);
    };
    fetchData();
  };

  const handleDateChange = (event) => {
    setDates(event.target.value);
    console.log(event.target.value);
  };

  // Invoice search
  const handleClickSearchbyInvoiceNo = () => {
    setIsLoaded(true);
    const fetchData = async () => {
      const response_getSelectedInvoiceForSearch = await fetch(
        "http://194.233.87.22:5001/api/supplier/getSupplierByChallanNo?challan_no=" +
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
    fetchData();
  };

  // Supplier Search
  const handleClickSearchbySupplier = () => {
    setIsLoaded(true);
    const fetchData = async () => {
      const response_getSelectedSupplierForSearch = await fetch(
        "http://194.233.87.22:5001/api/supplier/getSupplierByCompanyName?company_name=" +
          selectedSupplier,
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
      const datas_getSelectedSupplierForSearch =
        await response_getSelectedSupplierForSearch.json();
      console.log(datas_getSelectedSupplierForSearch);

      setRows(datas_getSelectedSupplierForSearch);
      setIsLoaded(false);
    };

    fetchData();
  };

  // Date Form & To search
  const handelClickFetchDateFormAndToSearch = () => {
    setIsLoaded(true);
    const fetchData = async () => {
      const response_getProductCostDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/supplier/getSupplierFromDateToDate?fromdate=" +
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
      const datas_getProductCostDateSearchTableAllData =
        await response_getProductCostDateSearchTableAllData.json();
      setRows(datas_getProductCostDateSearchTableAllData);
    };

    setIsLoaded(false);
    fetchData();
  };

  //Shop  Name
  const handelClickFetchShopName = () => {
    const fetchData = async () => {
      try {
        const response_getAllShopName = await fetch(
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
        const datas_getAllShopName = await response_getAllShopName.json();
        setShopName(datas_getAllShopName);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  };

  // Submit Work
  // http://194.233.87.22:5001/api/supplier/updateSupplierPaidDueById?paid=&due=&id=
  // http://194.233.87.22:5001/api/cash_book/postCashBookRow?taka=2300&out_taka=56&type=u87&challan_no=779&comment=nnnnn&date=2019-04-16

  const handleSubmitSupplierPaidDue = async () => {
    // const totalDuePaid = parseInt(paid) + parseInt(TK);
    //   const totalDueAndPaid = parseInt(totalPrice - totalDuePaid);

    if (!paid) {
      toast.error("Paid Filed Required");
      return;
    }
    if (!TK) {
      toast.error("Due Paid Filed Required");
      return;
    }
    if (!purchaseId) {
      toast.error("Select A Rows");
      return;
    }

    try {
      await fetch(
        "http://194.233.87.22:5001/api/supplier/updateSupplierPaidDueById?paid=" +
          paid +
          "&due=" +
          TK +
          "&id=" +
          purchaseId,
        {
          method: "PUT",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // http://127.0.0.1:5001/api/cash_book/postCashBookRowFromExpenseReportPage?taka=&out_taka=&type=&challan_no=&pur_ID=comment=&date=
  //  http://194.233.87.22:5001/api/cash_book/postCashBookRow?taka=" +
  //           zeroTaka +
  //           "&out_taka=" +
  //           TK +
  //           "&type=" +
  //           purchase +
  //           "&challan_no=" +
  //           invoiceNo +
  //           "&comment=" +
  //           "None" +
  //           "&date=" +
  //           purchaseDate,
  const handleSubmitpostCashBookRow = async () => {
    if (!TK) {
      toast.error("Due Paid field Require");
      return;
    }
    if (!invoiceNo) {
      toast.error("Invoice No field Require");
      return;
    }
    if (!purchaseId) {
      toast.error("Due Paid field Require");
      return;
    }

    try {
      await fetch(
        "http://194.233.87.22:5001/api/cash_book/postCashBookRowFromExpenseReportPage?taka=" +
          zeroTaka +
          "&out_taka=" +
          TK +
          "&type=" +
          purchase +
          "&challan_no=" +
          invoiceNo +
          "&pur_ID=" +
          purchaseId +
          "&comment=" +
          none +
          "&date=" +
          purchaseDate,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSupplierSubmit = async () => {
    if (!purchaseId && !TK) {
      toast.error("Selectd Any Row And Due Payment Require!");
      return;
    } else {
      await handleSubmitSupplierPaidDue();
      await handleSubmitpostCashBookRow();
      fetchSupplierData();
      toast.success("Data Saved Successfully");
      console.log("Data saved successfully");
    }
  };

  // Update Data Supplier Page
  // http://194.233.87.22:5001/api/supplier/updateSupplierById?id=&challan_no=&company_name=&address=&mobile=&total=&paid=&due=
  const updateSupplierTable = async () => {
    if (!purchaseId) {
      toast.error("Select A Rows");
      return;
    }
    if (!invoiceNo) {
      toast.error("Invoice No Field Require");
      return;
    }
    if (!supplierName) {
      toast.error("Suppier Name Reqire");
      return;
    }
    if (!address) {
      toast.error("Address Firld Require");
      return;
    }
    if (!mobile) {
      toast.error("Mobile Field Require");
      return;
    }
    if (!totalPrice) {
      toast.error("Total Price Field Require");
      return;
    }
    if (!paid) {
      toast.error("Paid Field Require");
      return;
    }

    await fetch(
      "http://194.233.87.22:5001/api/supplier/updateSupplierById?id=" +
        purchaseId +
        "&challan_no=" +
        invoiceNo +
        "&company_name=" +
        supplierName +
        "&address=" +
        address +
        "&mobile=" +
        mobile +
        "&total=" +
        totalPrice +
        "&paid=" +
        paid +
        "&due=" +
        due,
      {
        method: "PUT",
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      }
    );
  };

  // Second Update api
  // http://194.233.87.22:5001/api/purchase_table/updatePurchaseTableNameAndDateByChallanNoAndId?id=&challan_no=&name=&purchase_date=

  const updatePurchaseTableNameAndDate = async () => {
    await fetch(
      "http://194.233.87.22:5001/api/purchase_table/updatePurchaseTableNameAndDateByChallanNoAndId?id=" +
        purchaseId +
        "&challan_no=" +
        invoiceNo +
        "&name=" +
        supplierName +
        "&purchase_date=" +
        purchaseDate,
      {
        method: "PUT",
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      }
    );
  };

  // Call the function to start the process

  // Third APi for Update Supplier Report
  // http://194.233.87.22:5001/api/cash_book/getDistinctChallansByChallanTypeAndPurchaseID?type=&challan_no=&pur_ID=
  // const updatePurchaseTypeId = async () => {
  //   const respons = await fetch(
  //     "http://194.233.87.22:5001/api/cash_book/getDistinctChallansByChallanTypeAndPurchaseID?type=" +
  //       purchase +
  //       "&challan_no=" +
  //       invoiceNo +
  //       "&pur_ID=" +
  //       purchaseId,
  //     {
  //       method: "POST",
  //       headers: {
  //         "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
  //       },
  //     }
  //   );
  //   const data = respons.json();
  //   const challenNo = data.challan_no;

  //   updateCashBookOutTaka(challenNo);
  // };

  // Forth API Link
  // http://194.233.87.22:5001/api/cash_book/updateCashBookOuttakaDateByChallanTypeAndPurID?pur_ID=&out_taka=&type=u87&challan_no=&date=
  const updateCashBookOutTaka = async () => {
    if (!TK) {
      toast.error("Due Paid Field is Required");
    }
    await fetch(
      "http://194.233.87.22:5001/api/cash_book/updateCashBookOuttakaDateByChallanTypeAndPurID?pur_ID=" +
        purchaseId +
        "&out_taka=" +
        TK +
        "&type=" +
        purchase +
        "&challan_no=" +
        invoiceNo +
        "&date=" +
        purchaseDate,
      {
        method: "PUT",
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      }
    );
  };

  // Fifth API Link
  //  http://194.233.87.22:5001/api/net_purchase_price/updateNetPurchasePriceInvoiceSupplierNameAndDateById?invoice=&supplier_name=&date=&id=
  const updateNetPurchasePriceInvoiceSupplierName = async () => {
    await fetch(
      "http://194.233.87.22:5001/api/net_purchase_price/updateNetPurchasePriceInvoiceSupplierNameAndDateById?invoice=" +
        invoiceNo +
        "&supplier_name=" +
        supplierName +
        "&date=" +
        purchaseDate +
        "&id=" +
        invoiceNo,
      {
        method: "PUT",
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      }
    );
  };

  // Update supplier
  const updateSupplierData = () => {
    setIsLoaded(true);
    try {
      // Make the API requests one after the other
      if (!purchaseId) {
        toast.error("Select A Row");
        return;
      } else {
        updateSupplierTable();
        updatePurchaseTableNameAndDate();
        updateCashBookOutTaka();
        updateNetPurchasePriceInvoiceSupplierName();
        console.log("All data updated successfully");
        fetchSupplierData();
        toast.success("Successfully Updated");
      } 
      setIsLoaded(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // calculation
  // const total = rows.reduce((total, item) => total + item.total, 0);
  // const totalPaid = rows.reduce((paid, item) => paid + item.paid, 0);
  // const totalDue = rows.reduce((due, item) => due + item.due, 0);

  const total =
    rows.length > 0 &&
    rows
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
      .toFixed(2);

  const totalPaid =
    rows.length > 0 &&
    rows
      .reduce((paidtaka, item) => {
        if (item.paid !== undefined && item.paid !== null && item.paid !== "") {
          paidtaka += Number(item.paid);
        }
        return paidtaka;
      }, 0)
      .toFixed(2);

  const totalDue =
    rows.length > 0 &&
    rows
      .reduce((duetaka, item) => {
        if (item.due !== undefined && item.due !== null && item.due !== "") {
          duetaka += Number(item.due);
        }
        return duetaka;
      }, 0)
      .toFixed(2);

  const [selectedID, setSelectedID] = useState(null);

  // table data in input field
  const handleClickTableDataShowInputField = (item) => {
    setSelectedID(item.id);
    setPurcheseId(item.id);
    setInvoiceNo(item.challan_no);
    setEntryDate(item.entry_date_time);
    setSupplierName(item.company_name);
    setMobile(item.mobile);
    setAddress(item.address);
    setPurchaseDate(item.purchase_date);
    setTotalPrice(item.total);
    setPaid(item.paid);
    setDue(item.due);
  };

  const handleClickTableDataReset = (item) => {
    setPurcheseId([]);
    setInvoiceNo([]);
    setEntryDate([]);
    setSupplierName([]);
    setMobile([]);
    setAddress([]);
    setPurchaseDate([]);
    setTotalPrice([]);
    setPaid([]);
    setDue([]);
    setTK([]);
    setSelectedID(null);
  };
  useEffect(() => {
    // Recalculate 'due' whenever 'totalPrice' or 'paid' changes
    setDue(parseFloat(totalPrice - paid));
  }, [totalPrice, paid]);

  return (
    <div className="full_div_supplier_report">
      <div className="first_row_div_supplier_report">
        <div className="container_search_column1_supplier_report">
          <div className="input_field_supplier">
            <label
              className="label_field_supplier_report"
              for="supplier_report-date-search"
            >
              Date
            </label>
            <input
              className="input_field_supplier_report"
              type="date"
              id="supplier-report-date-search"
              value={dates}
              onChange={handleDateChange}
            />
            <button
              className="button_field_supplier_report"
              type="submit"
              onClick={handelClickFetchDate}
            >
              Search
            </button>
          </div>
          <div className="input_field_supplier">
            <label
              className="label_field_supplier_report"
              for="supplier-report-invoice-id-search"
            >
              Invoice
            </label>
            <input
              className="input_field_supplier_report"
              value={selectedInvoiceNo}
              onChange={(event) => setSelectedInvoiceNo(event.target.value)}
              list={"select_invoice_no"}
            />
            <datalist id="select_invoice_no">
              {allInvoice.length > 0 &&
                allInvoice.map((allInvoice, index) => {
                  return <option key={index}>{allInvoice.challan_no}</option>;
                })}
            </datalist>
            <button
              className="button_field_supplier_report"
              type="submit"
              onClick={(event) =>
                handleClickSearchbyInvoiceNo(event.target.value)
              }
            >
              Search
            </button>
          </div>
        </div>
        <div className="container_search_column2_supplier_report">
          <div className="input_field_supplier">
            <label
              className="label_field_supplier_report"
              for="supplier-from-date-search"
            >
              From Date
            </label>
            <input
              className="input_field_supplier_report"
              type="date"
              id="supplier-from-date-search"
              onChange={(event) => setFromDate(event.target.value)}
            />
          </div>
          <div className="input_field_supplier">
            <label
              className="label_field_supplier_report"
              for="supplier-from-date-search"
            >
              Supplier
            </label>
            <input
              className="input_field_supplier_report"
              id="supplier-search"
              value={selectedSupplier}
              onChange={(event) => setSelectedSupplier(event.target.value)}
              list={"select_supplier"}
            />
            <datalist id="select_supplier">
              {allSupplier.length > 0 &&
                allSupplier.map((allSupplier, index) => {
                  return (
                    <option key={index}>{allSupplier.company_name}</option>
                  );
                })}
            </datalist>
            <button
              className="button_field_supplier_report"
              type="submit"
              onClick={(event) =>
                handleClickSearchbySupplier(event.target.value)
              }
            >
              Search
            </button>
          </div>
        </div>
        <div className="container_search_column3_supplier_report">
          <div className="input_field_supplier">
            <label
              className="label_field_supplier_report"
              for="supplier-from-date-search"
            >
              To Date
            </label>
            <input
              className="input_field_supplier_report"
              type="date"
              id="supplier-search"
              onChange={(event) => setToDate(event.target.value)}
            />
            <button
              className="button_field_supplier_report"
              type="submit"
              onClick={handelClickFetchDateFormAndToSearch}
            >
              Search
            </button>
          </div>
          <div className="input_field_supplier">
            <button
              className="button_field_supplier_report btn"
              type="submit"
              onClick={handelClickFetchShowAll}
            >
              Show All
            </button>
          </div>
        </div>
        <div className="container_search_column4_supplier_report">
          <div className="input_field_supplier">
            <ExportExcel excelData={rows} fileName={"Excel Export"} />
          </div>
        </div>
      </div>
      <div className="second_row_div_supplier_report rotating_lines_expense_report_page">
        {isLoaded ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}
          />
        ) : (
          <div className="table_div_supplier_report table_wrapper_supplier_report">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>ID</th>
                <th>Invoice</th>
                <th>Supplier Name</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Purchase Date</th>
                <th>Entry Date</th>
                <th>Entry By</th>
              </tr>
              <tbody>
                {rows.length > 0 &&
                  rows.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleClickTableDataShowInputField(item)}
                      className={
                        selectedID === item.id ? "row selected" : "row"
                      }
                      tabindex="0"
                    >
                      <td>{item.id}</td>
                      <td>{item.challan_no}</td>
                      <td>{item.company_name}</td>
                      <td>{item.mobile}</td>
                      <td>{item.address}</td>
                      <td>{item.total}</td>
                      <td>{item.paid}</td>
                      <td>{item.due}</td>
                      <td>{item.purchase_date}</td>
                      <td>{item.entry_date_time}</td>
                      <td>{item.entry_by}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="third_row_div_supplier_report">
        <div className="container_view_update_supplier_report">
          <div className="container_view_supplier_report">
            <div className="input_field_supplier">
              <label
                className="label_field_supplier_report"
                htmlFor="total-sale"
              >
                Total
              </label>
              <input
                className="input_field_supplier_report"
                value={total}
                style={{ fontSize: "1vw", textAlign: "center" }}
                readOnly
              />
            </div>
            <div className="input_field_supplier">
              <label
                className="label_field_supplier_report"
                htmlFor="total-paid"
              >
                Paid
              </label>
              <input
                className="input_field_supplier_report"
                value={totalPaid}
                style={{ fontSize: "1vw", textAlign: "center" }}
                readOnly
              />
            </div>
            <div className="input_field_supplier">
              <label
                className="label_field_supplier_report"
                htmlFor="total-due"
              >
                Due
              </label>
              <input
                className="input_field_supplier_report"
                value={totalDue}
                style={{ fontSize: "1vw", textAlign: "center" }}
                readOnly
              />
            </div>
          </div>

          <div className="container_update_supplier_report">
            <div className="custom_update_supplier_report">
              <div className="container_update_column1_supplier_report">
                <div className="input_field_supplier">
                  <label
                    className="label_field_supplier_report"
                    htmlFor="purchase-id"
                  >
                    Purchase ID
                  </label>
                  <input
                    className="input_field_supplier_report"
                    value={purchaseId}
                    onChange={(event) => setPurcheseId(event.target.value)}
                  />
                </div>
                <div className="input_field_supplier">
                  <label
                    className="label_field_supplier_report"
                    htmlFor="invoice-no"
                  >
                    Invoice No.*
                  </label>
                  <input
                    className="input_field_supplier_report"
                    value={invoiceNo}
                    onChange={(event) => setInvoiceNo(event.target.value)}
                  />
                </div>
                <div className="input_field_supplier">
                  <select
                    className="select_field_supplier_report"
                    value={shop}
                    onChange={(event) => setShop(event.target.value)}
                  >
                    {shopName.length > 0 &&
                      shopName.map((item) => (
                        <option key={item.id}>{item.shop_name}</option>
                      ))}
                  </select>
                  <button className="button_field_supplier_report">
                    View Invoice
                  </button>
                </div>
                <div className="input_field_supplier">
                  <label
                    className="label_field_supplier_report"
                    htmlFor="entry-date"
                  >
                    Entry Date
                  </label>
                  <input
                    className="input_field_supplier_report"
                    type="date"
                    value={entryDate}
                    onChange={(event) => setEntryDate(event.target.value)}
                  />
                </div>
              </div>
              <div className="container_update_column2_supplier_report">
                <div className="input_field_supplier">
                  <label
                    className="label_field_supplier_report"
                    htmlFor="supplier-name"
                  >
                    Supplier Name*
                  </label>
                  <input
                    className="input_field_supplier_report"
                    value={supplierName}
                    onChange={(event) => setSupplierName(event.target.value)}
                  />
                </div>
                <div className="input_field_supplier">
                  <label
                    className="label_field_supplier_report"
                    htmlFor="mobile-number"
                  >
                    Mobile*
                  </label>
                  <input
                    className="input_field_supplier_report"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                  />
                </div>
                <div className="input_field_supplier">
                  <label
                    className="label_field_supplier_report"
                    htmlFor="address"
                  >
                    Address*
                  </label>
                  <input
                    className="input_field_supplier_report"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
                <div className="input_field_supplier">
                  <label
                    className="label_field_supplier_report"
                    htmlFor="purchase Date"
                  >
                    *Purchase Date
                  </label>
                  <input
                    className="input_field_supplier_report"
                    type="date"
                    value={purchaseDate}
                    onChange={(event) => setPurchaseDate(event.target.value)}
                  />
                </div>
              </div>
              <div className="container_update_column3_supplier_report">
                <div className="input_field_supplier">
                  <label
                    className="label_field_supplier_report"
                    htmlFor="total-price"
                  >
                    Total Price*
                  </label>
                  <input
                    className="input_field_supplier_report"
                    value={totalPrice}
                    onChange={(event) => setTotalPrice(event.target.value)}
                  />
                </div>
                <div className="input_field_supplier">
                  <label
                    className="label_field_supplier_report"
                    htmlFor="total-paid"
                  >
                    Paid*
                  </label>
                  <input
                    className="input_field_supplier_report"
                    value={paid}
                    onChange={(event) => setPaid(event.target.value)}
                  />
                </div>
                <div className="input_field_supplier">
                  <label
                    className="label_field_supplier_report"
                    htmlFor="total-due"
                  >
                    Due*
                  </label>
                  <input
                    className="input_field_supplier_report"
                    value={due}
                    // value={parseFloat(totalPrice - paid)}
                    onChange={(event) => setDue(event.target.value)}
                  />
                </div>
                <div className="suppier_separator_button">
                  {/* <button
                    className="button_field_supplier_report"
                    onClick={updateSupplierData}
                  >
                    Update
                  </button>
                  <button
                    className="button_field_supplier_report"
                    onClick={handleClickTableDataReset}
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
                      marginRight: "2vw",
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
                        cursor: "pointer",
                      }}
                      type="submit"
                      onClick={updateSupplierData}
                    >
                      <UpdateSvg />
                    </button>
                    <div style={{ paddingTop: "0.3vw" }}>Update</div>
                  </div>

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
                        cursor: "pointer",
                      }}
                      type="submit"
                      onClick={handleClickTableDataReset}
                    >
                      <ResetSvg />
                    </button>
                    <div style={{ paddingTop: "0.3vw" }}>Reset</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container_due_payment_supplier_report">
              <span style={{ fontSize: "1vw", fontWeight: "bold" }}>
                Due Payment
              </span>
              <div className="input_field_supplier">
                <label
                  className="label_field_supplier_report"
                  htmlFor="total-pament"
                >
                  Payment Type*
                </label>
                <select
                  className="select_field_supplier_report"
                  value={paymentOption}
                  onChange={(event) => setPaymentOption(event.target.value)}
                >
                  {payment.length > 0 &&
                    payment.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input_field_supplier">
                <label
                  className="label_field_supplier_report"
                  htmlFor="total-due"
                >
                  TK.*
                </label>
                <input
                  className="input_field_supplier_report"
                  value={TK}
                  onChange={(event) => setTK(event.target.value)}
                />
              </div>
              <div className="input_field_supplier">
                <button
                  className="button_field_supplier_report"
                  onClick={handleSupplierSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default SupplierReports;
