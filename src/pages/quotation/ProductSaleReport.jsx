import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import "./product-sale-report.css";
import { RotatingLines } from "react-loader-spinner";
import PurchaseReportExcelExport from "../../components/ExportExcel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as ResetSvg } from "../svg/reset.svg";
import { ReactComponent as UpdateSvg } from "../svg/update.svg";

const ProductSaleReport = () => {
  const [rows, setRows] = useState([]);
  const [allInvoice, setAllInvoice] = useState([]);
  const [invoiceSearch, setInvoiceSearch] = useState([]);
  const [fromDate, setFormDate] = useState([]);
  const [toDate, setToDate] = useState([]);
  const [productCode, setProductCode] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [allProductCode, setAllProductCode] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProductTypeNo, setSelectedProductTypeNo] = useState([]);
  const [shop, setShop] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle Click table data input
  const [invoiceNo, setInvoiceNo] = useState([]);
  const [shopName, setShopName] = useState([]);
  const [customerName, setCustomerName] = useState([]);
  const [customerId, setCustomerId] = useState([]);
  const [saleDate, setSaleDate] = useState([]);
  const [productIdCode, setProductIdCode] = useState([]);
  const [productName, setProductName] = useState([]);
  const [typeNo, setTypeNo] = useState([]);
  const [warranty, setWarranty] = useState([]);
  const [salePrice, setSalePrice] = useState([]);
  const [Quantity, setQuantity] = useState([]);
  const [totalItemPrice, setTotalItemPrice] = useState([]);
  const [entryDate, setEntryDate] = useState([]);

  // "YES" "NO" select
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [date, setDate] = useState([]);

  const [selectedUnit, setSelectedUnit] = useState("None");
  const quantityUnit = ["None", "Piece", "Kg", "sq ft", "Pound"];
  // None,Piece,Kg,sq ft,Pound

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response_getAllProductSaleTable = await fetch(
          "http://194.233.87.22:5001/api/quotation_report/getAllQuotationReport",
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        const datas_getAllProductSaleTable =
          await response_getAllProductSaleTable.json();

        setRows(datas_getAllProductSaleTable);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    // Call the function
    fetchData();
  }, []);

  // Show All
  // http://194.233.87.22:5001/api/quotation_report/getAllQuotationReport

  const handleClickShowAll = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getProductSaleTableAllData = await fetch(
        "http://194.233.87.22:5001/api/quotation_report/getAllQuotationReport",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getProductSaleTableAllData =
        await response_getProductSaleTableAllData.json();
      console.log(datas_getProductSaleTableAllData);
      setRows(datas_getProductSaleTableAllData);
      console.log(datas_getProductSaleTableAllData);
      setIsLoading(false);
    };

    fetchData();
  };

  // 1st date search
  // http://193.233.87.22:5001/api/sale_table/getSaleTableByOnlyDate?date=
  const handelClickFetchDateSearch = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getProductSaleDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/sale_table/getSaleTableByOnlyDate?date=" +
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

      const datas_getProductSaleDateSearchTableAllData =
        await response_getProductSaleDateSearchTableAllData.json();
      console.log(datas_getProductSaleDateSearchTableAllData);
      sleep(2000).then(() => {
        setIsLoading(false);
      });
      setRows(datas_getProductSaleDateSearchTableAllData);
      console.log(datas_getProductSaleDateSearchTableAllData);
    };

    // Call the function
    fetchData();
  };

  // Form date search and To date Search
  // http://194.233.87.22:5001/api/sale_table/getSaleTableByFromDateToDate?fromdate=2019-04-17&todate=2019-04-20
  const handelClickFetchDateFormAndToSearch = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getProductSaleDateSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/sale_table/getSaleTableByFromDateToDate?fromdate=" +
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
      sleep(2000).then(() => {
        setIsLoading(false);
      });
      setRows(datas_getProductSaleDateSearchTableAllData);
      console.log(datas_getProductSaleDateSearchTableAllData);
    };

    // Call the function
    fetchData();
  };

  // Invoice
  // http://194.233.87.22:5001/api/quotation_report/getDistinctChallansFromQuotationReport
  const handleAllInvoiceData = () => {
    const fetchData = async () => {
      const response_getSelectedInvoice = await fetch(
        "http://194.233.87.22:5001/api/quotation_report/getDistinctChallansFromQuotationReport",
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
      const product_getSelectedInvoice = datas_getSelectedInvoice.map(
        ({ challan_no: actualValue }) => actualValue
      );

      setAllInvoice([...new Set(product_getSelectedInvoice)]);
      console.log(product_getSelectedInvoice);
    };

    fetchData();
  };

  // Invoice Search
  // http://194.233.87.22:5001/api/sale_table/getSaleTableByOnlyInvoice?invoice=
  const handelClickFetchInvoiceSearch = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getProductSaleInvoiceSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/sale_table/getSaleTableByOnlyInvoice?invoice=" +
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

      const datas_getProductSaleInvoiceSearchTableAllData =
        await response_getProductSaleInvoiceSearchTableAllData.json();
      console.log(datas_getProductSaleInvoiceSearchTableAllData);
      sleep(1000).then(() => {
        setIsLoading(false);
      });
      setRows(datas_getProductSaleInvoiceSearchTableAllData);
      console.log(datas_getProductSaleInvoiceSearchTableAllData);
      // show all
    };

    // Call the function
    fetchData();
  };

  // Product code
  // http://194.233.87.22:5001/api/quotation_report/getDistinctProductCodeFromQuotationReport
  const handleAllProductCode = () => {
    const fetchData = async () => {
      const response_getSelectedProductCode = await fetch(
        "http://194.233.87.22:5001/api/quotation_report/getDistinctProductCodeFromQuotationReport",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedProductCode =
        await response_getSelectedProductCode.json();
      console.log(datas_getSelectedProductCode);
      const product_getSelectedProductCode = datas_getSelectedProductCode.map(
        ({ product_code: actualValue }) => actualValue
      );

      setAllProductCode([...new Set(product_getSelectedProductCode)]);
      console.log(product_getSelectedProductCode);
    };

    fetchData();
  };

  // Product Code Search
  // http://194.233.87.22:5001/api/sale_table/getSaleTable_ProductCode_ById?product_code=
  const handelClickFetchProductCodeSearch = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getProductCodeSearchTableAllData = await fetch(
        "http://194.233.87.22:5001/api/sale_table/getSaleTableByProductCode?product_code=" +
          productCode,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      console.log(response_getProductCodeSearchTableAllData);
      const datas_getProductCodeSearchTableAllData =
        await response_getProductCodeSearchTableAllData.json();
      console.log(datas_getProductCodeSearchTableAllData);
      setRows(datas_getProductCodeSearchTableAllData);
      console.log(datas_getProductCodeSearchTableAllData);
      setIsLoading(false);
    };

    // Call the function
    fetchData();
  };

  // Two Way Search
  // Customer field

  const handleAllCustomer = () => {
    const fetchData = async () => {
      const response_getSelectedCustomer = await fetch(
        "http://194.233.87.22:5001/api/quotation_report/getDistinctCustomerFromQuotationReport",
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
      console.log(datas_getSelectedCustomer);
      const product_getSelectedCustomer = datas_getSelectedCustomer.map(
        ({ customer_name: actualValue }) => actualValue
      );

      setAllCustomer([...new Set(product_getSelectedCustomer)]);
      console.log(product_getSelectedCustomer);
    };

    fetchData();
  };

  // Customer with id

  const handleKeyDownCustomer = (event) => {
    setSelectedCustomer(event.target.value);

    const fetchData = async () => {
      const response_getSelectedCustomer = await fetch(
        "http://194.233.87.22:5001/api/sale_table/getDistinctCIDByCustomerName?customer_name=" +
          selectedCustomer,
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
      console.log(datas_getSelectedCustomer);
      const product_getSelectedCustomerID = datas_getSelectedCustomer.map(
        ({ cid: actualValue }) => actualValue
      );

      setSelectedCustomerId([...new Set(product_getSelectedCustomerID)]);
      console.log(product_getSelectedCustomerID);
    };

    fetchData();
  };

  // Searching Customer auto genarated Name and Id search
  const handleClickSearchbyCustomerWithId = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getSelectedProductNameID = await fetch(
        "http://194.233.87.22:5001/api/quotation_report/getAllByCustomerNameAndCID?customer_name=" +
          selectedCustomer +
          "&cid=" +
          selectedCustomerId,
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

  // Product Filed

  const handleAllProduct = () => {
    const fetchData = async () => {
      const response_getSelectedProduct = await fetch(
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

      const datas_getSelectedProduct = await response_getSelectedProduct.json();
      console.log(datas_getSelectedProduct);
      const product_getSelectedProduct = datas_getSelectedProduct.map(
        ({ product: actualValue }) => actualValue
      );

      setAllProduct([...new Set(product_getSelectedProduct)]);
      console.log(product_getSelectedProduct);
    };

    fetchData();
  };

  // Product field with type or Id

  const handleKeyDownProduct = (event) => {
    // setDisableTypeAutoComplete(true);
    setSelectedProduct(event.target.value);

    const fetchData = async () => {
      const response_getSelectedProduct = await fetch(
        "http://194.233.87.22:5001/api/stock/getAllDistinctTypeByProductName?product=" +
          selectedProduct,
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

  // const handleClickSearchbyProductWithTypeNo = () => {
  //   setIsLoading(true);

  //   const fetchData = async () => {
  //     // for (const item of selectedProductTypeNo) {

  //     const response_getSelectedProductWithTypeNo = await fetch(
  //       "http://194.233.87.22:5001/api/quotation_report/getAllFromQuotationReportByProductNameAndModel?product_name=" +
  //         selectedProduct +
  //         "&model=" +
  //         selectedProductTypeNo[0],
  //       {
  //         method: "POST",
  //         headers: {
  //           "x-access-token": JSON.parse(
  //             localStorage.getItem("x-access-token")
  //           ),
  //         },
  //       }
  //     );

  //     console.log(response_getSelectedProductWithTypeNo);

  //     const datas_getSelectedProductWithTypeNo =
  //       await response_getSelectedProductWithTypeNo.json();

  //     console.log(datas_getSelectedProductWithTypeNo);

  //     setRows(datas_getSelectedProductWithTypeNo);
  //     setIsLoading(false);
  //     // }
  //   };
  //   fetchData();
  // };

  // Handle Product all way Search

  const handleProductSearch = () => {
    if (selectedProduct && selectedProductTypeNo) {
      // Product And ID Both Search
      const fetchData = async () => {
        const response_getSelectedProductWithTypeNo = await fetch(
          "http://194.233.87.22:5001/api/quotation_report/getAllFromQuotationReportByProductNameAndModel?product_name=" +
            selectedProduct +
            "&model=" +
            selectedProductTypeNo[0],
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        console.log(response_getSelectedProductWithTypeNo);

        const datas_getSelectedProductWithTypeNo =
          await response_getSelectedProductWithTypeNo.json();

        console.log(datas_getSelectedProductWithTypeNo);

        setRows(datas_getSelectedProductWithTypeNo);
        setIsLoading(false);
      };

      // Call the function
      fetchData();
    } else if (selectedProduct) {
      // Only product search
      const fetchData = async () => {
        const response_getSelectedProduct = await fetch(
          "http://194.233.87.22:5001/api/quotation_report/getAllFromQuotationReportByProductName?product_name=" +
            selectedProduct,
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        console.log(response_getSelectedProduct);

        const datas_getSelectedProduct =
          await response_getSelectedProduct.json();

        console.log(datas_getSelectedProduct);

        setRows(datas_getSelectedProduct);
        setIsLoading(false);
      };

      // Call the function
      fetchData();
    } else if (selectedProductTypeNo) {
      // Only ID search
      const fetchData = async () => {
        const response_getSelectedProductTypeNo = await fetch(
          "http://194.233.87.22:5001/api/quotation_report/getAllFromQuotationReportByModel?model=" +
            selectedProductTypeNo[0],
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        console.log(response_getSelectedProductTypeNo);

        const datas_getSelectedProductTypeNo =
          await response_getSelectedProductTypeNo.json();

        console.log(datas_getSelectedProductTypeNo);

        setRows(datas_getSelectedProductTypeNo);
        setIsLoading(false);
      };

      // Call the function
      fetchData();
    }
  };

  //Shop Name
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
        const shop_getSelectedShop = datas_getAllShopName.map(
          ({ shop_name: actualValue }) => actualValue
        );

        setShop([...new Set(shop_getSelectedShop)]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  };


  // Total taka
  // const totalTaka = rows.reduce(
  //   (productsaletaka, item) => productsaletaka + Math.round(item.total),
  //   0
  // );



  const totalTaka = (rows.length > 0 && rows
    .reduce((productsaletaka, item) => {
      if (
        item.total !== undefined &&
        item.total !== null &&
        item.total !== ""
      ) {
        productsaletaka += Number(item.total);
      }
      return productsaletaka;
    }, 0)
    .toFixed(2));


    const [selectedID, setSelectedID] = useState(null);
    const [quitationId, setQuitationId] = useState([]);


  const hendleDataInputField = (item) => {
    setSelectedID(item.id);
    setQuitationId(item.id);
    setInvoiceNo(item.challan_no);
    setShopName(item.shop);
    setCustomerName(item.customer_name);
    setCustomerId(item.cid);
    setSaleDate(item.sell_date);
    setProductIdCode(item.product_code);
    setProductName(item.product_name);
    setTypeNo(item.model);
    setWarranty(item.warranty);
    setSalePrice(item.rate);
    setQuantity(item.quantity);
    setTotalItemPrice(item.total);
    setEntryDate(item.entry_date_time);
  };


  // Update api

  const handleUpdateQuotiationReport = async () => {
    if (!productCode) {
      toast.warning("Please Select Any Row");
      return;
    }
    if (!productName) {
      toast.warning("Please Select Any Row");
      return;
    }
    if (!typeNo) {
      toast.warning("Please Select Any Row");
      return;
    }
    if (!productCode) {
      toast.warning("Please Select Any Row");
      return;
    }
    if (!quitationId) {
      toast.warning("Please Select Any Row");
      return;
    }

    try {
      const stock_res = await fetch(
        "http://194.233.87.22:5001/api/stock/getAllStock_By_ProductCode?product_code=" +
          productCode,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      if (stock_res.ok) {
        console.log("ok");
      } else {
        console.log("Api Problem");
      }

      const qutotationRes = await fetch(
        "http://194.233.87.22:5001/api/quotation_report/getDistinctProductCodeFromQuotationReportByCodeAndChallan?challan_no=" +
          invoiceNo +
          "&product_code=" +
          productCode,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      if (qutotationRes.ok) {
        console.log("ok");
      } else {
        console.log("Api Have problem");
      }

      // http://194.233.87.22:5001/api/quotation_report/updateQuotationReportBySerial?product_code=&product_name=&model=&warranty=&rate=&quantity=&unit=&total=&serial=
      const qutotationUpdateRes = await fetch(
        "http://194.233.87.22:5001/api/quotation_report/updateQuotationReportBySerial?product_code=" +
          productCode +
          "&product_name=" +
          productName +
          "&model=" +
          typeNo +
          "&warranty=" +
          warranty +
          "&rate=" +
          salePrice +
          "&quantity=" +
          Quantity +
          "&unit=" +
          selectedUnit +
          "&total=" +
          totalItemPrice +
          "&serial=" +
          quitationId,
        {
          method: "PUT",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      if (qutotationUpdateRes.ok) {
        toast.success("Data Updated");
      } else {
        toast.warning("Sorry data not Update");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const hendleReset = () => {
    setInvoiceNo([]);
    setShopName([]);
    setCustomerName([]);
    setCustomerId([]);
    setSaleDate([]);
    setProductIdCode([]);
    setProductName([]);
    setTypeNo([]);
    setWarranty([]);
    setSalePrice([]);
    setQuantity([]);
    setTotalItemPrice([]);
    setEntryDate([]);
  };

  useEffect(() => {
    handleAllInvoiceData();
    handleAllProductCode();
    handelClickFetchShopName();
    handleAllCustomer();
    handleAllProduct();
  }, []);



  // Pop Up Window
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="full_row_div_product_sale_report">
      <div className="first_div_product_sale_report">
        <div className="container_search_product_sale_report">
          <div className="search_product_sale_report1">
            <div className="input_filed_product_sale_report">
              <label>Date</label>
              <input
                type="date"
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
              <button onClick={handelClickFetchDateSearch}>Search</button>
            </div>
            <div className="input_filed_product_sale_report">
              <label>Invice</label>
              <input
                value={invoiceSearch}
                onChange={(event) => {
                  setInvoiceSearch(event.target.value);
                }}
                list="invoice"
              />
              <datalist id="invoice">
                {allInvoice.length > 0 && allInvoice.map((items, index) => {
                  return <option key={index}>{items}</option>;
                })}
              </datalist>
              <button onClick={handelClickFetchInvoiceSearch}>Search</button>
            </div>
            <div className="input_filed_product_sale_report">
              <label>Product Code</label>

              <input
                value={productCode}
                onChange={(event) => {
                  setProductCode(event.target.value);
                }}
                list="productcode"
              />
              <datalist id="productcode">
                {allProductCode.length > 0 && allProductCode.map((items, index) => {
                  return <option key={index}>{items}</option>;
                })}
              </datalist>
              <button onClick={handelClickFetchProductCodeSearch}>
                Search
              </button>
            </div>
          </div>
          <div className="search_product_sale_report2">
            <div className="input_filed_product_sale_report">
              <label>Form Date</label>
              <input
                type="date"
                onChange={(event) => {
                  setFormDate(event.target.value);
                }}
              />
            </div>
            <div className="input_filed_product_sale_report">
              <label>Customer</label>
              <input
                onSelect={handleKeyDownCustomer}
                onChange={(event) => {
                  setSelectedCustomer(event.target.value);
                }}
                list="customer"
              />
              <datalist id="customer">
                {allCustomer.length > 0 && allCustomer.map((customers, index) => {
                  return <option key={index}>{customers}</option>;
                })}
              </datalist>
            </div>
            <div className="input_filed_product_sale_report">
              <label>Product</label>
              <input
                onSelect={handleKeyDownProduct}
                onChange={(event) => {
                  setSelectedProduct(event.target.value);
                }}
                list={"product"}
                // autoComplete="off"
              />
              <datalist id="product">
                {allProduct.length > 0 && allProduct.map((products, index) => {
                  return <option key={index}>{products}</option>;
                })}
              </datalist>
            </div>
          </div>
          <div className="search_product_sale_report3">
            <div className="input_filed_product_sale_report">
              <label>To Date</label>
              <input
                type="date"
                onChange={(event) => {
                  setToDate(event.target.value);
                }}
              />
              <button onClick={handelClickFetchDateFormAndToSearch}>
                Search
              </button>
            </div>
            <div className="input_filed_product_sale_report">
              <label>ID</label>
              <select
                onSelect={(event) => setSelectedCustomerId(event.target.value)}
              >
                {selectedCustomerId.length > 0 && selectedCustomerId.map((customerid, index) => {
                  return <option key={index}>{customerid}</option>;
                })}
              </select>
              <button onClick={handleClickSearchbyCustomerWithId}>
                Search
              </button>
            </div>
            <div className="input_filed_product_sale_report">
              <label>Type/No</label>
              <select
                // onClick={handleKeyDownProduct}
                onSelect={(event) =>
                  setSelectedProductTypeNo(event.target.value)
                }
              >
                {selectedProductTypeNo.length > 0 && selectedProductTypeNo.map((producttype, index) => {
                  return <option key={index}>{producttype}</option>;
                })}
              </select>
              {/* <button onClick={handleClickSearchbyProductWithTypeNo}>
                Search
              </button> */}
              <button onClick={handleProductSearch}>Search</button>
            </div>
          </div>
          <div className="search_product_sale_report4">
            <div className="input_filed_product_sale_report">
              <button onClick={handleClickShowAll}>Show All</button>
            </div>
          </div>
          <div className="search_product_sale_report5">
            <div>
              <PurchaseReportExcelExport
                excelData={rows}
                fileName={"Excel Export"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="second_div_product_sale_report loader_container_product_sale_report">
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
        ) : (
          <div className="table_wrapper_product_sale_report">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>Serial</th>
                <th>Invoice</th>
                <th>Customer</th>
                <th>CID</th>
                <th>ID/Code</th>
                <th>Product</th>
                <th>Type/No</th>
                <th>Warranty</th>
                <th>Sale Price</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Total Tk</th>
                <th>Sale Date</th>
                <th>Entry Date</th>
                <th>Shop</th>
              </tr>
              <tbody>
                { rows.length > 0 && rows.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => hendleDataInputField(item)}
                    className={
                      selectedID === item.id ? "rows selected" : "rows"
                    }
                  
                    tabindex="0"
                  >
                    <td>{item.id}</td>
                    <td>{item.challan_no}</td>
                    <td>{item.customer_name}</td>
                    <td>{item.cid}</td>
                    <td>{item.product_code}</td>
                    <td>{item.product_name}</td>
                    <td>{item.model}</td>
                    <td>{item.warranty}</td>
                    <td>{item.rate}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.total}</td>
                    <td>{item.sell_date}</td>
                    <td>{item.entry_date_time}</td>
                    <td>{item.shop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="third_div_product_sale_report">
        <div className="container_view_update_product_sale_report">
          <div className="view_update_product_sale_report1">
            <div className="input_filed_product_sale_report">
              <label>Invoice No</label>
              <input
                value={invoiceNo}
                onChange={(event) => {
                  setInvoiceNo(event.target.value);
                }}
              />
            </div>
            <div className="input_filed_product_sale_report">
              <label>Shop Name</label>
              <input
                value={shopName}
                onChange={(event) => {
                  setShopName(event.target.value);
                }}
              />
            </div>
            <div className="input_filed_product_sale_report">
              <select
                onSelect={(event) => {
                  setShop(event.target.value);
                }}
              >
                {shop.length > 0 && shop.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
              <button style={{ width: "7vw" }}>View Invoice</button>
            </div>
            <div className="input_filed_product_sale_report">
              <label>Customer Name</label>
              <input
                value={customerName}
                onChange={(event) => {
                  setCustomerName(event.target.value);
                }}
              />
            </div>
            <div className="input_filed_product_sale_report">
              <label>Customer ID</label>
              <input
                value={customerId}
                onChange={(event) => {
                  setCustomerId(event.target.value);
                }}
              />
            </div>
            <div className="input_filed_product_sale_report">
              <label>Sale Date</label>
              <input
                value={saleDate}
                onChange={(event) => {
                  setSaleDate(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="view_update_product_sale_report2">
            <div className="input_filed_product_sale_report">
              <label>*Product ID/Code</label>
              <input
                value={productIdCode}
                onChange={(event) => {
                  setProductIdCode(event.target.value);
                }}
              />
            </div>
            <div className="input_filed_product_sale_report">
              <label>*Product Name</label>
              <input
                value={productName}
                onChange={(event) => {
                  setProductName(event.target.value);
                }}
              />
            </div>
            <div className="input_filed_product_sale_report">
              <label>*Type/No</label>
              <input
                value={typeNo}
                onChange={(event) => {
                  setTypeNo(event.target.value);
                }}
              />
            </div>
            <div className="input_filed_product_sale_report">
              <label>Warranty</label>
              <input
                value={warranty}
                onChange={(event) => {
                  setWarranty(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="view_update_product_sale_report3">
            <div className="input_filed_product_sale_report">
              <label>*Sale Price</label>
              <input
                value={salePrice}
                onChange={(event) => {
                  setSalePrice(event.target.value);
                }}
              />
            </div>
            <div className="input_filed_product_sale_report">
              <label>*Quantity</label>
              <input
                style={{ width: "7.5vw" }}
                className="input_filed_product_sale_report_sm"
                value={Quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
              />
              <select
                className="input_filed_product_sale_report_sm"
                style={{width:"4.5vw"}}
                value={selectedUnit}
                onChange={(event) => {
                  setSelectedUnit(event.target.value);
                }}
              >
                {quantityUnit.length > 0 && quantityUnit.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="input_filed_product_sale_report">
              <label>*Total Item Price</label>
              <input
                value={totalItemPrice}
                onChange={(event) => {
                  setTotalItemPrice(event.target.value);
                }}
              />
            </div>
            <div className="input_filed_product_sale_report">
              <label>Entry Date</label>
              <input
                type="date"
                value={entryDate}
                onChange={(event) => {
                  setEntryDate(event.target.value);
                }}
              />
            </div>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center",columnGap: "4vw"}}>
              {/* <button onClick={hendleReset}>Reset</button> */}
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
                  onClick={hendleReset}
                  style={{
                    width: "2.8vw",
                    backgroundColor: "#F5F5DC",
                    boxShadow: "0 5px #999",
                    outline: "none",
                    border: "none",
                    borderRadius: ".2vw",
                    
                  }}
                  type="submit"
                >
                  <ResetSvg style={{ cursor: "pointer" }} />
                </button>
                <div style={{ paddingTop: "0.4vw" }}>Reset</div>
              </div>
              {/* <button onClick={handleUpdateQuotiationReport}>Update</button> */}
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
                  onClick={handleUpdateQuotiationReport}
                  style={{
                    width: "2.8vw",
                    backgroundColor: "#F5F5DC",
                    boxShadow: "0 5px #999",
                    outline: "none",
                    border: "none",
                    borderRadius: ".2vw",
                  }}
                  type="submit"
                >
                  <UpdateSvg style={{ cursor: "pointer" }} />
                </button>
                <div style={{ paddingTop: "0.4vw" }}>Update</div>
              </div>
            </div>
          </div>
          <div className="view_update_product_sale_report4">
            <div className="input_filed_product_sale_report">
              <label style={{ width: "5vw" }}>Total</label>
              <input
                value={totalTaka}
                readOnly
                style={{ width: "9vw", fontSize: "1vw" }}
              />
            </div>
            <div className="view_update_product_sale_report4_box">
              <div className="font_size_product_sale_report">Sale Return</div>
              <div className="input_filed_product_sale_report">
                <label>Quantity</label>
                <input className="input_filed_product_sale_report_sm" />
                <input className="input_filed_product_sale_report_sm" />
              </div>
              <div className="input_filed_product_sale_report_custom">
                <div className="font_size_product_sale_report">
                  Also Return Taka/Money
                </div>
                <div className="input_filed_product_sale_report_box">
                  <label className="input_filed_product_sale_report_box_btn">
                    <input
                      type="radio"
                      value="Yes"
                      checked={selectedOption === "Yes"}
                      onChange={handleOptionChange}
                    />
                    <div className="font_size_product_sale_report">Yes</div>
                  </label>
                  <label className="input_filed_product_sale_report_box_btn">
                    <input
                      type="radio"
                      value="No"
                      checked={selectedOption === "No"}
                      onChange={handleOptionChange}
                    />
                    <div className="font_size_product_sale_report">No</div>
                  </label>
                  <input className="input_filed_product_sale_report_sm" />
                  <div className="font_size_product_sale_report">Tk.</div>
                </div>
                <div className="input_filed_product_sale_report" style={{paddingTop:"0.3vw"}}>
                  <button className="return_prduct_sale_report">Return</button>
                  <Button className="custom-product_sale_report_button" onClick={showModal}>
                  Return Report
              </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="popup-window">
        <Modal
          title="Sales Return Page"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={700}
          height={700}
          style={{
            top: 30,
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <div className="container_sale_return_page">
            <div className="container_search_sale_return_page">
              <div className="input_field_sale_retrun_page">
                <label>Date</label>
                <input />
                <button>Search</button>
              </div>
              <div className="input_field_sale_retrun_page">
                <button>Show All</button>
              </div>
            </div>
            <div className="container_text_return_page">
              <div style={{ fontSize: "1vw", fontWeight: "bold" }}>
                Sales Return Report
              </div>
              <div className="input_field_sale_retrun_page">
                <label>Total</label>
                <input />
                <span>Tk</span>
              </div>
            </div>
            <div className="container_table_sale_return_report">
              <table border={3} cellSpacing={2} cellPadding={10}>
                <tr>
                  <th>SL</th>
                  <th>Invoice</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Sales Price</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Total Price</th>
                  <th>Date</th>
                </tr>
                <tbody>
                  {
                    // rows.map((item) =>
                    //     <tr  key={item.id}>
                    //         <td >{item.serial}</td>
                    //         <td >{item.challan_no}</td>
                    //         <td>{item.customer_name}</td>
                    //         <td>{item.cid}</td>
                    //         <td>{item.product_code}</td>
                    //         <td>{item.product_name}</td>
                    //
                    //     </tr>
                    // )
                  }
                </tbody>
              </table>
            </div>
            <div className="container_table_sale_return_report_view">
              <div >
                {/* <button>Excel</button> */}
                <PurchaseReportExcelExport
                
                fileName={"Excel Export"}
              />
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ProductSaleReport;
