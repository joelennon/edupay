import { forwardRef, useContext, useMemo } from "react";
import {
    useMatch,
    useResolvedPath,
    UNSAFE_DataRouterStateContext as DataRouterStateContext,
} from "react-router";
import { Link, LinkProps } from "react-router-dom";
import { matchPath } from "@remix-run/router";

export interface NavLinkProps
    extends Omit<LinkProps, "className" | "style" | "children"> {
    children?:
        | React.ReactNode
        | ((props: {
              isActive: boolean;
              isPending: boolean;
          }) => React.ReactNode);
    caseSensitive?: boolean;
    className?:
        | string
        | ((props: {
              isActive: boolean;
              isPending: boolean;
          }) => string | undefined);
    end?: boolean;
    style?:
        | React.CSSProperties
        | ((props: {
              isActive: boolean;
              isPending: boolean;
          }) => React.CSSProperties | undefined);
    alternativeMatchPath?: string;
}

export default forwardRef<HTMLAnchorElement, NavLinkProps>(
    function NavLinkWithRef(
        {
            "aria-current": ariaCurrentProp = "page",
            caseSensitive = false,
            className: classNameProp = "",
            end = false,
            style: styleProp,
            to,
            children,
            alternativeMatchPath,
            ...rest
        },
        ref
    ) {
        let path = useResolvedPath(to);
        let match = useMatch({ path: path.pathname, end, caseSensitive });

        let altPath = useResolvedPath(alternativeMatchPath);
        let altMatch = useMatch({ path: altPath.pathname, end, caseSensitive });

        let routerState = useContext(DataRouterStateContext);
        let nextLocation = routerState?.navigation.location;
        let nextPath = useResolvedPath(nextLocation || "");
        let nextMatch = useMemo(
            () =>
                nextLocation
                    ? matchPath(
                          { path: path.pathname, end, caseSensitive },
                          nextPath.pathname
                      )
                    : null,
            [nextLocation, path.pathname, caseSensitive, end, nextPath.pathname]
        );

        let isPending = nextMatch != null;
        let isActive = match != null;

        if (alternativeMatchPath && !isActive) {
            isActive = altMatch !== null;
        }

        let ariaCurrent = isActive ? ariaCurrentProp : undefined;

        let className: string | undefined;
        if (typeof classNameProp === "function") {
            className = classNameProp({ isActive, isPending });
        } else {
            // If the className prop is not a function, we use a default `active`
            // class for <NavLink />s that are active. In v5 `active` was the default
            // value for `activeClassName`, but we are removing that API and can still
            // use the old default behavior for a cleaner upgrade path and keep the
            // simple styling rules working as they currently do.
            className = [
                classNameProp,
                isActive ? "active" : null,
                isPending ? "pending" : null,
            ]
                .filter(Boolean)
                .join(" ");
        }

        let style =
            typeof styleProp === "function"
                ? styleProp({ isActive, isPending })
                : styleProp;

        return (
            <Link
                {...rest}
                aria-current={ariaCurrent}
                className={className}
                ref={ref}
                style={style}
                to={to}
            >
                {typeof children === "function"
                    ? children({ isActive, isPending })
                    : children}
            </Link>
        );
    }
);
