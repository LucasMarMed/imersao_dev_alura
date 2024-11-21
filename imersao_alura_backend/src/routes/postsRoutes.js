import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => 
{
    app.use(express.json());
	
    app.get("/posts", listarPosts);
}

export default routes;


// app.get("/posts", async (req, res) => {
// 	const posts = await getTodosPosts();
//     res.status(200).json(posts);
// });
