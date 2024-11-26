import express from "express";
import multer from "multer";
import cors from "cors";
import { listPosts, newPost, uploadImage, updatePostAIDescription } from "../controllers/postsController.js";

const corsOptions = 
{
	origin: "http://localhost:8000",
	optionsSuccessStatus: 200
}

const upload = multer({dest: "./uploads"});
const routes = (app) => 
{
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/posts", listPosts);
	app.post("/posts", newPost);
	app.post("/upload", upload.single("imagem"), uploadImage);
	app.put("/upload/:id", updatePostAIDescription);
}

export default routes;

// app.get("/posts", async (req, res) => {
// 	const posts = await getTodosPosts();
//     res.status(200).json(posts);
// });
