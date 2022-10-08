import { ReactNode } from "react";
import clsx from "clsx";

export type CardProps = {
    children: ReactNode;
    fullWidthOnMobile?: boolean;
    className?: string;
};

export type CardBodyProps = {
    children: ReactNode;
    grayBg?: boolean;
};

export type CardHeaderProps = {
    children: ReactNode;
    grayBg?: boolean;
};

export type CardFooterProps = {
    children: ReactNode;
    grayBg?: boolean;
};

export const Card = ({
    children,
    fullWidthOnMobile = false,
    className: cls,
}: CardProps): JSX.Element => {
    const className = clsx(
        "overflow-hidden bg-white shadow divide-y divide-gray-200",
        fullWidthOnMobile && "sm:rounded-lg",
        !fullWidthOnMobile && "rounded-lg",
        cls
    );

    return <div className={className}>{children}</div>;
};

export const CardBody = ({
    children,
    grayBg = false,
}: CardBodyProps): JSX.Element => {
    const className = clsx("px-4 py-5 sm:p-6", grayBg && "bg-gray-50");

    return <div className={className}>{children}</div>;
};

export const CardHeader = ({
    children,
    grayBg = false,
}: CardHeaderProps): JSX.Element => {
    const className = clsx("px-4 py-5 sm:px-6", grayBg && "bg-gray-50");

    return <div className={className}>{children}</div>;
};

export const CardFooter = ({
    children,
    grayBg = false,
}: CardHeaderProps): JSX.Element => {
    const className = clsx("px-4 py-4 sm:px-6", grayBg && "bg-gray-50");

    return <div className={className}>{children}</div>;
};
