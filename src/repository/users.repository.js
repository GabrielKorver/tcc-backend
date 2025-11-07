//IMPORTAR O NEON E INSTALAR O NEON
//npm install @neondatabase/neon-js

import { neon } from "@neondatabase/serverless"

const db = neon('postgresql://neondb_owner:npg_5ZqRKz6itcfU@ep-old-art-acs9eev0-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require')

const usersRepository = {
    async get() {
        return db`SELECT * FROM users`
    },

    async post(nome, email, senha, avatar_url, biografia, data_criacao, habilidades, palavra_passe) {
        return await db`INSERT INTO users(nome, email, senha, avatar_url, biografia, data_criacao, habilidades, palavra_passe)
        VALUES(${nome}, ${email}, ${senha}, ${avatar_url}, ${biografia} , ${data_criacao}, ${habilidades}, ${palavra_passe})
        `
    },

    async getEmailSenha(email, senha) {
        const rows = await db`
    SELECT * 
    FROM users 
    WHERE email = ${email} 
    AND senha = ${senha}
  `;
        return rows.length > 0 ? rows[0] : null;
    }

}

export default usersRepository