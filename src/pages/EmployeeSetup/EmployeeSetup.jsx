import React from "react";
import "./employee-setup.css";
import { ReactComponent as UpdateSvg } from "../svg/update.svg";
import { ReactComponent as SaveSvg } from "../svg/save.svg";


const EmployeeSetup = () => {
  return (
    <div className="full_div_employee_setup">
      <div className="first_row_div_employee_setup">
        <div
          style={{ fontWeight: "bold", marginBottom: "1vw", fontSize: "1vw" }}
        >
          Employee Update
        </div>
        <div className="container_create_employee_setup">
          <div className="create_employee_setup_column1">
            <div className="input_field_employee_setup">
              <label>*Name</label>
              <input />
            </div>
            <div className="input_field_employee_setup">
              <label>*Designation</label>
              <input />
            </div>
            <div className="input_field_employee_setup">
              <label>*Joining Date</label>
              <input type="date" />
            </div>
          </div>
          <div className="create_employee_setup_column2">
            <div className="input_field_employee_setup">
              <label>Salary</label>
              <input />
            </div>
            <div className="input_field_employee_setup">
              <label>Phone</label>
              <input />
            </div>
            <div className="input_field_employee_setup">
              <label>Address</label>
              <input />
            </div>
          </div>
          <div className="create_employee_setup_column3">
            <div className="input_field_employee_setup">
              <label>Email</label>
              <input />
            </div>
            <div className="input_field_employee_setup">
              <label>NID</label>
              <input />
            </div>
          </div>
          <div className="create_employee_setup_column4">
            <div >
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
      </div>
      <div className="second_row_div_employee_setup">
        <div className="container_search_employee_setup">
          <div className="input_field_employee_setup">
            <label>Employee Name</label>
            <input />
            <button>Search</button>
          </div>
          <div className="input_field_employee_setup">
            <button>Show All</button>
          </div>
        </div>
      </div>
      <div className="third_row_div_employee_setup">
        <div className="table-wrapper_employee_setup">
          <table border={3} cellSpacing={2} cellPadding={10}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Joining Day</th>
              <th>Salary</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Email</th>
              <th>NID</th>
            </tr>
            <tbody>
              {/* {
 
            rows.map((item) =>
                <tr  key={item.id}>
                    
                    <td >{item.serial}</td>
                    <td >{item.challan_no}</td>
                    <td>{item.customer_name}</td>
                    <td>{item.cid}</td>
                    <td>{item.product_code}</td>
                    <td>{item.product_name}</td>
                    <td>{item.model}</td>
                    <td>{item.warranty}</td>
                    <td>{item.purchase_price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.total}</td>
                    <td>{item.sell_date}</td>
                    <td>{item.entry_date_time}</td>
                    <td>{item.shop}</td>
                </tr>
            )
        } */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="forth_row_div_employee_setup">
        <div style={{ fontWeight: "bold", fontSize: "1vw" }}>
          Employee Update
        </div>
        <div className="container_update_employee_setup">
          <div className="create_employee_setup_column1">
            <div className="input_field_employee_setup">
              <label>*ID</label>
              <input />
            </div>
            <div className="input_field_employee_setup">
              <label>*Name</label>
              <input />
            </div>
            <div className="input_field_employee_setup">
              <label>*Designation</label>
              <input />
            </div>
          </div>
          <div className="create_employee_setup_column2">
            <div className="input_field_employee_setup">
              <label>*Joining Date</label>
              <input type="date" />
            </div>
            <div className="input_field_employee_setup">
              <label>Salary</label>
              <input />
            </div>
            <div className="input_field_employee_setup">
              <label>Phone</label>
              <input />
            </div>
          </div>
          <div className="create_employee_setup_column3">
            <div className="input_field_employee_setup">
              <label>Address</label>
              <input />
            </div>
            <div className="input_field_employee_setup">
              <label>Email</label>
              <input />
            </div>
            <div className="input_field_employee_setup">
              <label>NID</label>
              <input />
            </div>
          </div>
          <div className="create_employee_setup_column4">
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
                  <UpdateSvg style={{ cursor: "pointer" }} />
                </button>
                <div style={{ paddingTop: "0.4vw" }}>Update</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSetup;
