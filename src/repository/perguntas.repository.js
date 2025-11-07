import { neon } from "@neondatabase/serverless";

const db = neon(
  "postgresql://neondb_owner:npg_5ZqRKz6itcfU@ep-old-art-acs9eev0-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

const perguntasRepository = {

  async get() {
    try {
      const perguntas = await db`
      SELECT
        p.id,
        p.titulo,
        p.descricao,
        p.tecnologias,
        p.data_criacao,
        p.user_id,
        u.nome AS user_name,
        u.avatar_url AS user_avatar
      FROM
        perguntas AS p
      JOIN
        users AS u ON p.user_id = u.id
      ORDER BY
        p.data_criacao DESC
    `;
      // db`` retorna direto um array de objetos
      return perguntas;
    } catch (error) {
      console.error("❌ Erro ao buscar perguntas:", error);
      throw error;
    }
  },

  async post(titulo, descricao, tecnologias, data_criacao, user_id) {
    return await db`INSERT INTO perguntas(titulo, descricao, tecnologias, data_criacao, user_id)
        VALUES(${titulo}, ${descricao}, ${tecnologias}, ${data_criacao}, ${user_id})
        `
  }

}

export default perguntasRepository;
