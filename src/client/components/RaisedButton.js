import React from 'react'
import MaterialUIRaisedButton from 'material-ui/RaisedButton'
import { white, grey200, grey800 } from 'material-ui/styles/colors'


export default function RaisedButton (props) {
  return (
    <MaterialUIRaisedButton
      labelColor={white}
      disabledLabelColor={grey200}
      disabledBackgroundColor={grey800}
      onTouchTap={e => {
        e.persist()
        setTimeout(() => {
          e.target.blur()
          console.log('blur')
        }, 500)
      }}
      {...props}
    />
  )
}
