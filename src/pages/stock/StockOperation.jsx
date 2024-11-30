import React from "react";
import "./stock-operation.css";
import { useState, useEffect, useRef } from "react";
import { Button, Modal } from "antd";
import PurchaseReportExcelExport from "../../components/ExportExcel";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import AddReport from "../../components/stockComponent/AddReport";
import StockNavBar from "../../components/stockComponent/StockNavBar";
import StockProductUtilize from "../../components/stockComponent/StockProductUtilize";
import StockProductDamage from "../../components/stockComponent/StockProductDamage";

const StockOperation = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProductTypeNo, setSelectedProductTypeNo] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [typeNo, setTypeNo] = useState([]);
  const [rows, setRows] = useState([]);
  const [stockId, setStockId] = useState([]);
  const [productIdCode, setProductIdCode] = useState([]);
  const [productName, setProductName] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [warranty, setWarranty] = useState([]);
  const [purchasePrice, setPurchasPrice] = useState([]);
  const [salePrice, setSalePrice] = useState([]);
  const [minQuantity, setMinQuantity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const quantityItem = ["Piece", "Set", "Box"];
  const [quantityInUnit, setQuantityInUnit] = useState([]);
  const [unit, setUnit] = useState([]);
  const [viewReport, setViewReport] = useState("AddReport");

  //report view function:
  const reportViewFunction = (value) => {
    console.log(value);
    setViewReport(value);
  };

  const ViewReportPage = () => {
    console.log("viewReport:", viewReport); // Add this line

    if (viewReport === "AddReport") {
      return <AddReport />;
    }
    if (viewReport === "StockProductUtilize") {
      return <StockProductUtilize />;
    }
    if (viewReport === "StockProductDamage") {
      return <StockProductDamage />;
    }
    return null;
  };
  //modal
  const [viewModal, setViewModal] = useState(false);
  //for delete modal
  const handleViewReport = () => {
    setViewModal(true);
  };
  const handleViewOk = () => {
    setViewModal(false);
  };
  const handleViewCancel = () => {
    setViewModal(false);
  };

  //fetching all product
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response_getAllProductStockTable = await fetch(
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

        const datas_getAllProductStockTable =
          await response_getAllProductStockTable.json();

        setRows(datas_getAllProductStockTable);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    // Call the function
    fetchData();
  }, []);

  // Show All Data

  const handleShowAll = () => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response_getAllProductStockTable = await fetch(
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

        const datas_getAllProductStockTable =
          await response_getAllProductStockTable.json();

        setRows(datas_getAllProductStockTable);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    // Call the function
    fetchData();
  };

  // Product Search

  const handleProductName = () => {
    const fetchProductData = async () => {
      try {
        const response_getAllStockProductName = await fetch(
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

        const datas_getAllStockProductName =
          await response_getAllStockProductName.json();
        const product_getSelectedStockProductName =
          datas_getAllStockProductName.map(
            ({ product: actualValue }) => actualValue
          );
        setAllProduct(product_getSelectedStockProductName);
      } catch (error) {
        console.log(error.message);
      }
    };

    // Call the function
    fetchProductData();
  };

  // Product With Id
  const handleKeyDownProduct = (event) => {
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

  // Searching Product auto genarated id in the ID field
  const handleClickSearchbyProductNameID = () => {
    setIsLoading(true);
    const fetchData = async () => {
      const response_getSelectedProductbyNameID = await fetch(
        "http://194.233.87.22:5001/api/stock/getStockGroupByProductAndModelSearchByProductAndModel?product=" +
          selectedProduct +
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
        await response_getSelectedProductbyNameID.json();

      console.log(datas_getSelectedProductbyNameID);

      setRows(datas_getSelectedProductbyNameID);
      setIsLoading(false);
    };

    // Call the function
    fetchData();
  };

  // Table data Show Input Field
  const handleClickTableDataShowInputField = (item) => {
    setStockId(item.purchase_id);
    setProductIdCode(item.product_code);
    setProductName(item.product);
    setTypeNo(item.model);
    setQuantity(item.available_quantity);
    setWarranty(item.warranty);
    setPurchasPrice(item.purchase_price);
    setSalePrice(item.sale_price);
    setMinQuantity(item.min_qty);
    setQuantityInUnit(item.unit);
  };

  const handleReset = (item) => {
    setStockId([]);
    setProductIdCode([]);
    setProductName([]);
    setTypeNo([]);
    setQuantity([]);
    setWarranty([]);
    setPurchasPrice([]);
    setSalePrice([]);
    setMinQuantity([]);
    setQuantityInUnit([]);
  };

  // calculation

  const totalPurchasePrice = rows
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
    .toFixed(2);

  const totalSalePrice = rows
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
    .toFixed(2);

  const totalProfit = (totalSalePrice - totalPurchasePrice).toFixed(2);

  useEffect(() => {
    handleProductName();
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
  };

  //http://194.233.87.22:5001/api/stock/updateStockTableByProduct?purchase_price=&sale_price=&min_qty=&warranty=&product=&model=
  //handleProductUpdate:
  const handleProductUpdate = async () => {
    try {
      const res = await fetch(
        "http://194.233.87.22:5001/api/stock/updateStockTableByProduct?purchase_price=" +
          purchasePrice +
          "&sale_price=" +
          salePrice +
          "&min_qty=" +
          minQuantity +
          "&warranty=" +
          warranty +
          "&product=" +
          productName +
          "&model=" +
          typeNo,
        {
          method: "PUT",
          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );

      if (res.ok) {
        handleReset();
        handleShowAll();
        toast.success("successfully updated sale price");
      } else {
        console.log("Error while updatig price");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //add damage ulilized:
  //addQuantity:
  const handleAddQuantity = () => {
    toast.error("Add  API needed");
  };
  //addQuantity:
  const handleDamageQuantity = () => {
    toast.error("Damage  API needed");
  }; //addQuantity:
  const handleUtilizeQuantity = () => {
    toast.error("Utilize  API needed");
  };
  return (
    <div className="full_div_stock_operation">
      <Toaster />
      <div className="first_row_div_stock_operation">
        <div className="search_div_stock_operation">
          <div className="input_field_stock_operation">
            <label>Product Name</label>
            <input
              onSelect={handleKeyDownProduct}
              onChange={(event) => {
                setSelectedProduct(event.target.value);
              }}
              list="stockproductname"
            />
            <datalist id="stockproductname">
              {allProduct.map((items, index) => {
                return <option key={index}>{items}</option>;
              })}
            </datalist>
          </div>
          <div className="input_field_stock_operation">
            <label>Type/No.</label>
            <select
              onSelect={(event) => {
                setSelectedProductTypeNo(event.target.value);
              }}
            >
              {selectedProductTypeNo.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </select>
            <button onClick={handleClickSearchbyProductNameID}>Search</button>
          </div>
        </div>
        <div className="input_field_stock_operation">
          <button onClick={handleShowAll}> Show All</button>
        </div>
      </div>
      <div className="second_row_div_stock_operation loading_stock_operation">
        {isLoading ? (
          <div className="rotating_lines_stock_operation">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}
            />
          </div>
        ) : (
          <div className="table_wrapper_stock_operation table_div_stock_operation">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>Stock Id</th>
                <th>Product ID/Code</th>
                <th>Product Name</th>
                <th>Type/No.</th>
                <th>Warranty</th>
                <th>Avg. Purchase Price </th>
                <th>Sale Price</th>
                <th>Quantity</th>
                <th>Min. Quantity</th>
                <th>Unit</th>
              </tr>
              <tbody>
                {rows.map((item) => (
                  <tr
                    className="row_sale_expense_report_page"
                    tabindex="0"
                    onClick={() => handleClickTableDataShowInputField(item)}
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
      <div className="third_row_div_stock_operation">
        <div className="container_update_stock">
          <div className="container_update_stock_operation">
            <div className="container_update_column1_stock">
              <h5 style={{ paddingBottom: "1vw", fontSize: "1vw" }}>
                Product Information
              </h5>
              <div className="input_field_stock_operation">
                <label>Stock ID</label>
                <input
                  className="input_field_stock_operation"
                  value={stockId}
                  onChange={(event) => {
                    setStockId(event.target.value);
                  }}
                  disabled
                />
              </div>
              <div className="input_field_stock_operation">
                <label>Product ID/Code</label>
                <input
                  value={productIdCode}
                  onChange={(event) => {
                    setProductIdCode(event.target.value);
                  }}
                  disabled
                />
              </div>
              <div className="input_field_stock_operation">
                <label>Product Name</label>
                <input
                  value={productName}
                  onChange={(event) => {
                    setProductName(event.target.value);
                  }}
                />
              </div>
              <div className="input_field_stock_operation">
                <label>Type/No.</label>
                <input
                  value={typeNo}
                  onChange={(event) => {
                    setTypeNo(event.target.value);
                  }}
                />
              </div>
              <div className="input_field_stock_operation">
                <label>Quantity</label>
                <input
                  value={quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                  disabled
                />
              </div>
            </div>
            <div className="container_update_column2_stock">
              <div
                style={{
                  paddingBottom: "1vw",
                  fontSize: "1vw",
                  fontWeight: "bold",
                }}
              >
                Update Price
              </div>
              <div className="input_field_stock_operation">
                <label>Warranty</label>
                <input
                  value={warranty}
                  onChange={(event) => {
                    setWarranty(event.target.value);
                  }}
                />
              </div>
              <div className="input_field_stock_operation">
                <label>Purchase Price</label>
                <input
                  value={purchasePrice}
                  onChange={(event) => {
                    setPurchasPrice(event.target.value);
                  }}
                />
              </div>
              <div className="input_field_stock_operation">
                <label>Sale Price</label>
                <input
                  value={salePrice}
                  onChange={(event) => {
                    setSalePrice(event.target.value);
                  }}
                />
              </div>
              <div className="input_field_stock_operation">
                <label>Min. Quantity</label>
                <input
                  value={minQuantity}
                  onChange={(event) => {
                    setMinQuantity(event.target.value);
                  }}
                />
              </div>
              <div className="input_field_stock_operation custome_stock_operation">
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleProductUpdate}>Update</button>
              </div>
            </div>
            <div className="container_update_column3_stock">
              <div
                style={{
                  paddingBottom: "1vw",
                  fontSize: "1vw",
                  fontWeight: "bold",
                }}
              >
                Add, Damage & Utilize
              </div>
              <div
                className="input_field_stock_operation"
                style={{ position: "relative" }}
              >
                <label>Quantity</label>
                <input style={{ width: "7vw" }} />
                <input
                  style={{ width: "3vw" }}
                  onChange={(event) => {
                    setQuantityInUnit(event.target.value);
                  }}
                  value={quantityInUnit}
                />
                <FaAngleDown
                  style={{
                    position: "absolute",
                    right: "1.2vw",
                    fontSize: "0.7vw",
                  }}
                />
              </div>
              <div className="input_field_stock_operation custome_stock_operation">
                <button onClick={handleAddQuantity}>Add</button>
                <button onClick={handleDamageQuantity}>Damage</button>
                <button onClick={handleUtilizeQuantity}>Utilized</button>
              </div>
              <div className="input_field_stock_operation">
                {/* <Link to="/stock/stock_operation/add_report" target="_blank">
                </Link> */}
                <button
                  className="button_VIEW_REPORT_field_stock_operation"
                  onClick={handleViewReport}
                >
                  View Report
                </button>
              </div>
            </div>
            <div className="container_due_payment_stock_operation">
              <div className="input_field_stock_operation custome_stock_operation custome_stock_operation_width">
                <Button className="custome_stock_operation" onClick={showModal}>
                  View & Add Image
                </Button>
                <PurchaseReportExcelExport
                  style={{ height: "4.8vw" }}
                  excelData={rows}
                  fileName={"Excel Export"}
                />
              </div>
              <div className="input_field_stock_operation">
                <label>Total Purchase Price</label>
                <input
                  readOnly
                  value={totalPurchasePrice}
                  style={{ fontSize: "1vw", textAlign: "center" }}
                />
              </div>
              <div className="input_field_stock_operation">
                <label>Total Sell Price</label>
                <input
                  readOnly
                  value={totalSalePrice}
                  style={{ fontSize: "1vw", textAlign: "center" }}
                />
              </div>
              <div className="input_field_stock_operation">
                <label>Total Profit</label>
                <input
                  className="input_field_stock_operation"
                  readOnly
                  value={totalProfit}
                  style={{ fontSize: "1vw", textAlign: "center" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="popup-window">
        <Modal
          title="View Add Image"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={700}
        >
          <div className="image_modal_div">
            <div className="container_button_view_add_image">
              {/* /===========/Input */}

              <div className="box_input_field_view_add_image">
                <div className="input_field_view_add_image">
                  <label>Product Id</label>
                  <input value={stockId} />
                </div>
                <div className="input_field_view_add_image">
                  <label>Product Name</label>
                  <input value={productName} />
                </div>
                <div className="input_field_view_add_image">
                  <label>Modle/Type</label>
                  <input value={typeNo} />
                </div>
              </div>

              {/* /===========/image & button */}
              <div className="input_field_view">
                <div className="container_view_add_image">
                  {imagePreview && (
                    <div className="image-view">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: "30vw",
                          height: "15vh",
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="stock_input_button_div">
                  <input
                    type="file"
                    accept="image/*"
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
              </div>
            </div>
          </div>
        </Modal>
      </div>

      {/* /========================/view report modal */}
      <div className="view_report_modal_container">
        <Modal
          title="Add, Damage & Utilized Report"
          open={viewModal}
          onOk={handleViewOk}
          onCancel={handleViewCancel}
          footer={null}
          width={"75%"}
          height={"95%"}
          style={{
            top: 60,
          }}
        >
          <div className="view_report_modal_div">
            <StockNavBar
              reportViewFunction={reportViewFunction}
              viewReport={viewReport}
            />
            <ViewReportPage />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default StockOperation;
