/**
 * Serveur principal de l'application
 * Point d'entrée du backend
 */

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { pool } from './config/database';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

// Créer l'application Express
const app: Application = express();

// ============================================
// MIDDLEWARE DE SÉCURITÉ
// ============================================

// Helmet - Sécurise les headers HTTP
app.use(helmet());

// CORS - Autorise les requêtes cross-origin
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));

// Gérer toutes les requêtes OPTIONS pour le préflight CORS
app.options('*', cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));

// ============================================
// MIDDLEWARE DE PARSING
// ============================================

// Parser JSON (limite 10MB)
app.use(express.json({ limit: '10mb' }));

// Parser URL-encoded (limite 10MB)
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// MIDDLEWARE DE LOGGING
// ============================================

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// ============================================
// ROUTES API
// ============================================

app.use('/api', routes);

// ============================================
// GESTION DES ERREURS
// ============================================

app.use(notFoundHandler);
app.use(errorHandler);

// ============================================
// TEST DE CONNEXION À LA BASE DE DONNÉES
// ============================================

const testDatabaseConnection = async (): Promise<void> => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Base de données PostgreSQL connectée');
  } catch (error) {
    console.error('❌ Échec de connexion à PostgreSQL:', error);
    process.exit(1);
  }
};

// ============================================
// ARRÊT GRACIEUX
// ============================================

const gracefulShutdown = async (): Promise<void> => {
  console.log('\n🛑 Arrêt du serveur en cours...');
  try {
    await pool.end();
    console.log('✅ Pool PostgreSQL fermé');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de l\'arrêt:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

const startServer = async (): Promise<void> => {
  try {
    await testDatabaseConnection();

    app.listen(env.PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════════════╗
║   🏥 API Gestion Patients - Dialyse                  ║
║   Environment: ${env.NODE_ENV}                       ║
║   Port: ${env.PORT}                                   ║
║   URL: http://localhost:${env.PORT}                  ║
║   API: http://localhost:${env.PORT}/api               ║
║   Health: http://localhost:${env.PORT}/health         ║
╚═══════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Échec du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();
