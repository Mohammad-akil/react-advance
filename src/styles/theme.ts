// styles/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: process.env.NEXT_PUBLIC_PRIMARY_MAIN || '#0064f5',
      contrastText: process.env.NEXT_PUBLIC_PRIMARY_CONTRAST_TEXT || '#fff',
    },
    secondary: {
      main: process.env.NEXT_PUBLIC_SECONDARY_MAIN ||  '#000000',
      contrastText: process.env.NEXT_PUBLIC_SECONDARY_CONTRAST_TEXT ||  '#fff',
    },
    text: {
      primary: process.env.NEXT_PUBLIC_TEXT_PRIMARY ||  '#000000',
      secondary: process.env.NEXT_PUBLIC_TEXT_SECONDARY ||  '#6c6c6c',
    },
    background: {
      default: process.env.NEXT_PUBLIC_BACKGROUND_DEFAULT ||  '#fff',
      paper:  process.env.NEXT_PUBLIC_BACKGROUND_PAPAER || '#E3EEEE',
    },
  },
});

export default theme;
