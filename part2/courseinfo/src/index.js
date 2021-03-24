import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
};

const Total = ({ parts }) => {
    const sum = parts.reduce((acc, part) => {
        return acc + part.exercises;
    }, 0);
    return <p>Number of exercises {sum}</p>;
};

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => {
                return <Part key={part.id} part={part} />;
            })}
        </div>
    );
};

const Course = ({ course }) => {
    console.log(course.parts);
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

const App = () => {
    const courses = [
        {
            name: "Half Stack application development",
            id: 1,
            parts: [
                {
                    name: "Fundamentals of React",
                    exercises: 10,
                    id: 1
                },
                {
                    name: "Using props to pass data",
                    exercises: 7,
                    id: 2
                },
                {
                    name: "State of a component",
                    exercises: 14,
                    id: 3
                },
                {
                    name: "Redux",
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: "Node.js",
            id: 2,
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ];

    return (
        <div>
            {courses.map((course) => {
                return <Course course={course} />;
            })}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
