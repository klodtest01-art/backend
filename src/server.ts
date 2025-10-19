import cors from 'cors';

// CORS sécurisé pour Netlify
const allowedOrigins = [env.CORS_ORIGIN]; // https://imen2025.netlify.app

app.use(cors({
  origin: (origin, callback) => {
    // Autoriser les requêtes sans origin (ex: Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `⚠️ CORS non autorisé pour l'origine ${origin}`;
      console.warn(msg);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // si tu envoies Authorization header ou cookies
}));

// Pour permettre aux navigateurs de faire les preflight requests OPTIONS
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
}));
