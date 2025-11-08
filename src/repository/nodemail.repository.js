import { neon } from "@neondatabase/serverless";

const db = neon(
  "postgresql://neondb_owner:npg_5ZqRKz6itcfU@ep-old-art-acs9eev0-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

const nodeMailRepository = {
  async get() {
    return `Nodemail funcionando`;
  },

  async getByEmail(email) {
    const result = await db`
        SELECT * FROM users 
        WHERE email = ${email}
  `;
    return result[0];
  },
};

export default nodeMailRepository;
