import React, { useState } from "react";

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const increaseGood = () => setGood(good + 1);
    const increaseNeutral = () => setNeutral(neutral + 1);
    const increaseBad = () => setBad(bad + 1);
    const allFeedback = () => {
        return good + neutral + bad;
    };
    const averageFeedback = () => {
        return (good - bad) / allFeedback();
    };
    const positiveFeedback = () => {
        return good / allFeedback();
    };

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={increaseGood}>good</button>
            <button onClick={increaseNeutral}>neutral</button>
            <button onClick={increaseBad}>bad</button>
            <h1>statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {allFeedback()}</p>
            <p>average {averageFeedback()}</p>
            <p>positive {positiveFeedback()} %</p>
        </div>
    );
};

export default App;
