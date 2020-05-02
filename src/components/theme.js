import { green} from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
    palette: {
      primary: {
       
        main: green[700],
      },
      secondary: {
       
        main: green[900],
      }
    },
  });
export default theme;