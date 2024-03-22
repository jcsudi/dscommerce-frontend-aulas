

import { Navigate, Route, Routes } from 'react-router-dom';
import Catalog from './routes/ClientHome/Catalog';
import ProductDetails from './routes/ClientHome/ProductDetails';
import ClientHome from './routes/ClientHome';
import Cart from './routes/ClientHome/Cart';
import { useState } from 'react';
import { ContextCartCount } from './utils/context-cart';
import Login from './routes/ClientHome/Login';
import Admin from './routes/Admin';
import AdminHome from './routes/Admin/AdminHome';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import {history} from './utils/history';
import { PrivateRoute } from './components/PrivateRoute';

export default function App() {

  const [contextCartCount, setContextCartCount]=useState<number>(0);
  
  return (
  <ContextCartCount.Provider value={{contextCartCount, setContextCartCount}}>  
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<ClientHome />}>
          <Route index element={<Catalog />}></Route>
          <Route path='catalog' element={<Catalog />}></Route>
          <Route path='product-details/:productId' element={<ProductDetails />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='login' element={<Login />}></Route>
        </Route> 
        <Route path='/admin/' element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }>
          <Route index element={<AdminHome /> } />
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
      </HistoryRouter >
  </ContextCartCount.Provider>
  );
}
