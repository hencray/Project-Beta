import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListManufacturer from './ListManufacturers';
import CreateManufacturer from './CreateManufacturer';
import ListModels from './ListModels';
import CreateModel from './CreateModel';
import ListAutomobile from './ListAutomobile';
import CreateAutomobile from './CreateAutomobile';
import CreateSalesPerson from './CreateSalesPerson';
import CreateCustomer from './CreateCustomer';
import CreateSale from './CreateSale'
import ListSalesPerson from './ListSalesPerson';
import ListCustomers from './ListCustomers';
import ListSales from './ListSales';
import SalesPersonHistory from './SalesPersonHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers/" element={<ListManufacturer />} />
          <Route path="/manufacturers/create" element={<CreateManufacturer />} />
          <Route path="/models/" element={<ListModels />} />
          <Route path="/models/create" element={<CreateModel />} />
          <Route path="/automobiles" element={<ListAutomobile/>} />
          <Route path="/automobiles/create" element={<CreateAutomobile />} />
          <Route path="/salesperson" element={<ListSalesPerson />} />
          <Route path="/salesperson/create" element={<CreateSalesPerson />} />
          <Route path="/customer" element={<ListCustomers />} />
          <Route path="/customer/create" element={<CreateCustomer />} />
          <Route path="/sale" element={<ListSales />} />
          <Route path="/sale/create" element={<CreateSale />} />
          <Route path="/sale/history" element={<SalesPersonHistory />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
