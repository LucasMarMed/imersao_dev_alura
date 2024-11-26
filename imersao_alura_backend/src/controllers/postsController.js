import fs from "fs";
import { getPosts, createPost, updatePost } from "../models/postsModel.js";
import geminiDescription from "../services/gemini.js"

export async function listPosts (req, res)
{
	const posts =  await getPosts();
	res.status(200).json(posts);
}

export async function newPost(req, res) 
{
    try 
	{
		const newPost = await createPost(req.body);
		res.status(200).json(newPost);
    } 
	catch(erro) 
	{
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function uploadImage(req, res) 
{
    const initPost = 
	{
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try 
	{
        const newPost = await createPost(initPost);
        const tmp = `uploads/${newPost.insertedId}.png`
        fs.renameSync(req.file.path, tmp);
        res.status(200).json(newPost);
    }

	catch(erro) 
	{
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function updatePostAIDescription(req, res) {
	const id = req.params.id;
	const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
	try {
        const initPost = {
            imgUrl: `http://localhost:3000/${id}.png`,
            descricao: await geminiDescription(imgBuffer),
            alt: req.body.alt
        }

        const updatedPost = await updatePost(id, initPost);
        res.status(200).json(updatedPost);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}