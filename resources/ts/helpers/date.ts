import { parse, format } from "date-fns";

export const formatTime = (time: string): string =>
    format(parse(time, "HH:mm:ss", new Date()), "h:mma").toLowerCase();
