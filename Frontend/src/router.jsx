import {createBrowserRouter} from 'react-router-dom'
import HomePage from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import MainLayout from './Layout/MainLayout'


export const router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            }
        ]
    }
])