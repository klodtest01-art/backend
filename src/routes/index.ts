/**
 * Point d'entrée de toutes les routes
 * Agrège toutes les routes de l'application
 */

import { Router } from 'express';
import authRoutes from './auth.routes';
import patientRoutes from './patient.routes';
import userRoutes from './user.routes';
import medicalRecordRoutes from './medical-record.routes';

const router = Router();

// ✅ AJOUTER une route racine pour /api
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Gestion Patients - Dialyse',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      patients: '/api/patients', 
      users: '/api/users',
      medicalRecords: '/api/medical-records'
    }
  });
});

// Monter les routes sur leurs chemins respectifs
router.use('/auth', authRoutes);           // ✅ /api/auth/login
router.use('/patients', patientRoutes);
router.use('/users', userRoutes);
router.use('/medical-records', medicalRecordRoutes);

export default router;
