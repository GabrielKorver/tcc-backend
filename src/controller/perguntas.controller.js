import perguntasRepository from "../repository/perguntas.repository.js";

const perguntasController = {
  async get() {
    return perguntasRepository.get();
  },

  async post(req, reply) {
    const { titulo, pergunta, user_id, assunto_id } = req.body;

    const data_criacao = new Date().toISOString().slice(0, 19).replace("T", " ");

    try {
      const resultado = await perguntasRepository.post(
        titulo,
        pergunta,
        data_criacao,
        user_id,
        assunto_id
      );

      return reply
        .code(201)
        .send({
          message: "Pergunta cadastrada com sucesso!",
          data: resultado || null
        });

    } catch (error) {
      console.error("Erro ao cadastrar a pergunta:", error);

      return reply
        .code(500)
        .send({
          error: "Erro ao cadastrar pergunta"
        });
    }
  }


};

export default perguntasController;
