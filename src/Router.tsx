import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Coin from './routes/coin';
import Coins from './routes/Coins';

function Router() {
  return (
    <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
