import usersRepository from "../repository/users.repository.js"

const usersController = {
    async get() {
        return usersRepository.get()
    },

    async post(req, reply) {
        const { nome, email, senha, avatar_url, biografia, data_criacao, habilidades, palavra_passe } = req.body

        await usersRepository.post(nome, email, senha, avatar_url, biografia, data_criacao, habilidades, palavra_passe)

        return 'Usuario cadastrado com sucesso!'
    },


    async login(req, reply) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return reply.status(400).send({ message: "Preencha todos os campos." });
            }

            const user = await usersRepository.getEmailSenha(email, senha);

            if (!user) {
                return reply.status(401).send({ message: "E-mail ou senha inválidos." });
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
    }
}

export default usersController