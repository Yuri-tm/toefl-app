import { useState } from "react";
import useTimer from "../hooks/useTimer";

export default function Reading({ onComplete }) {
    const [answers] = useState({});
    const time = useTimer(480, submit); // 8 min

    function submit() {
        const correct = { 1: "B", 2: "C", 3: "B", 4: "C" };
        let raw = 0;

        Object.keys(correct).forEach((q) => {
            if (answers[q] === correct[q]) raw++;
        });

        const scaled = [0, 8, 15, 22, 30][raw];
        onComplete({ reading: scaled });
    }

    return (
        <div>
            <h2>Reading</h2>
            <p>Time: {time}s</p>
            {/* questions UI */}
            <button onClick={submit}>Submit</button>
        </div>
    );
}