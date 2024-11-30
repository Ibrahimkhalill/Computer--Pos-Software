import React, { useState } from "react";
import "./view_stocks.css";
import { LiaSearchSolid } from "react-icons/lia";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";

const ViewStocks = () => {
    const [searchCriterion, setSearchCriterion] = useState('Name');
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleRadioChange = (event) => {
      setSearchCriterion(event.target.value);
    };
  
    const handleSearch = () => {
      // Perform search using the selected criterion (searchCriterion) and search term (searchTerm)
      console.log(`Searching by ${searchCriterion} for term: ${searchTerm}`);
      // Add your actual search logic here
    };
    return (
        <>
            <div className="navbar_view_stocks">
                <div className="stock">STOCK</div>
                <div className="navbar-button">
                   <button className="border-none" ><FaArrowRotateLeft className="rotation_icon" /></button> 
                   <button className="border-none"><FaRegArrowAltCircleLeft /></button> 
                    
                </div>
            </div>

            <div className="first_card_view_stock">
                <div className="first_colmun_first_card">
                    <div className="input_field_view_stock">
                        <label className="first_colmun_label_field_view_stock">
                            Enter Code
                        </label>
                        <input
                            className="input_view_stock"
                            type="text"
                            name="account_holder"
                        />
                        <button className="button_view_stock">Search</button>
                    </div>

                    <div className="input_field_view_stock">
                        <button className="button_view_stock">View All</button>
                        <button className="button_view_stock">Print</button>
                        <button className="button_view_stock">Excel</button>
                    </div>
                </div>
                <div className="second_column_first_card">
                <div className="mr-r">Search By</div>
                    <div className="radio_buttons_view_stock">
                        <label>
                            <input
                                className="input_custom_view_stock"
                                type="radio"
                                value="Name"
                                checked={searchCriterion === 'Name'}
                                onChange={handleRadioChange}
                            />
                            Name
                        </label>
                        <br />
                        <label>
                            <input
                                className="input_custom_view_stock"
                                type="radio"
                                value="Type"
                                checked={searchCriterion === 'Type'}
                                onChange={handleRadioChange}
                            />
                            Type
                        </label>
                        <br />
                        <label>
                            <input
                                className="input_custom_view_stock"
                                type="radio"
                                value="Category"
                                checked={searchCriterion === 'Category'}
                                onChange={handleRadioChange} 
                            />
                            Category
                        </label>
                        <br />
                        <div className="search_button">
                            <div className="search-container">
                                <input
                                    className="input_view_stock "
                                    type="text"
                                    name="search"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="Search_view_stock" onClick={handleSearch}>
                                    <LiaSearchSolid className="search_icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="second_card_view_stock">
                <div className="table_view_stock">
                    <table border={3} cellSpacing={2} cellPadding={10}>
                        <tr>
                            <th>SL</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Rank No</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                        </tr>

                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div className="thrid_card_view_stock">
                <div className="headline_details">
                    <div>Details</div>
                    <div className="details_view_crad">
                        1 years warranty, Waterproof
                    </div>
                </div>
                <div className="second_colmun_thrid_card">
                    <div className="input_field_view_stock">
                        <label className="label_field_view_stock">
                            Total Item
                        </label>
                        <input
                            className="input_view_stock"
                            type="text"
                            name="account_holder"
                        />
                    </div>
                    <div className="input_field_view_stock">
                        <label className="label_field_view_stock">
                            Total Quantity
                        </label>
                        <input
                            className="input_view_stock"
                            type="text"
                            name="account_holder"
                            required
                        />
                    </div>
                    <div className="input_field_view_stock position">
                        <label className="label_field_view_stock">
                            Total worth of Stock
                        </label>
                        <input
                            className="input_view_stock"
                            type="text"
                            name="account_holder"
                            required
                        />
                        <span className="label_field_view_stock_bdt">BDT</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewStocks;
