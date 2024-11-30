import React from "react";
import "./product-base-income.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExcelExport from '../../components/ExportExcel';

const ProductBaseIncome = () => {
  const [rows, setRows] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [selectProductTypeNo, setSelectedProductTypeNo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formDate, setFormDate] = useState([]);
  const [toDate, setToDate] = useState([]);
  const [selectedOption, setSelectedOption] = useState("ProductBaseIncome");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
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
  // search

  // http://194.233.87.22:5001/api/sale_table/getSaleTableByFromDateToDateAndNameAndModel?fromdate=&todate=&product_name=&model

  const handleClickSearchbyProductWithTypeNo = () => {
    setIsLoading(true);

    const fetchData = async () => {
      // for (const item of selectedProductTypeNo) {

      const response_getSelectedProductWithTypeNo = await fetch(
        "http://194.233.87.22:5001/api/sale_table/getSaleTableByFromDateToDateAndNameAndModel?fromdate=" +
          formDate +
          "&todate=" +
          toDate +
          "&product_name=" +
          selectedProduct +
          "&model=" +
          selectProductTypeNo[0],
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
      // }
    };
    fetchData();
  };

  useEffect(() => {
    handleAllProduct();
  }, []);

  // Calculate

  const totalSalePrice = (rows.length > 0 && rows
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
    .toFixed(2));

  const totalPurchasePrice = (rows.length > 0 && rows
    .reduce((totalTaka, item) => {
      if (
        item.purchase_price !== undefined &&
        item.purchase_price !== null &&
        item.purchase_price !== "" &&
        item.quantity !== undefined &&
        item.quantity !== null &&
        item.quantity !== ""
      ) {
        totalTaka += Number(item.purchase_price) * Number(item.quantity);
      }
      return totalTaka;
    }, 0)
    .toFixed(2));

  const totalProfit = (totalSalePrice - totalPurchasePrice).toFixed(2);

  return (
    <div className="full_div_product_base_income">
      <div className="radio_buttons_btr">
        <label>
          <Link to="/Datebaseincome">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="CashBook"
              checked={selectedOption === "DateBaseIncome"}
              onChange={handleRadioChange}
            />
          </Link>
          Date Base Income
        </label>
        <label>
          <Link to="/Productbaseincome">
            <input
              className="input_custom_cashbook"
              type="radio"
              value="Deposit"
              checked={selectedOption === "ProductBaseIncome"}
              onChange={handleRadioChange}
            />
          </Link>
          Product Base Income
        </label>
      </div>
      <div className="first_row_div_product_base_income">
        <div className="column_one_product_base_income">
          <div className="row_one_product_base_income">
            <div className="conatiner_search_product_base_income1">
              <div className="input_field_product_base_income">
                <label>Product Name</label>
                <input
                  onSelect={handleKeyDownProduct}
                  onChange={(event) => {
                    setSelectedProduct(event.target.value);
                  }}
                  list="productname"
                />
                <datalist id="productname">
                  {allProduct.map((items, index) => {
                    return <option key={index}>{items}</option>;
                  })}
                </datalist>
              </div>
              <div className="input_field_product_base_income">
                <label>Form Date</label>
                <input
                  type="date"
                  onChange={(event) => {
                    setFormDate(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="conatiner_search_product_base_income2">
              <div>
                <div className="input_field_product_base_income">
                  <label>Type/No</label>
                  <select
                    onSelect={(event) =>
                      setSelectedProductTypeNo(event.target.value)
                    }
                  >
                    {selectProductTypeNo.length > 0 && selectProductTypeNo.map((producttype, index) => {
                      return <option key={index}>{producttype}</option>;
                    })}
                  </select>
                </div>
                <div className="input_field_product_base_income">
                  <label>To Date</label>
                  <input
                    type="date"
                    onChange={(event) => {
                      setToDate(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="input_field_product_base_income">
              <button onClick={handleClickSearchbyProductWithTypeNo}>
                Search
              </button>
            </div>
          </div>
          <div style={{fontSize:"1vw", fontWeight:"bold"}}>Product Income Report: </div>
          <div className="row_two_product_base_income">
            {rows && rows.length > 0 ? (
              <div className="table_wrapper_product_base_income1">
                <table border={3} cellSpacing={2} cellPadding={10}>
                  <thead>
                    <tr>
                      <th>Invoice</th>
                      <th>Customer Name</th>
                      <th>Product Name</th>
                      <th>Type/No</th>
                      <th>Purchase Price</th>
                      <th>Sell Price</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Unit Total TK.</th>
                      <th>Sale Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length > 0 && rows.map((item) => (
                      <tr key={item.id}>
                        <td>{item.challan_no}</td>
                        <td>{item.customer_name}</td>
                        <td>{item.product_name}</td>
                        <td>{item.model}</td>
                        <td>{item.purchase_price}</td>
                        <td>{item.rate}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unit}</td>
                        <td>{item.total}</td>
                        <td>{item.sell_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="table_wrapper_product_base_income1">
                <table
                  style={{ width: "100vw" }}
                  border={3}
                  cellSpacing={2}
                  cellPadding={10}
                >
                  <tbody>
                    <tr>
                      <th>Invoice</th>
                      <th>Customer Name</th>
                      <th>Product Name</th>
                      <th>Type/No</th>
                      <th>Purchase Price</th>
                      <th>Sell Price</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Unit Total TK.</th>
                      <th>Sale Date</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {/* )}
          </div> */}

          <div style={{fontSize:"1vw", fontWeight:"bold"}}>Customer Report:</div>
          <div className="row_three_product_base_income">
            <div className="table_wrapper_product_base_income2">
              {/* {isLoaded ? (
                    <div className="rotating_lines_sale_transaction_page">
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="50"
                            visible={true}
                        />
                    </div>
                ) : ( */}
              <table border={3} cellSpacing={2} cellPadding={10}>
                <tr>
                  <th>Challan No.</th>
                  <th>Cust. ID</th>
                  <th>Cust. Name</th>
                  <th>Discount</th>
                  <th>Sale Date</th>
                  <th>Product QTY</th>
                  <th>Average Discount</th>
                </tr>
                <tbody>
                  {/* {rows.map((item) => (
                                <tr
                                    className="row_sale_transaction_page"
                                    tabindex="0"
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
                             ))} */}
                </tbody>
              </table>
              {/* )} */}
            </div>
          </div>
        </div>
        <div className="column_two_product_base_income">
          <div className="section_one_column_two_product_base_income">
            <h5 style={{ fontSize: "1vw" }}>
              Product Profit/Loss
            </h5>
            <div className="sub_section_one_column_two_product_base_income">
              <div className="row_gap_product_base_income">
                <label style={{ fontSize: "1vw" }}>Total Sales Price</label>
              </div>
              <div className="input_field_product_base_income">
                <input
                  value={totalSalePrice}
                  style={{ fontSize: "1vw", textAlign: "center" }}
                  readOnly
                />
                <span style={{ fontSize: "1vw" }}>TK</span>
              </div>
              <div className="row_gap_product_base_income">
                <label style={{ fontSize: "1vw" }}>
                  Total Purchase Price(-)
                </label>
              </div>
              <div className="input_field_product_base_income">
                <input
                  value={totalPurchasePrice}
                  style={{ fontSize: "1vw", textAlign: "center" }}
                  readOnly
                />
                <span style={{ fontSize: "1vw" }}>TK</span>
              </div>
              <div className="row_gap_product_base_income">
                <label style={{ fontSize: "1vw" }}>Total Profit / Loss:</label>
              </div>
              <div className="input_field_product_base_income">
                <input
                  value={totalProfit}
                  style={{ fontSize: "1vw", textAlign: "center" }}
                  readOnly
                />
                <span style={{ fontSize: "1vw" }}>TK</span>
              </div>

              <div >
                <ExcelExport excelData={rows} fileName={"Excel Export"}/>
              </div>
            </div>
          </div>
          <div className="section_two_column_two_product_base_income">
            <h5 style={{ fontSize: "1vw", paddingTop: "1vw" }}>
              Total Average Discount
            </h5>
            <div className="sub_section_two_column_two_product_base_income">
              <div className="input_field_product_base_income">
                <span style={{ fontSize: "1vw" }}>
                  Average Discount
                </span>
                <span style={{ fontSize: "1vw" }}>=</span>
                <div className="custom_calculation_income">
                  <span style={{ fontSize: "1vw" }}>Discount</span>
                  <hr />
                  <span style={{ fontSize: "1vw" }}>Quantity</span>
                </div>
              </div>
              <div className="row_gap_product_base_income">
                <label style={{ fontSize: "1vw" }}>
                  Total Average Discount:
                </label>
              </div>
              <div className="input_field_product_base_income">
                <input />
                <span style={{ fontSize: "1vw" }}>TK</span>
              </div>
              <div className="row_gap_product_base_income"></div>
              <div >
                {/* <button>Excel</button> */}
                <ExcelExport fileName={"Excel Export"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_product_base_income">
        <div style={{fontSize:"1vw", fontWeight:"bold"}}>Total Product Loss/Profit</div>
        <div className="label_second_row_div_product_base_income">
          <h5 style={{ fontSize: "1vw" }}>Product Profit/Loss</h5>
          <h5 style={{ fontSize: "1vw" }}>-</h5>
          <h5 style={{ fontSize: "1vw" }}>Total Average Discount</h5>
          <h5 style={{ fontSize: "1vw" }}>=</h5>
          <h5 style={{ fontSize: "1vw" }}>Total Product Profit / Loss</h5>
        </div>
        <div className="input_section_second_row_div_product_base_income">
          <div className="input_field_product_base_income">
            <input
              value={totalProfit}
              style={{ fontSize: "1vw", textAlign: "center" }}
              readOnly
            />
            <span style={{ fontSize: "1vw" }}>TK</span>
          </div>
          <div className="input_field_product_base_income">
            <input style={{ fontSize: "1vw", textAlign: "center" }} readOnly />
            <span style={{ fontSize: "1vw" }}>TK</span>
          </div>
          <div className="input_field_product_base_income">
            <input style={{ fontSize: "1vw", textAlign: "center" }} readOnly />
            <span style={{ fontSize: "1vw" }}>TK</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBaseIncome;
