import { neon } from "@neondatabase/serverless";

const db = neon(
  "postgresql://neondb_owner:npg_5ZqRKz6itcfU@ep-old-art-acs9eev0-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

const mentoriaRepository = {
  async get() {
    return db`SELECT * FROM mentoria`;
  },

  async post(nome) {
    return await db`INSERT INTO mentoria(nome)
          VALUES(${nome})
          RETURNING *;   
          `;
  },
};

export default mentoriaRepository;
