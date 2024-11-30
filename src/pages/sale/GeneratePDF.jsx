import React from "react";
import "./pdf.css";
import merinasoft from "../home/merinasoft.png";
import { convertNumberToWords } from "./convertNumberToWords ";
export const ComponentToPrint = React.forwardRef((props, ref) => {
    const {
        productTable,
        salePriceTable,
        totalTKTable,
        customerTable,
        invoiceTable,
        IdOrCodeTable,
        shopTable,
        quantityTable,
        typeNoTable,
        cidTable,
        saleDateTable,
        SaleBy
    } = props.data;
    const words = convertNumberToWords(totalTKTable);
    console.log(words); // Output: "Three Hundred Fifty"
    return (
        <div ref={ref}>
            <div className="invoice">
                {/* Header Section */}
                <div className="headers">
                    <img src={merinasoft} alt="Company Logo" className="logo" />
                    <div className="company-info">
                        <div className="company-name">
                        {shopTable}
                        </div>
                        <div className="company-address">
                            A&A Tower, Suite 1/C, 173 Arambagh, Motijheel,
                            Dhaka-1000
                        </div>
                        <div className="company-address">
                            Email: info@merinasoft.com Phone: 01704473813
                        </div>
                        <div className="company-address">
                            Web: www.merinasoft.com
                        </div>
                    </div>
                </div>
                <div className="horizontal-line1" />

                {/* Billing Information Section */}
                <div className="billing-info">
                    <div className="invoice-bill">Invoice/Bill</div>
                    <div className="customer-invoice">
                        <div className="customer-info">
                            <h5>Customer: {customerTable}</h5>
                            <h5>Cutomer ID: {cidTable}</h5>
                            <h5>Mobile: 01746185116</h5>
                        </div>
                        <div className="invoice-details">
                            <h5>Invoice Number: {invoiceTable}</h5>
                            <h5>Date: {saleDateTable}</h5>
                            <h5>Sale By: Ibrahim Khalil</h5>
                            <h5>Employee ID: 001123</h5>
                            <h5>Shop Name:{SaleBy}</h5>
                        </div>
                       
                    </div>
                    
                </div>

                {/* Body Section - Product Details */}
                <div className="body">
                    <div className="table">
                        <div className="product-table">
                            <div className="div">Product Code</div>
                            <div className="div">Product Name</div>
                            <div className="div">Product Type</div>
                            <div className="div">Quantity</div>
                            <div className="div">Sale Price</div>
                            <div className="div">Total</div>

                            <div className="div">{IdOrCodeTable}</div>
                            <div className="div">{productTable} </div>
                            <div className="div">{typeNoTable}</div>
                            <div className="div">{quantityTable}</div>
                            <div className="div">{salePriceTable}</div>
                            <div className="div">{totalTKTable}</div>
                        </div>
                        <div className="table2">
                            <div className="div">Total Product Price</div>
                            <div className="div1">{totalTKTable}</div>

                            <div className="div">Extra Service/Charge</div>
                            <div className="div1">0</div>

                            <div className="div">Net Total</div>
                            <div className="div1">{totalTKTable}</div>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="total">
                        <div>Comment/Service :</div>
                        <div className="word" >Net Total(In Words) : {words} Taka</div>
                       
                        <div className="total_row">
                            <div className="div">Paid</div>
                            <div className="div">{totalTKTable}</div>
                            <div className="div">Due</div>
                            <div className="div">0.00</div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="footer">
                    <div className="ceo-signature">
                        <div>
                            <div className="horizontal-line" />
                            Authorize Signature
                        </div>

                        <div>
                            <div className="horizontal-line" />
                            Recived With Good Condition By
                        </div>
                    </div>

                    <div className="last_part">
                        <div>
                            1.Warranty wil void if sticker removed,Physically
                            damage and Burn Case.
                        </div>
                        <div>2.Vat & Tax not included</div>
                    </div>
                </div>
            </div>
        </div>
    );
});
