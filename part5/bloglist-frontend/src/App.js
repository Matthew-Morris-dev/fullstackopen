import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [blog, setBlog] = useState({ title: "", author: "", url: "" });
    const [notificationMessage, setNotificationMessage] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
        if (loggedInUserJSON) {
            const user = JSON.parse(loggedInUserJSON);
            setUser(user);
            blogService.setToken(user.token);
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
            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setNotificationMessage("Wrong credentials");
            setTimeout(() => {
                setNotificationMessage(null);
            }, 5000);
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem("loggedInUser");
        setUser(null);
        blogService.setToken(null);
    };

    const handleCreateBlog = async (event) => {
        event.preventDefault();
        console.log("blog: " + JSON.stringify(blog));
        const res = await blogService.create(blog);
        console.log("res: " + res);
        const newBlog = res.data;
        const errorMessage = res.error;
        console.log(errorMessage);
        if (newBlog) {
            setBlogs([...blogs, newBlog]);
            setNotificationMessage(`New blog ${newBlog.title} by ${newBlog.author}`);
            setTimeout(() => {
                setNotificationMessage(null);
            }, 5000);
        } else if (errorMessage) {
            setNotificationMessage(errorMessage);
            setTimeout(() => {
                setNotificationMessage(null);
            }, 5000);
        }
    };

    if (user === null) {
        return (
            <div>
                <Notification message={notificationMessage} />
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
            <Notification message={notificationMessage} />

            <h2>blogs</h2>

            <p>
                {user.name} logged in.
                <input type="button" onClick={handleLogout} value="Logout" />
            </p>

            <div>
                <h2>Create new</h2>
                <form onSubmit={handleCreateBlog}>
                    <div>
                        title:
                        <input type="text" value={blog.title} name="Title" onChange={({ target }) => setBlog({ ...blog, title: target.value })} />
                    </div>
                    <div>
                        author:
                        <input type="text" value={blog.author} name="Author" onChange={({ target }) => setBlog({ ...blog, author: target.value })} />
                    </div>
                    <div>
                        url:
                        <input type="text" value={blog.url} name="Url" onChange={({ target }) => setBlog({ ...blog, url: target.value })} />
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
