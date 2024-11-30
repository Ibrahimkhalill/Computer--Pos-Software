import React from "react";
import "./purchase-report.css";
import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PurchaseReportExcelExport from "../../components/ExportExcel";
import { ReactComponent as ResetSvg } from "../svg/reset.svg";
import { ReactComponent as UpdateSvg } from "../svg/update.svg";

const PurchaseReport = () => {
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const [supplierPaid, setSupplierPaid] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allType, setAllType] = useState([]);
  // Data Search
  const [date, setDate] = useState([]);
  const [fromDate, setFromDate] = useState([]);
  const [toDate, setToDate] = useState([]);
  const [invoiceData, setInvoiceDate] = useState([]);
  const [invoiceSearch, setInvoiceSearch] = useState([]);
  const [supplierSearch, setSupplierSearch] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [productCodeId, setProductCodeId] = useState([]);
  const [productCodeIdData, setProductCodeIdData] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [shopName, setShopName] = useState([]);
  const [shop, setShop] = useState([]);
  const [selectedProductTypeNo, setSelectedProductTypeNo] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState([]);

  // Table data Show Input Field
  const [invoiceNo, setInvoiceNo] = useState([]);
  const [purcheseId, setPurcheseId] = useState([]);
  const [supplierName, setSupplierName] = useState([]);
  const [productIdCode, setProductIdCode] = useState([]);
  const [productName, setProductName] = useState([]);
  const [typeNo, setTypeNo] = useState([]);
  const [salePrice, setSalePrice] = useState([]);
  const [purchesePrice, setPurchesePrice] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [PurcheseDate, setPurcheseDate] = useState([]);
  const [entryDate, setEntryDate] = useState([]);
  const [unit, setUnit] = useState("Piece");
  const [purId, setPurId] = useState("");
  const [quantityInUnit, setQuantityInUnit] = useState([]);
  const quantityItem = ["Piece", "Set", "Box"];
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Form Pick up to useEffect
  const fetchDataTableData = async () => {
    try {
      const response_getAllSaleTable = await fetch(
        "http://194.233.87.22:5001/api/purchase_table/getPurchaseTable",
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
      // Product data with Type or ID
      const response_getAllProducts = await fetch(
        "http://194.233.87.22:5001/api/product_list/getAllProducts",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getAllProducts = await response_getAllProducts.json();
      console.log(datas_getAllProducts);
      const product_getAllProducts = datas_getAllProducts.map(
        ({ product: actualValue }) => actualValue
      );
      setAllProduct([...new Set(product_getAllProducts)]);

      console.log(product_getAllProducts);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Call the function
    fetchDataTableData();
  }, []);

  // Product name field with Type id search
  const handleKeyDownProductName = (event) => {
    if (!selectedProductName) {
      toast.error("Require Search Field");
      return;
    }
    setSelectedProductName(event.target.value);

    const fetchData = async () => {
      const response_getSelectedProduct = await fetch(
        "http://194.233.87.22:5001/api/stock/getAllDistinctTypeByProductName?product=" +
          selectedProductName,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedProduct = await response_getSelectedProduct.json();
      console.log(datas_getSelectedProduct);
      const product_getSelectedProductTypeNo = datas_getSelectedProduct.map(
        ({ model: actualValue }) => actualValue
      );

      setSelectedProductTypeNo([...new Set(product_getSelectedProductTypeNo)]);
      console.log(product_getSelectedProductTypeNo);
    };

    fetchData();
  };

  // Searching Product auto genarated Name and Id search
  const handleClickSearchbyProductNameID = () => {
    if (!selectedProductName || !selectedProductTypeNo) {
      toast.error("Reqired Search Field");
      return;
    }
    setIsLoading(true);
    const fetchData = async () => {
      const response_getSelectedProductNameID = await fetch(
        "http://194.233.87.22:5001/api/purchase_table/getPurchaseTableByProductNameAndModel?product_name=" +
          selectedProductName +
          "&model=" +
          selectedProductTypeNo,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedProductbyNameID =
        await response_getSelectedProductNameID.json();

      console.log(datas_getSelectedProductbyNameID);

      setRows(datas_getSelectedProductbyNameID);
      setIsLoading(false);
    };

    // Call the function
    fetchData();
  };

  // All Type Search
  const handleClickSearchType = () => {
    const fetchData = async () => {
      const response_getAllDataType = await fetch(
        "http://194.233.87.22:5001/api/stock/getAllDistinctType",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getAllDataType = await response_getAllDataType.json();
      console.log(datas_getAllDataType);
      setAllType(datas_getAllDataType);
      console.log(datas_getAllDataType);
    };

    fetchData();
  };

  //Show ALL Data
  const handleClickSearchShowAll = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getPurchaseReportTableAllData = await fetch(
        "http://194.233.87.22:5001/api/purchase_table/getPurchaseTable",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getPurchaseReportTableAllData =
        await response_getPurchaseReportTableAllData.json();
      console.log(datas_getPurchaseReportTableAllData);
      setRows(datas_getPurchaseReportTableAllData);
      console.log(datas_getPurchaseReportTableAllData);
      setIsLoading(false);
    };

    fetchData();
  };

  //  Invoice Data all data
  const handleClickInvoiceData = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getInvoiceAllData = await fetch(
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

      const datas_getInvoiceAllData = await response_getInvoiceAllData.json();
      console.log(datas_getInvoiceAllData);
      setInvoiceDate(datas_getInvoiceAllData);
      console.log(datas_getInvoiceAllData);
      setIsLoading(false);
    };

    fetchData();
  };

  //  Supplier Data all data
  const handleClickSupplierData = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getSupplierAllData = await fetch(
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

      const datas_getSupplierAllData = await response_getSupplierAllData.json();
      console.log(datas_getSupplierAllData);
      setSupplierData(datas_getSupplierAllData);
      console.log(datas_getSupplierAllData);
      setIsLoading(false);
    };

    fetchData();
  };

  //  Product ID or Code Data all data
  const handleClickProductIdCodeData = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getProductCodeIdAllData = await fetch(
        "http://194.233.87.22:5001/api/purchase_table/getAllProductIDCode",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getProductIdCodeData =
        await response_getProductCodeIdAllData.json();
      console.log(datas_getProductIdCodeData);
      setProductCodeIdData(datas_getProductIdCodeData);
      console.log(datas_getProductIdCodeData);
      setIsLoading(false);
    };

    fetchData();
  };

  useEffect(() => {
    handleClickInvoiceData();
    handleClickSupplierData();
  }, []);

  // 1st date search
  const handelClickFetchDate = () => {
    if (!date) {
      toast.error("Require Search Filed");
      return;
    }
    setIsLoading(true);
    const fetchData = async () => {
      const response_getPurcheseDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/purchase_table/getPurchaseTableByOnlyDate?date=" +
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

      const datas_getPurcheseDateSearchTableAllData =
        await response_getPurcheseDateSearchTableAllData.json();
      console.log(datas_getPurcheseDateSearchTableAllData);
      sleep(2000).then(() => {
        setIsLoading(false);
      });
      setRows(datas_getPurcheseDateSearchTableAllData);
      console.log(datas_getPurcheseDateSearchTableAllData);
    };

    // Call the function
    fetchData();
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
    console.log(event.target.value);
  };

  // First date search end
  // Invoice Search
  const handelClickFetchInvoice = () => {
    if (!invoiceSearch) {
      toast.error("Require Search Filed");

      return;
    }
    setIsLoading(true);
    const fetchData = async () => {
      const response_getPurcheseInvoiceSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/purchase_table/getPurchaseTableByChallanNo?challan_no=" +
          invoiceSearch,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getPurcheseInvoiceSearchTableAllData =
        await response_getPurcheseInvoiceSearchTableAllData.json();
      console.log(datas_getPurcheseInvoiceSearchTableAllData);
      sleep(2000).then(() => {
        setIsLoading(false);
      });
      setRows(datas_getPurcheseInvoiceSearchTableAllData);
      console.log(datas_getPurcheseInvoiceSearchTableAllData);
      // show all
    };

    // Call the function
    fetchData();
  };

  // Supplier Search
  const handelClickFetchSupplier = (event) => {
    if (!supplierSearch) {
      toast.error("Require Search Filed");
      return;
    }
    setIsLoading(true);
    const fetchData = async () => {
      const response_getPurcheseSupplierSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/purchase_table/getPurchaseTableByName?name=" +
          supplierSearch,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getPurcheseSupplierSearchTableAllData =
        await response_getPurcheseSupplierSearchTableAllData.json();
      console.log(datas_getPurcheseSupplierSearchTableAllData);
      sleep(2000).then(() => {
        setIsLoading(false);
      });
      setRows(datas_getPurcheseSupplierSearchTableAllData);
      console.log(datas_getPurcheseSupplierSearchTableAllData);
    };

    // Call the function
    fetchData();
  };

  // Form And To Search

  const handelClickFetchDateFormAndTo = () => {
    if (!fromDate) {
      toast.error("Require Search Filed");
      return;
    }
    if (!toDate) {
      toast.error("Require Search Filed");
      return;
    }
    setIsLoading(true);
    const fetchData = async () => {
      const response_getPurcheseDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/purchase_table/getPurchaseTableByFromDateToDate?fromdate=" +
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

      const datas_getPurcheseDateSearchTableAllData =
        await response_getPurcheseDateSearchTableAllData.json();
      console.log(datas_getPurcheseDateSearchTableAllData);
      sleep(2000).then(() => {
        setIsLoading(false);
      });
      setRows(datas_getPurcheseDateSearchTableAllData);
      console.log(datas_getPurcheseDateSearchTableAllData);
    };

    // Call the function
    fetchData();
  };

  // Product code

  const handelClickFetchProductIdSearch = () => {
    if (!productCodeId) {
      toast.error("Require Search Filed");
      return;
    }
    setIsLoading(true);
    const fetchData = async () => {
      const response_getPurcheseSupplierSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/purchase_table/getPurchaseTableByProductCode?product_code=" +
          productCodeId,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getPurcheseSupplierSearchTableAllData =
        await response_getPurcheseSupplierSearchTableAllData.json();
      console.log(datas_getPurcheseSupplierSearchTableAllData);
      sleep(2000).then(() => {
        setIsLoading(false);
      });
      setRows(datas_getPurcheseSupplierSearchTableAllData);
      console.log(datas_getPurcheseSupplierSearchTableAllData);
    };

    // Call the function
    fetchData();
  };

  useEffect(() => {
    handleClickProductIdCodeData();
    handelClickFetchShopName();
  }, []);

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

  // Total taka
  // const totalTaka = rows.reduce(
  //   (purchasetaka, item) => purchasetaka + Math.round(item.total),
  //   0
  // );

  const totalTaka =
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

  // selected Row Alwyes
  const [selectedID, setSelectedID] = useState(null);

  // Table data Show Input Field
  const handleClickTableDataShowInputField = (item) => {
    setSelectedID(item.id);
    setInvoiceNo(item.challan_no);
    setPurcheseId(item.purchase_id);
    setSupplierName(item.name);
    setProductIdCode(item.product_code);
    setProductName(item.product_name);
    setTypeNo(item.model);
    setSalePrice(item.sales_price);
    setPurchesePrice(item.purchase_price);
    setQuantity(item.quantity);
    setTotalPrice(item.total);
    setPurcheseDate(item.purchase_date);
    setEntryDate(item.entry_date_time);
  };

  // Update Purchase Report

  const updatePurchaseTable = async () => {
    if (!productIdCode) {
      toast.warning("Product Id/Code field empty");
      return;
    }
    if (!productName) {
      toast.warning("Product Name field Empty");
      return;
    }
    if (!typeNo) {
      toast.warning("Type/No field Empty");
      return;
    }
    if (!purchesePrice) {
      toast.warning("Purchase Price field Empty");
      return;
    }
    if (!quantity) {
      toast.warning("Quantity Field is Empty");
      return;
    }
    if (!unit) {
      toast.warning("Unit Field Empty");
      return;
    }
    if (!totalPrice) {
      toast.warning("Total Price Field Empty");
      return;
    }
    if (!purcheseId) {
      toast.warning("Purchase Id not Provited");
    }
    await fetch(
      "http://194.233.87.22:5001/api/purchase_table/updatePurchaseTableById?product_code=" +
        productIdCode +
        "&product_name=" +
        productName +
        "&model=" +
        typeNo +
        "&purchase_price=" +
        purchesePrice +
        "&quantity=" +
        quantity +
        "&unit=" +
        unit +
        "&total=" +
        totalPrice +
        "&id=" +
        purcheseId,
      {
        method: "PUT",
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      }
    );
  };

  const updateStockTable = async () => {
    // validation

    if (!productIdCode) {
      toast.warning("Product Id/Code field empty");
      return;
    }
    if (!productName) {
      toast.warning("Product Name field Empty");
      return;
    }
    if (!typeNo) {
      toast.warning("Type/No field Empty");
      return;
    }
    if (!purchesePrice) {
      toast.warning("Purchase Price field Empty");
      return;
    }
    if (!salePrice) {
      toast.warning("Purchase Price field Empty");
      return;
    }
    if (!quantity) {
      toast.warning("Quantity Field is Empty");
      return;
    }
    if (!unit) {
      toast.warning("Unit Field Empty");
      return;
    }
    if (!totalPrice) {
      toast.warning("Total Price Field Empty");
      return;
    }
    if (!purcheseId) {
      toast.warning("Purchase Id not Provited");
    }
    await fetch(
      "http://194.233.87.22:5001/api/stock/updateStockTableById?product_code=" +
        productIdCode +
        "&product=" +
        productName +
        "&model=" +
        typeNo +
        "&purchase_price=" +
        purchesePrice +
        "&sale_price=" +
        salePrice +
        "&available_quantity=" +
        quantity +
        "&unit=" +
        unit +
        "&total=" +
        totalPrice +
        "&id=" +
        purcheseId,
      {
        method: "PUT",
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      }
    );
  };

  const updateNetPurchasePrice = async () => {
    await fetch(
      "http://194.233.87.22:5001/api/net_purchase_price/updateNetPurchasePriceById?product_code=" +
        productIdCode +
        "&product_name=" +
        productName +
        "&model=" +
        typeNo +
        "&net_price=" +
        totalPrice +
        "&id=" +
        purcheseId,
      {
        method: "PUT",
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      }
    );
  };

  // const getSupplierData = () => {
  //   const fetchData = async () => {
  //     const response_getData = await fetch(
  //       "http://194.233.87.22:5001/api/supplier/getDistinctSupplierByChallanAndId?challan_no=" +
  //         invoiceNo +
  //         "&id=" +
  //         purcheseId,
  //       {
  //         method: "POST",
  //         headers: {
  //           "x-access-token": JSON.parse(
  //             localStorage.getItem("x-access-token")
  //           ),
  //         },
  //       }
  //     );

  //     const data = await response_getData.json();
  //     console.log(data);

  //     setSupplierPaid(data);
  //   };

  //   // Call the function
  //   fetchData();
  // };

  // const totalPaid = supplierPaid.reduce(
  //   (paidData, item) => paidData + Math.round(item.paid),
  //   0
  // );

  const calculateDue = async () => {
    try {
      // Fetch the 'paid' value from the supplier data
      const response_getPaid = await fetch(
        "http://194.233.87.22:5001/api/supplier/getDistinctSupplierByChallanAndId?challan_no=" +
          invoiceNo +
          "&id=" +
          purcheseId,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const paidData = await response_getPaid.json();
      const paid = paidData.paid;

      const response_getSum = await fetch(
        "http://194.233.87.22:5001/api/quotation_report/getSumOfTotal_By_Challan?challan_no=" +
          invoiceNo,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const sumData = await response_getSum.json();
      const sum = sumData.sum_of_total;

      const due = paid - sum;

      updateSupplierData(due);
    } catch (error) {
      console.error("Error fetching or calculating due:", error);
    }
  };

  const updateSupplierData = async (due) => {
    await fetch(
      "http://194.233.87.22:5001/api/supplier/updateSupplierByChallanNoAndId?total=" +
        totalPrice +
        "&due=" +
        due +
        "&challan_no=" +
        invoiceNo +
        "&id=" +
        purcheseId,
      {
        method: "PUT",
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      }
    );
  };

  // Update Purchase Report
  const handleUpdatePurchaseReport = async () => {
    try {
      // Make the API requests one after the other
      await updatePurchaseTable();
      await updateStockTable();
      await updateNetPurchasePrice();
      await calculateDue();
      // updateSupplierData();
      toast.success("Data Updated Successfully");
      console.log("All data updated successfully");
      fetchDataTableData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Reset Input data
  const handleClickResetInputData = (item) => {
    setInvoiceNo([]);
    setPurcheseId([]);
    setSupplierName([]);
    setProductIdCode([]);
    setProductName([]);
    setTypeNo([]);
    setSalePrice([]);
    setPurchesePrice([]);
    setQuantity([]);
    setTotalPrice([]);
    setPurcheseDate([]);
    setEntryDate([]);
  };

  return (
    <div className="full_div_purchase_report">
      <div className="first_row_div_purchase_report">
        <div className="container_search_column1_purchase_report">
          <div className="input-feild_purchase_report">
            <label className="label_purchase_report">Date</label>
            <input
              className="input_purchase_report"
              type="date"
              value={date}
              onChange={handleDateChange}
            />
            <button
              className="button_purchase_report"
              onClick={handelClickFetchDate}
            >
              Search
            </button>
          </div>
          <div className="input-feild_purchase_report">
            <label className="label_purchase_report">Invoice</label>
            <input
              className="input_purchase_report"
              value={invoiceSearch}
              onChange={(event) => {
                setInvoiceSearch(event.target.value);
              }}
              list="invoice"
            />
            <datalist id="invoice">
              {invoiceData.length > 0 &&
                invoiceData.map((items, index) => {
                  return <option key={index}>{items.challan_no}</option>;
                })}
            </datalist>
            <button
              className="button_purchase_report"
              type="submit"
              onClick={handelClickFetchInvoice}
            >
              Search
            </button>
          </div>
          <div className="input-feild_purchase_report">
            <label className="label_purchase_report">Supplier</label>
            <input
              className="input_purchase_report"
              value={supplierSearch}
              onChange={(event) => setSupplierSearch(event.target.value)}
              list="supplier"
            />
            <datalist id="supplier">
              {supplierData.length > 0 &&
                supplierData.map((items, index) => {
                  return <option key={index}>{items.company_name}</option>;
                })}
            </datalist>

            <button
              className="button_purchase_report"
              type="submit"
              onClick={handelClickFetchSupplier}
            >
              Search
            </button>
          </div>
        </div>
        <div className="container_search_column2_purchase_report">
          <div className="input-feild_purchase_report">
            <label className="label_purchase_report">From Date</label>
            <input
              className="input_purchase_report"
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
            />
          </div>
          <div className="input-feild_purchase_report">
            <label className="label_purchase_report">Product</label>
            <input
              className="input_purchase_report"
              id="product_name_by_purchase_report_search"
              onSelect={handleKeyDownProductName}
              onChange={(event) => setSelectedProductName(event.target.value)}
              list="selectproductname"
            />
            <datalist id="selectproductname">
              {allProduct.length > 0 &&
                allProduct.map((productname, index) => {
                  return <option key={index}>{productname}</option>;
                })}
            </datalist>
          </div>

          <div className="input-feild_purchase_report">
            <label className="label_purchase_report">Product ID/Code</label>
            <input
              className="input_purchase_report"
              value={productCodeId}
              onChange={(event) => {
                setProductCodeId(event.target.value);
              }}
              list="productcode"
            />
            <datalist id="productcode">
              {productCodeIdData.length > 0 &&
                productCodeIdData.map((items, index) => {
                  return <option key={index}>{items.product_code}</option>;
                })}
            </datalist>
            <button
              className="button_purchase_report"
              type="submit"
              onClick={handelClickFetchProductIdSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="container_search_column3_purchase_report">
          <div className="input-feild_purchase_report">
            <label className="label_purchase_report">To Date</label>
            <input
              className="input_purchase_report"
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
            />
            <button
              className="button_purchase_report"
              type="submit"
              onClick={handelClickFetchDateFormAndTo}
            >
              Search
            </button>
          </div>
          <div className="input-feild_purchase_report">
            <label className="label_purchase_report">Type/No</label>

            <select
              className="select_purchase_report"
              id="product_id_by_purchase_report_search"
              onSelect={(event) => setSelectedProductTypeNo(event.target.value)}
            >
              {selectedProductTypeNo.length > 0 &&
                selectedProductTypeNo.map((productType, index) => {
                  return <option key={index}>{productType}</option>;
                })}
            </select>
            <button
              className="button_purchase_report"
              onClick={handleClickSearchbyProductNameID}
            >
              Search
            </button>
          </div>
        </div>
        <div className="container_search_column4_purchase_report">
          <div className="input-feild_purchase_report">
            <button
              className="button_purchase_report btn"
              type="submit"
              onClick={handleClickSearchShowAll}
            >
              Show All
            </button>
          </div>
        </div>

        <div className="container_search_column5_purchase_report">
          <div className="input-feild_purchase_report">
            <PurchaseReportExcelExport
              excelData={rows}
              fileName={"Excel Export"}
            />
          </div>
        </div>
      </div>
      <div className="second_row_div_purchase_report loader_container_purchase_report">
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="64"
            visible={true}
          />
        ) : (
          <div className="table_div_purchase_report table_wrapper_purchase_report">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>Serial</th>
                <th>Invoice</th>
                <th>Supplier</th>
                {/* <th>ID/Code</th> */}
                <th>Product</th>
                <th>Type/No.</th>
                <th>Pur. Price</th>
                <th>Sale Price</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Total TK.</th>
                <th>Pur. Date</th>
                <th>Entry Date</th>
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
                      <td>{item.name}</td>
                      <td>{item.product_code}</td>
                      <td >{item.product_name}</td>
                      {/* <td>{item.model}</td> */}
                      <td>{item.purchase_price}</td>
                      <td>{item.sales_price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit}</td>
                      <td>{item.total}</td>
                      <td>{item.purchase_date}</td>
                      <td>{item.entry_date_time}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="third_row_div_purchase_report">
        <div className="container_view_update_purchase_report">
          <div className="container_view_purchase_report">
            <div className="input_field_purchase_report">
              <label className="label_purchase_report" htmlFor="total-sale">
                Total TK
              </label>
              <input
                className="input_purchase_report"
                value={totalTaka}
                readOnly
                style={{ fontSize: "0.9vw" }}
              />
            </div>
          </div>

          <div className="container_update_purchase_report">
            <div className="update">
              <div className="cotainer_update_column1_purchase_report">
                <div className="input_field_purchase_report">
                  <label
                    className="label_purchase_report"
                    htmlFor="purchase-id"
                  >
                    Invoice No.*
                  </label>
                  <input
                    className="input_purchase_report"
                    value={invoiceNo}
                    onChange={(event) => setInvoiceNo(event.target.value)}
                  />
                </div>
                <div className="input_field_purchase_report">
                  <label className="label_purchase_report" htmlFor="invoice-no">
                    Purchase ID*
                  </label>
                  <input
                    className="input_purchase_report"
                    value={purcheseId}
                    onChange={(event) => setPurcheseId(event.target.value)}
                  />
                </div>
                <div className="input_field_purchase_report">
                  <select
                    className="select_purchase_report"
                    value={shop}
                    onChange={(event) => setShop(event.target.value)}
                  >
                    {shopName.length > 0 &&
                      shopName.map((item) => (
                        <option key={item.id}>{item.shop_name}</option>
                      ))}
                  </select>
                  <button
                    style={{ width: "7vw" }}
                    className="button_purchase_report"
                  >
                    View Invoice
                  </button>
                </div>
                <div className="input_field_purchase_report">
                  <label className="label_purchase_report" htmlFor="entry-date">
                    Supplier Name
                  </label>
                  <input
                    className="input_purchase_report"
                    value={supplierName}
                    onChange={(event) => setSupplierName(event.target.value)}
                  />
                </div>
              </div>
              <div className="cotainer_update_column2_purchase_report">
                <div className="input_field_purchase_report">
                  <label
                    className="label_purchase_report"
                    htmlFor="supplier-name"
                  >
                    Product ID/Code*
                  </label>
                  <input
                    className="input_purchase_report"
                    value={productIdCode}
                    onChange={(event) => setProductIdCode(event.target.value)}
                  />
                </div>
                <div className="input_field_purchase_report">
                  <label
                    className="label_purchase_report"
                    htmlFor="mobile-number"
                  >
                    Product Name*
                  </label>
                  <input
                    className="input_purchase_report"
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                  />
                </div>
                <div className="input_field_purchase_report">
                  <label className="label_purchase_report" htmlFor="address">
                    Type/No.*
                  </label>
                  <input
                    className="input_purchase_report"
                    value={typeNo}
                    onChange={(event) => setTypeNo(event.target.value)}
                  />
                </div>
                <div className="input_field_purchase_report">
                  <label
                    className="label_purchase_report"
                    htmlFor="purchase Date"
                  >
                    Sale Price*
                  </label>
                  <input
                    className="input_purchase_report"
                    value={salePrice}
                    onChange={(event) => setSalePrice(event.target.value)}
                  />
                </div>
              </div>
              <div className="cotainer_update_column3_purchase_report">
                <div className="input_field_purchase_report">
                  <label
                    className="label_purchase_report"
                    htmlFor="total-price"
                  >
                    Purchase Price*
                  </label>
                  <input
                    className="input_purchase_report"
                    value={purchesePrice}
                    onChange={(event) => setPurchesePrice(event.target.value)}
                  />
                </div>
                <div className="input_field_purchase_report">
                  <label className="label_purchase_report" htmlFor="total-paid">
                    Quantiry*
                  </label>
                  <input
                    className="input_purchase_report"
                    style={{ width: "7vw" }}
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                  />
                  <select
                    className="select_purchase_report"
                    style={{ width: "5vw" }}
                    onChange={(event) => {
                      setQuantityInUnit(event.target.value);
                    }}
                  >
                    {quantityItem.length > 0 &&
                      quantityItem.map((items) => <option>{items}</option>)}
                  </select>
                </div>
                <div className="input_field_purchase_report">
                  <label className="label_purchase_report" htmlFor="total-due">
                    Total Item Price*
                  </label>
                  <input
                    className="input_purchase_report"
                    value={totalPrice}
                    onChange={(event) => setTotalPrice(event.target.value)}
                  />
                </div>
                <div className="input_field_purchase_report">
                  <label className="label_purchase_report" htmlFor="total-due">
                    Purchase Date
                  </label>
                  <input
                    className="input_purchase_report"
                    value={PurcheseDate}
                    onChange={(event) => setPurcheseDate(event.target.value)}
                  />
                </div>
                <div className="input_field_purchase_report">
                  <label className="label_purchase_report" htmlFor="total-due">
                    Entry Date*
                  </label>
                  <input
                    className="input_purchase_report"
                    value={entryDate}
                    onChange={(event) => setEntryDate(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="due_payment_purchase_report">
              {/* <button
                  className="button_purchase_report"
                  onClick={handleUpdatePurchaseReport}
                >
                  Update
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
                    width: "3vw",
                    backgroundColor: "#F5F5DC",
                    outline: "none",
                    border: "none",
                    borderRadius: ".2vw",
                    boxShadow: "0 5px #999",
                  }}
                  type="submit"
                  onClick={handleUpdatePurchaseReport}
                >
                  <UpdateSvg />
                </button>
                <div style={{ paddingTop: "0.5vw" }}>Update</div>
              </div>

              {/* <button
                  className="button_purchase_report"
                  onClick={handleClickResetInputData}
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
                  onClick={handleClickResetInputData}
                >
                  <ResetSvg />
                </button>
                <div style={{ paddingTop: "0.5vw" }}>Reset</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default PurchaseReport;
