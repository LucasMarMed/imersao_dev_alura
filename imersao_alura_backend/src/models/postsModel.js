import 'dotenv/config';
import conectDB from "../config/dbConfig.js"
import { ObjectId } from "mongodb";

const conexao = await conectDB(process.env.STRING_CONEXAO)

export async function getPosts()
{
	const db = conexao.db("imersao_backend");
	const colecao = db.collection("posts");
	return colecao.find().toArray();
}

export async function createPost(newPost)
{
	const db = conexao.db("imersao_backend");
	const colecao = db.collection("posts");
	return colecao.insertOne(newPost);
}

export async function updatePost(id, initPost) {
    const db = conexao.db("imersao_backend");
    const colecao = db.collection("posts");

    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:initPost});
}
