import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { FcBullish} from "react-icons/fc";

import { FaLuggageCart } from "react-icons/fa";

import { TiShoppingCart } from "react-icons/ti"; //Purchase 
import { BsCashCoin} from "react-icons/bs"; // Cashbook
import { FaSackDollar } from "react-icons/fa6"; // Expense
import { LiaFileInvoiceSolid} from "react-icons/lia"; //Quotation
import { BsMegaphone} from "react-icons/bs"; //Marketing
import { FcAdvertising} from "react-icons/fc"

 
export const SidebarData = [
  {
    title: "Home",
    path: "/homepage",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill style={{marginTop:"1.3vw"}}/>,
    iconOpened: <RiIcons.RiArrowUpSFill style={{marginTop:"1.3vw"}}/>,
  },
  {
    title: "Sales",
    icon: <FcBullish/>,
    iconClosed: <RiIcons.RiArrowDownSFill style={{marginTop:"1.3vw"}} />,
    iconOpened: <RiIcons.RiArrowUpSFill style={{marginTop:"1.3vw"}}/>,
 
    subNav: [
      {
        title: "Sales",
        path: "/salepage",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Product Sales Report",
        path: "/sales/productsalesreport",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Invoice Report",
        path: "/sales/invoicereport",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Customer Sales Report",
        path: "/sales/customersalesreport",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Sale Transaction Report",
        path: "/sales/saletransactionreport",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Stock",
    icon: <FaLuggageCart/>,
    iconClosed: <RiIcons.RiArrowDownSFill style={{marginTop:"1.3vw"}} />,
    iconOpened: <RiIcons.RiArrowUpSFill style={{marginTop:"1.3vw"}}/>,
    subNav: [
        {
          title: "Stock Report",
          path: "/stock/stockreport",
          icon: <IoIcons.IoIosPaper />,
        },
        {
          title: "Stock Operation",
          path: "/stock/stockoperation",
          icon: <IoIcons.IoIosPaper />,
        },
        {
            title: "Product List & Set Up",
            path: "/stock/productlistandsetup",
            icon: <IoIcons.IoIosPaper />,
        }
        
      ],
  },
  {
    title: "Purchase",
    icon: <TiShoppingCart />,
    iconClosed: <RiIcons.RiArrowDownSFill style={{marginTop:"1.3vw"}} />,
    iconOpened: <RiIcons.RiArrowUpSFill style={{marginTop:"1.3vw"}}/>,
 
    subNav: [
      {
        title: "Purchase",
        path: "/purchase",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Product Purchase Report",
        path: "/purchase/productpurchasereport",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Supplier Report",
        path: "/purchase/supplierreport",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Purchase Product Cost Report",
        path: "/purchase/purchaseproductcostreport",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Cash Book",
    icon: <BsCashCoin/>,
 
    iconClosed: <RiIcons.RiArrowDownSFill style={{marginTop:"1.3vw"}} />,
    iconOpened: <RiIcons.RiArrowUpSFill style={{marginTop:"1.3vw"}}/>,
 
    subNav: [
      {
        title: "Cash Book",
        path: "/cashbook",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Bank Transaction Report",
        path: "/cashbook/banktransactionreport",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Income & Expense",
    icon: <FaSackDollar />,
 
    iconClosed: <RiIcons.RiArrowDownSFill style={{marginTop:"1.3vw"}} />,
    iconOpened: <RiIcons.RiArrowUpSFill style={{marginTop:"1.3vw"}}/>,
 
    subNav: [
      {
        title: "Expense Report",
        path: "/expensereport",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Profit/Loss Report",
        path: "/Datebaseincome",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Investors Report",
        path: "/Investoropration",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Quotation",
    icon: <LiaFileInvoiceSolid />,
 
    iconClosed: <RiIcons.RiArrowDownSFill style={{marginTop:"1.3vw"}} />,
    iconOpened: <RiIcons.RiArrowUpSFill style={{marginTop:"1.3vw"}}/>,
 
    subNav: [
      {
        title: "Quotation",
        path: "/quotation",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Quotation Report",
        path: "/productsalereport",
        icon: <IoIcons.IoIosPaper />,
      }
    ],
  },
  {
    title: "Marketing and Collection",
    icon: <BsMegaphone />,
 
    iconClosed: <RiIcons.RiArrowDownSFill style={{marginTop:"1.3vw"}} />,
    iconOpened: <RiIcons.RiArrowUpSFill style={{marginTop:"1.3vw"}}/>,
 
    subNav: [
      {
        title: "Marketing and Collection",
        path: "/marketingsalesreport",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Employee Setup",
        path: "/employeesetup",
        icon: <IoIcons.IoIosPaper />,
      }
    ],
  },
];

 