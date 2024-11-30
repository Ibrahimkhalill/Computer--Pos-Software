// @ts-nocheck
import styled, { StyledComponent } from "styled-components";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import { AiOutlineLogout } from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import Merinasoft from "./merinasoft.png";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu"; 
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useAuth } from '../../components/Auth';  // Adjust the import path

import "./home_page.css";
import {
  FaChartBar,
  FaLuggageCart,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaChartArea } from "react-icons/fa";

import { TiShoppingCart } from "react-icons/ti";
import { FaSackDollar } from "react-icons/fa6";
import Dashboard from "../../components/Barchart.js";
interface SidebarNavProps {
  $sidebar: boolean;
}

const NavIcon = styled(Link)`
  margin-left: 1.4vw;
  font-size: 2rem;
  height: 2vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav: StyledComponent<"nav", any, SidebarNavProps> = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ 
// @ts-ignore
  $sidebar }) => ($sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

function Navbar() {
  const [time, setTime] = useState(new Date());
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();
  const {  logout } = useAuth();

  // const tick = () => {
  //   setTime(new Date());
  // };

  // useEffect(() => {
  //   setInterval(tick, 1000);
  // }, []);

  useEffect(() => {
    setSidebar(false);
  }, [location.pathname]);

  const showSidebar = () => setSidebar(!sidebar);
  const handlelogout =()=>{
    logout()
  }

  return (
    <>
      <nav className="main-nav">
        <div className="brand-merina">
          <IconContext.Provider value={{ color: "#fff" }}>
            <NavIcon to="#">
              <FaIcons.FaBars style={{marginLeft:"1vw"}}  onClick={showSidebar} />
            </NavIcon>
            <SidebarNav $sidebar={sidebar} className="sidebar">
              <SidebarWrap>
                <NavIcon to="#">
                 
                  <AiIcons.AiOutlineClose style={{marginLeft:"10vw"}} onClick={showSidebar} />
                </NavIcon>
                {SidebarData.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </SidebarWrap>
            </SidebarNav>
          </IconContext.Provider>
          <img src={Merinasoft} alt="" className="merinasoft-icon" />
          <div className="company">
            <span className="first_word large">M</span>
            <span className="first_word">ERINA</span>
            <span className="second_word large">S</span>
            <span className="second_word">OFT</span>
          </div>
        </div>
        <ul>
          <li>{time.toISOString().slice(0, 10)}</li>
          <li>{time.toLocaleTimeString()}</li>
          <li>
            <Link to={"/"}>
              <span className="logout_icon" onClick={handlelogout} >
                <AiOutlineLogout className="icon" /> Logout
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`home-page-container ${sidebar ? 'sidebar-open' : ''}`}>
        <div className="card_invisible row">
          <div className="card colmun">
            <div className="income">
              <FaChartLine className="font_size" style={{color:"#009CFF"}} />

              <div  >
                <div style={{color:"#757575"}}>Today Sales</div> <div style={{color:"#191C24",marginTop:".4vw" }}>4234 TK</div>
              </div>
            </div>

          </div>
          <div className="card colmun">
            <div className="income">
              <FaChartArea className="font_size" style={{color:"#009CFF"}} />

              <div  >
                <div style={{color:"#757575"}}>Today Income</div> <div style={{color:"#191C24",marginTop:".4vw" }}>3847 TK</div>
              </div>
            </div>

          </div>
          
          <div className="card colmun">
            <div className="qunatity">
              <FaLuggageCart className="font_size"  style={{color:"#009CFF"}}  />

              <div>
               Total Quantity
                <div style={{color:"#191C24",marginTop:".4vw" }}>800</div>
              </div>
            </div>

           
          </div>
          <div className="card colmun">
            <div className="income">
              <FaChartBar className="font_size" style={{color:"#009CFF"}} />

              <div  >
                <div style={{color:"#757575"}}>Total Sales</div> <div style={{color:"#191C24",marginTop:".4vw" }}>38747 TK</div>
              </div>
            </div>

          </div>

          <div className="card colmun">
            <TiShoppingCart className="font_size_1"  style={{color:"#009CFF"}} />
            <div className="purchase">
              <div>
                Total Purchase<div style={{color:"#191C24",marginTop:".4vw" }}>24453 Tk</div>
              </div>
            </div>

           
          </div>
          <div className="card colmun">
            <FaSackDollar className="font_size dollar_icon"  style={{color:"#009CFF"}} />
            <div className=" net_income">
              <div>
                Net Income<div style={{color:"#191C24",marginTop:".4vw" }}>57348 Tk</div>
              </div>
            </div>

            
          </div>
        </div>
        <div>
        <Dashboard />
      </div>
      </div>
    </>
  );
}

export default Navbar;
