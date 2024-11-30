import React from "react";
import "./quotation.css";
import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { ReactComponent as CartSvg } from "../svg/cart.svg";
import { ReactComponent as ResetSvg } from "../svg/reset.svg";
import { ReactComponent as SaveSvg } from "../svg/save.svg";
import "react-toastify/dist/ReactToastify.css";
import ExcelExport from '../../components/ExportExcel';

const Quotation = () => {
  const [rows, setRows] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);
  const [allEmployee, setAllEmployee] = useState([]);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState([]);
  const [isLoading, setIsLoading] = useState("false");
  const [idCode, setIdCode] = useState([]);
  const [productName, setProductName] = useState([]);
  const [type, setType] = useState([]);
  const [salePrice, setSalePrice] = useState([]);
  const [sale, setSale] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [netPrice, setNetPrice] = useState([]);
  const [shop, setShop] = useState([]);
  const [permanentCustomerName, setPermanentCustomerName] = useState([]);
  const [permanentCustomer, setPermanentCustomer] = useState([]);
  const [customerId, setCustomerId] = useState([]);
  const [customerMobile, setCustomerMobile] = useState([]);
  const [customerAddress, setCustomerAddress] = useState([]);
  const [error, setError] = useState("");
  const [saleerror, setSaleError] = useState("");

  const [quantityerror, setQuantityError] = useState("");
  const [challan_noError, setchallan_noError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [PermanentCustomerError, setPermanentCustomerError] = useState("");
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'
    return formattedDate;
  });
  const [isInputDisabled, setInputDisabled] = useState(true);
  const [serialNumber, setSerialNumber] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [warrantyIn, setWarrantyIn] = useState("");
  const [warranty, setWarranty] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("Piece");
  const warrantySelect = ["Select", "Year", "Years", "Months", "Days"];
  const [challan_no, setChalanno] = useState([]);

  const quantityUnit = [
    "Piece",
    "Set",
    "Box",
    "None",
    "Piece",
    "Kg",
    "Gram",
    "Liter",
    "ml",
    "mm",
    "sq ft",
    "Carton",
    "Set",
  ];

  const handleAllEmplyee = () => {
    const fetchData = async () => {
      const response_getSelectedEmplyee = await fetch(
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

      const datas_getSelectedEmplyee = await response_getSelectedEmplyee.json();
      console.log(datas_getSelectedEmplyee);
      const product_getSelectedEmplyee = datas_getSelectedEmplyee.map(
        ({ name: actualValue }) => actualValue
      );

      setAllEmployee([...new Set(product_getSelectedEmplyee)]);
      console.log(product_getSelectedEmplyee);
    };

    fetchData();
  };

  // employee name with id
  const handleKeyDownEmployeeName = (event) => {
    setEmployeeName(event.target.value);

    const fetchData = async () => {
      const response_getSelectedEmployee = await fetch(
        "http://194.233.87.22:5001/api/employee/getEmployeeIDByName?name=" +
          employeeName,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      console.log(response_getSelectedEmployee);
      const datas_getSelectedEmployee =
        await response_getSelectedEmployee.json();
      console.log(datas_getSelectedEmployee);
      const product_getSelectedEmployeeID = datas_getSelectedEmployee.map(
        ({ id: actualValue }) => actualValue
      );

      setSelectedEmployeeID([...new Set(product_getSelectedEmployeeID)]);
      console.log(product_getSelectedEmployeeID);
    };

    fetchData();
  };

  const handleKeyDown = () => {
    const fetchData = async () => {
      const response_getSelectedIdCode = await fetch(
        "http://194.233.87.22:5001/api/product_list/getAllCodes",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getSelectedIdCode = await response_getSelectedIdCode.json();
      console.log(datas_getSelectedIdCode);
      const product_getSelectedIdCode = datas_getSelectedIdCode.map(
        ({ code: actualValue }) => actualValue
      );

      setRows([...new Set(product_getSelectedIdCode)]);
      console.log(product_getSelectedIdCode);
    };

    fetchData();
  };

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  // Prduct id or code selector auto genarated other field
  const handleKeyDownProductName = (event) => {
    setIdCode(event.target.value);

    const fetchData = async () => {
      const response_getSelectedProductName = await fetch(
        "http://194.233.87.22:5001/api/product_list/getAllProductsByCode?code=" +
          idCode,
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getSelectedProductName =
        await response_getSelectedProductName.json();

      const product_getSelectedProductName = datas_getSelectedProductName.map(
        ({ product: actualValue }) => actualValue
      );

      setProductName([...new Set(product_getSelectedProductName)]);
      console.log(product_getSelectedProductName);

      const response_getSelectedProductType = await fetch(
        "http://194.233.87.22:5001/api/product_list/getAllModelsByNameAndCode?code=" +
          idCode +
          "&product=" +
          product_getSelectedProductName[0],
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getSelectedProductType =
        await response_getSelectedProductType.json();

      const product_getSelectedProductType = datas_getSelectedProductType.map(
        ({ model: actualValue }) => actualValue
      );

      setType([...new Set(product_getSelectedProductType)]);

      // http://194.233.87.22:5001/api/stock/getSalePriceByCodeAndNameAndType?product_code=&product=&model=
      const response_getSelectedProductSalePrice = await fetch(
        "http://194.233.87.22:5001/api/stock/getSalePriceByCodeAndNameAndType?product_code=" +
          idCode +
          "&product=" +
          product_getSelectedProductName[0] +
          "&model=" +
          product_getSelectedProductType[0],
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getSelectedProductSalePrice =
        await response_getSelectedProductSalePrice.json();

      const product_getSelectedProductSalePrice =
        datas_getSelectedProductSalePrice.map(
          ({ sale_price: actualValue }) => actualValue
        );
      setSale([...new Set(product_getSelectedProductSalePrice)]);
    };
    fetchData();
  };

  const handleChange = (event) => {
    setIdCode(event.target.value);
    setError("");
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

  const handleUnitTotal = () => {
    const PurchasePrice = parseFloat(salePrice) || 0;
    const Quantityvalue = parseFloat(quantity) || 0;
    const toalPriceValue = PurchasePrice * Quantityvalue;
    return toalPriceValue;
  };

  // Check if idCode already exists in the tableData
  const isDuplicateIdCode = tableData.some((row) => row.idcode === idCode);

  // Insert Price Data Into Table
  const handleClickProductQuationTabel = () => {
    if (idCode.length === 0) {
      setError("you can't leave empty ");
      return;
    }
    if (salePrice.length === 0) {
      setSaleError("you can't leave empty ");
      return;
    }
    if (quantity.length === 0) {
      setQuantityError("you can't leave empty ");
      return;
    }

    if (isDuplicateIdCode) {
      alert("Duplicate idCode entry and some required fields are empty!");
    } else {
      const ProductPrice = parseFloat(salePrice);
      const QuantityValue = parseFloat(quantity);
      const totalPrice = ProductPrice * QuantityValue;

      const newRow = {
        // First table
        serial: serialNumber,
        idcode: idCode,
        productname: productName,
        typeno: type,
        warranty: `${warranty} ${warrantyIn}`,
        productprice: netPrice,
        saleprice: salePrice,
        itemquantity: quantity,
        unitinunit: selectedUnit,
        totalprice: totalPrice,
      };

      setTableData([...tableData, newRow]);
      setSelectedUnit("Piece");
      setSerialNumber(serialNumber + 1);
    }
  };

  const addProduct = () => {
    handleClickProductQuationTabel();
  };

  const resetAllField = (event) => {
    setTableData([]);
    setIdCode([]);
    setProductName([]);
    setType([]);
    setSalePrice([]);
    setQuantity("");
    setPermanentCustomer([]);
    setCustomerId([]);
    setCustomerMobile([]);
    setCustomerAddress([]);
    setTableTotalSale([]);
    setRows([]);
  };

  // Get Permanent Customer Name

  const [forPermanentCusotomer, setForPermanentCusotomer] = useState(true);

  // http://194.233.87.22:5001/api/customer_record/getDistinctCustomerNameRecord
  const HandlePermanentCustomer = () => {
    if (forPermanentCusotomer) {
      const fetchData = async () => {
        try {
          const response_getAllPermanentCustomer = await fetch(
            "http://194.233.87.22:5001/api/customer_record/getDistinctCustomerNameRecord",
            {
              method: "POST",

              headers: {
                "x-access-token": JSON.parse(
                  localStorage.getItem("x-access-token")
                ),
              },
            }
          );
          const datas_getAllPermanentCustomer =
            await response_getAllPermanentCustomer.json();
          const shop_getSelectedPermanentCustomer =
            datas_getAllPermanentCustomer.map(
              ({ customer_name: actualValue }) => actualValue
            );

          setPermanentCustomerName([
            ...new Set(shop_getSelectedPermanentCustomer),
          ]);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchData();
    }
  };

  // Permanent Customer with children

  const handleKeyDownPermanentCustomer = (event) => {
    if (!forPermanentCusotomer) {
      setPermanentCustomer(event.target.value);

      const fetchData = async () => {
        // selected customer id
        //http://194.233.87.22:5001/api/customer_record/getDistinctIDByCustomerName?customer_name=
        const response_getSelectedCustomerId = await fetch(
          "http://194.233.87.22:5001/api/customer_record/getDistinctIDByCustomerName?customer_name=" +
            permanentCustomer,
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

        const product_getSelectedCustomerId = datas_getSelectedCustomerId.map(
          ({ cid: actualValue }) => actualValue
        );
        console.log(product_getSelectedCustomerId);

        setCustomerId([...new Set(product_getSelectedCustomerId)]);

        // Customer Mobile
        // http://194.233.87.22:5001/api/customer_record/getDistinctMobileNoByCustomerNameAndID?customer_name=&cid=
        const response_getSelectedCustomerMobile = await fetch(
          "http://194.233.87.22:5001/api/customer_record/getDistinctMobileNoByCustomerNameAndID?customer_name=" +
            permanentCustomer +
            "&cid=" +
            product_getSelectedCustomerId[0],
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );
        console.log(response_getSelectedCustomerMobile);
        const datas_getSelectedCustomerMobile =
          await response_getSelectedCustomerMobile.json();

        const product_getSelectedCustomerMobile =
          datas_getSelectedCustomerMobile.map(
            ({ mobile_no: actualValue }) => actualValue
          );
        console.log(product_getSelectedCustomerMobile);
        setCustomerMobile([...new Set(product_getSelectedCustomerMobile)]);

        const response_getSelectedCustomerAddress = await fetch(
          "http://194.233.87.22:5001/api/customer_record/getDistinctAddressByCustomerNameAndID?customer_name=" +
            permanentCustomer +
            "&cid=" +
            product_getSelectedCustomerId[0],
          {
            method: "POST",
            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );
        console.log(response_getSelectedCustomerAddress);
        const datas_getSelectedCustomerAddress =
          await response_getSelectedCustomerAddress.json();

        const product_getSelectedCustomerAddress =
          datas_getSelectedCustomerAddress.map(
            ({ address: actualValue }) => actualValue
          );
        console.log(product_getSelectedCustomerAddress);
        setCustomerAddress([...new Set(product_getSelectedCustomerAddress)]);
      };

      fetchData();
    }
  };


  const fetchchllannumber = async () => {
    try {
      // Fetch data from the server
      const response = await fetch(
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
      const data = await response.json();

      const maxChallanNumber = data.reduce(
        (max, data) => Math.max(max, parseInt(data.challan_no) || 0),
        0
      );

      const nextChallanNumber = maxChallanNumber + 1;

      setChalanno(nextChallanNumber);
      setIsLoading(false);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error fetching data:", error);
      setIsLoading(false); // Set isLoading to false in case of an error
    }
  };

  // Call the fetchData function

  useEffect(() => {
    handleAllEmplyee();
    fetchchllannumber();
    handelClickFetchShopName();
    handleKeyDown();
    HandlePermanentCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [tableTotalSale, setTableTotalSale] = useState([]);

  useEffect(() => {
    const totalSale = (tableData.length > 0 && tableData.reduce(
      (total, item) => total + Math.round(item.totalprice),
      0
    ));

    setTableTotalSale(totalSale);
  }, [tableData]);

  const handleCheckBox = () => {
    setForPermanentCusotomer(!forPermanentCusotomer);
    setInputDisabled(!isInputDisabled);
  };

  const handlesaveApproveSlae = async () => {
    try {
      setIsLoading(true);

      // Validate Address
      if (permanentCustomer.length === 0) {
        setPermanentCustomerError("You can't leave the empty");

        return;
      }

      // Validate Mobile
      if (customerMobile.length === 0) {
        setMobileError("You can't leave the empty");

        return;
      }

      // Validate Invested Amount
      if (customerAddress.length === 0) {
        setAddressError("You can't leave the empty");

        return;
      }
      if (tableTotalSale === 0) {
        setchallan_noError("You can't leave the empty");

        return;
      }
      const itemwarranty = `${warranty} ${warrantyIn}`;

      const response_saveData = await fetch(
        `http://194.233.87.22:5001/api/quotation_report/postQuotation?challan_no=${challan_no}&customer_name=${permanentCustomer}&cid=${customerId}&product_code=${idCode}&product_name=${productName}&model=${type}&warranty=${itemwarranty}&rate=${salePrice}&quantity=${quantity}&unit=${selectedUnit}&total=${tableTotalSale}&sell_date=${currentDate}&entry_date_time=${currentDate}&shop=${shop} `,
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
        toast.success("Sale is Approved");
        fetchchllannumber();
        resetAllField();
      } else {
        toast.error("Failed to save data. Please check the input.");
      }
    } catch (error) {
      toast.error("Failed to save data. Please try again later.");
      setIsLoading(false);
    }
  };

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
  console.log(customerMobile);

  return (
    <div className="full_div_quotation">
      <ToastContainer />
      <div className="conatiner_div_quotation">
        <div className="first_rov_div_quotation">
          <div className="quotation_search_row_div1">
            <div className="quotation_search1">
              <div className="input_field_quotation">
                <label>*ID/Code</label>
                <input
                  onSelect={handleKeyDownProductName}
                  onChange={handleChange}
                  list="idcode"
                  style={{
                    borderColor: error && idCode.length === 0 ? "red" : "",
                  }}
                />
                <datalist id="idcode">
                  {rows.length > 0 &&
                    rows.map((items, index) => {
                      return <option key={index}>{items}</option>;
                    })}
                </datalist>
              </div>
              {error && idCode.length === 0 && (
                <div
                  style={{
                    color: "red",
                    fontSize: ".7vw",
                    marginLeft: "8vw",
                    marginTop: "-.5vw",
                    marginBottom: ".2vw",
                  }}
                >
                  {error}
                </div>
              )}
              <div className="input_field_quotation">
                <label>*Product Name</label>
                {/* <input
                  value={productName}
                  onSelect={(event) => {
                    setProductName(event.target.value);
                  }}
                  list="productname"
                />
                <datalist id="productname">
                  {productName.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
                </datalist> */}
                <select
                  value={productName}
                  onSelect={(event) => setProductName(event.target.value)}
                >
                  {productName.length > 0 &&
                    productName.map((item, index) => {
                      return <option key={index}>{item}</option>;
                    })}
                </select>
              </div>
              <div className="input_field_quotation">
                <label>*Type/No</label>
                <select
                  value={type}
                  onSelect={(event) => {
                    setType(event.target.value);
                  }}
                >
                  {type.length > 0 &&
                    type.map((item, index) => {
                      return <option key={index}>{item}</option>;
                    })}
                </select>
              </div>
            </div>
            <div className="quotation_search2">
              <div className="input_field_quotation">
                <label>*Sales Price</label>
                <select
                  // value={salePrice}
                  onChange={(event) => {
                    setSalePrice(event.target.value);
                    setSaleError("");
                  }}
                  style={{
                    borderColor:
                      saleerror && salePrice.length === 0 ? "red" : "",
                  }}
                >
                  <option>select your price</option>
                  {sale.length > 0 &&
                    sale.map((saleprice, index) => {
                      return <option key={index}>{saleprice}</option>;
                    })}
                </select>
                {/* <input
                  value={sale}
                  onChange={(event) => {
                    setSale(event.target.value);
                  }}
                  list="productPrice"
                />
                <datalist id="productPrice">
                  {salePrice.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
                </datalist> */}
              </div>
              {saleerror && (
                <div
                  style={{
                    color: "red",
                    fontSize: ".7vw",
                    marginLeft: "8vw",
                    marginTop: "-.5vw",
                    marginBottom: ".2vw",
                  }}
                >
                  {saleerror}
                </div>
              )}

              <div className="input_field_quotation">
                <label>*Sale Quantity</label>
                <input
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                  style={{
                    borderColor:
                      quantityerror && quantity.length === 0 ? "red" : "",
                    width: "7vw",
                  }}
                />
                <select
                  style={{ width: "5vw" }}
                  value={selectedUnit}
                  onChange={handleUnitChange}
                >
                  {quantityUnit.length > 0 &&
                    quantityUnit.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </div>
              {quantityerror && quantity.length === 0 && (
                <div
                  style={{
                    color: "red",
                    fontSize: ".7vw",
                    marginLeft: "8vw",
                    marginTop: "-.5vw",
                    marginBottom: ".2vw",
                  }}
                >
                  {quantityerror}
                </div>
              )}

              <div className="input_field_quotation">
                <label>*Item Total Peice</label>
                <input value={handleUnitTotal()} />
              </div>
              <div className="input_field_quotation">
                <label>Warranty</label>
                <input
                  style={{ width: "7vw" }}
                  onChange={(event) => {
                    setWarranty(event.target.value);
                  }}
                />
                <select
                  style={{ width: "5vw" }}
                  value={warrantyIn}
                  onChange={(event) => {
                    setWarrantyIn(event.target.value);
                  }}
                >
                  {warrantySelect.length > 0 &&
                    warrantySelect.map((items) => <option>{items}</option>)}
                </select>
              </div>
            </div>
            <div className="quotation_search3">
              <div >
                {/* <button onClick={addProduct}>Add To Cart</button> */}
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
                  onClick={addProduct}
                  style={{
                    width: "3vw",
                    backgroundColor: "#F5F5DC",
                    boxShadow: "0 5px #999",
                    outline: "none",
                    border: "none",
                    borderRadius: ".2vw",
                  }}
                  type="submit"
                >
                  <CartSvg style={{ cursor: "pointer" }} />
                </button>
                <div style={{ paddingTop: "0.4vw" }}>Add To Cart</div>
              </div>
              </div>
            </div>
          </div>
          <div className="container_table_quotation">
            <div className="table_wrapper_quotation">
              <table border={3} cellSpacing={2} cellPadding={10}>
                <tr>
                  <th>SL</th>
                  <th>ID/Code</th>
                  <th>Product Name</th>
                  <th>Type/No</th>
                  <th>Warranty</th>
                  <th>Sale Price</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Item Total</th>
                </tr>

                <tbody>
                  {tableData.length > 0 &&
                    tableData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.serial}</td>
                        <td>{item.idcode}</td>
                        <td>{item.productname}</td>
                        <td>{item.typeno}</td>
                        <td>{item.warranty}</td>
                        <td>{item.saleprice}</td>
                        <td>{item.itemquantity}</td>
                        <td>{item.unitinunit}</td>
                        <td>{item.totalprice}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="cotainer_view_quotation">
            <div className="input_field_quotation_custom">
              <label>Comment/Service</label>
              <input />
            </div>
            <div className="cotainer_view_quotation_select">
              <div className="input_field_quotation">
                <label className="custom_label_quotation">
                  Print By(Employee)
                </label>
                <select
                  onClick={handleKeyDownEmployeeName}
                  onChange={(event) => {
                    setEmployeeName(event.target.value);
                  }}
                >
                  {allEmployee.length > 0 &&
                    allEmployee.map((employee, index) => {
                      return <option key={index}>{employee}</option>;
                    })}
                </select>
              </div>
              <div className="input_field_quotation">
                <label>Employee ID</label>
                <select
                  onSelect={(event) =>
                    setSelectedEmployeeID(event.target.value)
                  }
                >
                  {selectedEmployeeID.length > 0 &&
                    selectedEmployeeID.map((employeeid, index) => {
                      return <option key={index}>{employeeid}</option>;
                    })}
                </select>
              </div>
              <div className="input_field_quotation">
                <label>Area</label>
                <input />
              </div>
            </div>
          </div>
        </div>
        <div className="second_row_div_quotation">
          <div className="quotion_search_row_div2">
            <div className="quotation_font_size">Customer Information</div>
            <div className="quotation_search_customer_info">
              <div className="input_field_quotation_percusto">
                <div className="quotation_font_size-sm">Permanent Customer</div>
                <input
                  type="checkbox"
                  className="quotation_input_checkbox"
                  onChange={handleCheckBox}
                />
              </div>
            </div>
            <div className="input_field_quotation">
              <label>*Name</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: ".5vw",
                }}
              >
                <input
                  list="permanentcustomer"
                  value={permanentCustomer}
                  onSelect={handleKeyDownPermanentCustomer}
                  onChange={(event) => {
                    setPermanentCustomer(event.target.value);
                    setPermanentCustomerError("");
                  }}
                  style={{
                    borderColor:
                      PermanentCustomerError && customerAddress.length === 0
                        ? "red"
                        : "",
                  }}
                />
              </div>
              <datalist id="permanentcustomer">
                {permanentCustomerName.length > 0 &&
                  permanentCustomerName.map((permanentCustomerName, index) => {
                    return <option key={index}>{permanentCustomerName}</option>;
                  })}
              </datalist>
            </div>
            {PermanentCustomerError && (
              <div
                style={{
                  color: "red",
                  fontSize: ".7vw",
                  marginLeft: "6vw",
                  marginTop: "-.5vw",
                  marginBottom: ".2vw",
                }}
              >
                {PermanentCustomerError}
              </div>
            )}
            <div className="input_field_quotation">
              <label>ID</label>
              <select
                style={{ width: "8.5vw" }}
                disabled={isInputDisabled}
                onSelect={(event) => {
                  setCustomerId(event.target.value);
                }}
              >
                {customerId.length > 0 &&
                  customerId.map((customerid, index) => {
                    return <option key={index}>{customerid}</option>;
                  })}
              </select>
              <Button style={{ width: "3.5vw" }} onClick={showModal}>
                +
              </Button>
            </div>
            <div className="input_field_quotation">
              <label>*Mobile</label>
              <select
                onSelect={(event) => {
                  setCustomerMobile(event.target.value);
                  setMobileError("");
                }}
                style={{
                  borderColor:
                    mobileError && customerAddress.length === 0 ? "red" : "",
                }}
              >
                {customerMobile.length > 0 &&
                  customerMobile.map((customermobile, index) => {
                    return <option key={index}>{customermobile}</option>;
                  })}
              </select>
            </div>
            <div className="input_field_quotation">
              <label>*Address</label>
              <select
                onChange={(event) => {
                  setCustomerAddress(event.target.value);
                  setAddressError("");
                }}
                value={customerAddress}
                style={{
                  borderColor:
                    addressError && customerAddress.length === 0 ? "red" : "",
                }}
              >
                {customerAddress.length > 0 &&
                  customerAddress.map((customeraddress, index) => (
                    <option key={index}>{customeraddress}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className="container_sale_summary_quotation_full_div">
            <div className="quotation_font_size"> Sale Summary</div>
            <div className="container_sale_summary_quotation">
              <div className="input_field_quotation">
                <label>*Total Amount</label>
                <input
                  value={tableTotalSale}
                  style={{
                    borderColor:
                      challan_noError && tableTotalSale === 0 ? "red" : "",
                  }}
                />
              </div>
              {challan_noError && tableTotalSale === 0 && (
                <div
                  style={{
                    color: "red",
                    fontSize: ".7vw",
                    marginLeft: "8vw",
                    marginTop: "-.5vw",
                    marginBottom: ".2vw",
                  }}
                >
                  {challan_noError}
                </div>
              )}
              <div className="input_field_quotation">
                <label>*Quotation No</label>
                <input value={challan_no} />
              </div>
              <div className="input_field_quotation">
                <label>*Date</label>
                <input
                  type="date"
                  value={currentDate}
                  onChange={(event) => setCurrentDate(event.target.value)}
                />
              </div>
              <div className="input_field_quotation">
                <label>*Shop Set</label>
                <select
                  onSelect={(event) => {
                    setShop(event.target.value);
                  }}
                >
                  {shop.length > 0 &&
                    shop.map((item, index) => (
                      <option key={index}>{item}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="container_sale_summary_quotation_button">
              <div className="input_field_quotation">
                <button onClick={handlesaveApproveSlae} style={{width: "8vw",}}>Approve Sale</button>
              </div>
              <div>
                {/* <button onClick={resetAllField}>Reset</button> */}
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
                  onClick={resetAllField}
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="popup-window">
        <Modal
          title="Permanent Customer Setup"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={900}
          height={800}
          style={{
            top: 30,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <div className="container_permanent_customer">
            <div className="first_row_div_permanent_customer">
              <div className="container_search_permanent_customer">
                <div style={{ fontSize: "1vw", fontWeight: "bold" }}>
                  Customer Information
                </div>
                <div className="container_separate_permanent_customer">
                  <div>
                    <div className="search_permanent_customer">
                      <div className="search_permanent_customer_column1">
                        <div className="input_field_permanent_customer">
                          <label>Customer ID</label>
                          <input />
                        </div>
                        <div className="input_field_permanent_customer">
                          <label>Custmer Name</label>
                          <input />
                        </div>
                      </div>
                      <div className="search_permanent_customer_column2">
                        <div className="input_field_permanent_customer">
                          <label>Mobile</label>
                          <input />
                        </div>
                        <div className="input_field_permanent_customer">
                          <label>Address</label>
                          <input />
                        </div>
                      </div>
                    </div>
                    <div className="container_view_permanent_customer">
                      <div
                        style={{
                          fontSize: "1vw",
                          fontWeight: "bold",
                          marginBottom: "1vw",
                        }}
                      >
                        Previous Total, Paid, Due:
                      </div>
                      <div className="container_view_money_permanent_customer">
                        <div className="input_field_permanent_customer">
                          <label style={{ width: "3vw" }}>Total</label>
                          <input />
                        </div>

                        <div className="input_field_permanent_customer">
                          <label style={{ width: "3vw" }}>Paid</label>
                          <input />
                        </div>

                        <div className="input_field_permanent_customer">
                          <label style={{ width: "3vw" }}>Due</label>
                          <input />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* <button>Save</button> */}
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
                >
                  <SaveSvg style={{ cursor: "pointer" }} />
                </button>
                <div style={{ paddingTop: "0.4vw" }}>Save</div>
              </div>
                  </div>
                </div>
              </div>
              <div className="input_field_permanent_customer">
                <button>Show All</button>
              </div>
            </div>
            <div className="second_row_div_permanent_customer">
              <div className="table_wrapper_permanent_customer">
                <table border={3} cellSpacing={2} cellPadding={10}>
                  <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Due</th>
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
            </div>
            <div className="third_row_div_permanent_customer">
              <div>
                {/* <button>Export Excel</button> */}
                <ExcelExport fileName={"ParmanentCustomerInformation"}/>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Quotation;
