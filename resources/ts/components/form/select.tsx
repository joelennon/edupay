import { Fragment, ReactNode } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Avatar from "../avatar";

export type SelectCheckPosition = "left" | "right";

export type SelectProps = {
    label: string;
    selected: Object | null;
    setSelected: (value: Object | null) => void;
    displayProp?: string;
    secondaryDisplayProp?: string;
    avatarProp?: string;
    statusProp?: string;
    children: ReactNode;
};

export type OptionProps = {
    option: Object;
    displayProp?: string;
    secondaryDisplayProp?: string;
    avatarProp?: string;
    statusProp?: string;
    helpTextProp?: string;
    checkPosition?: SelectCheckPosition;
};

type StatusProps = {
    color: string;
};

export type NativeSelectProps = {
    label: string;
    name: string;
    id: string;
    value: string | null;
    setValue: (value: string | null) => void;
    children: ReactNode;
};

export type NativeOptionProps = {
    option: Object;
    valueProp?: string;
    displayProp?: string;
};

export const Select = ({
    label,
    selected,
    setSelected,
    displayProp = "name",
    secondaryDisplayProp,
    avatarProp,
    statusProp,
    children,
}: SelectProps): JSX.Element => {
    console.log(selected);
    return (
        <div>
            <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block text-sm font-medium text-gray-700">
                            {label}
                        </Listbox.Label>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm">
                                <span className="flex w-full truncate items-center">
                                    {statusProp && selected[statusProp] && (
                                        <Status color={selected[statusProp]} />
                                    )}
                                    {avatarProp && selected[avatarProp] && (
                                        <Avatar
                                            src={selected[avatarProp]}
                                            size={6}
                                            className="mr-3 flex-shrink-0"
                                        />
                                    )}
                                    <span className="truncate">
                                        {selected[displayProp]}
                                    </span>
                                    {secondaryDisplayProp && (
                                        <span className="ml-2 truncate text-gray-500">
                                            {selected[secondaryDisplayProp]}
                                        </span>
                                    )}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {children}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
};

export const Option = ({
    option,
    displayProp = "name",
    checkPosition = "right",
    secondaryDisplayProp,
    avatarProp,
    statusProp,
    helpTextProp,
}: OptionProps): JSX.Element => {
    return (
        <Listbox.Option
            className={({ active }) =>
                clsx(
                    active ? "text-white bg-primary" : "text-gray-900",
                    checkPosition === "right" && "pl-3 pr-9",
                    checkPosition === "left" && "pl-8 pr-4",
                    "relative cursor-default select-none py-2"
                )
            }
            value={option}
        >
            {({ selected, active }) => (
                <div className="flex flex-col">
                    <div>
                        <div className="flex items-center">
                            {statusProp && option[statusProp] && (
                                <Status color={option[statusProp]} />
                            )}
                            {avatarProp && option[avatarProp] && (
                                <Avatar
                                    src={option[avatarProp]}
                                    className="flex-shrink-0 mr-3"
                                    size={6}
                                />
                            )}
                            <span
                                className={clsx(
                                    selected ? "font-semibold" : "font-normal",
                                    "truncate"
                                )}
                            >
                                {option[displayProp]}
                            </span>
                            <span
                                className={clsx(
                                    active
                                        ? "text-primary/25"
                                        : "text-gray-500",
                                    "ml-2 truncate"
                                )}
                            >
                                {option[secondaryDisplayProp]}
                            </span>
                        </div>

                        {selected ? (
                            <span
                                className={clsx(
                                    active ? "text-white" : "text-primary",
                                    checkPosition === "right" && "right-0 pr-4",
                                    checkPosition === "left" && "left-0 pl-1.5",
                                    "absolute inset-y-0 flex items-start mt-2.5"
                                )}
                            >
                                <CheckIcon
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                            </span>
                        ) : null}
                    </div>
                    {helpTextProp && option[helpTextProp] && (
                        <p
                            className={clsx(
                                active ? "text-primary/25" : "text-gray-500",
                                "mt-2"
                            )}
                        >
                            {option[helpTextProp]}
                        </p>
                    )}
                </div>
            )}
        </Listbox.Option>
    );
};

const Status = ({ color }: StatusProps): JSX.Element => {
    const className = clsx(
        "inline-block h-2 w-2 flex-shrink-0 rounded-full mr-3",
        color === "green" && "bg-green-400",
        color === "gray" && "bg-gray-200",
        color === "red" && "bg-red-400",
        color === "orange" && "bg-orange-400",
        color === "blue" && "bg-blue-400",
        color === "purple" && "bg-purple-400",
        color === "cyan" && "bg-cyan-400",
        color === "pink" && "bg-pink-400",
        color === "yellow" && "bg-yellow-500"
    );

    return <span aria-label={`Status ${color}`} className={className} />;
};

export const NativeSelect = ({
    label,
    name,
    id,
    value,
    setValue,
    children,
}: NativeSelectProps): JSX.Element => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <select
                id={id}
                name={name}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                {children}
            </select>
        </div>
    );
};

export const NativeOption = ({
    option,
    valueProp = "id",
    displayProp = "name",
}) => {
    return <option value={option[valueProp]}>{option[displayProp]}</option>;
};
