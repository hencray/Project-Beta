import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListManufacturer from './ListManufacturers';
import CreateManufacturer from './CreateManufacturer';
import ListModels from './ListModels';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
