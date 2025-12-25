import pool from './pool.js'

export async function getAllBlogs() {
    let sql = `select id,title,created_at,likes from blogs where published=true`;
    let result = await pool.query(sql);
    return result.rows;
}

export async function getAllBlogComments(blog_id) {
    let sql = `select * from comments where blog_id=$1`;
    let result = await pool.query(sql, [blog_id]);
    return result.rows;
}

export async function getBlog(id) {
    try {
        let sql = `select * from blogs where id=$1 and published=true`;
        let result = await pool.query(sql, [id]);
        return result.rows;

    } catch (error) {
        throw error;
    }

}

export async function getBlogComments(id) {
    try {
        let sql = `select * from comments where blog_id=$1`;
        let result = await pool.query(sql, [id]);
        return result.rows;

    } catch (error) {
        throw error;
    }

}

export async function insertNewComment(comment, blog_id) {
    try {
        let sql = `insert into comments values(default,$1,$2,$3,default) returning *`;
        let result = await pool.query(sql, [comment.author_name, comment.content, blog_id]);
        return result.rows;

    } catch (error) {
        throw error
    }
}

export async function addLike(blog_id) {
    try {
        let sql = `update blogs set likes = likes+1 where id=$1 returning id`;
        let result = await pool.query(sql, [blog_id]);
        return result.rows;

    } catch (error) {
        throw error
    }
}







