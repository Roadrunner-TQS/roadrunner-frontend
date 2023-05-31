import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "react-query";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Error404} from "@/pages/error404";
import {Flowbite} from "flowbite-react";
import {PickUpPoints} from "@/pages/pickUpPoints";
import {Shops} from "@/pages/shops";
import {Packages} from "@/pages/packages";
import {Statistics} from "@/pages/statistics";
import {Package} from "@/pages/package";
import {SignUp} from "@/pages/signUp";
import {SignIn} from "@/pages/signIn";
import {AuthProvider} from "@/contexts/auth";
import {ProtectedRoute} from "@/components/protectedRoute";

const queryClient = new QueryClient()
const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={"/packages"}/>,
        errorElement: <Error404/>,
    },
    {
        path: '/pickups',
        element: <ProtectedRoute page={PickUpPoints} authorized={['ROLE_ADMIN', 'ROLE_PARTNER']}/>,
    },
    {
        path: '/shops',
        element: <ProtectedRoute page={Shops} authorized={['ROLE_ADMIN']}/>,
    },
    {
        path: '/packages',
        element: <ProtectedRoute page={Packages} authorized={['ROLE_ADMIN', 'ROLE_PARTNER']}/>,
    },
    {
        path: '/packages/:id',
        element: <ProtectedRoute page={Package} authorized={['ROLE_ADMIN', 'ROLE_PARTNER']}/>
    },
    {
        path: '/statistics',
        element: <Statistics/>
    },
    {
        path: '/signup',
        element: <SignUp/>,
    },
    {
        path: '/signin',
        element: <SignIn/>,
    },
    {
        path: '*',
        element: <Error404/>,
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Flowbite>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RouterProvider router={router}/>
                </AuthProvider>
            </QueryClientProvider>
        </Flowbite>
    </React.StrictMode>
)
