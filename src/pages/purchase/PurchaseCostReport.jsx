import React from "react";
import "./purchase-product-cost-report.css";
import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import ExportExcel from "../../components/ExportExcel";


const PurchaseProductCostReport = () => {
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
        "http://194.233.87.22:5001/api/net_purchase_price/getNetPurchasePrice",
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
        "http://194.233.87.22:5001/api/stock/getAllDistinctProduct",
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
    setIsLoading(true);

    // Call the function
    fetchDataTableData();
  }, []);

  // Product name field with Type id search
  const handleKeyDownProductName = (event) => {
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
    setIsLoading(true);
    const fetchData = async () => {
      const response_getSelectedProductNameID = await fetch(
        "http://194.233.87.22:5001/api/net_purchase_price/getDataByNameAndModelAndGroupBy?product_name=" +
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
    setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchData();
  };

  //Show ALL Data
  const handleClickSearchShowAll = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getPurchaseReportTableAllData = await fetch(
        "http://194.233.87.22:5001/api/net_purchase_price/getNetPurchasePrice",
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
        "http://194.233.87.22:5001/api/net_purchase_price/getAllDistinctInvoice",
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
    setIsLoading(true);
    const fetchData = async () => {
      const response_getPurcheseDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/net_purchase_price/getNetPurchasePriceByOnlyDate?date=" +
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
    setIsLoading(true);
    const fetchData = async () => {
      const response_getPurcheseInvoiceSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/net_purchase_price/getNetPurchasePriceByInvoice?invoice=" +
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
    setIsLoading(true);
    const fetchData = async () => {
      const response_getPurcheseSupplierSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/net_purchase_price/getNetPurchasePriceBySupplierName?supplier_name=" +
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
    setIsLoading(true);
    const fetchData = async () => {
      const response_getPurcheseDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/net_purchase_price/getNetPurchasePriceByFromDateToDate?fromdate=" +
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

  useEffect(() => {
    handleClickProductIdCodeData();
    handelClickFetchShopName();
    getSupplierData();
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

  const getSupplierData = () => {
    const fetchData = async () => {
      const response_getData = await fetch(
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

      const data = await response_getData.json();
      console.log(data);
      setSupplierPaid(data);
    };

    // Call the function
    fetchData();
  };

  return (
    <div className="full_div_purchase_cost_report">
      <div className="first_row_div_purchase_cost_report">
        <div className="container_search_column1_purchase_cost_report">
          <div className="input-feild_purchase_cost_report">
            <label className="label_purchase_cost_report">Date</label>
            <input
              className="input_purchase_cost_report"
              type="date"
              value={date}
              onChange={handleDateChange}
            />
            <button
              className="button_purchase_cost_report"
              onClick={handelClickFetchDate}
            >
              Search
            </button>
          </div>
          <div className="input-feild_purchase_cost_report">
            <label className="label_purchase_cost_report">Invoice</label>
            <input
              className="input_purchase_cost_report"
              value={invoiceSearch}
              onChange={(event) => {
                setInvoiceSearch(event.target.value);
              }}
              list="invoice"
            />
            <datalist id="invoice">
              {invoiceData.length > 0 && invoiceData.map((items, index) => {
                return <option key={index}>{items.invoice}</option>;
              })}
            </datalist>
            <button
              className="button_purchase_cost_report"
              type="submit"
              onClick={handelClickFetchInvoice}
            >
              Search
            </button>
          </div>
          <div className="input-feild_purchase_cost_report">
            <label className="label_purchase_cost_report">Supplier</label>
            <input
              className="input_purchase_cost_report"
              value={supplierSearch}
              onChange={(event) => setSupplierSearch(event.target.value)}
              list="supplier"
            />
            <datalist id="supplier">
              {supplierData.length > 0 && supplierData.map((items, index) => {
                return <option key={index}>{items.company_name}</option>;
              })}
            </datalist>

            <button
              className="button_purchase_cost_report"
              type="submit"
              onClick={handelClickFetchSupplier}
            >
              Search
            </button>
          </div>
        </div>
        <div className="container_search_column2_purchase_cost_report">
          <div className="input-feild_purchase_cost_report">
            <label className="label_purchase_cost_report">From Date</label>
            <input
              className="input_purchase_cost_report"
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
            />
          </div>
          <div className="input-feild_purchase_cost_report">
            <label className="label_purchase_cost_report">Product</label>
            <input
              className="input_purchase_cost_report"
              id="product_name_by_purchase_cost_report_search"
              onSelect={handleKeyDownProductName}
              onChange={(event) => setSelectedProductName(event.target.value)}
              list={"selectproductname"}
            />
            <datalist id="selectproductname">
              {allProduct.length > 0 && allProduct.map((productname, index) => {
                return <option key={index}>{productname}</option>;
              })}
            </datalist>
          </div>
        </div>
        <div className="container_search_column3_purchase_cost_report">
          <div className="input-feild_purchase_cost_report">
            <label className="label_purchase_cost_report">To Date</label>
            <input
              className="input_purchase_cost_report"
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
            />
            <button
              className="button_purchase_cost_report"
              type="submit"
              onClick={handelClickFetchDateFormAndTo}
            >
              Search
            </button>
          </div>
          <div className="input-feild_purchase_cost_report">
            <label className="label_purchase_cost_report">Type/No</label>

            <select
              className="select_purchase_cost_report"
              id="product_id_by_purchase_cost_report_search"
              onSelect={(event) => setSelectedProductTypeNo(event.target.value)}
            >
              {selectedProductTypeNo.length > 0 && selectedProductTypeNo.map((productType, index) => {
                return <option key={index}>{productType}</option>;
              })}
            </select>
            <button
              className="button_purchase_cost_report"
              onClick={handleClickSearchbyProductNameID}
            >
              Search
            </button>
          </div>
        </div>
        <div className="container_search_column4_purchase_cost_report">
          <div className="input-feild_purchase_cost_report">
            <button
              className="button_purchase_cost_report btn"
              type="submit"
              onClick={handleClickSearchShowAll}
            >
              Show All
            </button>
          </div>
        </div>

        <div className="container_search_column5_purchase_cost_report">
          <div className="input-feild_purchase_cost_report">
            <div>
              <ExportExcel excelData={rows} fileName={"Excel Export"} />
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_purchase_cost_report loader_container_purchase_cost_report">
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="64"
            visible={true}
          />
        ) : (
          <div className="table_div_purchase_cost_report table_wrapper_purchase_cost_report">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>SL.</th>
                <th>Purchase ID</th>
                <th>Invoice</th>
                <th>Supplier Name</th>
                <th>Product Name</th>
                <th>Type/No.</th>
                <th>Price</th>
                <th>LC Cost</th>
                <th>Other Cost</th>
                <th>Net Price</th>
                <th>Date</th>
              </tr>
              <tbody>
                {rows.length > 0 && rows.map((item) => (
                  <tr key={item.id} className="rows">
                    <td>{item.id}</td>
                    <td>{item.purchase_id}</td>
                    <td>{item.invoice}</td>
                    <td>{item.supplier_name}</td>
                    <td>{item.product_name}</td>
                    <td>{item.model}</td>
                    <td>{item.price}</td>
                    <td>{item.LC_cost}</td>
                    <td>{item.other_cost}</td>
                    <td>{item.net_price}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseProductCostReport;
