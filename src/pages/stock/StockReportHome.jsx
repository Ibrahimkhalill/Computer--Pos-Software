import React from "react";
import "./stock-report-home.css";
import StockExportExcel from "../../components/ExportExcel";
import { RotatingLines } from "react-loader-spinner";
import { useState, useEffect, useRef } from "react";
import { Button, Modal } from "antd";
import { ReactComponent as ResetSvg } from "../svg/reset.svg";
const StockReportHome = () => {
  const [rows, setRows] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [selectedProductID, setSelectedProductID] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Table data entry on input field useState
  const [productTable, setProductTable] = useState([]);
  const [idTable, setIdTable] = useState([]);
  const [productIdTable, setProductIdTable] = useState([]);
  const [typeTable, setTypeTable] = useState([]);
  const [quantityTable, setQuantityTable] = useState([]);
  const [warrantyTable, setWarrantyTable] = useState([]);
  const [purchasePriceTable, setPurchasePriceTable] = useState([]);
  const [salePriceTable, setSalePriceTable] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response_getAllStockTable = await fetch(
          "http://194.233.87.22:5001/api/stock/getAllStockGroupByProductAndModel",
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
        setRows(datas_getAllStockTable);

        const response_getAllStock = await fetch(
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

        const datas_getAllStock = await response_getAllStock.json();
        
        const product_getAllStock = datas_getAllStock.map(
          ({ product: actualValue }) => actualValue
        );
        setAllProduct([...new Set(product_getAllStock)]);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    // Call the function
    fetchData();
  }, []);

  // Product name field search
  const handleKeyDownProductName = (event) => {
    // setIsLoading(true);
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
      const product_getSelectedProductID = datas_getSelectedProduct.map(
        ({ model: actualValue }) => actualValue
      );

      setSelectedProductID([...new Set(product_getSelectedProductID)]);
      console.log(product_getSelectedProductID);
      // setIsLoading(false);
    };

    // Call the function
    fetchData();
  };

  // Show all data from data base

  const handleClickSearchShowAll = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getProductTableAllData = await fetch(
        "http://194.233.87.22:5001/api/stock/getAllStockGroupByProductAndModel",
        {
          method: "POST",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      const datas_getProductTableAllData =
        await response_getProductTableAllData.json();
      console.log(datas_getProductTableAllData);
      setRows(datas_getProductTableAllData);
      console.log(datas_getProductTableAllData);
      setIsLoading(false);
    };

    // Call the function
    fetchData();
  };

  // Searching Product auto genarated id in the ID field
  const handleClickSearchbyProductNameID = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getSelectedProductbyNameID = await fetch(
        "http://194.233.87.22:5001/api/stock/getStockGroupByProductAndModelSearchByProductAndModel?product=" +
          selectedProductName +
          "&model=" +
          selectedProductID,
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
        await response_getSelectedProductbyNameID.json();

      console.log(datas_getSelectedProductbyNameID);

      setRows(datas_getSelectedProductbyNameID);
      setIsLoading(false);
    };

    // Call the function
    fetchData();
  };

  // Clicking table data show thous data in input field

  const handleClickTable = (item) => {
    setProductIdTable(item.purchase_id);
    setIdTable(item.product_code);
    setProductTable(item.product);
    setTypeTable(item.model);
    setQuantityTable(item.available_quantity);
    setWarrantyTable(item.warranty);
    setPurchasePriceTable(item.purchase_price);
    setSalePriceTable(item.sale_price);
  };

  // Price related work
  // const totalPurchasePrice = rows.reduce(
  //   (purchasePrice, item) => purchasePrice + Math.round(item.purchase_price),
  //   0
  // );
  // const totalSale = rows.reduce(
  //   (sale, item) => sale + Math.round(item.sale_price),
  //   0
  // );
  

  const totalPurchasePrice = (rows.length > 0 && rows
    .reduce((total, item) => {
      if (
        item.purchase_price !== undefined &&
        item.purchase_price !== null &&
        item.purchase_price !== ""
      ) {
        total += Number(item.purchase_price);
      }
      return total;
    }, 0)
    .toFixed(2));

    const totalSale = (rows.length > 0 && rows
    .reduce((sale, item) => {
      if (
        item.sale_price !== undefined &&
        item.sale_price !== null &&
        item.sale_price !== ""
      ) {
        sale += Number(item.sale_price);
      }
      return sale;
    }, 0)
    .toFixed(2));

    const totalProfit = ((totalSale - totalPurchasePrice).toFixed(2));

  // Button Reset
  const HandleClickResetButton = () => {
    setProductIdTable([]);
    setIdTable([]);
    setProductTable([]);
    setTypeTable([]);
    setQuantityTable([]);
    setWarrantyTable([]);
    setPurchasePriceTable([]);
    setSalePriceTable([]);
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

  const inputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
   
  };

  const handleResetImage = () => {
    setImagePreview(null);
    // Reset the value of the file input
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };


  return (
    <div className="full_div_stock_report">
      <div className="first_row_div_stock_report">
        <div className="container_search_column1_stock_report">
          <div className="search_product_stock_report">
            <div className="input-field_stock_report">
              <label
                className="label_field_stock_report_home"
                for="product_name_by_stock_report_search"
              >
                Product Name
              </label>
              <input
                className="input_field_stock_report_home"
                id="product_name_by_stock_report_search"
                onSelect={handleKeyDownProductName}
                onChange={(event) => setSelectedProductName(event.target.value)}
                list={"selectproductname"}
              />
              <datalist id="selectproductname">
                {allProduct.length > 0 && allProduct.map((allProduct, index) => {
                  return <option key={index}>{allProduct}</option>;
                })}
              </datalist>
            </div>
            <div className="input-field_stock_report">
              <label
                className="label_field_stock_report_home"
                for="Product_id_by_stock_report_search"
              >
                Product Type
              </label>
              <select
                className="select_field_stock_report_home"
                id="Product_id_by_stock_report_search"
                onSelect={(event) => setSelectedProductID(event.target.value)}
              >
                 {selectedProductID.length > 0 && selectedProductID.map((productID, index) => {
                  return <option key={index}>{productID}</option>;
                })}
              </select>
              <button
                className="button_field_stock_report_home"
                type="submit"
                onClick={handleClickSearchbyProductNameID}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="container_search_column2_stock_report">
          <div className="input-field_stock_report">
            <button
              className="button_field_stock_report_home"
              type="submit"
              onClick={handleClickSearchShowAll}
            >
              Show All
            </button>
          </div>
        </div>
      </div>
      <div className="second_row_div_stock_report loader-container_stock_report">
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="64"
            visible={true}
          />
        ) : (
          <div className="table_div_stock_report table-wrapper_stock_report">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>Stock ID</th>
                <th>Product ID/Code</th>
                <th>Product Name</th>
                <th>Type/No</th>
                <th>Warranty</th>
                <th>Avg. Purchase Price</th>
                <th>Sale Price</th>
                <th>Quantity</th>
                <th>Min. Qty</th>
                <th>Unit</th>
              </tr>
              <tbody>
                {rows.length > 0 && rows.map((item) => (
                  <tr
                    className="row"
                    tabindex="0"
                    onClick={() => handleClickTable(item)}
                    key={item.id}
                  >
                    <td>{item.purchase_id}</td>
                    <td>{item.product_code}</td>
                    <td>{item.product}</td>
                    <td>{item.model}</td>
                    <td>{item.warranty}</td>
                    <td>{item.purchase_price}</td>
                    <td>{item.sale_price}</td>
                    <td>{item.available_quantity}</td>
                    <td>{item.min_qty}</td>
                    <td>{item.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="third_row_div_stock_report">
        <div className="container_view_update_stock_report">
          <div className="container_view_stock_report">
            <div className="container_view_row1_stock_report">
              <div style={{fontSize:"1.3vw", fontWeight:"bold"}}>Product Information</div>
              <div className="input-field_stock_report">
                <label className="label_field_stock_report_home">
                  Stock ID
                </label>
                <input
                  className="input_field_stock_report_home"
                  value={productIdTable}
                />
              </div>
              <div className="input-field_stock_report">
                <label className="label_field_stock_report_home">
                  Product ID/Code
                </label>
                <input
                  className="input_field_stock_report_home"
                  value={idTable}
                />
              </div>
              <div className="input-field_stock_report">
                <label className="label_field_stock_report_home">
                  Product Name
                </label>
                <input
                  className="input_field_stock_report_home"
                  value={productTable}
                />
              </div>
              <div className="input-field_stock_report">
                <label className="label_field_stock_report_home">Type/No</label>
                <input
                  className="input_field_stock_report_home"
                  value={typeTable}
                />
              </div>
              <div className="input-field_stock_report">
                <label className="label_field_stock_report_home">
                  Quantity
                </label>
                <input
                  className="input_field_stock_report_home"
                  value={quantityTable}
                />
              </div>
            </div>
            <div className="container_view_row2_stock_report">
              <div style={{fontSize:"1.3vw", fontWeight:"bold"}}>Price</div>
              <div className="input-field_stock_report">
                <label className="label_field_stock_report_home">
                  Warranty
                </label>
                <input
                  className="input_field_stock_report_home"
                  value={warrantyTable}
                />
              </div>
              <div className="input-field_stock_report">
                <label className="label_field_stock_report_home">
                  Purchase Price
                </label>
                <input
                  className="input_field_stock_report_home"
                  value={purchasePriceTable}
                />
              </div>
              <div className="input-field_stock_report">
                <label className="label_field_stock_report_home">
                  Sale Price
                </label>
                <input
                  className="input_field_stock_report_home"
                  value={salePriceTable}
                />
              </div>
              <div>
                {/* <button
                  className="button_field_stock_report_home btn"
                  type="reset"
                  onClick={HandleClickResetButton}
                >
                  <ResetSvg/>
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
                    onClick={HandleClickResetButton}
                  >
                    <ResetSvg />
                  </button>
                  <div style={{ paddingTop: "0.4vw" }}>Reset</div>
                </div>
              </div>
            </div>
            <div className="container_view_row3_stock_report">
              <div >
                <Button className="custom_button_stock_report_home" onClick={showModal}>
                  View & Add Image
                </Button>
              </div>
            </div>
            <div className="container_view_row4_stock_report">
              <div>
                <div className="input-field_stock_report">
                  <label className="label_field_stock_report_home">
                    Total Purchase Price
                  </label>
                  <input
                    className="input_field_stock_report_home"
                    style={{fontSize:"1vw", textAlign:"center"}}
                    value={totalPurchasePrice}
                  />
                </div>
                <div className="input-field_stock_report">
                  <label className="label_field_stock_report_home">
                    Total Sale Price
                  </label>
                  <input
                    className="input_field_stock_report_home"
                    style={{fontSize:"1vw", textAlign:"center"}}
                    value={totalSale}
                  />
                </div>
                <div className="input-field_stock_report">
                  <label className="label_field_stock_report_home">
                    Total Profit
                  </label>
                  <input
                    className="input_field_stock_report_home"
                    style={{fontSize:"1vw", textAlign:"center"}}
                    value={totalProfit}
                  />
                </div>
              </div>
              <div className="excel_export_stock_report_home">
                <StockExportExcel excelData={rows} fileName={"Excel Export"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='popup-window'>
        <Modal
          title='View Add Image'
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={700}
          height={700}
          style={{
            top:"30",
            bottom:"0",
            left:"0",
            right:"0"
          }}
        >
          <div className='container_view_add_image'>
            {imagePreview && (
              <div className='image-view'>
                <img
                  src={imagePreview}
                  alt='Preview'
                  style={{ maxWidth: "200px", textAlign: "center" }}
                />
              </div>
            )}
          </div>
          <div className='container_button_view_add_image'>
            <div className='input_field_view'>
              <input
                type='file'
                accept='image/*'
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
              <button onClick={handleButtonClick}>Browse</button>
              {imagePreview && (
                <button onClick={handleResetImage}>Reset</button>
              )}

              <button>Save</button>
            </div>
            <div className='box_input_field_view_add_image'>
              <div className='input_field_view_add_image'>
                <label>Product Id</label>
                <input value={productIdTable} />
              </div>
              <div className='input_field_view_add_image'>
                <label>Product Name</label>
                <input value={productTable} />
              </div>
              <div className='input_field_view_add_image'>
                <label>Modle/Type</label>
                <input value={typeTable} />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default StockReportHome;
