import conectDB from "../config/dbConfig.js"

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