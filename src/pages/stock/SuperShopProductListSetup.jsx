import React, { useRef } from "react";
import "./super-shop-stock.css";
import { useState, useEffect } from "react";
import ExportExcel from "../../components/ExportExcel";
import { RotatingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../sale/Invoice";
import { IoIosSave } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";
import { SiGooglesheets } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";

// http://194.233.87.22:5001/api/product_list/getProductList
const SuperShopProductListSetup = () => {
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
  const [category_name, setCategroyName] = useState();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const showalldata = async () => {
    try {
      const response_getAllStockTable = await fetch(
        "http://127.0.0.1:8000/supershop/api/get/products/",
        {
          method: "GET",
        }
      );
      const datas_getAllStockTable = await response_getAllStockTable.json();
      setRows(datas_getAllStockTable);
      console.log(datas_getAllStockTable);

      
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    // localStorage.setItem(
    //   "x-access-token",
    //   JSON.stringify(location.state.accessToken)
    // );
    document.title = "Product List and Setup";

    setIsLoaded(true);
    const fetchData = async () => {
      try {
        

        const response_getAllStock = await fetch(
          "http://127.0.0.1:8000/supershop/api/get/category/",
          {
            method: "GET",
          }
        );
        const datas_getAllStock = await response_getAllStock.json();

        setCategory(datas_getAllStock);
        console.log(datas_getAllStock);
        setIsLoaded(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    showalldata()
  }, []);

  const handleSaveProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("category", category_name);
      formData.append("product_code", code);
      formData.append("product_name", name);
      formData.append("product_type", type);
      
      const response = await fetch(
        "http://127.0.0.1:8000/supershop/api/products/create/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Product saved successfully!");
        showalldata()
        // Handle any additional logic after successful save
      } else {
        const data = await response.json();
        console.error("Failed to save product:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleClickTable = (item) => {
    setSelectedCategory(item.category_name)
    setSelectedProductId(item.product_code);
    setSelectedProductName(item.product_name);
    setSelectedProductType(item.product_type);
  };
  return (
    <div className="full_div_super_shop_stock">
        <ToastContainer/>
      <div className="first_row_div_super_shop_stock">
        <div className="container_super_shop_stock_add_product">
          <span style={{ fontSize: "1.2vw", fontWeight: "bold" }}>
            Add New Product
          </span>
          <div className="super_shop_stock_add_product_saparator">
            <div>
              <div className="input_field_super_shop_stock_product_setup">
                <label>Category</label>
                <select
                  onChange={(event) => setCategroyName(event.target.value)} value={category_name}
                >
                  <option  >Select a Category</option>
                  {category.map((allCategory, index) => {
                    return (
                    
                    
                      
                      <option value={allCategory.id} key={index}>
                        {allCategory.category_name}
                      </option>
                    
                    );
                  })}
                </select>
              </div>
              <div className="input_field_super_shop_stock_product_setup">
                <label>Product/Code</label>
                <input
                  type="text"
                  onChange={(event) => setCode(event.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="input_field_super_shop_stock_product_setup">
                <label>Product Name</label>
                <input onChange={(event) => setName(event.target.value)} />
              </div>
              <div className="input_field_super_shop_stock_product_setup">
                <label>Type/No</label>
                <input onChange={(event) => setType(event.target.value)} />
              </div>
            </div>
            <div className="container_super_shop_stock_add_product_button">
              <div
                className="super_shop_stock_product_setup_button"
                onClick={handleSaveProduct}
              >
                <button>
                  <IoIosSave />
                </button>
                <span>Save</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container_super_shop_stock_add_product_update">
          <span style={{ fontSize: "1.2vw", fontWeight: "bold" }}>
            Update Product
          </span>
          <div className="super_shop_stock_add_product_saparator">
            <div>
              <div className="input_field_super_shop_stock_product_setup">
                <label>Category</label>
                <select
                  onChange={(event) => setCategroyName(event.target.value)}
                  value={selectedCategory}
                >
                  {category.map((allCategory, index) => {
                    return (
                      <option value={allCategory.id} key={index}>
                        {allCategory.category_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="input_field_super_shop_stock_product_setup">
                <label>Product/Code</label>
                <input value={selectedProductId} />
              </div>
            </div>
            <div>
              <div className="input_field_super_shop_stock_product_setup">
                <label>Product Name</label>
                <input value={selectedProductName}/>
              </div>
              <div className="input_field_super_shop_stock_product_setup">
                <label>Type/No</label>
                <input value={selectedProductType}/>
              </div>
            </div>
            <div className="container_super_shop_stock_add_product_button">
              <div className="super_shop_stock_product_setup_button">
                <button>
                  <RxUpdate />
                </button>
                <span>Update</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_super_shop_stock">
        <div className="container_search_super_shop_stock_column1">
          <div className="input_field_super_shop_stock_product_setup">
            <label>Category</label>
            <select
                  onChange={(event) => setCategroyName(event.target.value)}
                >
                  {category.map((allCategory, index) => {
                    return (
                      <option value={allCategory.id} key={index}>
                        {allCategory.category_name}
                      </option>
                    );
                  })}
                </select>
            <button>Search</button>
          </div>
          <div className="input_field_super_shop_stock_product_setup">
            <label>Product/Code</label>
            <input />
            <button>Search</button>
          </div>
        </div>
        <div className="container_search_super_shop_stock_column2">
          <div>
            <div className="input_field_super_shop_stock_product_setup">
              <label>Product Name</label>
              <input />
            </div>
            <div className="input_field_super_shop_stock_product_setup">
              <label>Type/No</label>
              <input />
            </div>
          </div>
          <div>
            <div className="input_field_super_shop_stock_product_setup">
              <button>Search</button>
            </div>
          </div>
        </div>
        <div className="container_search_super_shop_stock_column3">
          <div className="input_field_super_shop_stock_product_setup">
            <button>Show All</button>
          </div>
        </div>
      </div>
      <div className="third_row_div_super_shop_stock">
        <div className="container_super_shop_stock_table">
          <table border={3} cellSpacing={2} cellPadding={10}>
            <tr>
              <th>Serial</th>
              <th>Category</th>
              <th>Product/ID</th>
              <th>Product Name</th>
              <th>Type/No</th>
            </tr>
            <tbody>
              {rows.length > 0 &&
                rows.map((item, index) => (
                  <tr className="rows" tabindex="0" key={item.id} style={{cursor:"pointer"}} onClick={() => handleClickTable(item)}>
                    <td>{index + 1}</td>
                    <td>{item.category_name}</td>
                    <td>{item.product_code}</td>
                    <td>{item.product_name}</td>
                    <td>{item.product_type}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="forth_row_div_super_shop_stock">
        <div className="container_generate_bar_code_super_shop_stock">
          <div>
            <div className="input_field_super_shop_stock_product_setup">
              <label>Product ID</label>
              <input value={selectedProductId}/>
            </div>
            <div className="input_field_super_shop_stock_product_setup">
              <label>Product Name</label>
              <input value={selectedProductName}/>
            </div>
            <div className="input_field_super_shop_stock_product_setup">
              <label>Type/No</label>
              <input value={selectedProductType}/>
            </div>
          </div>
          <div>
            <div className="input_field_super_shop_stock_product_setup">
            <div style={{ display: "none" }}>
                                <ComponentToPrint
                                    ref={componentRef}
                                    code={selectedProductId}
                                   
                                    
                                />
                            </div>
          
         
              <button onClick={handlePrint} style={{ width: "10vw", height: "5vh" }}>
                Generate BarCode
              </button>
            </div>
          </div>
        </div>
        <div className="container_excel_super_shop_stock_product_setup">
          <div className="super_shop_stock_product_setup_button">
            <button>
              <SiGooglesheets />
            </button>
            <span>Excel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperShopProductListSetup;
