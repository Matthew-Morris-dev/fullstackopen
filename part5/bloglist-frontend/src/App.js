import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
        if (loggedInUserJSON) {
            const user = JSON.parse(loggedInUserJSON);
            setUser(user);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("logging in with", username, password);
        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem("loggedInUser", JSON.stringify(user));

            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            console.log("Login failed");
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem("loggedInUser");
        setUser(null);
    };

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
                    </div>
                    <div>
                        password
                        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <h2>blogs</h2>

            <p>
                {user.name} logged in.
                <input type="button" onClick={handleLogout} value="Logout" />
            </p>

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
