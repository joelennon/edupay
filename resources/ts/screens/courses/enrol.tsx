import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import { Button, Container } from "../../components";
import { AppContext } from "../../context";

export default () => {
    const { user, rootBaseUrl } = useContext(AppContext);
    const { pathname } = useLocation();

    useEffect(() => {
        if (!user) {
            window.location = `${rootBaseUrl}/login?intended=${window.location.origin}${pathname}`;
        }
    }, []);

    async function enrol() {
        //
    }

    return (
        <Container className="mt-20 mb-8">
            <div className="my-8">
                <Helmet>
                    <title>Enrol</title>
                </Helmet>
                <div>Enrol</div>
                <Button text="Enrol" onClick={enrol} />
            </div>
        </Container>
    );
};
