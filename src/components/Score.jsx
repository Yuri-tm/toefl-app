export default function Score({ data }) {
    const total =
        data.reading +
        data.listening +
        data.speaking +
        data.writing;

    return (
        <div>
            <h2>Final Score</h2>
            <p>Reading: {data.reading}</p>
            <p>Listening: {data.listening}</p>
            <p>Speaking: {data.speaking}</p>
            <p>Writing: {data.writing}</p>

            <h1>Total: {total} / 120</h1>
        </div>
    );
}