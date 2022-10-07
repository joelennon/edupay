import "../css/app.css";

import { createRoot, Root } from "react-dom/client";

import { Container, Navbar } from "./components";

type User = {
    id: number;
    name: string;
    email: string;
};

type AppProps = {
    user: User;
};

const App = ({ user }: AppProps): JSX.Element => (
    <>
        <Navbar />
        <Container>Hello, {user.name}!</Container>
    </>
);

const el: HTMLElement = document.getElementById("app");
const user = JSON.parse(el.dataset.user);
const root: Root = createRoot(el);

root.render(<App user={user} />);
