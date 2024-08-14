import React from 'react';
import {Route, Routes } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';



import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Body from './Body/Body';
import Personal_Page from './Personal_Page/Personal_Page';
import SignUpForm from './SignUpForm/SignUpForm';

import './App.css'

function App() {
  return (
      <AuthProvider>
          <div className="application">
              <Header />
              <Routes>
                  <Route path="/" element={<Body />} />
                  <Route path="/login" element={<SignUpForm />} />
                  <Route path="/Personal_Page" element={<Personal_Page />} />
              </Routes>
              <Footer />
          </div>
      </AuthProvider>
  );
}

export default App;
