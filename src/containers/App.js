import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

function App({ pushPath, children }) {
  return (
    <div>
      <Header />

      <main>
        {children}
      </main>

      <Footer />
    </div>

  );
};

export default App
