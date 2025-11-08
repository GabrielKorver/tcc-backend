//npm install nodemailer
import nodemailer from "nodemailer";
import nodeMailRepository from "../repository/nodemail.repository.js";

const nodeMailController = {
  async get() {
    return nodeMailRepository.get();
  },

  async recuperar(req, reply) {
    const { email } = req.body;

    const user = await nodeMailRepository.getByEmail(email);

    //VERIFICA O CAMPO SE ESTÁ EM BRANCO
    if (!email) {
      return reply.code(400).send({ message: "Informe o email!" });
    }

    if (!user) {
      return reply.code(401).send({ message: "Email inválido!" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: user.email,
        subject: "Recuperação de senha",
        text: `Olá ${user.nome}, sua senha cadastrada é: ${user.senha}`,
      });

      return reply
        .code(200)
        .send({ message: "Senha enviada para seu e-mail!" });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      return reply.code(500).send({ message: "Erro ao enviar o e-mail." });
    }
  },
};

export default nodeMailController;
