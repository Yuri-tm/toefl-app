import { useState, useEffect, useRef, useCallback, useReducer } from "react";
import { evaluateSpeaking } from "../utils/api";

const phaseReducer = (state, action) => {
    switch (action.type) {
        case "START_RECORDING":
            return { phase: "speak", time: 45 };
        case "STOP_RECORDING":
            return { phase: "done", time: state.time };
        case "TICK":
            return { ...state, time: state.time - 1 };
        default:
            return state;
    }
};

export default function Speaking({ onComplete }) {
    const [{ phase, time }, dispatch] = useReducer(phaseReducer, {
        phase: "prep",
        time: 15,
    });
    const [transcript, setTranscript] = useState("");

    const recognitionRef = useRef(null);

    const startRecording = useCallback(() => {
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
    }, []);

    const stopRecording = useCallback(async () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        const result = await evaluateSpeaking(transcript);

        onComplete({
            speaking: result.toeflScore,
            speakingDetails: result,
        });
    }, [transcript, onComplete]);

    // ⏱ Timer countdown
    useEffect(() => {
        if (phase === "done") return;

        const timer = setTimeout(() => dispatch({ type: "TICK" }), 1000);
        return () => clearTimeout(timer);
    }, [phase]);

    // ⏱ Handle phase transitions
    useEffect(() => {
        if (phase === "done" || time > 0) return;

        if (phase === "prep") {
            startRecording();
            dispatch({ type: "START_RECORDING" });
        } else if (phase === "speak") {
            stopRecording();
            dispatch({ type: "STOP_RECORDING" });
        }
    }, [time, phase, startRecording, stopRecording]);



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