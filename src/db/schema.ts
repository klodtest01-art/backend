/**
 * Schéma de la base de données
 * Définit les types pour les lignes de la DB et les fonctions de mapping
 * vers les types de l'application
 */

import type { 
  Patient, 
  Sexe, 
  GroupeSanguin, 
  TypePatient, 
  CauseFin, 
  SituationFamiliale 
} from '../shared/types/patient';
import type { User, UserRole } from '../shared/types/user';
import type { MedicalRecord } from '../shared/types/medical';
import type { ID } from '../shared/types/common';

/**
 * Type pour une ligne de la table patients
 * Les dates sont des strings car PostgreSQL retourne des ISO strings
 */
export interface PatientRow {
  id: ID;
  nom_complet: string;
  cin: number;
  ass_cnss: string;
  date_naissance: string; // ISO string from DB
  sexe: Sexe;
  groupe_sanguin: GroupeSanguin;
  profession: string | null;
  situation_familiale: SituationFamiliale | null;
  telephone: number | null;
  telephone_urgence: number | null;
  adresse: string | null;
  date_debut: string; // ISO string from DB
  type_patient: TypePatient;
  date_fin: string | null; // ISO string from DB
  cause_fin: CauseFin | null;
  created_at: string;
  updated_at: string;
}

/**
 * Type pour une ligne de la table users
 */
export interface UserRow {
  id: ID;
  username: string;
  password: string;
  role: UserRole;
  assigned_patients: ID[]; // PostgreSQL array type
  created_at: string;
  updated_at: string;
}

/**
 * Type pour une ligne de la table medical_records
 */
export interface MedicalRecordRow {
  id: ID;
  patient_id: ID;
  category: string;
  sub_category: string | null;
  date: string; // ISO string from DB
  details: string | null;
  created_by: ID;
  created_at: string;
  updated_at: string;
}

/**
 * Convertit une ligne Patient de la DB vers le type Patient de l'app
 * @param row - Ligne de la base de données
 * @returns Object Patient avec les dates converties
 */
export const rowToPatient = (row: PatientRow): Patient => ({
  id: row.id,
  nom_complet: row.nom_complet,
  cin: row.cin,
  ass_cnss: row.ass_cnss,
  date_naissance: new Date(row.date_naissance),
  sexe: row.sexe,
  groupe_sanguin: row.groupe_sanguin,
  profession: row.profession ?? undefined,
  situation_familiale: row.situation_familiale ?? undefined,
  telephone: row.telephone ?? undefined,
  telephone_urgence: row.telephone_urgence ?? undefined,
  adresse: row.adresse ?? undefined,
  date_debut: new Date(row.date_debut),
  type_patient: row.type_patient,
  date_fin: row.date_fin ? new Date(row.date_fin) : null,
  cause_fin: row.cause_fin ?? undefined,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

/**
 * Convertit une ligne User de la DB vers le type User de l'app
 * @param row - Ligne de la base de données
 * @returns Object User avec les dates converties
 */
export const rowToUser = (row: UserRow): User => ({
  id: row.id,
  username: row.username,
  password: row.password,
  role: row.role,
  assignedPatients: row.assigned_patients,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});

/**
 * Convertit une ligne MedicalRecord de la DB vers le type MedicalRecord de l'app
 * @param row - Ligne de la base de données
 * @returns Object MedicalRecord avec les dates converties
 */
export const rowToMedicalRecord = (row: MedicalRecordRow): MedicalRecord => ({
  id: row.id,
  patientId: row.patient_id,
  category: row.category,
  subCategory: row.sub_category ?? undefined,
  date: new Date(row.date),
  details: row.details ?? undefined,
  createdBy: row.created_by,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
});