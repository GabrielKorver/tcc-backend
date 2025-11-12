import perguntasRepository from "../repository/perguntas.repository.js";

const perguntasController = {
  async get() {
    return perguntasRepository.get();
  },

  async post(req, res) {
    const { titulo, descricao, data_criacao, user_id, assunto_id } = req.body;

    await perguntasRepository.post(
      titulo,
      descricao,
      data_criacao,
      user_id,
      assunto_id
    );

    return "Pergunta cadastrada com sucesso!";
  },
};

export default perguntasController;
