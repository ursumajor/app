import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <Auth0Provider
      domain="dev-lkde6yjhcf51358w.us.auth0.com"
      clientId="UuRiIRje2AMEami6ejnWd3LCHJ0Oxsr8"
      authorizationParams={{
      redirect_uri: "http://localhost:3000"
    }}
  >
      <App/>
  </Auth0Provider>
  </React.StrictMode>

);

