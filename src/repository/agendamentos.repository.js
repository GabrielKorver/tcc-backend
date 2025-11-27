//IMPORTAR O NEON E INSTALAR O NEON
//npm install @neondatabase/neon-js

import { neon } from "@neondatabase/serverless";

const db = neon(
    "postgresql://neondb_owner:npg_5ZqRKz6itcfU@ep-old-art-acs9eev0-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

const agendamentosRepository = {
    async get() {
        try {
            const agendamentos = await db`
            SELECT
                a.id,
                a.nome,
                a.telefone,
                a.data_agendamento,
                a.data_criacao,
                a.mentoria_id,
                m.nome AS mentoria_nome
            FROM
                agendamentos AS a
            JOIN
                mentoria AS m ON a.mentoria_id = m.id
        `;

            return agendamentos;

        } catch (error) {
            console.error("❌ Erro ao buscar agendamentos:", error);
            throw error;
        }
    },

    async post(nome, telefone, data_agendamento, data_criacao, mentoria_id) {
        return await db`INSERT INTO agendamentos(nome, telefone , data_agendamento, data_criacao, mentoria_id)
        VALUES (${nome}, ${telefone}, ${data_agendamento}, ${data_criacao}, ${mentoria_id})
        `;
    },

    async delete(id) {
        await db`DELETE FROM agendamentos WHERE id = ${id}`;
        return { message: "Agendamento deletado com sucesso!" };
    },

};

export default agendamentosRepository;
