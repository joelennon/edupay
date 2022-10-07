export const getInitialsFromName = (str: string): string => {
    const names: Array<string> = str.split(" ");
    let initials: string = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
};
