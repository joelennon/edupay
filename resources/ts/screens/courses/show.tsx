import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import axios from "axios";

import { Badge, Button, Container, Card, CardBody } from "../../components";
import { formatTime } from "../../helpers/date";
import { AppContext } from "../../context";

export default () => {
    const params = useParams();
    const courseId = params.courseId?.split("-").pop();

    const { data, isSuccess, isLoading, error } = useQuery(
        ["courses", "show", courseId],
        async ({ signal }) => {
            const { data } = await axios.get(`/api/courses/${courseId}`, {
                signal,
            });

            return data;
        }
    );

    return (
        <div>
            {isSuccess && (
                <img
                    src={data.bannerUrl}
                    className="h-64 mt-16 mb-8 w-full object-cover"
                />
            )}
            <Container>
                <BackButton />
                {isSuccess && (
                    <div className="my-8">
                        <Helmet>
                            <title>{data.title}</title>
                        </Helmet>
                        <div className="font-bold text-5xl mb-4 flex items-center space-x-4">
                            <span>{data.title}</span>
                            {data.new && (
                                <Badge
                                    text="NEW"
                                    color="indigo"
                                    className="text-lg px-4 py-1.5 font-semibold tracking-wider"
                                />
                            )}
                        </div>
                        {data.subtitle && (
                            <div className="text-2xl mb-4 text-primary">
                                {data.subtitle}
                            </div>
                        )}
                        <div className="flex items-start space-x-8">
                            <div className="flex-1">
                                <p className="text-lg text-gray-600 flex-1">
                                    {data.description ??
                                        "No description provided."}
                                </p>
                                <Enrol />
                            </div>
                            <Card className="w-64">
                                <CardBody>
                                    <dl className="space-y-8">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Course Code
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {data.code}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Day
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {data.day}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Start Time
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {formatTime(data.startTime)}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                End Time
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {formatTime(data.endTime)}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Duration
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {data.duration}
                                            </dd>
                                        </div>
                                        {data.tutor && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Tutor
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {data.tutor}
                                                </dd>
                                            </div>
                                        )}
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">
                                                Fee
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {data.fee}
                                            </dd>
                                        </div>
                                    </dl>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
};

const BackButton = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    function goBack() {
        if (state?.previous) {
            const { pathname, search } = state.previous;

            navigate(`${pathname}${search}`);
        } else {
            navigate("/courses");
        }
    }

    return <Button onClick={goBack} text="Back" icon={ChevronLeftIcon} />;
};

const Enrol = () => {
    const { user } = useContext(AppContext);

    return (
        <Link to="enrol">{user ? "Enrol" : "Login or Sign up to Enrol"}</Link>
    );
};
