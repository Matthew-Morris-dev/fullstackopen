const _ = require("lodash");

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((result, blog) => {
        return result + blog.likes;
    }, 0);
};

const favouriteBlog = (blogs) => {
    return blogs.reduce((prev, current) => {
        if (current.likes > prev.likes) {
            return current;
        } else {
            return prev;
        }
    });
};

const mostBlogs = (blogs) => {
    let countedResults = _.countBy(blogs, (blog) => {
        return blog.author;
    });

    let result = { author: "", blogs: 0 };

    for (const [key, value] of Object.entries(countedResults)) {
        if (value > result.blogs) {
            result = {
                author: key,
                blogs: value,
            };
        }
    }

    return result;
};

const mostLikes = (blogs) => {
    return _.maxBy(
        _(blogs)
            .groupBy("author")
            .map((authorsBlogs, author) => {
                return { author: author, likes: _.sumBy(authorsBlogs, "likes") };
            })
            .value(),
        "likes"
    );
};

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
};
