import { createRoot } from 'react-dom/client';
import './main.scss';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './components/Store/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
