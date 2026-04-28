import { useEffect, useState, useCallback } from "react";

export default function useTimer(seconds, onEnd) {
    const [time, setTime] = useState(seconds);

    const memoizedOnEnd = useCallback(() => {
        onEnd?.();
    }, [onEnd]);

    useEffect(() => {
        if (time === null) return;

        if (time <= 0) {
            memoizedOnEnd();
            return;
        }

        const timer = setTimeout(() => setTime(time - 1), 1000);
        return () => clearTimeout(timer);
    }, [time, memoizedOnEnd]);

    return time;
}