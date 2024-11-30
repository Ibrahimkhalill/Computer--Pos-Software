import React, { useEffect } from "react";
import "./sale-invoice-report.css";
import { ReactComponent as ResetSvg } from "../svg/reset.svg";
import { ReactComponent as SaveSvg } from "../svg/save.svg";
import { MdDelete } from "react-icons/md";
import ExcelExport from "../../components/ExportExcel";


const SaleInvoiceReport = () => {
  useEffect(()=> {
    document.title = "Invoice Report";
  })


  return (
    <div className="full_div_sale_invoice_report">
      <div className="first_row_div_sale_invoice_report">
        <div className="conatainer_search_sale_invoice_report">
          <div className="search_sale_invoice_report_column1">
            <div className="input_field_sale_invoice_report">
              <label>Date</label>
              <input type="date" />
              <button>Search</button>
            </div>
            <div className="input_field_sale_invoice_report">
              <label>Invoice</label>
              <input />
              <button>Search</button>
            </div>
          </div>
          <div className="search_sale_invoice_report_column2">
            <div className="input_field_sale_invoice_report">
              <label>From Date</label>
              <input type="date" />
            </div>
            <div className="input_field_sale_invoice_report">
              <label>Customer</label>
              <input />
            </div>
          </div>
          <div className="search_sale_invoice_report_column3">
            <div className="input_field_sale_invoice_report">
              <label>To</label>
              <input type="date" />
              <button>Search</button>
            </div>
            <div className="input_field_sale_invoice_report">
              <label>ID</label>
              <input />
              <button>Search</button>
            </div>
          </div>
          <div className="search_sale_invoice_report_column4">
            <div className="input_field_sale_invoice_report">
              <button>Show All</button>
            </div>
          </div>
        </div>
      </div>
      <div className="second_row_div_sale_invoice_report">
        <div classname="table_wrapper_sale_invoice_report">
          <table border={3} cellSpacing={2} cellPadding={10}>
            <tr>
              <th>Invoice</th>
              <th>Customer Name</th>
              <th>Customer ID</th>
              <th>Mobile No.</th>
              <th>Address</th>
              <th>Total Product</th>
              <th>Discount</th>
              <th>Service/Extra</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Sale Date</th>
              <th>Entry Date</th>
              <th>Comment</th>
              <th>Shop</th>
              <th>Entry By</th>
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
                //         <td>{item.model}</td>
                //         <td>{item.warranty}</td>
                //         <td>{item.purchase_price}</td>
                //         <td>{item.quantity}</td>
                //         <td>{item.unit}</td>
                //         <td>{item.total}</td>
                //         <td>{item.sell_date}</td>
                //         <td>{item.entry_date_time}</td>
                //         <td>{item.shop}</td>
                //     </tr>
                // )
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="third_row_div_sale_invoice_report">
        <div className="container_view_update_sale_invoice_report">
          <div className="container_view_sale_invoice_report">
            <div>
              <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1vw",
                fontWeight: "bold",
                marginLeft: "1vw",
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
                  cursor: "pointer",
                }}
                type="submit"
              >
                <MdDelete className="delete_colorsale" />
              </button>
              <div style={{ paddingTop: "0.4vw" }}>Delete</div>
            </div>
            </div>
            <div className="input_field_sale_invoice_report_column">
              <label>Service/Extra Charge</label>
              <input />
            </div>
            <div className="input_field_sale_invoice_report_column">
              <label>Total</label>
              <input />
            </div>
            <div className="input_field_sale_invoice_report_column">
              <label>Paid</label>
              <input />
            </div>
            <div className="input_field_sale_invoice_report_column">
              <label>Due</label>
              <input />
            </div>
            <div >
              <ExcelExport
                  // excelData={rows}
                  fileName={"Excel Export"}
                />
            </div>
          </div>
          <div className="container_update_sale_invoice_report">
            <div className="update_field_sale_invoice_report_column1">
              <div className="input_field_sale_invoice_report">
                <label>Invoice No.*</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Shop Name</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <select></select>
                <button>View Invoice</button>
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Sale Date*</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Customer Name*</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Customer ID</label>
                <input />
              </div>
            </div>
            <div className="update_field_sale_invoice_report_column2">
              <div className="input_field_sale_invoice_report">
                <label>Mobile/Phone*</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Address*</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Total Product Price(+)*</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Discount(-)</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Service/Extra Charge(+)</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Total Price*</label>
                <input />
              </div>
            </div>
            <div className="update_field_sale_invoice_report_column3">
              <div className="input_field_sale_invoice_report">
                <label>Paid*</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Due*</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Comment</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Entry Date</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Entry By</label>
                <input />
              </div>
            </div>
          </div>
        </div>
        <div className="container_due_payment_sale_invoice_report">
          <div
            style={{ fontSize: "1vw", fontWeight: "bold", color: "#533b69" }}
          >
            Due Payment
          </div>
          <div className="due_payment_sale_invoice_report_box">
            <div className="due_payment_sale_invoice_report_box1">
              <div className="input_field_sale_invoice_report">
                <label>Type*</label>
                <select></select>
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Cheque No.</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Bank Name</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Tk.*</label>
                <input />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Date</label>
                <input type="date" />
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Collection By</label>
                <select></select>
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Employee ID</label>
                <select></select>
              </div>
              <div className="input_field_sale_invoice_report">
                <label>Area</label>
                <input />
              </div>
            </div>
          <div>
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
    </div>
  );
};

export default SaleInvoiceReport;
