import { neon } from "@neondatabase/serverless";

const db = neon(
  "postgresql://neondb_owner:npg_5ZqRKz6itcfU@ep-old-art-acs9eev0-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

const assuntosRepository = {
  async get() {
    return db`SELECT * FROM assuntos`;
  },

  async post(nome) {
    return await db`INSERT INTO assuntos(nome)
          VALUES(${nome})
          RETURNING *;   
          `;
  },
};

export default assuntosRepository;
