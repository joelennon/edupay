import "../css/app.css";
import { useState } from "react";
import { createRoot, Root } from "react-dom/client";

import { Container, Navbar } from "./components";
import { TextArea } from "./components/form";

const App = (): JSX.Element => {
    const [body, setBody] = useState("");

    return (
        <>
            <Navbar />
            <Container className="pt-8 divide-y-4" innerClassName="space-y-8">
                <TextArea
                    id="body"
                    name="body"
                    label="Body"
                    value={body}
                    setValue={setBody}
                    placeholder="Test..."
                    autoFocus
                />
            </Container>
        </>
    );
};

const el: Element = document.getElementById("app");
const root: Root = createRoot(el);

root.render(<App />);
