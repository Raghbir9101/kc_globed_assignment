import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from "@/components/ui/sonner"
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
);