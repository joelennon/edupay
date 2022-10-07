import { Switch } from "@headlessui/react";
import clsx from "clsx";

export type ToggleLabelPosition = "left" | "right";

export type ToggleFieldProps = {
    enabled: boolean;
    setEnabled: (checked: boolean) => void;
    icon?: boolean;
    label: string;
    labelPosition?: ToggleLabelPosition;
    description?: string;
};

export type ToggleProps = {
    enabled: boolean;
    setEnabled: (checked: boolean) => void;
    icon?: boolean;
};

export const ToggleField = ({
    enabled,
    setEnabled,
    icon = false,
    label,
    description,
    labelPosition = "left",
}: ToggleFieldProps): JSX.Element => {
    const className = clsx(
        "flex items-center",
        labelPosition === "left" && "justify-between"
    );

    return (
        <Switch.Group as="div" className={className}>
            {labelPosition === "left" && (
                <span className="flex flex-grow flex-col">
                    <Switch.Label
                        as="span"
                        className="text-sm font-medium text-gray-900"
                        passive
                    >
                        {label}
                    </Switch.Label>
                    {description && (
                        <Switch.Description
                            as="span"
                            className="text-sm text-gray-500"
                        >
                            {description}
                        </Switch.Description>
                    )}
                </span>
            )}
            <Toggle enabled={enabled} setEnabled={setEnabled} icon={icon} />
            {labelPosition === "right" && (
                <span className="flex flex-grow flex-col ml-3">
                    <Switch.Label
                        as="span"
                        className="text-sm font-medium text-gray-900"
                        passive
                    >
                        {label}
                    </Switch.Label>
                    {description && (
                        <Switch.Description
                            as="span"
                            className="text-sm text-gray-500"
                        >
                            {description}
                        </Switch.Description>
                    )}
                </span>
            )}
        </Switch.Group>
    );
};

export const Toggle = ({
    enabled,
    setEnabled,
    icon = false,
}: ToggleProps): JSX.Element => (
    <Switch
        checked={enabled}
        onChange={setEnabled}
        className={clsx(
            enabled ? "bg-cyan-600" : "bg-gray-200",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        )}
    >
        <span className="sr-only">Use setting</span>
        <span
            aria-hidden="true"
            className={clsx(
                enabled ? "translate-x-5" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
        >
            {icon && <Icon enabled={enabled} />}
        </span>
    </Switch>
);

export const ShortToggle = ({
    enabled,
    setEnabled,
    icon = false,
}: ToggleProps): JSX.Element => (
    <Switch
        checked={enabled}
        onChange={setEnabled}
        className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
    >
        <span className="sr-only">Use setting</span>
        <span
            aria-hidden="true"
            className="pointer-events-none absolute h-full w-full rounded-md bg-white"
        />
        <span
            aria-hidden="true"
            className={clsx(
                enabled ? "bg-cyan-600" : "bg-gray-200",
                "pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out"
            )}
        />
        <span
            aria-hidden="true"
            className={clsx(
                enabled ? "translate-x-5" : "translate-x-0",
                "pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out"
            )}
        >
            {icon && <Icon enabled={enabled} />}
        </span>
    </Switch>
);

type IconProps = {
    enabled: boolean;
};

const Icon = ({ enabled }: IconProps): JSX.Element => (
    <>
        <span
            className={clsx(
                enabled
                    ? "opacity-0 ease-out duration-100"
                    : "opacity-100 ease-in duration-200",
                "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
        >
            <svg
                className="h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 12 12"
            >
                <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
        <span
            className={clsx(
                enabled
                    ? "opacity-100 ease-in duration-200"
                    : "opacity-0 ease-out duration-100",
                "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
        >
            <svg
                className="h-3 w-3 text-cyan-600"
                fill="currentColor"
                viewBox="0 0 12 12"
            >
                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
        </span>
    </>
);
