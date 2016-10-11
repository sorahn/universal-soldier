import {
  white,
  grey50,
  grey600,
  grey900,
  lightBlue800,
  pinkA100,
  pinkA200,
  pinkA400,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: lightBlue800,
    primary2Color: lightBlue800,
    primary3Color: grey600,
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: white,
    alternateTextColor: grey50,
    canvasColor: grey900,
    borderColor: fade(white, 0.3),
    disabledColor: fade(white, 0.6),
    pickerHeaderColor: fade(white, 0.12),
    clockCircleColor: fade(white, 0.12),
  },
}
