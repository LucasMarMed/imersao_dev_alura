import conectarAoBanco from "../config/dbConfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

export async function getTodosPosts() {
    const db = conexao.db("imersao_backend");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

// function getIDPost(id) {
//     return posts.findIndex((post) => {
//         return post.id === Number(id)
//     })
// };