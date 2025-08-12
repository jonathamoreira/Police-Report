import nodemailer from "nodemailer";

// Credenciais de envio e URL do site, mantidas em variáveis de ambiente por segurança
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const siteUrl = process.env.SITE_URL;

const transporter = nodemailer.createTransport({
  service: "gmail", // Você pode usar outros serviços como 'Outlook', 'Yahoo', etc.
  auth: {
    user,
    pass,
  },
});

export const sendVerificationEmail = async (
  userEmail,
  userName,
  verificationToken
) => {
  // URL de verificação que o usuário irá clicar
  const verificationLink = `${siteUrl}/user/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: `"Equipe da Autarquia de Trânsito" <${user}>`,
    to: userEmail,
    subject: "Confirmação de Registro",
    html: `
            <p>Olá, ${userName},</p>
            <p>Obrigado por se registrar! Para ativar sua conta, por favor, clique no link abaixo:</p>
            <a href="${verificationLink}" style="color: #ffffff; background-color: #007BFF; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Confirmar E-mail
            </a>
            <p>Se você não se registrou, pode ignorar este e-mail com segurança.</p>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`E-mail de verificação enviado para ${userEmail}`);
  } catch (error) {
    console.error("Erro ao enviar e-mail de verificação:", error);
    throw new Error("Falha ao enviar e-mail de verificação.");
  }
};
