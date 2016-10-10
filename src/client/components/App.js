import React from 'react'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

function App({ children }) {
  return (
    <Paper>
      <AppBar title='Universal Soldier'/>
      {children}
    </Paper>

  );
};

export default App
