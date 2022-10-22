import axios from "axios";
import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";

import { Button, Container } from "../../components";
import { AppContext } from "../../context";

export default () => {
    const { user, loginUrl } = useContext(AppContext);
    const { pathname } = useLocation();
    const params = useParams();
    const courseId = params.courseId?.split("-").pop();

    useEffect(() => {
        if (!user) {
            window.location = `${loginUrl}?intended=${window.location.origin}${pathname}`;
        }
    }, []);

    async function enrol() {
        const { data } = await axios.post(
            `/api/courses/${courseId}/enrolments`,
            {}
        );

        console.log(data);
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
