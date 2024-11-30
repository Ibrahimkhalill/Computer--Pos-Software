import "./App.css";
import Sidebar from "./components/Sidebar.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./components/Auth.js";
import Sale from "./pages/sale/SalePage";
import HardwarePurchase from "./pages/hardware/Hardware_purchase.jsx";
import ProductSalesReportPage from "./pages/sale/ProductSalesReportPage";
import AddReport from "./pages/stock/AddReport.jsx";
import PersonalUtilizeReport from "./pages/stock/PersonalUtilizeReport.jsx";
import StockDamageReport from "./pages/stock/StockProductDamage.jsx";
import SaleTransactionReport from "./pages/sale/SaleTransactionReport";
import CustomerSaleReport from "./pages/sale/CustomerSaleReoports";
import CreateBankAccount from "./pages/cashbook/create_bank_account.jsx";
import StockReportHome from "./pages/stock/StockReportHome";
import SignUpPage from "./pages/loginAndSignup/SignUp";
import LoginPage from "./pages/loginAndSignup/SignIn";
import PurchaseReport from "./pages/purchase/PurchaseReport";
import SupplierReports from "./pages/purchase/SupplierReports";
import CashBook from "./pages/cashbook/CashBook";
import ExpenseReport from "./pages/expenseAndProfit/ExpenseReport";
import PurchaseOpration from "./pages/purchase/PurchaseOpration";
import ProductCostReport from "./pages/purchase/ProductCostReport";
import CashOpration from "./pages/cashbook/CashOpration";
import Withdraw from "./pages/cashbook/Withdraw";
import Deposit from "./pages/cashbook/Deposit";
import BankBalance from "./pages/cashbook/BankBalance";
import Quotation from "./pages/quotation/Quotation";
import ProductSaleReport from "./pages/quotation/ProductSaleReport";
import MarketingDueCollectionReport from "./pages/Marketing/MarketingDueCollectionReport";
import MarketingSaleReport from "./pages/Marketing/MarketingSaleReport";
import InvestorOperation from "./pages/expenseAndProfit/InvestorOperation";
import BankOpration from "./pages/cashbook/BnakOpration";
import ProductListSetup from "./pages/stock/ProductListSetup";
import StockOperation from "./pages/stock/StockOperation";
import DateBaseIncome from "./pages/expenseAndProfit/DateBaseIncome";
import ProductBaseIncome from "./pages/expenseAndProfit/ProductBaseIncome";
import EmployeeSetup from "./pages/EmployeeSetup/EmployeeSetup";
import InvestorIncome from "./pages/expenseAndProfit/InvestorIncome";
import ExpenseInput from "./pages/expenseAndProfit/ExpenseInput";
import Homepage from "./pages/home/HomePage";
import SaleInvoiceReport from "./pages/sale/SaleInvoiceReport";
import ViewStocks from "./sanitary/ViewStocks.jsx";
import Dashboard from "./components/Barchart.js";
import ExcelToJsonConverter from "./components/ExcelToJsonConverter.jsx";
import SuperShopProductListSetup from "./pages/stock/SuperShopProductListSetup.jsx";
// import SuperShopSale from "./pages/purchase/SuperShopSale.jsx";
import Login from "./pages/loginAndSignup/LoginPage.jsx";
import NewSalePage from "./pages/sale/NewSalePage.jsx"
function App() {
  // const location = useLocation();

  // // Function to check if the current location matches certain paths
  // const shouldShowSidebar = () => {
  //   const { pathname } = location;
  //   return !['/login', '/signup'].includes(pathname);
  // };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/homepage"
            element={<ProtectedRoute component={<Homepage />} />}
          />
          <Route path="/signup" element={<SignUpPage />}></Route>

          <Route
            path="/salepage"
            element={
              <div>
                <Sidebar pageName="Salepage" />

                <ProtectedRoute component={<Sale />} />
              </div>
            }
          ></Route>
          <Route
            path="/new_salepage"
            element={
              <div>
                <Sidebar pageName="Salepage" />

                <ProtectedRoute component={<NewSalePage />} />
              </div>
            }
          ></Route>
          <Route
            path="/sales/productsalesreport"
            element={
              <div>
                <Sidebar pageName="Product Sale Report" />
                <ProtectedRoute component={<ProductSalesReportPage />} />
              </div>
            }
          ></Route>
          <Route
            path="/sales/invoicereport"
            element={
              <div>
                <Sidebar pageName="salepage" />
                <ProtectedRoute component={<SaleInvoiceReport />} />
              </div>
            }
          ></Route>
          <Route
            path="/sales/customersalesreport"
            element={
              <div>
                <Sidebar pageName="Customer Sale Report" />
                <ProtectedRoute component={<CustomerSaleReport />} />
              </div>
            }
          ></Route>
          <Route
            path="/sales/saletransactionreport"
            element={
              <div>
                <Sidebar pageName="Sale Transaction Report" />
                <ProtectedRoute component={<SaleTransactionReport />} />
              </div>
            }
          ></Route>

          <Route
            path="/stock/stockreport"
            element={
              <div>
                <Sidebar pageName="Stock Report" />
                <ProtectedRoute component={<StockReportHome />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/stock/stockoperation"
            element={
              <div>
                <Sidebar pageName="Stock Operation" />
                <ProtectedRoute component={<StockOperation />} />{" "}
              </div>
            }
          ></Route>
          <Route
            path="/stock/productlistandsetup"
            element={
              <div>
                <Sidebar pageName="Product List and Set Up" />
                <ProtectedRoute component={<ProductListSetup />} />{" "}
              </div>
            }
          ></Route>
          <Route
            path="/stock/supershopproductlistandsetup"
            element={
              <div>
                <Sidebar pageName="Product List and Set Up" />
                <ProtectedRoute component={<SuperShopProductListSetup />} />
              </div>
            }
          ></Route>

          <Route
            path="/purchase"
            element={
              <div>
                <Sidebar pageName="Purchase Operation" />
                <ProtectedRoute component={<PurchaseOpration />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/purchase/productpurchasereport"
            element={
              <div>
                <Sidebar pageName="Purchase Report" />
                <ProtectedRoute component={<PurchaseReport />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/purchase/supplierreport"
            element={
              <div>
                <Sidebar pageName="Supplier Report" />
                <ProtectedRoute component={<SupplierReports />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/purchase/purchaseproductcostreport"
            element={
              <div>
                <Sidebar pageName="Product Cost Report" />
                <ProtectedRoute component={<ProductCostReport />} />
              </div>
            }
          ></Route>

          <Route
            path="/cashbook"
            element={
              <div>
                <Sidebar pageName="Cash Book" />
                <ProtectedRoute component={<CashBook />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/Cashopration"
            element={
              <div>
                <Sidebar pageName="Cash Operation" />
                <ProtectedRoute component={<CashOpration />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/cashbook/banktransactionreport"
            element={
              <div>
                <Sidebar pageName="Bank Transaction report" />
                <ProtectedRoute component={<BankOpration />} />{" "}
              </div>
            }
          ></Route>
          <Route
            path="/cashbook/createbankaccount"
            element={
              <div>
                <Sidebar pageName="Create Bank Account" />
                <ProtectedRoute component={<CreateBankAccount />} />
              </div>
            }
          ></Route>
          <Route
            path="/cashbook/banktransactionreport/withdraw"
            element={
              <div>
                <Sidebar pageName="Bank Transaction report" />
                <ProtectedRoute component={<Withdraw />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/cashbook/banktransactionreport/deposit"
            element={
              <div>
                <Sidebar pageName="Bank Transaction report" />
                <ProtectedRoute component={<Deposit />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/cashbook/banktransactionreport/bankbalance"
            element={
              <div>
                <Sidebar pageName="Bank Transaction report" />
                <ProtectedRoute component={<BankBalance />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/Expensereport"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<ExpenseReport />} />{" "}
              </div>
            }
          ></Route>
          <Route
            path="/Expenseinput"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<ExpenseInput />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/Datebaseincome"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<DateBaseIncome />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/Productbaseincome"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<ProductBaseIncome />} />
              </div>
            }
          ></Route>

          <Route
            path="/Investoropration"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<InvestorOperation />} />
              </div>
            }
          ></Route>

          <Route
            path="/Investorincome"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<InvestorIncome />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/quotation"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<Quotation />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/productsalereport"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<ProductSaleReport />} />
              </div>
            }
          ></Route>

          <Route
            path="/marketingsalesreport"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<MarketingSaleReport />} />
              </div>
            }
          ></Route>

          <Route
            path="/duecollectionreport"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<MarketingDueCollectionReport />} />
              </div>
            }
          ></Route>

          <Route
            path="/employeesetup"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<EmployeeSetup />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/stock/stock_operation/add_report"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<AddReport />} />{" "}
              </div>
            }
          ></Route>

          <Route
            path="/stock/stock_operation/personal_utilize_report"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<PersonalUtilizeReport />} />
              </div>
            }
          ></Route>
          <Route
            path="/stock/stock_operation/Damagereport"
            element={
              <div>
                <Sidebar />
                <ProtectedRoute component={<StockDamageReport />} />
              </div>
            }
          ></Route>
          <Route path="/view-stock" element={<ViewStocks />}></Route>
          <Route
            path="/HardwarePurchase"
            element={
              <div>
                <Sidebar />
                <HardwarePurchase />{" "}
              </div>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <div>
                <Sidebar pageName="Dashboard" />
                <ProtectedRoute component={<Dashboard />} />{" "}
              </div>
            }
          ></Route>
          <Route
            path="/excel_to_json_converter"
            element={
              <div>
                <Sidebar pageName="Excel To Json Converter" />
                <ProtectedRoute component={<ExcelToJsonConverter />} />
              </div>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
const ProtectedRoute = ({ component }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? component : <Navigate to="/" replace />;
};
export default App;
