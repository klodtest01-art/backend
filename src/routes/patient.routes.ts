/**
 * Routes pour les patients
 * Définit tous les endpoints liés aux patients
 */

import { Router, Response } from 'express';
import { PatientService } from '../services/patient.service';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/error.middleware';
import { sendSuccess, sendCreated, sendNoContent } from '../utils/response';
import type { Patient } from '../shared/types/patient';

const router = Router();
const patientService = new PatientService();

/**
 * GET /patients
 * Récupère tous les patients ou filtre selon les query params
 */
router.get(
  '/',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { search, sexe, type, groupeSanguin } = req.query;

    // Construire les filtres
    const filters = {
      ...(search && { search: search as string }),
      ...(sexe && sexe !== 'tous' && { sexe: sexe as Patient['sexe'] }),
      ...(type && type !== 'tous' && { type: type as Patient['type_patient'] }),
      ...(groupeSanguin && groupeSanguin !== 'tous' && { 
        groupeSanguin: groupeSanguin as Patient['groupe_sanguin'] 
      }),
    };

    // Récupérer les patients
    const patients = Object.keys(filters).length > 0
      ? await patientService.searchPatients(filters)
      : await patientService.getAllPatients();

    // Si c'est un user (pas admin), filtrer par patients assignés
    if (req.user?.role === 'user') {
      // TODO: Implémenter le filtrage par assignedPatients
      // Pour l'instant, retourner tous les patients
    }

    sendSuccess(res, patients);
  })
);

/**
 * GET /patients/statistics
 * Récupère les statistiques des patients
 * Réservé aux admins
 */
router.get(
  '/statistics',
  authenticate,
  authorize('admin'),
  asyncHandler(async (_req: AuthRequest, res: Response) => {
    const stats = await patientService.getStatistics();
    sendSuccess(res, stats);
  })
);

/**
 * GET /patients/:id
 * Récupère un patient par son ID
 */
router.get(
  '/:id',
  authenticate,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const patient = await patientService.getPatientById(id);
    sendSuccess(res, patient);
  })
);

/**
 * POST /patients
 * Crée un nouveau patient
 * Réservé aux admins
 */
router.post(
  '/',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const patientData = req.body; // Directement req.body
    const patient = await patientService.createPatient(patientData);
    sendCreated(res, patient, 'Patient créé avec succès');
  })
);

/**
 * PUT /patients/:id
 * Met à jour un patient
 * Réservé aux admins
 */
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = parseInt(req.params.id, 10);
    
    // ❌ SUPPRIMEZ ces conversions !
    // const patientData = {
    //   ...req.body,
    //   ...(req.body.date_naissance && { date_naissance: new Date(req.body.date_naissance) }),
    //   ...(req.body.date_debut && { date_debut: new Date(req.body.date_debut) }),
    //   ...(req.body.date_fin && { date_fin: new Date(req.body.date_fin) }),
    // };
    
    // ✅ UTILISEZ directement req.body
    const patientData = req.body;

    const patient = await patientService.updatePatient(id, patientData);
    sendSuccess(res, patient, 'Patient modifié avec succès');
  })
);

/**
 * DELETE /patients/:id
 * Supprime un patient
 * Réservé aux admins
 */
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = parseInt(req.params.id, 10);
    await patientService.deletePatient(id);
    sendNoContent(res);
  })
);

export default router;