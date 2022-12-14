import { FaceFrownIcon } from "@heroicons/react/24/outline";

import { Container } from "../../components";

export default () => (
    <Container className="mt-20 mb-8">
        <div className="flex items-start space-x-6">
            <FaceFrownIcon className="w-24 h-24 text-primary opacity-50" />
            <div>
                <h1 className="text-4xl font-bold text-primary mt-3">
                    Oops! Page not found!
                </h1>
                <p className="text-lg text-gray-600 mt-4">
                    Well, this is embarrassing! We can't find the page you're
                    looking for. Sorry about that!
                </p>
            </div>
        </div>
    </Container>
);
