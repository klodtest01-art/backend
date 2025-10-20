// VOTRE CODE ORIGINAL qui fonctionnait
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { pool } from './config/database';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// API Routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Database connection test
const testDatabaseConnection = async (): Promise<void> => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Base de données PostgreSQL connectée');
  } catch (error) {
    console.error('❌ Échec de connexion à PostgreSQL:', error);
    process.exit(1);
  }
};

// Start server
const startServer = async (): Promise<void> => {
  try {
    await testDatabaseConnection();
    
    app.listen(env.PORT, () => {
      console.log(`🏥 API démarrée sur le port ${env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Échec du démarrage:', error);
    process.exit(1);
  }
};

startServer();
