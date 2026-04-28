import { useEffect, useState } from "react";

export default function useTimer(seconds, onEnd) {
    const [time, setTime] = useState(seconds);

    useEffect(() => {
        if (time === null) return;

        if (time <= 0) {
            onEnd?.();
            return;
        }

        const timer = setTimeout(() => setTime(time - 1), 1000);
        return () => clearTimeout(timer);
    }, [time]);

    return time;
}