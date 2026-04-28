import { useState } from "react";
import useTimer from "../hooks/useTimer";

export default function Listening({ onComplete }) {
    const [playing, setPlaying] = useState(false);
    const [answers, setAnswers] = useState({});

    // ⏱ 8 minutes total (like mini test)
    const time = useTimer(480, submit);

    const playAudio = () => {
        const audio = new Audio("/audio/listening.mp3");
        setPlaying(true);
        audio.play();

        audio.onended = () => setPlaying(false);
    };

    const submit = () => {
        const correct = { 1: "B", 2: "C", 3: "C", 4: "C" };

        let raw = Object.keys(correct).filter(
            (q) => answers[q] === correct[q]
        ).length;

        const scaled = [0, 8, 15, 22, 30][raw];
        onComplete({ listening: scaled });
    };

    return (
        <div>
            <h2>Listening</h2>

            {/* ✅ Timer now used */}
            <p>Time left: {time}s</p>

            <button onClick={playAudio} disabled={playing}>
                Play Audio
            </button>

            <fieldset disabled={playing}>
                {/* Your questions UI here */}
            </fieldset>

            <button onClick={submit}>Submit</button>
        </div>
    );
}