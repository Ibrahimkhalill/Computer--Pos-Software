import React from "react";
import "./permanent-customer.css";
const PermanentCustomer = () => {
  return (
    <div className="full_div_permanent_customer">
      <div className="first_row_div_permanent_customer">
        <div className="container_search_permanent_customer">
          <div style={{ fontSize: "1.5vw", fontWeight: "bold" }}>
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
                    <label>Total</label>
                    <input />
                  </div>

                  <div className="input_field_permanent_customer">
                    <label>Paid</label>
                    <input />
                  </div>

                  <div className="input_field_permanent_customer">
                    <label>Due</label>
                    <input />
                  </div>
                </div>
              </div>
            </div>
            <div className="input_field_permanent_customer">
              <button>Save</button>
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
        <div className="input_field_permanent_customer">
          <button>Export Excel</button>
        </div>
      </div>
    </div>
  );
};

export default PermanentCustomer;
