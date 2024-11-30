import React from "react";
import "./permanentCustomerSetup.css";

const Permanent_Customer_setup = () => {
    return (
        <div className="fulldiv_pcs">
            <div className="first_row_div_pcs">
                <div className="first_row_div_container_1_pcs">
                    <div className="header_class">
                    <h5 className="header_pcs">Customer Information</h5>
                    </div>
                    <div className="first_row_div_container_1_section_pcs">
                        <div className="first_row_div_container_1_element_1_pcs">
                            <div className="first_row_div_container_1_element_1_row_1_pcs">
                                <div className="customer_id_pcs">
                                    <label>Customer ID</label>
                                    <input></input>
                                </div>
                                <div className="mobile_pcs">
                                    <label>Mobile</label>
                                    <input></input>
                                </div>
                            </div> 
                              <div className="first_row_div_container_1_element_1_row_2_pcs">
                                <div className="customer_name_id_pcs">
                                    <label>Customer Name</label>
                                    <input></input>
                                </div>
                                <div className="address_pcs">
                                    <label>Address</label>
                                    <input></input>
                                </div>
                            </div>
                        </div>
                        <div className="first_row_div_container_1_element_2_pcs">
                            <button className="button_save_pcs">Save</button>
                        </div>
                    </div>
                </div>
                <div className="first_row_div_container_2_pcs"></div>
            </div>
            <div className="second_row_div_pcs"></div>
        </div>
    );
};

export default Permanent_Customer_setup;
