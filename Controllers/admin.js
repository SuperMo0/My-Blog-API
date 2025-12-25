import * as queries from './../db/admin-queries.js'

export function handleSucessLogin(req, res) {
    res.json({ message: "success" });
}

export async function handleNewBlog(req, res) {
    try {
        await queries.insertBlog(req.body, req.user.id);
        res.json({ message: "success" });
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({ message: "failure" });
    }
}

export async function handleUpdateBlog(req, res) {
    let id = req.params.id;

    try {
        await queries.updateBlog(req.params.id, req.body);
        res.json({ message: "success" });

    } catch (error) {
        res.status(400);
        res.json({ message: "failure" });
    }
}


export async function handleDeleteBlog(req, res) {
    try {
        await queries.deleteBlog(req.params.id)
        res.json({ message: "success" });
    } catch (error) {
        res.status(400);
        res.json({ message: "failure" });
    }
}


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
        console.log(error);
        res.status(400).json({ message: "success" });
    }
}

export async function handleGetBlogComments(req, res) {
    let id = req.params.id;
    try {
        let comments = await queries.getBlogComments(id);
        res.json({ comments });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "success" });
    }
}

