import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { theme, Fonts } from '@synthetixio/v3-theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);
const container = document.querySelector('#app');

const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
