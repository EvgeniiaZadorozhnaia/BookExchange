import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#1e1f23',
        color: 'black',   
      },
      a: {
        color: '#b9b5e1',
        _hover: {
          textDecoration: 'underline',
          color: '#b9b5e1',
        },
      },
      h1: {
        color: '#f8f9fb',
      },
      h2: {
        color: '#f8f9fb',
      },
      p: {
        color: 'black',
      },
    },
  },
});

export default theme;
