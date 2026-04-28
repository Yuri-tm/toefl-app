import axios from "axios";

// Use env variable (recommended)
const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3001";

// 🎤 Speaking evaluation
export async function evaluateSpeaking(text) {
    try {
        const res = await axios.post(`${API_URL}/api/evaluate-speaking`, {
            text,
        });

        return res.data;

    } catch (err) {
        console.error("Speaking evaluation error:", err);

        // fallback (so app doesn’t crash)
        return {
            fluency: 2,
            pronunciation: 2,
            grammar: 2,
            content: 2,
            toeflScore: 15,
            feedback: "Error evaluating response. Try again.",
        };
    }
}