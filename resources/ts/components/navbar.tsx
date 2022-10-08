import { Fragment, createElement, ReactNode } from "react";
import { NavLink, Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import { Avatar } from "./";

const navigation = [
    { name: "Courses", uri: "/courses" },
    { name: "Teachers", uri: "/teachers" },
    { name: "Students", uri: "/students" },
    { name: "Payments", uri: "/payments" },
    { name: "Analytics", uri: "/analytics" },
];

type NavbarItem = {
    name: string;
    uri: string;
    current: boolean;
};

type NavbarItemProps = {
    item: NavbarItem;
    isDisclosure?: boolean;
};

type NavbarButtonProps = {
    label: string;
    icon: IconType;
};

type NavbarUserMenuItemProps = {
    href?: string;
    children: ReactNode;
};

type MobileMenuButtonProps = {
    open: boolean;
};

type IconTypeProps = {
    className: string;
    "aria-hidden": boolean;
};

type IconType = (props: IconTypeProps) => JSX.Element;

type NavbarButtonIconProps = {
    icon: IconType;
};

export const Navbar = (): JSX.Element => (
    <Disclosure as="nav" className="bg-gray-800 fixed inset-x-0 top-0 z-10">
        {({ open }) => (
            <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <MobileMenuButton open={open} />
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <NavbarLogo />
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <NavbarItem
                                            key={item.name}
                                            item={item}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <NavbarButton
                                label="View notifications"
                                icon={BellIcon}
                            />

                            <NavbarUserMenu />
                        </div>
                    </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigation.map((item) => (
                            <NavbarItem
                                key={item.name}
                                item={item}
                                isDisclosure
                            />
                        ))}
                    </div>
                </Disclosure.Panel>
            </>
        )}
    </Disclosure>
);

const MobileMenuButton = ({ open }: MobileMenuButtonProps): JSX.Element => (
    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
        <span className="sr-only">Open main menu</span>
        {open ? (
            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
        ) : (
            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
        )}
    </Disclosure.Button>
);

const NavbarLogo = () => (
    <Link to="/" className="flex flex-shrink-0 items-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            height="100"
            width="100"
            className="h-8 w-auto block"
        >
            <path
                fill="#2dd4bf"
                d="M8.44328 10.5856C11.1925 10.5856 13.4212 8.35689 13.4212 5.60764C13.4212 2.8584 11.1925 0.6297 8.44328 0.6297C5.69403 0.6297 3.46533 2.8584 3.46533 5.60764C3.46533 8.35689 5.69403 10.5856 8.44328 10.5856Z"
            ></path>
            <path
                fill="#0e7490"
                fillRule="evenodd"
                d="M9.22858 10.524C8.97277 10.5645 8.71048 10.5856 8.44328 10.5856C5.69403 10.5856 3.46533 8.35687 3.46533 5.60763C3.46533 5.28797 3.49546 4.97535 3.55304 4.67246C1.81948 5.29036 0.578613 6.94627 0.578613 8.892C0.578613 11.3653 2.58362 13.3703 5.05693 13.3703C6.95439 13.3703 8.57623 12.1902 9.22858 10.524Z"
                clipRule="evenodd"
            ></path>
            <path
                fill="#0e7490"
                fillRule="evenodd"
                d="M8.57096 1.83829C8.91614 1.83829 9.19596 2.11811 9.19596 2.46329V2.96106C9.43827 3.02316 9.64493 3.11712 9.81042 3.21262C9.97199 3.30586 10.0982 3.40259 10.1862 3.47818C10.2304 3.51618 10.2656 3.54943 10.2916 3.57511C10.3046 3.58796 10.3153 3.59899 10.3237 3.60782L10.3345 3.61943L10.3387 3.62394L10.3404 3.62586L10.3412 3.62674L10.3416 3.62716C10.3418 3.62736 10.3419 3.62756 9.87671 4.04491L10.3419 3.62756C10.5724 3.8845 10.551 4.27965 10.2941 4.51014C10.039 4.73896 9.64772 4.7195 9.41654 4.46784C9.41654 4.46784 9.41653 4.46784 9.41653 4.46783C9.41574 4.46702 9.41426 4.46551 9.41211 4.46338C9.40516 4.4565 9.39149 4.44342 9.37154 4.42627C9.33116 4.39158 9.26803 4.34283 9.18564 4.29528C9.02101 4.20028 8.79501 4.11815 8.51735 4.142C8.1997 4.16928 8.02054 4.27414 7.92662 4.36647C7.83239 4.45909 7.79359 4.567 7.79359 4.66974C7.79359 4.77349 7.81494 4.81297 7.82118 4.82341C7.82798 4.83476 7.84482 4.85776 7.90003 4.88906C8.0434 4.97036 8.26464 5.01749 8.63658 5.08645C8.64841 5.08864 8.66045 5.09086 8.6727 5.09313C8.98041 5.14994 9.41685 5.23053 9.76986 5.43766C9.96941 5.55475 10.1619 5.72149 10.3007 5.96033C10.4396 6.19935 10.5017 6.47101 10.5017 6.76221C10.5017 7.21015 10.2587 7.56269 9.98267 7.79589C9.75998 7.98405 9.48646 8.12316 9.19596 8.21281V8.75205C9.19596 9.09723 8.91614 9.37705 8.57096 9.37705C8.22578 9.37705 7.94596 9.09723 7.94596 8.75205V8.30372C7.47381 8.23208 6.99555 8.03467 6.58871 7.66339C6.33374 7.43072 6.31568 7.0354 6.54835 6.78043C6.78103 6.52546 7.17635 6.5074 7.43132 6.74007C7.7852 7.06302 8.28068 7.14369 8.71047 7.04916C8.92352 7.00231 9.08313 6.91948 9.17592 6.84108C9.2302 6.79522 9.2471 6.76514 9.25167 6.75413C9.25061 6.64854 9.22893 6.60382 9.21996 6.58838C9.21065 6.57236 9.1916 6.54765 9.13727 6.51577C8.99656 6.43321 8.77679 6.38374 8.40871 6.3155C8.39231 6.31246 8.37547 6.30936 8.35823 6.30619C8.05487 6.2504 7.62824 6.17193 7.28343 5.9764C7.08476 5.86374 6.89002 5.70154 6.74872 5.46553C6.60687 5.22861 6.54359 4.95858 6.54359 4.66974C6.54359 3.88254 7.0781 3.21508 7.94596 2.97809V2.46329C7.94596 2.11811 8.22578 1.83829 8.57096 1.83829ZM9.25316 6.74945C9.25324 6.74946 9.25308 6.75037 9.25244 6.75214C9.25276 6.75033 9.25308 6.74944 9.25316 6.74945Z"
                clipRule="evenodd"
            ></path>
        </svg>
    </Link>
);

const NavbarItem = ({
    item,
    isDisclosure = false,
}: NavbarItemProps): JSX.Element => {
    const className = clsx(
        "block px-3 py-2 rounded-md text-base font-medium",
        isDisclosure && "block text-base",
        !isDisclosure && "text-sm"
    );

    const activeClassName = "bg-gray-900 text-white";
    const inactiveClassName =
        "text-gray-300 hover:bg-gray-700 hover:text-white";

    const ariaCurrent = item.current ? "page" : undefined;

    if (isDisclosure) {
        return (
            <Disclosure.Button
                key={item.name}
                as="a"
                href={item.uri}
                className={className}
                aria-current={ariaCurrent}
            >
                {item.name}
            </Disclosure.Button>
        );
    }

    return (
        <NavLink
            to={item.uri}
            className={({ isActive }) =>
                clsx(className, isActive ? activeClassName : inactiveClassName)
            }
            aria-current={({ isActive }) => (isActive ? "page" : false)}
        >
            {item.name}
        </NavLink>
    );
};

const NavbarButton = ({ label, icon }: NavbarButtonProps): JSX.Element => (
    <button
        type="button"
        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
        <span className="sr-only">{label}</span>
        {icon && <NavbarButtonIcon icon={icon} />}
    </button>
);

const NavbarButtonIcon = ({ icon }: NavbarButtonIconProps): JSX.Element => {
    return createElement(icon, {
        className: "h-6 w-6",
        "aria-hidden": true,
    });
};

const NavbarUserMenu = (): JSX.Element => (
    <Menu as="div" className="relative ml-3">
        <div>
            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <Avatar size={8} src="/user.jpeg" name="Joe Lennon" />
            </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <NavbarUserMenuItem>Your Profile</NavbarUserMenuItem>
                <NavbarUserMenuItem>Settings</NavbarUserMenuItem>
                <NavbarUserMenuItem>Sign out</NavbarUserMenuItem>
            </Menu.Items>
        </Transition>
    </Menu>
);

const NavbarUserMenuItem = ({
    href = "#",
    children,
}: NavbarUserMenuItemProps): JSX.Element => (
    <Menu.Item>
        {({ active }) => (
            <a
                href={href}
                className={clsx(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                )}
            >
                {children}
            </a>
        )}
    </Menu.Item>
);
