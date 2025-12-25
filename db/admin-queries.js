import pool from './pool.js'


export async function getAllBlogs() {
    let sql = `select id,title,created_at,likes,published from blogs`;
    let result = await pool.query(sql);
    return result.rows;
}

export async function getAllComments() {
    let sql = `select * from comments`;
    let result = await pool.query(sql);
    return result.rows;
}

export async function getAllBlogComments(blog_id) {
    let sql = `select * from comments where blog_id=$1`;
    let result = await pool.query(sql, [blog_id]);
    return result.rows;
}

export async function getBlog(id) {
    let sql = `select * from blogs where id=$1`;
    let result = await pool.query(sql, [id]);
    return result.rows;
}

export async function getBlogComments(id) {
    let sql = `select * from comments where blog_id=$1`;
    let result = await pool.query(sql, [id]);
    return result.rows;
}

export async function getAdmin(email) {
    let sql = `select * from users where email=$1`;
    let result = await pool.query(sql, [email]);
    return result.rows;

}


export async function insertBlog(blog, user_id) {
    let sql = `insert into blogs
      (id,title,content,author_id,created_at,likes,published)
     values (default,$1,$2,$3,default,default,$4)
     `;
    let result = await pool.query(sql, [blog.title, blog.content, user_id, blog.published]);
    return result.rows;
}


export async function updateBlog(id, blog) {
    let content = blog.content;
    let title = blog.title;
    let published = blog.published;

    let sql = `update blogs
    set content = COALESCE($2,content),
    title = COALESCE($3,title),
    published = COALESCE($4,published)
    where id=$1
     `;
    try {
        let result = await pool.query(sql, [id, content, title, published]);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error
    }
}




export async function deleteBlog(id) {
    let sql = `delete from blogs where id=$1`;
    let result = await pool.query(sql, [id]);
    return result.rows;
}