import React, { useState } from "react";

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
};

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const Statistics = (props) => {
    if (props.stats.all > 0) {
        return (
            <div>
                <h1>statistics</h1>
                <table>
                    <Statistic text="good" value={props.stats.good} />
                    <Statistic text="neutral" value={props.stats.neutral} />
                    <Statistic text="bad" value={props.stats.bad} />
                    <Statistic text="all" value={props.stats.all} />
                    <Statistic text="average" value={props.stats.average} />
                    <Statistic text="positive" value={props.stats.positive + " %"} />
                </table>
            </div>
        );
    } else {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        );
    }
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
            <Button text="good" onClick={increaseGood} />
            <Button text="Neutral" onClick={increaseNeutral} />
            <Button text="bad" onClick={increaseBad} />
            <Statistics stats={stats} />
        </div>
    );
};

export default App;
