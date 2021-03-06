import React, { useState } from "react";

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
    ];

    const initialVotes = new Uint8Array(anecdotes.length);

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(initialVotes);

    const randomAnecdote = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length);
        setSelected(randomIndex);
    };

    const voteForAnecdote = () => {
        const votesCopy = [...votes];
        votesCopy[selected] += 1;
        setVotes(votesCopy);
    };

    const getIndexWithMostVotes = () => {
        let max = votes[0];
        let maxIndex = 0;

        for (let i = 1; i < votes.length; i++) {
            if (votes[i] > max) {
                maxIndex = i;
                max = votes[i];
            }
        }

        return maxIndex;
    };

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <button onClick={voteForAnecdote}>vote</button>
            <button onClick={randomAnecdote}>next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[getIndexWithMostVotes()]}</p>
        </div>
    );
};

export default App;
