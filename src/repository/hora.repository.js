import { neon } from "@neondatabase/serverless";

const db = neon(
    "postgresql://neondb_owner:npg_5ZqRKz6itcfU@ep-old-art-acs9eev0-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

const horaRepository = {
    async get() {
        return db`SELECT * FROM hora`;
    },

    async post(agenda_hora) {
        return await db`INSERT INTO hora(agenda_hora)
          VALUES(${agenda_hora})
          RETURNING *;   
          `;
    },

    async put(id, agenda_hora) {
        return await db`
    UPDATE hora
    SET agenda_hora = ${agenda_hora}
    WHERE id = ${id}
  `;
    },

    async delete(id) {
        await db`DELETE FROM hora WHERE id = ${id}`;
        return { message: "Hora deletada com sucesso!" };
    }
};

export default horaRepository;
