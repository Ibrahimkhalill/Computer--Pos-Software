import React from "react";
import "./purchase-opration.css";
import { useState, useEffect } from "react";
import { ReactComponent as ResetSvg } from "../svg/reset.svg";
import { ReactComponent as SaveSvg } from "../svg/save.svg";
import { ReactComponent as SheetsSvg } from "../svg/sheets.svg";
import { ReactComponent as CartSvg } from "../svg/cart.svg";
import ExportExcel from "../../components/ExportExcel";
import { ToastContainer, toast } from "react-toastify";

const PurchaseOpration = () => {
  const [rows, setRows] = useState([]);
  const [selectProductName, setSelectProductName] = useState([]);
  // Price related state that store into table
  const [idCode, setIdCode] = useState([]);
  const [isInputDisabled, setInputDisabled] = useState(true);
  const [serialNumber, setSerialNumber] = useState(1);
  const [price, setPrice] = useState(0);
  const [localCost, setLocalCost] = useState(0);
  const [otherCost, setOtherCost] = useState(0);
  const [netPrice, setNetPrice] = useState([]);
  const [purchaseIdCode, setPurchaseIdCode] = useState([]);
  const [product, setProduct] = useState([]);
  const [typeNo, setTypeNo] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("Piece");
  const [salePrice, setSalePrice] = useState([]);
  const [warranty, setWarranty] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [warrantyIn, setWarrantyIn] = useState([]);
  const [shopName, setShopName] = useState([]);
  const [shop, setShop] = useState([]);
  const [paymentType, setPaymentType] = useState([]);
  const [supplierName, setSupplierName] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [supplierMobile, setSupplierMobile] = useState([]);
  const [supplierAddress, setSupplierAddress] = useState([]);
  // current date
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'
    return formattedDate;
  });
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

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const warrantySelect = ["Select", "Year", "Years", "Months", "Days"];

  const payment = ["Hand Cash", "Bank Payment", "Others Method"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_getAllSupplier = await fetch(
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

        const datas_getAllSupplier = await response_getAllSupplier.json();
        const product_getAllSupplier = datas_getAllSupplier.map(
          ({ company_name: actualValue }) => actualValue
        );
        setSupplierName([...new Set(product_getAllSupplier)]);

        console.log(product_getAllSupplier);
        // fetch name
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleKeyDownSupplier = (event) => {
    setSupplier(event.target.value);
    const fetchData = async () => {
      // selected customer id
      const response_getSelectedCustomerId = await fetch(
        "http://194.233.87.22:5001/api/supplier/getDistinctSupplierMobileByName?company_name=" +
          supplier,
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
        ({ mobile: actualValue }) => actualValue
      );

      setSupplierMobile([...new Set(product_getSelectedCustomerID)]);
      // select mobile

      const response_getSelectedCustomerMobile = await fetch(
        "http://194.233.87.22:5001/api/supplier/getDistinctSupplierAddressByName?company_name=" +
          supplier,
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
          ({ address: actualValue }) => actualValue
        );

      setSupplierAddress([...new Set(product_getSelectedCustomerMobile)]);
    };

    fetchData();
  };

  // Product ID, Name, Type Selector
  const handlePurchaseCode = () => {
    const fetchData = async () => {
      const response_getPurchaseCodeData = await fetch(
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

      const datas_getPurchaseCodeData =
        await response_getPurchaseCodeData.json();
      console.log(datas_getPurchaseCodeData);
      const product_getPurchaseCode = datas_getPurchaseCodeData.map(
        ({ code: actualValue }) => actualValue
      );
      setSelectProductName(product_getPurchaseCode);
      console.log(product_getPurchaseCode);
    };

    fetchData();
  };

  // http://194.233.87.22:5001/api/product_list/getAllProductsByCode?code=
  const handlePurchaseId = () => {
    if (!isSameProduct) {
      const fetchData = async () => {
        try {
          const response_getPurchaseOprationIdCode = await fetch(
            "http://194.233.87.22:5001/api/product_list/getAllFromProductListByCode?code=" +
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

          const datas_getPurchaseOprationIdCode =
            await response_getPurchaseOprationIdCode.json();
          const product_getSelectedProductCode =
            datas_getPurchaseOprationIdCode.map(
              ({ code: actualValue }) => actualValue
            );
          console.log(product_getSelectedProductCode);
          setRows([...new Set(product_getSelectedProductCode)]);

          // fetch name
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

          const product_getSelectedName = datas_getSelectedProductName.map(
            ({ product: actualValue }) => actualValue
          );
          console.log(product_getSelectedName);
          setProduct([...new Set(product_getSelectedName)]);

          // type
          // http://194.233.87.22:5001/api/product_list/getAllModelsByNameAndCode?code=001&product=Kaspersky
          const response_getSelectedTypeNo = await fetch(
            "http://194.233.87.22:5001/api/product_list/getAllModelsByNameAndCode?code=" +
              idCode +
              "&product=" +
              product_getSelectedName[0],
            {
              method: "POST",
              headers: {
                "x-access-token": JSON.parse(
                  localStorage.getItem("x-access-token")
                ),
              },
            }
          );
          const datas_getSelectedTypeNo =
            await response_getSelectedTypeNo.json();

          const product_getSelectedTypeNo = datas_getSelectedTypeNo.map(
            ({ model: actualValue }) => actualValue
          );
          console.log(product_getSelectedTypeNo);
          setTypeNo([...new Set(product_getSelectedTypeNo)]);
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchData();
    }
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

  useEffect(() => {
    handelClickFetchShopName();
  }, []);

  // Disable and unable Price input field
  const handleCheckBox = () => {
    setInputDisabled(!isInputDisabled);
  };

  // Insert Price Data Into Table
  const handleCalculate = () => {
    if (!isSameProduct) {
      const priceValue = parseFloat(price) || 0;
      const localCostValue = parseFloat(localCost) || 0;
      const other = parseFloat(otherCost) || 0;

      // Perform the calculation
      const calculatedValue = priceValue + localCostValue + other;
      setNetPrice(calculatedValue);
    }
  };

  const handleUnitTotal = () => {
    const PurchasePrice = parseFloat(netPrice) || 0;
    const Quantityvalue = parseFloat(quantity) || 0;
    const toalPriceValue = PurchasePrice * Quantityvalue;
    return toalPriceValue;
  };

  // Insert Price Data Into Table
  // const handleClickPurchaseTabel = () => {
  //   // calulate price between purchase price and quantity
  //   const PurchasePrice = parseFloat(netPrice);
  //   const Quantityvalue = parseFloat(quantity);
  //   const totalPrice = PurchasePrice * Quantityvalue;
  //   const newRow = {
  //     // First table
  //     serial: serialNumber,
  //     price: price,
  //     localCost: localCost,
  //     otherCost: otherCost,
  //     netPrice: netPrice,

  //     // second table
  //     idcode: idCode,
  //     productname: product,
  //     typeno: typeNo,
  //     warranty: `${warranty} ${warrantyIn}`,
  //     purchaseprice: netPrice,
  //     saleprice: salePrice,
  //     itemquantity: quantity,
  //     unitinunit: selectedUnit,
  //     totalprice: totalPrice,
  //   };

  //   setTableData([...tableData, newRow]);
  //   // First data table
  //   setPrice(0);
  //   setLocalCost(0);
  //   setOtherCost(0);
  //   setNetPrice("");
  //   // Second Data table
  //   setIdCode([]);
  //   setProduct([]);
  //   setTypeNo([]);
  //   setWarranty([]);
  //   setNetPrice([]);
  //   setSalePrice([]);
  //   setQuantity("");
  //   setSelectedUnit("Piece");
  //   setSerialNumber(serialNumber + 1);
  // };

  const handleClickPurchaseTabel = () => {
    const PurchasePrice = parseFloat(netPrice);
    const Quantityvalue = parseFloat(quantity);
    const totalPrice = PurchasePrice * Quantityvalue;

    // Check if idCode already exists in the tableData
    const isDuplicateIdCode = tableData.some((row) => row.idcode === idCode);

    // Check for required fields
    const requiredFields = [
      idCode,
      product,
      typeNo,
      netPrice,
      salePrice,
      quantity,
      totalPrice,
    ];
    const hasEmptyFields = requiredFields.some((field) => !field);

    if (isDuplicateIdCode && hasEmptyFields) {
      alert("Duplicate idCode entry and some required fields are empty!");
    } else if (isDuplicateIdCode) {
      alert("Duplicate idCode entry!");
    } else if (hasEmptyFields) {
      alert("Some required fields are empty!");
    } else {
      const newRow = {
        serial: serialNumber,
        price: price,
        localCost: localCost,
        otherCost: otherCost,
        netPrice: netPrice,
        idcode: idCode,
        productName: product,
        typeNo: typeNo,
        warranty: `${warranty} ${warrantyIn}`,
        purchaseprice: netPrice,
        saleprice: salePrice,
        itemquantity: quantity,
        unitinunit: selectedUnit,
        totalprice: totalPrice,
      };

      // Add the new row if it's not a duplicate idCode
      setTableData([...tableData, newRow]);

      // Reset state values
      // setPrice(0);
      // setLocalCost(0);
      // setOtherCost(0);

      // setNetPrice("");
      setIdCode([]);
      // setProduct([]);
      // setTypeNo([]);
      // setWarranty([]);
      // setNetPrice([]);
      // setSalePrice([]);
      setSelectedUnit("Piece");
      setSerialNumber(serialNumber + 1);
    }
  };

  // Reset field

  // const handleReset = () => {
  //   // setIdCode([]);
  //   // setProduct([]);
  //   // setTypeNo([]);
  //   // setWarranty([]);
  //   // setNetPrice([]);
  //   // setSalePrice([]);
  //   // setQuantity([]);
  // };

  const handleClickDown = () => {
    handleClickPurchaseTabel();
    if (isSameProduct) {
      handleCalculate();
    }
    // handleReset();
    // handleUnitTotal();
  };
  const [tableTotalSale, setTableTotalSale] = useState(0);

  useEffect(() => {
    // Calculate total sale when tableData changes
    const totalSale = tableData.reduce(
      (total, item) => total + Math.round(item.totalprice),
      0
    );

    setTableTotalSale(totalSale);
  }, [tableData]);

  const [paidTaka, setPaidTaka] = useState(tableTotalSale);
  const TotalDue = tableTotalSale - paidTaka;

  const resetTable = () => {
    setTableData([]);
  };

  const [isSameProduct, setIsSameProduct] = useState(false);

  const handleCheckBoxChange = (event) => {
    setIsSameProduct(event.target.checked);

    if (event.target.checked) {
      // Checkbox is checked, hold product and type data, and empty ID/Code field

      setProduct(product);
      setTypeNo(typeNo);
      setSalePrice(salePrice);
      setNetPrice(netPrice);
      setQuantity(1);
    }
  };

  const handlePurchase = ()=>{
    toast.success("Purcahses Successesfully ")
  }

  useEffect(() => {
    handlePurchaseCode();
  }, []);

  return (
    <div className="full_div_purchese_opration">
      <ToastContainer/>
      <div className="first_row_div_purchese_opration">
        <div className="custom_two_div_purchese_opration">
          <div className="container_search_column1_purchese_opration">
            <div className="input_field_purchese_opration">
              <label className="label_field_purchese_opration">ID/Code*</label>
              <input
                className="input_purchese_opration"
                autoFocus
                id="idCode"
                onChange={(e) => {
                  setIdCode(e.target.value);
                }}
                onSelect={handlePurchaseId}
                required
                list="idcode"
              />
              <datalist id="idcode">
                {selectProductName.map((idcode, index) => {
                  return <option key={index}>{idcode}</option>;
                })}
              </datalist>
            </div>
            <div className="input_field_purchese_opration">
              <label className="label_field_purchese_opration">
                Product Name*
              </label>
              <select
                className="select_field_purchese_opration"
                value={product}
                onSelect={(event) => {
                  setProduct(event.target.value);
                }}
                disabled={isSameProduct}
              >
                {product &&
                  product.map((product, index) => {
                    return <option key={index}>{product}</option>;
                  })}
              </select>
            </div>
            <div className="input_field_purchese_opration">
              <label className="label_field_purchese_opration">Type/No*</label>
              <select
                className="select_field_purchese_opration"
                value={typeNo}
                onSelect={(event) => {
                  setTypeNo(event.target.value);
                }}
                disabled={isSameProduct}
              >
                {typeNo &&
                  typeNo.map((typeno, index) => {
                    return <option key={index}>{typeno}</option>;
                  })}
              </select>
            </div>
            <div className="input_field_purchese_opration">
              <div className="box">
                <input
                  type="checkbox"
                  checked={isSameProduct}
                  onChange={handleCheckBoxChange}
                />
                <h5>Same Product (Multi Barcode)</h5>
              </div>
            </div>
            <div className="custom_price_field_purchese_opration">
              <h5 style={{ marginBottom: "0.5vw" }}>
                Only For Net Purchase Price
              </h5>

              <div className="box">
                <div className="input_field_purchese_opration_column">
                  <input type="checkBox" onChange={handleCheckBox} />
                </div>

                <div className="input_field_purchese_opration_column">
                  <label className="label_field_purchese_opration_custom">
                    Price
                  </label>
                  <input
                    className="input_purchese_opration input_purchese_opration_custom"
                    disabled={isInputDisabled}
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    type="number"
                  />
                </div>
                <div className="input_field_purchese_opration_column">
                  <label className="label_field_purchese_opration_custom">
                    LC Cost
                  </label>
                  <input
                    className="input_purchese_opration input_purchese_opration_custom"
                    disabled={isInputDisabled}
                    value={localCost}
                    onChange={(event) => setLocalCost(event.target.value)}
                    type="number"
                  />
                </div>
                <div className="input_field_purchese_opration_column">
                  <label className="label_field_purchese_opration_custom">
                    Other Cost
                  </label>
                  <input
                    className="input_purchese_opration input_purchese_opration_custom"
                    disabled={isInputDisabled}
                    value={otherCost}
                    onChange={(event) => setOtherCost(event.target.value)}
                    type="number"
                  />
                </div>
                <div className="input_field_purchese_opration_column">
                  <button
                    className="button_field_purchese_opration button_field_purchese_opration_column"
                    disabled={isInputDisabled}
                    onClick={handleCalculate}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container_search_column2_purchese_opration">
            <div className="input_field_purchese_opration">
              <label className="label_field_purchese_opration">Quantity*</label>
              <input
                className="input_purchese_opration lg-input"
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
                type="number"
                disabled={isSameProduct}
              />
              <select
                className="select_field_purchese_opration sm-select"
                value={selectedUnit}
                onChange={handleUnitChange}
              >
                {quantityUnit.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="input_field_purchese_opration">
              <label className="label_field_purchese_opration">
                Purchase Price*
              </label>
              <input
                className="input_purchese_opration"
                value={netPrice}
                onChange={(event) => {
                  setNetPrice(event.target.value);
                }}
                type="number"
                disabled={isSameProduct}
              />
            </div>
            <div className="input_field_purchese_opration">
              <label className="label_field_purchese_opration">
                Unit Total*
              </label>
              <input
                className="input_purchese_opration"
                value={handleUnitTotal()}
                readOnly
              />
            </div>
            <div className="input_field_purchese_opration">
              <label className="label_field_purchese_opration">
                Sale Price*
              </label>
              <input
                className="input_purchese_opration"
                value={salePrice}
                onChange={(event) => setSalePrice(event.target.value)}
                type="number"
              />
            </div>
            <div className="input_field_purchese_opration">
              <label className="label_field_purchese_opration">Warranty</label>
              <input
                className="input_purchese_opration lg-input"
                value={warranty}
                onChange={(event) => {
                  setWarranty(event.target.value);
                }}
                type="number"
              />
              <select
                className="select_field_purchese_opration sm-select"
                value={warrantyIn}
                onChange={(event) => {
                  setWarrantyIn(event.target.value);
                }}
              >
                {warrantySelect.map((items) => (
                  <option>{items}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="containe_add_to_card">
            <div className="input_field_purchese_opration">
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
                  onClick={handleClickDown}
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

        <div className="container_search_column3_purchese_opration">
          <h4 className="container_search_column3_purchese_opration_h4">
            Supplier Information
          </h4>

          <div className="input_field_purchese_opration">
            <label className="label_field_purchese_opration">
              Supplier Name*
            </label>
            <input
              className="input_purchese_opration"
              onChange={(e) => setSupplier(e.target.value)}
              onSelect={handleKeyDownSupplier}
              list="supplier"
            />
            <datalist id="supplier">
              {supplierName.map((sup, index) => {
                return <option key={index}>{sup}</option>;
              })}
            </datalist>
          </div>
          <div className="input_field_purchese_opration">
            <label className="label_field_purchese_opration">
              Mobile Number*
            </label>
            <select
              className="select_field_purchese_opration"
              onSelect={(event) => setSupplierMobile(event.target.value)}
            >
              {supplierMobile.map((suppliermobi, index) => {
                return <option key={index}>{suppliermobi}</option>;
              })}
            </select>
          </div>
          <div className="input_field_purchese_opration">
            <label className="label_field_purchese_opration">Address*</label>
            <select
              className="select_field_purchese_opration"
              onSelect={(event) => setSupplierAddress(event.target.value)}
            >
              {supplierAddress.map((supplieradd, index) => {
                return <option key={index}>{supplieradd}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="second_row_div_purchese_opration">
        <div className="table_div1_purchese_opration table_wrapper_purchese_opration1">
          <table border={3} cellSpacing={2} cellPadding={10}>
            <tr>
              <th>Sl.</th>
              <th>Price</th>
              <th>LC Cost</th>
              <th>Other Cost</th>
              <th>Net Price</th>
            </tr>
            <tbody>
              {tableData.map((data, index) => (
                <tr className="rows" key={index}>
                  <td>{data.serial}</td>
                  <td>{data.price}</td>
                  <td>{data.localCost}</td>
                  <td>{data.otherCost}</td>
                  <td>{data.netPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table_div2_purchese_opration table_wrapper_purchese_opration2">
          <table border={3} cellSpacing={2} cellPadding={10}>
            <tr>
              <th>SL.</th>
              <th>ID/Code</th>
              <th>Product Name</th>
              <th>Type/No</th>
              <th>Warrenty</th>
              <th>Purchase Price</th>
              <th>Sell Price</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Total Price</th>
            </tr>
            <tbody>
              {tableData.map((item) => (
                <tr className="rows" key={item}>
                  <td>{item.serial}</td>
                  <td>{item.idcode}</td>
                  <td>{item.productName}</td>
                  <td>{item.typeNo}</td>
                  <td>{item.warranty}</td>
                  <td>{item.purchaseprice}</td>
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
      <div className="third_row_div_purchese_opration">
        <div className="purchase_invoice_h4">Purchase Invice</div>
        <div className="container_view_update_purchese_opration">
          <div className="purchase_invoice_box">
            <div className="purchase_invoice_row1">
              <div className="input_field_purchese_opration">
                <label className="label_field_purchese_opration">
                  Invoice No*
                </label>
                <input className="input_purchese_opration" />
              </div>
              <div className="input_field_purchese_opration">
                <label className="label_field_purchese_opration">
                  Purchase Date*
                </label>
                <input
                  className="input_purchese_opration"
                  type="date"
                  value={currentDate}
                  onChange={(event) => setCurrentDate(event.target.value)}
                />
              </div>
              <div className="input_field_purchese_opration">
                <label className="label_field_purchese_opration">
                  Purchase ID*
                </label>

                <input
                  className="input_purchese_opration"
                  value={purchaseIdCode}
                  onChange={(event) => {
                    setPurchaseIdCode(event.target.value);
                  }}
                  list="idCode"
                />
                <datalist id="idCode">
                  {rows.map((items, index) => {
                    return <option key={index}>{items.id}</option>;
                  })}
                </datalist>
              </div>
            </div>
            <div className="purchase_invoice_row2">
              <div className="input_field_purchese_opration">
                <label className="label_field_purchese_opration">Total*</label>
                <input
                  className="input_purchese_opration"
                  value={tableTotalSale}
                />
              </div>
              <div className="input_field_purchese_opration">
                <label className="label_field_purchese_opration">Paid*</label>
                <input
                  className="input_purchese_opration"
                  value={paidTaka}
                  onChange={(event) => {
                    setPaidTaka(event.target.value);
                  }}
                />
              </div>
              <div className="input_field_purchese_opration">
                <label className="label_field_purchese_opration">Due*</label>
                <input className="input_purchese_opration" value={TotalDue} />
              </div>
            </div>
            <div className="purchase_invoice_row3">
              <div className="input_field_purchese_opration">
                <label className="label_field_purchese_opration">
                  Payment Type*
                </label>
                <select
                  className="select_field_purchese_opration"
                  value={paymentType}
                  onChange={(event) => {
                    setPaymentType(event.target.value);
                  }}
                >
                  {payment.map((items) => (
                    <option>{items}</option>
                  ))}
                </select>
              </div>
              <div className="input_field_purchese_opration">
                <label className="label_field_purchese_opration">
                  Select Shop*
                </label>

                <select
                  className="select_field_purchese_opration"
                  value={shop}
                  onChange={(event) => setShop(event.target.value)}
                >
                  {shopName.map((item) => {
                    return <option key={item.id}>{item.shop_name}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="purchase_invoice_row4">
              {/* <button className="button_field_purchese_opration">Save</button> */}
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
                  onClick={handlePurchase}
                >
                  <SaveSvg style={{ cursor: "pointer" }} />
                </button>
                <div style={{ paddingTop: "0.4vw" }}>Save</div>
              </div>
            </div>
          </div>
          <div className="button_field_view_update">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                <SheetsSvg style={{ cursor: "pointer" }} />
              </button>
              {/* <ExportExcel excelData={tableData} fileName={"Excel Export"} /> */}
              <div style={{ paddingTop: "0.4vw" }}>Excel</div>
            </div>
            {/* <button
              className="button_field_purchese_opration"
              onClick={resetTable}
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
                paddingLeft: "1vw",
              }}
            >
              <button
                onClick={resetTable}
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
  );
};

export default PurchaseOpration;
