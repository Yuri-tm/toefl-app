import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors({
    origin: "https://toefl-app-gray.vercel.app/"
}));
app.use(express.json());

app.post("/api/evaluate-speaking", async (req, res) => {
    const { text } = req.body;

    // ✅ 🔥 THIS IS YOUR BACKEND PROMPT
    const prompt = `
You are a TOEFL iBT speaking grader.

Evaluate this response using 4 criteria (0–4 each):
1. Fluency (flow, pauses)
2. Pronunciation
3. Grammar
4. Content relevance & development

Return JSON:
{
  "fluency": number,
  "pronunciation": number,
  "grammar": number,
  "content": number,
  "toeflScore": number (0–30),
  "feedback": "detailed feedback"
}

Response:
${text}
`;

    try {
        const ai = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4.1-mini",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const output = JSON.parse(ai.data.choices[0].message.content);
        res.json(output);

    } catch (err) {
        console.error(err);
        res.json({
            toeflScore: 15,
            feedback: "Fallback scoring due to error",
        });
    }
});

app.listen(3001, () => console.log("Server running on port 3001"));