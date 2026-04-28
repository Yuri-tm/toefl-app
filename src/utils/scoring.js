import axios from "axios";

export async function evaluateSpeaking(text) {
    const res = await axios.post("/api/evaluate-speaking", {
        text,
    });

    return res.data;
}