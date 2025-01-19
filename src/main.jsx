import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import AuthProvider from './providers/AuthProvider'
import PrivateRoute from './routes/PrivateRoute'
import AllProperties from './pages/AllProperties'
import MyProfile from './pages/Dashboard/User/MyProfile'
import Wishlist from './pages/Dashboard/User/Wishlist'
import PropertyBought from './pages/Dashboard/User/PropertyBought'
import MyReviews from './pages/Dashboard/User/MyReviews'
import MakeOffer from './pages/Dashboard/User/MakeOffer'
import PropertyDetails from './pages/PropertyDetails'
import ManageUsers from'./pages/Dashboard/Admin/ManageUsers'
import ManageReviews from './pages/Dashboard/Admin/ManageReviews'
import ManageProperties from './pages/Dashboard/Admin/ManageProperties'
import AddProperty from './pages/Dashboard/Agent/AddProperty'
import MyAddedProperties from './pages/Dashboard/Agent/MyAddedProperties'
import MySoldProperties from './pages/Dashboard/Agent/MySoldProperties'
import RequestedProperties from './pages/Dashboard/Agent/RequestedProperties'
import UpdateProperty from './pages/Dashboard/Agent/UpdateProperty'


import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Dashboard from './pages/Dashboard/User/UserDashboard'
import AdminRoutes from './routes/AdminRoutes'
import AgentRoutes from './routes/AgentRoutes'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path:'/all-properties',
        element: <PrivateRoute>
        <AllProperties /> 
        </PrivateRoute>
      },
      {
        path: '/property/:id',
        element: <PrivateRoute>
          <PropertyDetails />
        </PrivateRoute>
      },
      {
        path:'/dashboard',
        element: <PrivateRoute>
        <Dashboard/>
        </PrivateRoute>,
        children:[
         
          {
            path:'profile',
            element:<MyProfile />
          },
          {
            path: 'wishlist',
            element: <Wishlist />

          },
          {
            path: 'property-bought',
            element: <PropertyBought />
          },
          {
            path: 'my-reviews',
            element: <MyReviews />
          },
          {
            path:'manage-properties',
            element:<ManageProperties />
          },
          {
            path: 'manage-users',
            element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
          },
          {
            path: 'add-property',
            element: <AddProperty />
          },
          {
            path: 'my-properties',
            element: <AgentRoutes><MyAddedProperties/></AgentRoutes>
          },
          {
            path:'my-sold-properties',
            element:<MySoldProperties />
          },
          {
            path:'requested-properties',
            element:<RequestedProperties />
          },
          {
            path:'manage-reviews',
            element:<ManageReviews />
          },
          {
            path:'update-property',
            element:<UpdateProperty></UpdateProperty>
          }
        ]
      },
    ]
  }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)
