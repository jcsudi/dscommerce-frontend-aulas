

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalog from './routes/ClientHome/Catalog';
import ProductDetails from './routes/ClientHome/ProductDetails';
import ClientHome from './routes/ClientHome';

export default function App() {
  
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<ClientHome />}>
    <Route index element={<Catalog />}></Route>
    <Route path='catalog' element={<Catalog />}></Route>
      <Route path='product-details' element={<ProductDetails />}></Route>
    </Route> 
  </Routes>
  </BrowserRouter>
  );
}