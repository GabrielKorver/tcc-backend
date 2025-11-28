import { neon } from "@neondatabase/serverless";

const db = neon(
    "postgresql://neondb_owner:npg_5ZqRKz6itcfU@ep-old-art-acs9eev0-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

const dataRepository = {
    async get() {
        return db`SELECT * FROM data`;
    },

    async post(agenda_data) {
        return await db`INSERT INTO data(agenda_data)
          VALUES(${agenda_data})
          RETURNING *;   
          `;
    },
};

export default dataRepository;
