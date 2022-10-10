import ClipLoader from "react-spinners/ClipLoader";

interface LoadingProps {
    text?: string;
}

export default ({ text = "Loading..." }: LoadingProps): JSX.Element => (
    <div className="flex flex-col items-center justify-center">
        <ClipLoader aria-label={text} color="#0891b2" size={24} />

        <h3 className="mt-2 text-sm font-medium text-gray-900">{text}</h3>
    </div>
);
