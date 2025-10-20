import { Router } from 'express';
import authRoutes from './auth.routes'; // ✅ Doit pointer vers le bon fichier
import patientRoutes from './patient.routes';
import userRoutes from './user.routes';
import medicalRecordRoutes from './medical-record.routes';

const router = Router();

// Route racine
router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'API Gestion Patients - Dialyse',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      patients: '/api/patients',
      users: '/api/users',
      medicalRecords: '/api/medical-records',
      health: '/health',
      test: '/api/test'
    }
  });
});

// Route test
router.get('/test', (_req, res) => {
  res.json({ success: true, message: 'Test route works!' });
});

// Monter les routes - VÉRIFIEZ CETTE PARTIE
router.use('/auth', authRoutes);        // ✅ /api/auth/login
router.use('/patients', patientRoutes); // /api/patients
router.use('/users', userRoutes);       // /api/users  
router.use('/medical-records', medicalRecordRoutes); // /api/medical-records

export default router;
