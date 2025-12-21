import * as queries from './../db/admin-queries.js'

export function handleSucessLogin(req, res) {
    res.send('successful');
}

export async function handleNewBlog(req, res) {
    try {
        await queries.insertBlog(req.body, req.user.id);
        res.send('success');
    } catch (error) {
        console.log(error);
        res.status(400);
        res.send('failure');
    }
}

export async function handleUpdateBlog(req, res) {
    try {
        await queries.updateBlog(req.params.id, req.body)
        res.send('success');
    } catch (error) {
        res.status(400);
        res.send('failure');
    }
}


export async function handleDeleteBlog(req, res) {
    try {
        await queries.deleteBlog(req.params.id)
        res.send('success');
    } catch (error) {
        res.status(400);
        res.send('failure');
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

        res.status(400).send("no blog");
    }
}

export async function handleGetBlogComments(req, res) {
    let id = req.params.id;
    try {
        let comments = await queries.getBlogComments(id);
        res.json({ comments });
    } catch (error) {
        console.log(error);

        res.status(400).send("no blog");
    }
}

