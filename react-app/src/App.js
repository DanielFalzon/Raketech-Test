import React from 'react';
import Header from './components/Header.js';
import ContactUs from './views/ContactUs.js'

import './App.scss';

function App() {
  return (
    <div>
      {/* Implement react-router-dom as per description in header.js*/}
       <Header />
       <ContactUs />
    </div>
  );
}

export default App;
