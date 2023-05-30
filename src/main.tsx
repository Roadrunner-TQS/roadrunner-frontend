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
import {ReactQueryDevtools} from "react-query/devtools";
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
        element: <ProtectedRoute page={PickUpPoints}/>,
    },
    {
        path: '/shops',
        element: <Shops/>,
    },
    {
        path: '/packages',
        element: <ProtectedRoute page={Packages}/>,
    },
    {
        path: '/packages/:id',
        element: <Package/>
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
                    <ReactQueryDevtools/>
                </AuthProvider>
            </QueryClientProvider>
        </Flowbite>
    </React.StrictMode>
)
