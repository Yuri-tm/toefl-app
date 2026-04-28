import { useState } from "react";
import useTimer from "../hooks/useTimer";

export default function Writing({ onComplete }) {
    const [text, setText] = useState("");
    const time = useTimer(1200, submit); // 20 min

    function submit() {
        // For now, just pass a dummy score
        // In a real app, this would send to an API for evaluation
        const score = text.length > 100 ? 25 : 15; // Simple length-based scoring
        onComplete({ writing: score });
    }

    return (
        <div>
            <h2>Writing</h2>
            <p>Time: {time}s</p>
            <p>Write an essay on a given topic.</p>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your essay here..."
                rows={10}
                cols={80}
            />
            <br />
            <button onClick={submit}>Submit</button>
        </div>
    );
}