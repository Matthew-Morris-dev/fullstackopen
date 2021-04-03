import React from "react";

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
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;
