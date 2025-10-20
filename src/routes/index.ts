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

// ============================================
// ROUTES DE TEST ET DIAGNOSTIC
// ============================================

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

// Route test simple
router.get('/test', (_req, res) => {
  res.json({ success: true, message: 'Test route works!' });
});

// Test spécifique pour auth
router.get('/auth-test', (_req, res) => {
  res.json({ success: true, message: 'Auth route test works!' });
});

// ============================================
// MONTER LES ROUTES PRINCIPALES
// ============================================

console.log('🔧 Mounting routes...'); // Debug

// Monter les routes sur leurs chemins respectifs
router.use('/auth', authRoutes);           // → /api/auth/login
router.use('/patients', patientRoutes);    // → /api/patients
router.use('/users', userRoutes);          // → /api/users  
router.use('/medical-records', medicalRecordRoutes); // → /api/medical-records

console.log('✅ All routes mounted successfully'); // Debug

export default router;
