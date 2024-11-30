import React, { useRef, useState } from "react";
import "./hardware_purchase.css";
import { FcPrint } from "react-icons/fc";
import { FaPlugCirclePlus } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";


const Hardware_purchase = () => {
  const inputRef = useRef(null)
  const newWidth = {
    width: "7.5vw",
  };
  const newWidth1 = {
    width: "7.5vw",
    height: "2.6vh",
  };
  const Color = {
    background: "rgb(19, 65, 88)"
  }
  const initialItems = Array.from({ length: 1 }, () => ({
    itemCode: '',
    description: '',
    brand: '',
    quantity: '',
    unit: '',
    purchasePrice: '',
    salePrice: '',
    itemTotal: '',
    discount: '',
    total: '',
  }));

  const [items, setItems] = useState(initialItems);

  const inputRefs = useRef(Array.from({ length: 10 }, () => Array.from({ length: items.length }, () => React.createRef())));

  const handleKeyPress = (event, rowIndex, colIndex) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (colIndex === 9 && rowIndex === items.length - 1 && items[rowIndex].total !== '') {
        // Add a new row when the "Total" field of the last row is filled
        setItems([...items, { itemCode: '', description: '', brand: '', quantity: '', unit: '', purchasePrice: '', salePrice: '', itemTotal: '', discount: '', total: '' }]);
        // Wait for the state to update and then focus on the new input field
        setTimeout(() => {
          inputRefs.current[rowIndex + 1][0].current.focus();
        });
      } else if (colIndex < 9) {
        // Move focus to the next input field in the same row
        setTimeout(() => {
          inputRefs.current[rowIndex][colIndex + 1]?.current?.focus();
        });
      }
    }
  };

  const getFieldName = (index) => {
    switch (index) {
      case 0: return 'itemCode';
      case 1: return 'description';
      case 2: return 'brand';
      case 3: return 'quantity';
      case 4: return 'unit';
      case 5: return 'purchasePrice';
      case 6: return 'salePrice';
      case 7: return 'itemTotal';
      case 8: return 'discount';
      case 9: return 'total';
      default: return '';
    }
  };
  console.log(items);
  return (
    <>
    
    <div className="full_div">
      <div className="navbar">
        <div className="purchase_header">Purchase</div>
        <div className="nav_button">
          <button className="nav_button"  >
            <IoMdPersonAdd style={{ fontSize: "1vw" }} title="Add Supplier"/>
          </button>
          <button className="nav_button">
            <FaPlugCirclePlus style={{ fontSize: "1vw" }} title="Add Item" />
          </button>
          <button className="nav_button">
            <FaArrowRotateRight
              style={{ fontSize: "1vw", transform: "rotate(160deg)" }}
              title="Reset"
            />
          </button>
          <button className="nav_button">
            <FaArrowLeft style={{ fontSize: "1vw" }} title="Back"/>
          </button>
        </div>
      </div>
      <div className="first_row_div">
        <div className="invisible_div">
          <div className="invisible_div_sale_col1">
            <div className="input_field_short">
              <label className="label_field_hardware_purchase">
                Invoice No.
              </label>
              <input type="text" className="input_field_hardware_purchase" />
            </div>
            <div className="input_field_short">
              <label className="label_field_hardware_purchase">Order No.</label>
              <input className="input_field_hardware_purchase" />
            </div>
          </div>
          <div className="invisible_div_sale_col2">
            <div className="input_field_short">
              <label className="label_field_hardware_purchase">Date</label>
              <input type="date" className="input_field_hardware_purchase" />
            </div>
            <div className="input_field_short">
              <label className="label_field_hardware_purchase">Date</label>
              <input type="date" className="input_field_hardware_purchase" />
            </div>
          </div>
          <fieldset className="customer_fieldset">
            <legend>Vendor/Supplier</legend>
            <div className="customer_inner_div1">
              <div className="customer_inner_div3">
                <div className="input_field_short">
                  <label className="label_field_hardware_purchase">Code</label>
                  <input className="input_field_hardware_purchase" />
                </div>
              </div>
              <div className="customer_inner_div4">
                <div className="input_field_short">
                  <label className="label_field_hardware_purchase">
                    Balance
                  </label>
                  <input className="input_field_hardware_purchase" />
                </div>
              </div>
            </div>
            <div className="customer_inner_div2">
              <div className="input_field_long">
                <label className="label_field_hardware_purchase">Name</label>
                <input className="input_field_hardware_purchase" />
              </div>
              <div className="input_field_long">
                <label className="label_field_hardware_purchase">Address</label>
                <input className="input_field_hardware_purchase" />
              </div>
              <div className="input_field_long">
                <label className="label_field_hardware_purchase">Mobile</label>
                <input className="input_field_hardware_purchase" />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="table_hardware_purchase">
          <div className="table_div_hardware_purchase">
            <table className="" border={3} cellSpacing={2} cellPadding={10}>
              <thead>
          <tr>
            <th style={Color}>Item Code</th>
            <th style={Color}>Description</th>
            <th style={Color}>Brand</th>
            <th style={Color}>Quantity</th>
            <th style={Color}>Unit</th>
            <th style={Color}>Purchase Price</th>
            <th style={Color}>Sale Price</th>
            <th style={Color}>Item Total</th>
            <th style={Color}>Discount</th>
            <th style={Color}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 10 }, (_, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    className="table_input_field"
                    ref={inputRefs.current[rowIndex][colIndex]}
                    value={item[getFieldName(colIndex)]}
                    onChange={(e) => {
                      const updatedItems = [...items];
                      updatedItems[rowIndex][getFieldName(colIndex)] = e.target.value;
                      setItems(updatedItems);
                    }}
                    onKeyPress={(e) => handleKeyPress(e, rowIndex, colIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
            </table>
          </div>
          <div className="input_field_short_total">
            <label
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: ".9vw",
              }}
              className="label_field_hardware_purchase"
            >
              Total
            </label>
            <input className="input_field_hardware_purchase" />
          </div>
        </div>
      </div>
      <div className="second_row_div">
        <div className="first_column_second_row">
          <div className="input_field_short_select">
            <label className="label_field_hardware_purchase">
              Inventory Location
            </label>
            <select>
              <option></option>
              <option>Ibrahim</option>
            </select>
          </div>
          <div className="input_field_short_select">
            <label className="label_field_hardware_purchase">Employee</label>
            <select>
              <option></option>
              <option>Ibrahim</option>
            </select>
          </div>
          <div className="input_field_longs">
            <label className="label_field_hardware_purchase">Remarks </label>
            <input className="text_area_field" />
          </div>
          <div className="input_field_long">
            <div className="label_field_hardware_purchase" style={{boxShadow:"none"}}>
              Amount In Words:
             
            </div>
            <span style={{fontWeight:"bold"}} >...........................................................</span>
          </div>
          <div className="button_first_column_second_row">
            <div>
              <button  className=" button_hardware button1">
                <FcPrint className="print_icon" title="Print" />
              </button>
            </div>
            <div>
              <button className="button_hardware button2">
                Purchase
              </button>
            </div>
          </div>
        </div>

        <div className="total_div_hardware_purchases {
">
          <div className="input_field_short">
            <label className="label_field_hardware_purchase" style={newWidth}>Total</label>
            <input style={newWidth} />
          </div>
          <div className="input_field_short">
            <label className="label_field_hardware_purchase" style={newWidth}>Additional Discount</label>
            <input style={newWidth} />
          </div>
          <div className="input_field_short">
            <label className="label_field_hardware_purchase" style={newWidth}>Carriage/Freight</label>
            <input style={newWidth} />
          </div>
          <div className="bar_inside_total_div" style={{ color: "WHITE" }}>
            <label  className="bar_inside_label" style={newWidth1}>
              Net Total
            </label>
            <input style={newWidth1} />
          </div>
          <div className="thrid_row_bar_inside">
            <div className="input_field_short">
              <label className="label_field_hardware_purchase" style={newWidth}>Paid Amount</label>
              <input style={newWidth} />
            </div>
            <div className="input_field_short">
              <label className="label_field_hardware_purchase" style={newWidth}>Due</label>
              <input style={newWidth} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Hardware_purchase;
