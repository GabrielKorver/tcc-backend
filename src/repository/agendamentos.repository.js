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
          TO_CHAR(a.data_agendamento, 'DD/MM/YYYY HH24:MI') AS data_agendamento, 
          TO_CHAR(a.data_criacao, 'DD/MM/YYYY HH24:MI:SS') AS data_criacao, 
          a.mentoria_id, 
          m.nome AS mentoria_nome 
        FROM agendamentos AS a 
        JOIN mentoria AS m ON a.mentoria_id = m.id
        ORDER BY a.data_agendamento DESC
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

  async put(id, nome, telefone, data_agendamento,) {
    return await db`UPDATE agendamentos
      SET nome = ${nome},
          telefone = ${telefone},
          data_agendamento = ${data_agendamento}
      WHERE id = ${id}
    `;
  },


  async findByDate(data_agendamento) {
    try {
      const result = await db`
      SELECT *
      FROM agendamentos
      WHERE data_agendamento = ${data_agendamento}
    `;

      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error("Erro ao verificar data:", error);
      throw error;
    }
  },

  async delete(id) {
    await db`DELETE FROM agendamentos WHERE id = ${id}`;
    return { message: "Agendamento deletado com sucesso!" };
  },
};

export default agendamentosRepository;
