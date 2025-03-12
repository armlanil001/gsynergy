import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Stores from './pages/Stores';
import Sku from './pages/Sku';
import Planning from './pages/Planning';
import Charts from './pages/Charts';
import AgGridtest from './pages/AgGridtest';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8 bg-gray-100">
            <Routes>
              <Route path="/" element={<Stores />} />
              <Route path="/skus" element={<Sku />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/grid" element={<AgGridtest />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;