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

import { Container, Navbar } from "./components";
import { CoursesList, Course } from "./screens";

const queryClient = new QueryClient();

const Root = (): JSX.Element => (
    <QueryClientProvider client={queryClient}>
        <Navbar />
        <Container className="mt-20">
            <Outlet />
        </Container>
        <ScrollRestoration getKey={(location) => location.pathname} />
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
        ],
    },
]);

createRoot(document.getElementById("app")).render(
    <RouterProvider router={router} />
);
