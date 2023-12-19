import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListManufacturer from './ListManufacturers';
import CreateManufacturer from './CreateManufacturer';
import ListModels from './ListModels';
import CreateModel from './CreateModel';
import ListAutomobile from './ListAutomobile';
import CreateAutomobile from './CreateAutomobile';

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



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
