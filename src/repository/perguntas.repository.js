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
          p.pergunta,
          p.data_criacao,
          p.user_id,
          u.nome AS user_name,
          u.avatar_url AS user_avatar,
          a.nome AS assunto_nome        -- Adicionado o nome do assunto
        FROM
          perguntas AS p
        JOIN
          users AS u ON p.user_id = u.id
        LEFT JOIN                           -- Usando LEFT JOIN para mais segurança
          assuntos AS a ON p.assunto_id = a.id
        ORDER BY
          p.data_criacao DESC
      `;
      return perguntas;
    } catch (error) {
      console.error("❌ Erro ao buscar perguntas:", error);
      throw error;
    }
  },

  async post(titulo, pergunta, data_criacao, user_id, assunto_id) {
    return await db`
        INSERT INTO perguntas(titulo, pergunta, data_criacao, user_id, assunto_id)
        VALUES(${titulo}, ${pergunta}, ${data_criacao}, ${user_id}, ${assunto_id})
    `;
  },
};

export default perguntasRepository;
