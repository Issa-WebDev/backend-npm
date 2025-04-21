import express from "express"
import nodemailer from "nodemailer"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/contact", (req, res) => {
  const { nom, email, numero, message, cible } = req.body;

  const destination =
    cible === "parapharmacie"
      ? process.env.TO_EMAIL_PARA
      : process.env.TO_EMAIL_PHARMA;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: destination,
    subject: `Nouveau message de Mr ${nom}`,
    text: `
      Nom: ${nom}
      Email: ${email}
      Numéro: ${numero}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erreur d'envoi", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.status(200).json({ message: "Message envoyé avec succès" });
  });
});


app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
