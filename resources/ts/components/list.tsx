import clsx from "clsx";
import { ReactNode } from "react";

export type ListContainerProps = {
    children: ReactNode;
    fullWidthOnMobile?: boolean;
    flat?: boolean;
};

export type ListProps = {
    children: ReactNode;
    flat?: boolean;
    separate?: boolean;
};

export type ListItemProps = {
    children: ReactNode;
    fullWidthOnMobile?: boolean;
    inContainer?: boolean;
    separate?: boolean;
};

export const ListContainer = ({
    children,
    fullWidthOnMobile = false,
    flat = false,
}: ListContainerProps): JSX.Element => {
    const className = clsx(
        "overflow-hidden bg-white",
        flat && "border border-gray-300",
        !flat && "shadow",
        !fullWidthOnMobile && "rounded-md",
        fullWidthOnMobile && "sm:rounded-md"
    );

    return <div className={className}>{children}</div>;
};

export const List = ({
    children,
    flat = false,
    separate = false,
}: ListProps): JSX.Element => {
    const className = clsx(
        separate && "space-y-3",
        !separate && "divide-y",
        !separate && flat && "divide-gray-300",
        !separate && !flat && "divide-gray-200"
    );
    return (
        <ul role="list" className={className}>
            {children}
        </ul>
    );
};

export const ListItem = ({
    children,
    fullWidthOnMobile = false,
    inContainer = false,
    separate = false,
}: ListItemProps): JSX.Element => {
    const className = clsx(
        separate && "overflow-hidden bg-white shadow",
        separate && fullWidthOnMobile && "sm:rounded-md",
        separate && !fullWidthOnMobile && "rounded-md",
        (separate || inContainer) && fullWidthOnMobile && "sm:px-6 px-4 py-4",
        (separate || inContainer) && !fullWidthOnMobile && "px-6 py-4",
        !inContainer && fullWidthOnMobile && "px-4",
        !inContainer && !fullWidthOnMobile && "sm:px-0 py-4"
    );

    return <li className={className}>{children}</li>;
};
