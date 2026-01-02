import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("domain:" + process.env.REACT_APP_AUTH0_DOMAIN)
console.log("Client id:" + process.env.REACT_APP_AUTH0_CLIENT_ID)
console.log("audience:" + process.env.REACT_APP_AUTH0_AUDIENCE)
root.render(
  <React.StrictMode>
  <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
      redirect_uri: "http://localhost:3000"
    }}
  >
      <App/>
  </Auth0Provider>
  </React.StrictMode>

);

