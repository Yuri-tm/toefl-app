import { useState, useEffect, useRef } from "react";
import { evaluateSpeaking } from "../utils/api";

export default function Speaking({ onComplete }) {
    const [phase, setPhase] = useState("prep"); // prep → speak → done
    const [time, setTime] = useState(15);
    const [transcript, setTranscript] = useState("");
    const [recording, setRecording] = useState(false);

    const recognitionRef = useRef(null);

    // ⏱ Phase-based timer
    useEffect(() => {
        if (phase === "done") return;

        if (time <= 0) {
            if (phase === "prep") {
                startRecording();
                setPhase("speak");
                setTime(45);
            } else if (phase === "speak") {
                stopRecording();
                setPhase("done");
            }
            return;
        }

        const timer = setTimeout(() => setTime((t) => t - 1), 1000);
        return () => clearTimeout(timer);
    }, [time, phase]);

    function startRecording() {
        const SR =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SR) {
            alert("Speech Recognition not supported");
            return;
        }

        const rec = new SR();
        rec.continuous = true;
        rec.interimResults = true;

        rec.onresult = (e) => {
            let text = "";
            for (let i = 0; i < e.results.length; i++) {
                text += e.results[i][0].transcript + " ";
            }
            setTranscript(text);
        };

        rec.start();
        recognitionRef.current = rec;
        setRecording(true);
    }

    async function stopRecording() {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setRecording(false);

        const result = await evaluateSpeaking(transcript);

        onComplete({
            speaking: result.toeflScore,
            speakingDetails: result,
        });
    }

    return (
        <div>
            <h2>🎤 Speaking Task</h2>
            <p>
                Do you prefer studying alone or with a group? Explain your answer.
            </p>

            {phase === "prep" && <h3>Prepare: {time}s</h3>}
            {phase === "speak" && <h3>Speak: {time}s</h3>}
            {phase === "done" && <h3>Evaluating...</h3>}

            <h4>Transcript:</h4>
            <p>{transcript}</p>
            <h3 style={{ color: time <= 5 ? "red" : "black" }}>
                {phase === "prep" ? "Prepare" : "Speak"}: {time}s
            </h3>
        </div>
    );
    
}