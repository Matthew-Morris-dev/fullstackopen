import React, { useState } from "react";

const Statistics = (props) => {
    return (
        <div>
            <h1>statistics</h1>
            <p>good {props.stats.good}</p>
            <p>neutral {props.stats.neutral}</p>
            <p>bad {props.stats.bad}</p>
            <p>all {props.stats.all}</p>
            <p>average {props.stats.average}</p>
            <p>positive {props.stats.positive} %</p>
        </div>
    );
};

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

    const stats = {
        good: good,
        neutral: neutral,
        bad: bad,
        all: allFeedback(),
        average: averageFeedback(),
        positive: positiveFeedback()
    };

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={increaseGood}>good</button>
            <button onClick={increaseNeutral}>neutral</button>
            <button onClick={increaseBad}>bad</button>
            <Statistics stats={stats} />
        </div>
    );
};

export default App;
