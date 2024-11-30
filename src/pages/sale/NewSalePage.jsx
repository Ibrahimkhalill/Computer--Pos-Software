import { Input, TextField, Alert } from "@mui/material";
import { Button, Modal } from "antd";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./newsalepage.css";
import ExcelExport from "../../components/ExportExcel";
import { ReactComponent as CartSvg } from "../svg/cart.svg";
import { ReactComponent as ResetSvg } from "../svg/reset.svg";
import { ReactComponent as SaveSvg } from "../svg/save.svg";
import { ToastContainer, toast } from "react-toastify";

const SalePage = () => {
  const [productItem, setProductItem] = useState([]);

  const [productSumAvailableQuantities, setProductSumAvailableQuantities] =
    useState([]);
  const [productSaleAvgPurchasePrices, setProductSaleAvgPurchasePrices] =
    useState([]);
  const [rows, setRows] = useState([
    {
      IDOrCode: "",
      ProductName: "",
      TypeNo: "",
      Warranty: "",
      SalesPrice: "",
      Quantity: "",
      Unit: "",
      ItemTotal: "",
    },
  ]);
  const [allCustomer, setAllCustomer] = useState([]);
  const [customerName, setCustomerName] = useState([]);
  const [customerID, setCustomerID] = useState([]);
  const [customerMobile, setCustomerMobile] = useState([]);
  const [customerAddress, setCustomerAddress] = useState([]);
  const [customerTotal, setCustomerTotal] = useState([]);
  const [customerPaid, setCustomerPaid] = useState([]);
  const [customerDue, setCustomerDue] = useState([]);
  const [itemTotal, setItemTotal] = useState(0);
  const [shop, setShop] = useState([]);
  const [maxChallan, setMaxChallan] = useState([]);
  const [tableSaleTypeNo, setTableSaleTypeNo] = useState([]);

  const [discount, setDiscount] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);

  const [grossPaid, setGrossPaid] = useState("");

  const [saleByEmployee, setSaleByEmployee] = useState([]);
  const [saleByEmployeeID, setSaleByEmployeeID] = useState([]);

  useEffect(() => {
    localStorage.setItem("current_page_name", "Sale");
    const fetchProduct = async () => {
      const response_getAllStockTable = await fetch(
        "http://194.233.87.22:5001/api/product_list/getProductList",
        {
          method: "POST",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      const datas_getAllStockTable = await response_getAllStockTable.json();
      setProductItem(datas_getAllStockTable);
    };
    const fetchData = async () => {
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

      setAllCustomer([...new Set(product_getAllCustomer)]);

      const response_getAllShop = await fetch(
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
      console.log(
        "http://194.233.87.22:5001/api/shop_set/getAllDistinctShopName"
      );
      const datas_getAllShop = await response_getAllShop.json();

      const product_getAllShop = datas_getAllShop.map(
        ({ shop_name: actualValue }) => actualValue
      );

      setShop([...new Set(product_getAllShop)]);
      console.log(product_getAllShop);

      const response_getMaxChallan = await fetch(
        "http://194.233.87.22:5001/api/sale_table/getMaxChallan",
        {
          method: "POST",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      console.log("http://194.233.87.22:5001/api/sale_table/getMaxChallan");
      const datas_getMaxChallan = await response_getMaxChallan.json();
      console.log(datas_getMaxChallan);
      const product_datas_getMaxChallan = datas_getMaxChallan.map(
        ({ challan_no: actualValue }) => actualValue
      );

      setMaxChallan([...new Set([parseInt(product_datas_getMaxChallan) + 1])]);

      console.log(product_datas_getMaxChallan);

      // Employee setup
      const response_getAllEmployees = await fetch(
        "http://194.233.87.22:5001/api/employee/getEmployee",
        {
          method: "POST",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      console.log("http://194.233.87.22:5001/api/employee/getEmployee");
      const datas_getAllEmployees = await response_getAllEmployees.json();
      console.log(datas_getAllEmployees);
      const product_datas_getAllEmployees_name = datas_getAllEmployees.map(
        ({ name: actualValue }) => actualValue
      );
      const product_datas_getAllEmployees_id = datas_getAllEmployees.map(
        ({ id: actualValue }) => actualValue
      );

      setSaleByEmployee([...new Set(product_datas_getAllEmployees_name)]);
      setSaleByEmployeeID([...new Set(product_datas_getAllEmployees_id)]);

      console.log(product_datas_getAllEmployees_name);
      console.log(product_datas_getAllEmployees_id);
    };

    // Call the function
    fetchData();
    fetchProduct();
  }, []);

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    const code = value;
    if (code) {
      const fetchData = async () => {
        const response_getAllStock_By_ProductCode = await fetch(
          "http://194.233.87.22:5001/api/stock/getAllStock_By_ProductCode?product_code=" +
            code,
          {
            method: "POST",

            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );
        const datas_getAllStock_By_ProductCode =
          await response_getAllStock_By_ProductCode.json();
        console.log(datas_getAllStock_By_ProductCode);
        const product_getAllStock_By_ProductCode =
          datas_getAllStock_By_ProductCode.map(
            ({ product: actualValue }) => actualValue
          );
        const product_models_getAllStock_By_ProductCode =
          datas_getAllStock_By_ProductCode.map(
            ({ model: actualValue }) => actualValue
          );

        newRows[index]["ProductName"] = product_getAllStock_By_ProductCode[0];
        newRows[index]["TypeNo"] = product_models_getAllStock_By_ProductCode[0];

        const response_getAllStock_By_ProductAndModel = await fetch(
          "http://194.233.87.22:5001/api/stock/getAllStock_By_ProductAndModel?product=" +
            product_getAllStock_By_ProductCode[0] +
            "&model=" +
            product_models_getAllStock_By_ProductCode[0],
          {
            method: "POST",

            headers: {
              "x-access-token": JSON.parse(
                localStorage.getItem("x-access-token")
              ),
            },
          }
        );

        const datas_getAllStock_By_ProductAndModel =
          await response_getAllStock_By_ProductAndModel.json();

        const product_sum_available_quantities =
          datas_getAllStock_By_ProductAndModel.map(
            ({ sum_available_quantity: actualValue }) => actualValue
          );
        const product_sale_avg_purchase_prices =
          datas_getAllStock_By_ProductAndModel.map(
            ({ avg_purchase_price: actualValue }) => actualValue
          );
        const product_sale_prices = datas_getAllStock_By_ProductAndModel.map(
          ({ sale_price: actualValue }) => actualValue
        );
        const product_units = datas_getAllStock_By_ProductAndModel.map(
          ({ unit: actualValue }) => actualValue
        );
        const product_warrantys = datas_getAllStock_By_ProductAndModel.map(
          ({ warranty: actualValue }) => actualValue
        );
        console.log("product_sum_available_quantities",product_sum_available_quantities);
        setProductSumAvailableQuantities([
          ...new Set(product_sum_available_quantities),
        ]);
        setProductSaleAvgPurchasePrices([
          ...new Set(product_sale_avg_purchase_prices),
        ]);
        newRows[index]["SalesPrice"] = product_sale_prices[0];
        newRows[index]["Unit"] = product_units[0];
        newRows[index]["Warranty"] = product_warrantys[0];

        if (quantityRefs.current[index]) {
          quantityRefs.current[index].focus();
        }
        setRows(newRows);
      };

      // Call the function
      fetchData();
    } else {
      newRows[index]["ProductName"] = "";
      newRows[index]["TypeNo"] = "";
      newRows[index]["SalesPrice"] = "";
      newRows[index]["Unit"] = "";
      newRows[index]["Warranty"] = "";
    }
  };

  const handleChangeInput = (index, field, value) => {
    const newRows = [...rows];
    console.log(field, value);
    newRows[index][field] = value;
    setRows(newRows);
  };
  const handleChangeQuantity = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    const price = newRows[index]["SalesPrice"];
    console.log(price, value);
    const itemTotal = parseFloat(price) * parseInt(value);
    newRows[index]["ItemTotal"] = itemTotal || "";
    setRows(newRows);
  };

  const handleChangeSalePrice = (index) => {
    const newRows = [...rows];
    const quantity = newRows[index]["Quantity"];
    const price = newRows[index]["SalesPrice"];
    if (quantity) {
      const itemTotal = parseFloat(quantity) * parseInt(price);
      newRows[index]["ItemTotal"] = itemTotal || "";
    }
    setRows(newRows);
  };
  const inputRefs = useRef([]);
  const quantityRefs = useRef([]);

  useEffect(() => {
    // Focus the first column of the first row when the page mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (rows[index].ItemTotal) {
        addNewRow();
      } else {
        toast.dismiss();
        toast.warning("Please Filup All Required Field");
      }
    } else if (event.key === "Delete") {
      // Handle Delete key press
      event.preventDefault();

      // Check if the current row index is greater than 0
      if (index > 0) {
        const rowIndex = index;
        // Confirm deletion
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this row?"
        );
        if (confirmDelete) {
          // Delete the current row
          const updatedItems = rows.filter((item, index) => index !== rowIndex);
          setRows(updatedItems);
        }
      }
    }
  };

  const addNewRow = () => {
    setRows([
      ...rows,
      {
        IDOrCode: "",
        ProductName: "",
        TypeNo: "",
        Warranty: "",
        SalesPrice: "",
        Quantity: "",
        Unit: "",
        ItemTotal: "",
      },
    ]);
    setTimeout(() => {
      if (inputRefs.current[rows.length]) {
        inputRefs.current[rows.length].focus();
      }
    }, 0);
  };

  const approvesale = () => {
    toast.success("Sale Approve Sucessfully");
  };

  //   Value inputer
  const handleKeyDownCustomerName = (event) => {
    // 👇 Get input value

    setCustomerName(event.target.value);

    const fetchData = async () => {
      const response_getSelectedCustomer = await fetch(
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
      console.log(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerID?customername=" +
          customerName
      );
      const datas_getSelectedCustomer =
        await response_getSelectedCustomer.json();
      console.log(datas_getSelectedCustomer);
      const product_getSelectedCustomerID = datas_getSelectedCustomer.map(
        ({ cid: actualValue }) => actualValue
      );

      setCustomerID([...new Set(product_getSelectedCustomerID)]);
      console.log(product_getSelectedCustomerID);

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
      console.log(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerMobile?customername=" +
          customerName
      );
      const datas_getSelectedCustomerMobile =
        await response_getSelectedCustomerMobile.json();
      console.log(datas_getSelectedCustomerMobile);
      const product_getSelectedCustomerMobile =
        datas_getSelectedCustomerMobile.map(
          ({ mobile_no: actualValue }) => actualValue
        );

      setCustomerMobile([...new Set(product_getSelectedCustomerMobile)]);
      console.log(product_getSelectedCustomerMobile);

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
      console.log(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerAddress?customername=" +
          customerName
      );
      const datas_getSelectedCustomerAddress =
        await response_getSelectedCustomerAddress.json();
      console.log(datas_getSelectedCustomerAddress);
      const product_getSelectedCustomerAddress =
        datas_getSelectedCustomerAddress.map(
          ({ address: actualValue }) => actualValue
        );

      setCustomerAddress([...new Set(product_getSelectedCustomerAddress)]);
      console.log(product_getSelectedCustomerAddress);

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
      console.log(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerTotal?customername=" +
          customerName
      );
      const datas_getSelectedCustomerTotal =
        await response_getSelectedCustomerTotal.json();
      console.log(datas_getSelectedCustomerTotal);
      const product_getSelectedCustomerTotal =
        datas_getSelectedCustomerTotal.map(
          ({ total: actualValue }) => actualValue
        );

      setCustomerTotal([...new Set(product_getSelectedCustomerTotal)]);
      console.log(product_getSelectedCustomerTotal);

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
      console.log(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerPaid?customername=" +
          customerName
      );
      const datas_getSelectedCustomerPaid =
        await response_getSelectedCustomerPaid.json();
      console.log(datas_getSelectedCustomerPaid);
      const product_getSelectedCustomerPaid = datas_getSelectedCustomerPaid.map(
        ({ paid: actualValue }) => actualValue
      );

      setCustomerPaid([...new Set(product_getSelectedCustomerPaid)]);
      console.log(product_getSelectedCustomerPaid);

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
      console.log(
        "http://194.233.87.22:5001/api/customer/getSelectedCustomerDue?customername=" +
          customerName
      );
      const datas_getSelectedCustomerDue =
        await response_getSelectedCustomerDue.json();
      console.log(datas_getSelectedCustomerDue);
      const product_getSelectedCustomerDue = datas_getSelectedCustomerDue.map(
        ({ due: actualValue }) => actualValue
      );

      setCustomerDue([...new Set(product_getSelectedCustomerDue)]);
      console.log(product_getSelectedCustomerDue);
    };
    // Call the function
    fetchData();
  };

  const handleKeyDownDiscount = (event) => {
    setDiscount(event.target.value);
  };

  const handleKeyDownServiceCharge = (event) => {
    setServiceCharge(event.target.value);
  };


  const handleReset = () => {
    setTableSaleTypeNo([]);
  };

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

  useEffect(() => {
    const total =
      rows && rows.length > 0
        ? rows.reduce((total, item) => {
            // const salePrice = parseFloat(item.sale_price) || 0;
            // const quantity = parseFloat(item.quantity) || 0;
            const itemTotal = parseFloat(item.ItemTotal);
            total += itemTotal;
            return total;
          }, 0)
        : 0;
    setItemTotal(total || 0);
  }, [rows]);

  const totalWithDiscount =
    discount > 0 ? itemTotal - parseInt(discount) : itemTotal;
  const Total =
    serviceCharge > 0
      ? totalWithDiscount + parseInt(serviceCharge)
      : totalWithDiscount;

  const dueTotal = grossPaid ? Total - parseInt(grossPaid) : Total;
  const handleKeyDownPaid = (event) => {
    const pay = event.target.value;

    if (pay > Total || pay < 0) {
      toast.warning("Paid amount don't exceed Total ");
      return;
    } else {
      setGrossPaid(pay);
    }
  };

  return (
    <div className="full_div_sale_page">
      <ToastContainer />
      <div className="first_row_div_sale_page">
        <div className="table_div_sale_page table_wrapper_sale_page">
          <table border={3} cellSpacing={2} cellPadding={10}>
            <tr>
              <th>ID/Code</th>
              <th>Product Name</th>
              <th>Type/No</th>
              <th>Warranty</th>
              <th>Sales Price</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Item Total</th>
            </tr>
            <tbody>
              {rows.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      value={item.IDOrCode}
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(e) => {
                        handleChangeInput(index, "IDOrCode", e.target.value);
                        handleChange(index, "IDOrCode", e.target.value);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="input_field_table"
                      type="text"
                      list="product_code"
                    />
                    <datalist id="product_code">
                      {productItem &&
                        productItem.map((data) => (
                          <option key={data.id} value={data.code}>
                            {data.code}
                          </option>
                        ))}
                    </datalist>
                  </td>
                  <td>
                    <input
                      className="input_field_table"
                      value={item.ProductName}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input_field_table"
                      value={item.TypeNo}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input_field_table"
                      value={item.Warranty}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      className="input_field_table"
                      value={item.SalesPrice}
                      onChange={(e) => {
                        handleChangeInput(index, "SalesPrice", e.target.value);
                        handleChangeSalePrice(
                          index,
                          "SalesPrice",
                          e.target.value
                        );
                      }}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="input_field_table"
                      onChange={(e) =>
                        handleChangeQuantity(index, "Quantity", e.target.value)
                      }
                      ref={(el) => (quantityRefs.current[index] = el)}
                      value={item.Quantity}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      value={item.Unit}
                      className="input_field_table"
                      type="text"
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      value={item.ItemTotal}
                      className="input_field_table"
                      type="text"
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="first_row_second_column_sale_page">
          <div className="container_customer_information_sale_page">
            <div style={{ fontSize: "1vw", fontWeight: "bold" }}>
              Customer Information
            </div>
            <div className="div_customer_label_input_sale_page">
              <div className="input_field_sale_page">
                <label
                  style={{ width: "10vw", marginLeft: "8vw" }}
                  for="checkboxPermanentCustomer_sale_page"
                >
                  Permanent Customer
                </label>

                <input
                  style={{ width: "1vw", height: "1vw" }}
                  value="Permanent Customer"
                  type="checkbox"
                  id="checkboxPermanentCustomer_sale_page"
                />
              </div>
              <div className="input_field_sale_page">
                <label for="selectCustomer">Customer*</label>
                <input
                  style={{ width: "12vw" }}
                  id="selectCustomer"
                  type={"search"}
                  list={"selectcustomername"}
                  onSelect={handleKeyDownCustomerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                />
                <datalist id="selectcustomername">
                  {allCustomer.length > 0 &&
                    allCustomer.map((allCustomer, index) => {
                      return <option key={index}>{allCustomer}</option>;
                    })}
                </datalist>
              </div>
              <div className="input_field_sale_page">
                <label for="selectID">ID*</label>
                <select
                  style={{ width: "7vw" }}
                  id="selectID"
                  onSelect={(event) => setCustomerID(event.target.value)}
                  placeholder="ID"
                >
                  {customerID.length > 0 &&
                    customerID.map((customerID, index) => {
                      return <option key={index}>{customerID}</option>;
                    })}
                </select>
                <Button style={{ width: "4.5vw" }} onClick={showModal}>
                  +
                </Button>
              </div>
              <div className="input_field_sale_page">
                <label for="selectMobile">Mobile*</label>
                <select
                  style={{ width: "12vw" }}
                  id="selectMobile"
                  onSelect={(event) => setCustomerMobile(event.target.value)}
                  placeholder="Mobile"
                >
                  {customerMobile.length > 0 &&
                    customerMobile.map((customerMobile, index) => {
                      return <option key={index}>{customerMobile}</option>;
                    })}
                </select>
              </div>
              <div className="input_field_sale_page">
                <label for="selectAddress">Address*</label>
                <select
                  style={{ width: "12vw" }}
                  id="selectAddress"
                  onSelect={(event) => setCustomerAddress(event.target.value)}
                  placeholder="Address"
                >
                  {customerAddress.length > 0 &&
                    customerAddress.map((customerAddress, index) => {
                      return <option key={index}>{customerAddress}</option>;
                    })}
                </select>
              </div>
            </div>
            <div className="total_paid_due_div_sale_page">
              {/* <div className="custom_input_field_sale_page">
              <label
                style={{ fontSize: ".9vw", fontWeight: "bold" }}
                for="Total"
              >
                Total
              </label>
              <select
                style={{ width: "7vw" }}
                id="Total"
                onSelect={(event) => setCustomerTotal(event.target.value)}
                placeholder="*Total"
              >
                {customerTotal.length > 0 && customerTotal.map((customerTotal, index) => {
                  return <option key={index}>{customerTotal}</option>;
                })}
              </select>
            </div> */}
              {/* <div className="custom_input_field_sale_page">
              <label
                style={{ fontSize: ".9vw", fontWeight: "bold" }}
                for="Paid"
              >
                Paid
              </label>
              <select
                style={{ width: "7vw" }}
                className="select_sale_page"
                id="Paid"
                onSelect={(event) => setCustomerPaid(event.target.value)}
                placeholder="*Paid"
              >
                {customerPaid.length > 0 && customerPaid.map((customerPaid, index) => {
                  return <option key={index}>{customerPaid}</option>;
                })}
              </select>
            </div> */}
              {/* <div className="custom_input_field_sale_page">
              <label style={{ fontSize: ".9vw", fontWeight: "bold" }} for="Due">
                Due
              </label>
              <select
                style={{ width: "7vw" }}
                className="select_sale_page"
                id="Due"
                onSelect={(event) => setCustomerDue(event.target.value)}
                placeholder="*Due"
              >
                {customerDue.length > 0 && customerDue.map((customerDue, index) => {
                  return <option key={index}>{customerDue}</option>;
                })}
              </select>
            </div> */}
            </div>
          </div>
          <div className="sales_summary_div_sale_page">
            <div style={{ fontSize: "1vw", fontWeight: "bold" }}>
              Sale Summary
            </div>
            <div className="sales_summary_div_first_column_sale_page">
              <div>
                <div className="input_field_sale_page">
                  <label for="inputTotalAmount">*Total Amount</label>
                  <input value={itemTotal} id="inputTotalAmount" />
                </div>
                <div className="input_field_sale_page">
                  <label for="inputDiscount">*Discount(-)</label>
                  <input
                    style={{ width: "3vw" }}
                    id="inputDiscount"
                    onKeyUp={handleKeyDownDiscount}
                  />
                  <div style={{ fontWeight: "bold", fontSize: "1vw" }}>/</div>
                  <input style={{ width: "3vw" }} id="inputDiscount" />
                  <div style={{ fontWeight: "bold", fontSize: "1vw" }}>%</div>
                </div>
                <div className="input_field_sale_page">
                  <label for="inputServiceExtraCharge">
                    *Service/Extra Charge
                  </label>
                  <input
                    id="inputServiceExtraCharge"
                    onKeyUp={handleKeyDownServiceCharge}
                  />
                </div>
                <div className="input_field_sale_page">
                  <label for="inputTotal">*Total</label>
                  <input value={Total} id="inputTotal" />
                </div>
                <div className="input_field_sale_page">
                  <label for="inputPaid">*Paid</label>
                  <input
                    id="Paid"
                    value={grossPaid}
                    onChange={(e) => handleKeyDownPaid(e)}
                  />
                </div>
                <div className="input_field_sale_page">
                  <label for="inputDue">*Due</label>
                  <input value={dueTotal} id="Due" />
                </div>
              </div>
              <div>
                <div className="input_field_sale_page">
                  <label for="selectChallanNo">*Challan No</label>
                  <select
                    id="selectChallanNo"
                    onSelect={(event) => setMaxChallan(event.target.value)}
                    placeholder="*Challan No"
                  >
                    {maxChallan.length > 0 &&
                      maxChallan.map((maxChallan, index) => {
                        return <option key={index}>{maxChallan}</option>;
                      })}
                  </select>
                </div>
                <div className="input_field_sale_page">
                  <label for="inputDate">*Sale Date</label>
                  <input id="inputDate" type={"date"} />
                </div>
                <div className="input_field_sale_page">
                  <label className=".label_sale_page" for="selectShop">
                    *Shop
                  </label>
                  <select
                    className="select_sale_page"
                    id="selectShop"
                    onSelect={(event) => setShop(event.target.value)}
                    placeholder="*Shop"
                  >
                    {shop.length > 0 &&
                      shop.map((shop, index) => {
                        return <option key={index}>{shop}</option>;
                      })}
                  </select>
                </div>
                <div className="input_field_sale_page">
                  <label for="inputPaymentType">*Payment Type</label>
                  <select className="select_sale_page" id="inputBankCheque">
                    <option>Hand Cash</option>
                    <option>Bank Payment</option>
                  </select>
                </div>
                <div className="input_field_sale_page">
                  <label for="inputBankCheque">*Bank Cheque</label>
                  <input id="inputBankCheque" />
                </div>
                <div className="input_field_sale_page">
                  <label for="inputBankName">*Bank Name</label>
                  <input id="inputBankName" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="third_row_div_sale_page">
        <div className="container_sale_by_sale_page">
          <div className="container_sale_by_column1_sale_page">
            <div className="input_field_sale_page">
              <label
                for="inputCommentServices"
                style={{ width: "10vw", fontWeight: "bold" }}
              >
                Comment/Services
              </label>
              <input
                style={{
                  height: "4.5vh",
                  width: "38vw",
                }}
                id="inputCommentServices"
              />
            </div>
          </div>
          <div className="container_sale_by_column2_sale_page">
            <div className="input_field_sale_page">
              <label for="SaleBy">Sale By</label>
              <select
                style={{ width: "12vw", marginRight: "1vw" }}
                id="selectSaleBy"
                onSelect={(event) => setSaleByEmployee(event.target.value)}
              >
                {saleByEmployee.length > 0 &&
                  saleByEmployee.map((saleByEmployee, index) => {
                    return <option key={index}>{saleByEmployee}</option>;
                  })}
              </select>
            </div>
            <div className="input_field_sale_page">
              <label for="selectEmployeeID">Employee ID</label>
              <select
                style={{ width: "12vw", marginRight: "1vw" }}
                id="selectEmployeeID"
                onSelect={(event) => setSaleByEmployeeID(event.target.value)}
              >
                {saleByEmployeeID.length > 0 &&
                  saleByEmployeeID.map((saleByEmployeeID, index) => {
                    return <option key={index}>{saleByEmployeeID}</option>;
                  })}
              </select>
            </div>
            <div className="input_field_sale_page">
              <label for="inputSaleArea">Sale Area</label>
              <input id="inputSaleArea" />
            </div>
          </div>
        </div>
        <div className="container_approve_sale_sale_page">
          <div className="input_field_sale_page">
            <button
              type="button"
              style={{ width: "8vw", height: "2vw" }}
              onClick={approvesale}
            >
              Approve Sale
            </button>
          </div>
          <div>
            {/* <button type="button" onClick={handleReset}>
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
                onClick={handleReset}
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
      <div className="popup-window">
        <Modal
          title="Permanent Customer Setup"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={900}
          height={800}
          footer={null}
          style={{
            top: "6vw",
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
                          outline: "none",
                          border: "none",
                          borderRadius: ".2vw",
                          boxShadow: "0 5px #999",
                          cursor: "pointer",
                        }}
                        type="submit"
                      >
                        <SaveSvg />
                      </button>
                      <div style={{ paddingTop: "0.3vw" }}>Save</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal_button">
                <div className="input_field_permanent_customer">
                  <button>Show All</button>
                </div>
                <div>
                  {/* <button>Export Excel</button> */}
                  <ExcelExport fileName={"Excel Export"} />
                </div>
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
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SalePage;
