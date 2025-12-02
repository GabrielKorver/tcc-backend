import respostasRepository from "../repository/respostas.repository.js";

const respostasController = {
  async get() {
    return respostasRepository.get();
  },

  async post(req, reply) {
    try {
      const {usuario_id, pergunta_id, resposta} = req.body;

      const data_criacao = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " "); 


      if (!resposta) {
        return reply.status(400).send({
          error: "Campo obrigatório",
        });
      }

      if (resposta.length <20) {
        return reply.status(400).send({
          error: "Sua resposta deve ter no mínimo 20 caractéres",
        });
      }

      await respostasRepository.post(usuario_id, pergunta_id, resposta, data_criacao);

      return reply.status(201).send({
        message: "Resposta cadastrada com sucesso!",
      });
    } catch (error) {
      console.error("❌ Erro no controller:", error);

      return reply.status(500).send({
        error: "Erro interno no servidor. Tente novamente mais tarde.",
      });
    }
  },

  // async put(req, reply) {
  //     try {
  //         const { id } = req.params;
  //         const { agenda_data } = req.body;
  //         await dataRepository.put(id, agenda_data);
  //         return reply.status(200).send({ message: "Data atualizada com sucesso!" });
  //     } catch (error) {
  //         console.error("Erro ao atualizar Data:", error);
  //         return reply.status(500).send({ message: "Erro interno ao atualizar." });
  //     }
  // },

  // async delete(req, reply) {
  //     try {
  //         const { id } = req.params;
  //         const resultado = await dataRepository.delete(id);
  //         return reply.status(200).send(resultado);
  //     } catch (error) {
  //         console.error("Erro ao deletar:", error);
  //         return reply.status(500).send({ message: "Erro interno ao deletar." });
  // //     }
  // }
};

export default respostasController;
