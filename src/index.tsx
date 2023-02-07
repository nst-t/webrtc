import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Client } from './Client';

const client = new Client();

export const ClientContext = createContext<Client>(client);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ClientContext.Provider value={client}>
    <App />
  </ClientContext.Provider>
);
