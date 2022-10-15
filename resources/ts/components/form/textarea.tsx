import clsx from "clsx";

export type TextAreaProps = {
    label: string;
    id: string;
    name: string;
    value: string;
    setValue: (value: string) => void;
    rows?: number;
    className?: string;
    placeholder?: string;
    autoFocus?: boolean;
};

export default ({
    label,
    id,
    name,
    value,
    setValue,
    rows = 4,
    className: cls,
    placeholder,
    autoFocus = false,
}: TextAreaProps): JSX.Element => {
    const className = clsx(
        "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm",
        cls
    );
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="mt-1">
                <textarea
                    rows={rows}
                    name={name}
                    id={id}
                    className={className}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                />
            </div>
        </div>
    );
};
