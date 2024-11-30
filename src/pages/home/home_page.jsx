import React from "react";
import "./home_page.css";
import Navbar from './navbar.jsx'
import { Link } from "react-router-dom";

import {
    FaChartBar,
    FaLuggageCart,
    FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaSackDollar } from "react-icons/fa6";

const homepage = () => {
   
  

    return (
        <>
                <div className="card_invisible">
                    <div className="card colmun"  >
                        <div className="income">
                            <FaChartBar className="font_size" />

                            <div>
                                Total Sales <div>0000 TK</div>
                            </div>
                        </div>
                        <div className="card11">
                        <div className="operation">
                            <div className="py-2">
                            Sales Opreration
                            </div>
                           
                            <FaRegArrowAltCircleRight className="arrow" />
                        </div>
                    </div>
                    </div>
                    

                    <div className="card2 colmun">
                        <div className="qunatity">
                            <FaLuggageCart className="font_size" />

                            <div>Quantity
                            <div>0000</div>
                            </div>
                        </div>

                        <div className="card12 ">
                            <div className="operation">
                                <div className="py-2">
                                Stock
                                </div>
                                
                                <FaRegArrowAltCircleRight className="arrow" />
                            </div>
                        </div>
                    </div>
                    <div className="card3 colmun">
                        <TiShoppingCart className="font_size_1" />
                        <div className="purchase">
                            <div>Purchase<div>0000</div></div>
                        </div>

                        <div className="card13">
                        <div className="operation">
                            <div className="py-2">Purchase</div>
                            
                            <FaRegArrowAltCircleRight className="arrow" />
                        </div>
                        </div>
                    </div>
                    <div className="card4 colmun">
                        <FaSackDollar className="font_size dollar_icon" />
                        <div className=" net_income">
                            <div>Net Income<div>0000 Tk</div></div>
                        </div>

                        <div className="card14">
                        <div className="operation">
                           <div className="py-2">
                           Profit / Loss
                            </div> 
                            <FaRegArrowAltCircleRight className="arrow" />
                        </div>
                        </div>
                    </div>
                </div>
            </>
        
    );
};

export default homepage;
