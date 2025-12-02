import { neon } from "@neondatabase/serverless";

const db = neon(
    "postgresql://neondb_owner:npg_5ZqRKz6itcfU@ep-old-art-acs9eev0-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

const respostasRepository = {
    async get() {
  return db`
      SELECT
      r.id,
      r.resposta,
      r.data_criacao,

      r.usuario_id,
      u.nome AS user_name,
      u.avatar_url AS user_avatar,

      r.pergunta_id

    FROM respostas AS r
    JOIN users AS u ON r.usuario_id = u.id
    ORDER BY r.data_criacao DESC;
  `;
},

    async post(usuario_id,pergunta_id,resposta,data_criacao) {
        return await db`INSERT INTO respostas(usuario_id,pergunta_id,resposta,data_criacao)
          VALUES(${usuario_id},${pergunta_id},${resposta},${data_criacao})
          RETURNING *;   
          `;
    },

//     async put(id, agenda_data) {
//         return await db`
//     UPDATE data
//     SET agenda_data = ${agenda_data}
//     WHERE id = ${id}
//   `;
//     },

//     async delete(id) {
//         await db`DELETE FROM data WHERE id = ${id}`;
//         return { message: "Data deletada com sucesso!" };
//     }

};

export default respostasRepository;
