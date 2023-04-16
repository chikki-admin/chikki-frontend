import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App, PaymentSuccessApp } from './App';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './components/login-component';
import SignUp from './components/signup-component';
import Dashboard from './components/seller-dashboard-component';
import AddFishPage from './components/add-fish-component';
import store from './redux/store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccessApp />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/sellerdashboard",
    element: <Dashboard />,
  }
  ,
  {
    path: "/addfish",
    element: <AddFishPage />,
  }

]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
