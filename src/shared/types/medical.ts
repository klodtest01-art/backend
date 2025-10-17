/**
 * Types pour les dossiers médicaux
 * SOURCE DE VÉRITÉ - Copie de src/shared/types/medical.ts
 */

import { BaseEntity, ID } from './common';

// Interface MedicalRecord
export interface MedicalRecord extends BaseEntity {
  patientId: ID;
  category: string;
  subCategory?: string;
  date: Date;
  details?: string;
  createdBy: ID; // User qui a créé l'entrée
}