import { useState } from "react";
import Reading from "./components/Reading";
import Listening from "./components/Listening";
import Speaking from "./components/Speaking";
import Writing from "./components/Writing";
import Score from "./components/Score";

export default function App() {
  const [section, setSection] = useState("reading");
  const [results, setResults] = useState({});

  const next = (data) => {
    setResults((prev) => ({ ...prev, ...data }));

    const flow = ["reading", "listening", "speaking", "writing", "score"];
    const nextIndex = flow.indexOf(section) + 1;
    setSection(flow[nextIndex]);
  };

  return (
    <div>
      <h1>🧪 TOEFL Simulator</h1>

      {section === "reading" && <Reading onComplete={next} />}
      {section === "listening" && <Listening onComplete={next} />}
      {section === "speaking" && <Speaking onComplete={next} />}
      {section === "writing" && <Writing onComplete={next} />}
      {section === "score" && <Score data={results} />}
    </div>
  );
}