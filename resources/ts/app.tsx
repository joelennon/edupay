import "../css/app.css";
import { useState } from "react";
import { createRoot, Root } from "react-dom/client";

import { Container } from "./components";
import { Input } from "./components/form";
import { AtSymbolIcon, EnvelopeIcon } from "@heroicons/react/20/solid";

const App = (): JSX.Element => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("password");
    const [token, setToken] = useState("");
    const [url, setUrl] = useState("");

    return (
        <Container className="pt-8 divide-y-4" innerClassName="space-y-8">
            <Input
                name="name"
                label="Name"
                id="name"
                value={name}
                setValue={setName}
                autoFocus
                placeholder="Enter your name"
                helpText="A field to let you enter your name..."
                error="This name is not valid!"
            />

            <Input
                name="email"
                label="Email"
                id="email"
                value={email}
                setValue={setEmail}
                icon={EnvelopeIcon}
                placeholder="Enter your email"
                helpText="Please enter a valid email address..."
            />

            <Input
                type="password"
                name="password"
                label="Password"
                id="password"
                value={password}
                setValue={setPassword}
                placeholder="Enter your password"
                disabled
            />

            <Input
                name="token"
                hiddenLabel
                label="Token"
                id="token"
                value={token}
                setValue={setToken}
                placeholder="Enter your secret token"
            />

            <Input
                name="username"
                label="Username"
                id="username"
                value={username}
                setValue={setUsername}
                icon={AtSymbolIcon}
                iconPosition="right"
                hint="Optional"
                helpText="You don't have to enter a username"
            />

            <Input
                name="url"
                label="URL"
                id="url"
                value={url}
                setValue={setUrl}
                prefix="https://"
                suffix=".com"
            />
        </Container>
    );
};

const el: Element = document.getElementById("app");
const root: Root = createRoot(el);

root.render(<App />);
