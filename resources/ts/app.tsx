import "../css/app.css";

import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    Navigate,
    ScrollRestoration,
} from "react-router-dom";
import { Helmet } from "react-helmet";

import { Navbar } from "./components";
import { CoursesList, Course, Enrol, NotFound } from "./screens";
import { AppContext } from "./context";

const queryClient = new QueryClient();

const el = document.getElementById("app");
const user = JSON.parse(el.dataset.user ?? null);
const tenant = JSON.parse(el.dataset.tenant);
const loginUrl = el.dataset.loginUrl;
const logoutUrl = el.dataset.logoutUrl;

const Root = (): JSX.Element => (
    <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={{ tenant, user, loginUrl, logoutUrl }}>
            <Helmet
                titleTemplate={`%s - ${tenant.name} | Powered by EduPay`}
                defaultTitle="Home"
            >
                <title>Home</title>
            </Helmet>
            <Navbar />

            <Outlet />

            <ScrollRestoration getKey={(location) => location.pathname} />
        </AppContext.Provider>
    </QueryClientProvider>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { index: true, element: <Navigate replace to="/courses" /> },
            {
                path: "categories/:categoryId",
                element: <CoursesList />,
            },
            { path: "courses", element: <CoursesList /> },
            {
                path: "courses/:courseId",
                element: <Course />,
            },
            { path: "courses/:courseId/enrol", element: <Enrol /> },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

createRoot(el).render(<RouterProvider router={router} />);
