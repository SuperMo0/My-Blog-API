import * as queries from '../db/guest-queries.js'

export async function handleGetAllBlogs(req, res) {
    let blogs = await queries.getAllBlogs();
    res.json({ blogs });
}

export async function handleGetBlog(req, res) {
    let id = req.params.id;
    try {
        let blog = await queries.getBlog(id);
        res.json({ blog: blog[0] });
    } catch (error) {
        res.status(400).send("no blog");
    }
}

export async function handleGetBlogComments(req, res) {
    let id = req.params.id;
    try {
        let comments = await queries.getBlogComments(id);
        res.json({ comments });
    } catch (error) {
        res.status(400).send("no blog");
    }
}

export async function handleNewComment(req, res) {
    let blog_id = req.params.id;
    try {
        await queries.insertNewComment(req.body, blog_id);
        res.send('success');
    } catch (error) {
        res.status(400).send("failure");
    }
}

export async function handleNewLike(req, res) {
    let blog_id = req.params.id;
    try {
        await queries.addLike(blog_id);
        res.send('success');
    } catch (error) {
        res.status(400).send("failure");
    }
}

