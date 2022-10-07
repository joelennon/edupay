import "../css/app.css";

import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { Container, Navbar } from "./components";
import { CoursesList } from "./screens";

const queryClient = new QueryClient();

const Root = (): JSX.Element => (
    <QueryClientProvider client={queryClient}>
        <Navbar />
        <Container className="mt-20">
            <Outlet />
        </Container>
    </QueryClientProvider>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { index: true, element: <CoursesList /> },
            {
                path: "categories/:categoryId",
                element: <CoursesList />,
            },
        ],
    },
]);

createRoot(document.getElementById("app")).render(
    <RouterProvider router={router} />
);
