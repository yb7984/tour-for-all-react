import { render } from '@testing-library/react';
import App from './App';

import Loading from './Loading';

import '@fontsource/roboto';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistedStore } from "./store";
import '@fontsource/roboto';

test('renders', () => {
  render(
    <Provider store={store}>
      <PersistGate loading={<Loading open={true} />} persistor={persistedStore}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
});
