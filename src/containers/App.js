import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

function App({ pushPath, children }) {
  return (
    <div>
      {children}
    </div>

  );
};

export default App
