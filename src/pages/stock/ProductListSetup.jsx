import React, { useRef } from "react";
import "./product-list-setup.css";
import { useState, useEffect } from "react";
import ExportExcel from "../../../src/components/ExportExcel";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../sale/Invoice";
import { ReactComponent as ResetSvg } from "../svg/reset.svg";
import { ReactComponent as SaveSvg } from "../svg/save.svg";
import { ReactComponent as SheetsSvg } from "../svg/sheets.svg";
import { ReactComponent as UpdateSvg } from "../svg/update.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// http://194.233.87.22:5001/api/product_list/getProductList
const ProductListSetup = () => {
  const location = useLocation();

  const [rows, setRows] = useState([]);
  const [allCategory, setallCategory] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState([]);
  const [allProductId, setallProductId] = useState([]);
  const [allProductName, setallProductName] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  const [category, setCategory] = useState([]);
  const [code, setCode] = useState([]);
  const [name, setName] = useState([]);
  const [type, setType] = useState([]);

  const [codeSave, setCodeSave] = useState([]);
  const [nameSave, setNameSave] = useState([]);
  const [typeSave, setTypeSave] = useState([]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    // localStorage.setItem(
    //   "x-access-token",
    //   JSON.stringify(location.state.accessToken)
    // );
    document.title = "Product List and Setup";

    setIsLoaded(true);
    const fetchData = async () => {
      try {
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
        setRows(datas_getAllStockTable);

        const response_getAllStock = await fetch(
          "http://194.233.87.22:5001/api/product_list/getAllDistinctCategoriesFromProductList",
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
        console.log(datas_getAllStock);
        const product_getAllStock = datas_getAllStock.map(
          ({ category: actualValue }) => actualValue
        );
        setallCategory([...new Set(product_getAllStock)]);
        console.log(product_getAllStock);
        setIsLoaded(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleClickSearchShowAll = () => {
    setIsLoaded(true);
    const fetchData = async () => {
      const response_getProductTableAllData = await fetch(
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
      console.log("http://194.233.87.22:5001/api/product_list/getProductList");
      const datas_getProductTableAllData =
        await response_getProductTableAllData.json();
      console.log(datas_getProductTableAllData);
      setRows(datas_getProductTableAllData);
      console.log(datas_getProductTableAllData);
      setIsLoaded(false);
    };

    // Call the function
    fetchData();
  };

  // Call the function

  // Category field search D3
  const handleKeyDownCategoryName = (event) => {
    // setIsLoaded(true);
    setSelectedCategory(event.target.value);

    const fetchData = async () => {
      const response_getSelectedCategory = await fetch(
        "http://194.233.87.22:5001/api/product_list/getAllDistinctCategoriesFromProductList" +
          selectedCategory,
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
        "http://194.233.87.22:5001/api/product_list/getAllDistinctCategoriesFromProductList?category=" +
          selectedCategory
      );
      const datas_getSelectedCategory =
        await response_getSelectedCategory.json();
      console.log(datas_getSelectedCategory);
      const product_getSelectedCategoryID = datas_getSelectedCategory.map(
        ({ category: actualValue }) => actualValue
      );

      setSelectedCategory([...new Set(product_getSelectedCategoryID)]);
      console.log(product_getSelectedCategoryID);
      // setIsLoaded(false);
    };

    // Call the function
    fetchData();
  };

  const handleClickSearchbyCategory = () => {
    setIsLoaded(true);
    const fetchData = async () => {
      const response_getSelectedCategoryForSearch = await fetch(
        "http://194.233.87.22:5001/api/product_list/getAllFromProductListByCategory?category=" +
          selectedCategory,
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
      const datas_getSelectedCategoryForSearch =
        await response_getSelectedCategoryForSearch.json();
      console.log(datas_getSelectedCategoryForSearch);

      setRows(datas_getSelectedCategoryForSearch);
      setIsLoaded(false);
    };

    // Call the function
    fetchData();
  };

  const handleClickSearchbyProductId = (event) => {
    setIsLoaded(true);
    const fetchData = async () => {
      const response_getSelectedProductIdForSearch = await fetch(
        "http://194.233.87.22:5001/api/product_list/getAllFromProductListByCode?code=" +
          selectedProductId,
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
      const datas_getSelectedProductIdForSearch =
        await response_getSelectedProductIdForSearch.json();
      console.log(datas_getSelectedProductIdForSearch);

      setRows(datas_getSelectedProductIdForSearch);
      setIsLoaded(false);
    };

    // Call the function
    fetchData();
  };

  //table

  const [selectedID, setSelectedID] = useState(null);

  const handleClickTable = (item) => {
    setSelectedID(item.id);
    setCategory(item.category);
    setCode(item.code);
    setName(item.product);
    setType(item.model);
  };

  // Product name field search
  const handleKeyDownProductName = (event) => {
    // setIsLoaded(true);
    setSelectedProductName(event.target.value);

    const fetchData = async () => {
      const response_getSelectedProduct = await fetch(
        "http://194.233.87.22:5001/api/product_list/getAllFromProductListByProductNameAndTypeNo?product=" +
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

      console.log(
        "http://194.233.87.22:5001/api/product_list/getAllFromProductListByProductNameAndTypeNo?product=" +
          selectedProductName
      );
      const datas_getSelectedProduct = await response_getSelectedProduct.json();
      console.log(datas_getSelectedProduct);
      const product_getSelectedProductType = datas_getSelectedProduct.map(
        ({ product: actualValue }) => actualValue
      );

      setSelectedProductType([...new Set(product_getSelectedProductType)]);
      console.log(product_getSelectedProductType);
      // setIsLoaded(false);
    };

    // Call the function
    fetchData();
  };

  // Searching Product auto genarated id in the ID field
  const handleClickSearchbyProductNameType = () => {
    const fetchData = async () => {
      const response_getSelectedProductbyNameType = await fetch(
        "http://194.233.87.22:5001/api/product_list/getAllFromProductListByProductNameAndTypeNo?product=" +
          selectedProductName +
          "&model=" +
          selectedProductType,
        {
          method: "POST",

          headers: {
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        }
      );
      console.log("link");
      const datas_getSelectedProductbyNameType =
        await response_getSelectedProductbyNameType.json();

      console.log(datas_getSelectedProductbyNameType);

      setRows(datas_getSelectedProductbyNameType);
    };

    // Call the function
    fetchData();
  };
const handleProductSave = ()=>{
  toast.success("New Product Add SuccessFully");
}

const handleProductUpdate = ()=>{
  toast.success("SuccessFully Updated");
}


  return (
    <div className="full_div_product_set_list">
      <div className="first_row_div_product_set_list">
        <div className="container_search_product_set_list">
          
          <div className="container_search_column2_product_set_list">
            <h5 className="header_class_product_set">Add New Product</h5>
            <div style={{ marginTop: "1vw" }}></div>
            <div className="container_sub_search_column2_product_set_list">
              <div>
                <div className="input_field_product_set_list">
                  <label>Category</label>
                  <select
                    onSelect={handleKeyDownCategoryName}
                    onChange={(event) =>
                      setSelectedCategory(event.target.value)
                    }
                  >
                    {allCategory.length > 0 &&
                      allCategory.map((allCategory, index) => {
                        return <option key={index}>{allCategory}</option>;
                      })}
                  </select>
                </div>
                <div className="input_field_product_set_list">
                  <label>Product ID / Code</label>
                  <input onChange={(event) => setCodeSave(event.target.value)} />
                </div>
                <div className="input_field_product_set_list">
                  <label>Product Name</label>
                  <input onChange={(event) => setNameSave(event.target.value)} />
                </div>
                <div className="input_field_product_set_list">
                  <label>Type/No.</label>
                  <input onChange={(event) => setTypeSave(event.target.value)} />
                </div>
              </div>
              <div>
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
                      onClick={handleProductSave}
                    >
                      <SaveSvg style={{ cursor: "pointer" }} />
                    </button>
                    <div style={{ paddingTop: "0.4vw" }}>Save</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container_search_column3_product_set_list">
            <h5 className="header_class_product_set">
              Update Product Information
            </h5>
            <div style={{ marginTop: "1vw" }}></div>
            <div className="separete_row_list_set_up">
              <div>
                <div className="input_field_product_set_list">
                <label>Category</label>
                <select
                  onSelect={handleKeyDownCategoryName}
                  value={category}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                >
                  {allCategory.length > 0 &&
                    allCategory.map((allCategory, index) => {
                      return <option key={index}>{allCategory}</option>;
                    })}
                </select>
              </div>
              <div className="input_field_product_set_list">
                <label>Product ID / Code</label>
                <input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                />
              </div>
              <div className="input_field_product_set_list">
                <label>Product Name</label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="input_field_product_set_list">
                <label>Type/No.</label>
                <input
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                />
              </div>
              </div>
            <div className="container_search_column4_product_set_list">
              <div>
                {/* <button>Update</button> */}
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
                    onClick={handleProductUpdate}
                  >
                    <UpdateSvg style={{ cursor: "pointer" }} />
                  </button>
                  <div style={{ paddingTop: "0.4vw" }}>Update</div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_product_set_list">
        <div className="container_search_column5_product_set_list">
          <div className="field1_product_set_list">
            <div className="input_field_product_set_list">
              <label>Category</label>
              <select
                onSelect={handleKeyDownCategoryName}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {allCategory.length > 0 &&
                  allCategory.map((allCategory, index) => {
                    return <option key={index}>{allCategory}</option>;
                  })}
              </select>
              <button
                style={{ marginLeft: "1vw" }}
                onClick={(event) =>
                  handleClickSearchbyCategory(event.target.value)
                }
              >
                Search
              </button>
            </div>
            <div className="input_field_product_set_list">
              <label>Product ID</label>
              <input
                // onSelect={(event) => setSelectedProductId(event.target.value)}
                onChange={(event) => setSelectedProductId(event.target.value)}
                list={"select_product_id"}
              />
              <datalist id="select_product_id">
                {allProductId.length > 0 &&
                  allProductId.map((allProductId, index) => {
                    return <option key={index}>{allProductId}</option>;
                  })}
              </datalist>

              <button
                style={{ marginLeft: "1vw" }}
                onClick={(event) =>
                  handleClickSearchbyProductId(event.target.value)
                }
              >
                Search
              </button>
            </div>
          </div>

          <div className="field2_product_set_list">
            <div>
              <div className="input_field_product_set_list">
                <label>Product Name</label>
                <input
                  onSelect={handleKeyDownProductName}
                  onChange={(event) =>
                    setSelectedProductName(event.target.value)
                  }
                  list={"selectproductname"}
                />
                <datalist id="selectproductname">
                  {allProduct.length > 0 &&
                    allProduct.map((allProduct, index) => {
                      return <option key={index}>{allProduct}</option>;
                    })}
                </datalist>
              </div>

              <div className="input_field_product_set_list">
                <label>Type No</label>
                <select
                  onSelect={(event) =>
                    setSelectedProductType(event.target.value)
                  }
                >
                  {selectedProductType.map((productType, index) => {
                    return <option key={index}>{productType}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="input_field_product_set_list">
            <button onClick={handleClickSearchbyProductNameType}>Search</button>
          </div>
          <div className="container_search_column1_product_set_list">
            <div className="input_field_product_set_list">
              <button onClick={handleClickSearchShowAll}>Show All</button>
            </div>
          </div>
        </div>
      </div>
      <div className="third_row_div_product_set_list rotating_lines_product_set_list">
        {isLoaded ? (
          <div>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          </div>
        ) : (
          <div className="table_div_product_set_list table-wrapper_product_set_list">
            <table border={3} cellSpacing={2} cellPadding={10}>
              <tr>
                <th>Category</th>
                <th>ID / Code</th>
                <th>Product Name </th>
                <th>Type / No</th>
              </tr>
              <tbody>
                {rows.length > 0 &&
                  rows.map((item) => (
                    <tr
                      className={
                        selectedID === item.id ? "rows selected" : "rows"
                      }
                      tabindex="0"
                      onClick={() => handleClickTable(item)}
                      key={item.id}
                    >
                      <td>{item.category}</td>
                      <td>{item.code}</td>
                      <td>{item.product}</td>
                      <td>{item.model}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="fourth_row_div_product_set_list">
        <div className="container_update_view_product_set_list">
          <div className="container_view_product_set_list">
            <div className="input_field_product_set_list">
              <label>Product ID</label>
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </div>
            <div className="input_field_product_set_list">
              <label>Product Name</label>
              <input value={name} />
            </div>
            <div className="input_field_product_set_list">
              <label>Type No</label>
              <input value={type} />
            </div>
          </div>
          <div className="input_field_product_set_list">
            <div style={{ display: "none" }}>
              <ComponentToPrint ref={componentRef} code={code} />
            </div>
            <button
              className="barcode_button_product_set_list_page"
              onClick={handlePrint}
            >
              Generate BarCode
            </button>
          </div>
        </div>

        <div>
          <ExportExcel excelData={rows} fileName={"Excel Export"} />
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default ProductListSetup;
