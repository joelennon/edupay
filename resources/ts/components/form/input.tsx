import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { createElement } from "react";

type IconTypeProps = {
    className: string;
    "aria-hidden": boolean;
};

type IconType = (props: IconTypeProps) => JSX.Element;

export type IconPosition = "left" | "right";

export type InputProps = {
    type?: string;
    name: string;
    id: string;
    label: string;
    hiddenLabel?: boolean;
    placeholder?: string;
    helpText?: string;
    hint?: string;
    icon?: IconType;
    iconPosition?: IconPosition;
    prefix?: string;
    suffix?: string;
    value: string;
    setValue: (value: string) => void;
    autoFocus?: boolean;
    autoComplete?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
};

type IconProps = {
    icon?: IconType;
};

type HelpTextProps = {
    helpText?: string;
    error?: string;
    id?: string;
};

type PreambleProps = {
    icon?: IconType;
    iconPosition?: IconPosition;
    prefix?: string;
};

type AppendixProps = {
    icon?: IconType;
    iconPosition?: IconPosition;
    error?: string;
    suffix?: string;
};

export default ({
    type = "text",
    name,
    id,
    label,
    hiddenLabel = false,
    placeholder,
    helpText,
    hint,
    icon,
    iconPosition = "left",
    prefix,
    suffix,
    value,
    setValue,
    autoFocus = false,
    autoComplete,
    error,
    disabled = false,
    className: cls,
}: InputProps): JSX.Element => {
    const labelClassName = clsx(
        !hiddenLabel && "block text-sm font-medium text-gray-700",
        hiddenLabel && "sr-only"
    );

    const className = clsx(
        "block w-full rounded-md sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500",
        icon && iconPosition === "left" && "pl-10",
        prefix && "sm:pl-16 pl-20",
        suffix && "sm:pr-16 pr-20",
        (error || (icon && iconPosition === "right")) && "pr-10",
        error &&
            "border-red-300 text-red-900 placeholder-red-900 focus:border-red-500 focus:outline-none focus:ring-red-500",
        !error && "border-gray-300 focus:border-primary focus:ring-primary",
        cls
    );

    const describedBy = error
        ? `${id}-error`
        : hint
        ? `${id}-hint`
        : helpText
        ? `${id}-helptext`
        : null;

    return (
        <div>
            <div className="flex justify-between">
                <label htmlFor={id} className={labelClassName}>
                    {label}
                </label>
                {hint && (
                    <span className="text-sm text-gray-500" id={`${id}-hint`}>
                        {hint}
                    </span>
                )}
            </div>
            <div className="mt-1 relative rounded-md shadow-sm">
                <Preamble
                    icon={icon}
                    iconPosition={iconPosition}
                    prefix={prefix}
                />
                <input
                    type={type}
                    name={name}
                    id={id}
                    className={className}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus={autoFocus}
                    aria-describedby={describedBy}
                    disabled={disabled}
                    autoComplete={autoComplete}
                />
                <Appendix
                    icon={icon}
                    iconPosition={iconPosition}
                    error={error}
                    suffix={suffix}
                />
            </div>
            {(error || helpText) && (
                <HelpText error={error} helpText={helpText} id={id} />
            )}
        </div>
    );
};

const HelpText = ({ error, helpText, id }: HelpTextProps): JSX.Element => {
    const className = clsx(
        "mt-2 text-sm",
        error && "text-red-600",
        !error && "text-gray-500"
    );

    return (
        <p className={className} id={error ? `${id}-error` : `${id}-helptext`}>
            {error || helpText}
        </p>
    );
};

const Preamble = ({
    icon,
    iconPosition,
    prefix,
}: PreambleProps): JSX.Element => {
    const className =
        "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3";

    if (icon && iconPosition === "left") {
        return (
            <div className={className}>
                <Icon icon={icon} />
            </div>
        );
    }

    if (prefix) {
        return (
            <div className={className}>
                <span className="text-gray-500 sm:text-sm">{prefix}</span>
            </div>
        );
    }

    return null;
};

const Appendix = ({
    icon,
    iconPosition,
    error,
    suffix,
}: AppendixProps): JSX.Element => {
    const className =
        "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3";

    if (error) {
        return (
            <div className={className}>
                <ExclamationCircleIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                />
            </div>
        );
    }

    if (icon && iconPosition === "right") {
        return (
            <div className={className}>
                <Icon icon={icon} />
            </div>
        );
    }

    if (suffix) {
        return (
            <div className={className}>
                <span className="text-gray-500 sm:text-sm">{suffix}</span>
            </div>
        );
    }

    return null;
};

const Icon = ({ icon }: IconProps): JSX.Element => {
    return createElement(icon, {
        className: "h-5 w-5 text-gray-400",
        "aria-hidden": true,
    });
};
