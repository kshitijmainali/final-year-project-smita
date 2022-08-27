import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Weather from './pages/weather';
import Auth from './pages/Auth';
import ProtectedRoute from './protectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/weather' element={<Weather />} />
        </Route>
        <Route path='/' element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
