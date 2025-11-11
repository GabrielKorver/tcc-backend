//IMPORTAR O NEON E INSTALAR O NEON
//npm install @neondatabase/neon-js

import { neon } from "@neondatabase/serverless";

const db = neon(
  "postgresql://neondb_owner:npg_5ZqRKz6itcfU@ep-old-art-acs9eev0-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

const usersRepository = {
  async get() {
    return db`SELECT * FROM users`;
  },

  async post(nome, email, senha, avatar_url, biografia, habilidades) {
    return await db`INSERT INTO users(nome, email, senha, avatar_url, biografia, data_criacao, habilidades)
        VALUES(${nome}, ${email}, ${senha}, ${avatar_url}, ${biografia} , ${habilidades})
        `;
  },

  async put(id, nome, email, senha, avatar_url, biografia, habilidades) {
    try {
      // Monta query dinâmica — só atualiza campos enviados
      const result = await db`
      UPDATE users
      SET 
        nome = COALESCE(${nome}, nome),
        email = COALESCE(${email}, email),
        senha = COALESCE(${senha}, senha),
        avatar_url = COALESCE(${avatar_url}, avatar_url),
        biografia = COALESCE(${biografia}, biografia),
        habilidades = COALESCE(${habilidades}, habilidades)
      WHERE id = ${id}
      RETURNING *;
    `;

      return result;
    } catch (error) {
      console.error("Erro no repositório ao atualizar usuário:", error);
      throw error;
    }
  },

  async getEmailSenha(email, senha) {
    const rows = await db`
    SELECT * 
    FROM users 
    WHERE email = ${email} 
    AND senha = ${senha}
  `;
    return rows.length > 0 ? rows[0] : null;
  },
};

export default usersRepository;
