import usersRepository from "../repository/users.repository.js";

const usersController = {
  async get() {
    return usersRepository.get();
  },

  async post(req, reply) {
    const { nome, email, senha, avatar_url, biografia, habilidades } = req.body;

    await usersRepository.post(
      nome,
      email,
      senha,
      avatar_url,
      biografia,
      habilidades
    );

    return "Usuario cadastrado com sucesso!";
  },

  async put(req, reply) {
    try {
      const { id } = req.params;
      const { nome, email, senha, avatar_url, biografia, habilidades } =
        req.body;

      //  Valida ID
      if (!id) {
        return reply
          .status(400)
          .send({ error: "O ID do usuário é obrigatório." });
      }

      //  Valida nome
      if (!nome || nome.trim() === "") {
        return reply
          .status(400)
          .send({ error: "O campo 'nome' é obrigatório." });
      }

      //  Valida email
      if (!email || email.trim() === "") {
        return reply
          .status(400)
          .send({ error: "O campo 'email' é obrigatório." });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return reply.status(400).send({ error: "E-mail inválido." });
      }

      if (!senha) {
        return reply.status(400).send({
          error: "Preencha a senha.",
        });
      }

      //  Valida senha (somente se enviada)
      if (senha.length < 7) {
        return reply.status(400).send({
          error: "A senha deve ter pelo menos 8 caracteres.",
        });
      }

      //  Valida avatar_url (opcional, mas se informado deve ser uma URL)
      if (avatar_url && !/^https?:\/\/.+/i.test(avatar_url)) {
        return reply.status(400).send({
          error: "A URL do avatar deve começar com http ou https.",
        });
      }

      //  Normaliza bio e habilidades
      const bioFinal = biografia?.trim() || "";
      const habilidadesFinal = habilidades?.trim() || "";

      // Atualiza o usuário no banco
      const result = await usersRepository.put(
        id,
        nome,
        email,
        senha,
        avatar_url,
        bioFinal,
        habilidadesFinal
      );

      // 🔹 Se não retornou usuário, pode ter ocorrido erro no repositório
      if (!result || result.length === 0) {
        return reply.status(404).send({ error: "Usuário não encontrado." });
      }

      // 🔹 Retorna JSON completo e pronto pro front
      return reply.status(200).send({
        message: "Usuário atualizado com sucesso!",
        usuario: result[0],
      });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return reply.status(500).send({
        error: "Erro interno ao atualizar usuário.",
        detalhes: error.message,
      });
    }
  },

  async login(req, reply) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return reply.status(400).send({ message: "Preencha todos os campos." });
      }

      const user = await usersRepository.getEmailSenha(email, senha);

      if (!user) {
        return reply
          .status(401)
          .send({ message: "E-mail ou senha inválidos." });
      }

      return reply.status(200).send({
        message: "Login realizado com sucesso!",
        user,
      });
    } catch (error) {
      console.error(error);
      return reply
        .status(500)
        .send({ message: "Erro ao realizar teste.", error: error.message });
    }
  },
};

export default usersController;
