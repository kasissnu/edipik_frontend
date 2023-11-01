import { createTheme, ThemeProvider } from '@mui/material';
import { RouterProvider } from "react-router-dom";
import router from './config/router';
import { NotificationProvider } from './utils/Hooks/useNotification';
const colors = require('./utils/colors');

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[950],
    },
    secondary: {
      main: colors.secondary[500],
    },
    accent: {
      main: colors.secondary[500],
      dark: colors.secondary[700]
    }
  },
  typography: {
    letterSpacing: 5,
    fontSize: 13,
    fontWeightBold: 800,
    fontFamily: [
      "Montserrat"
    ].join(','),
  },
});

function App() {
  return (
    <>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </NotificationProvider>
    </>
  );
}

export default App;
