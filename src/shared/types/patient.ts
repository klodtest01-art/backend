/**
 * Types pour les patients
 * SOURCE DE VÉRITÉ - Copie de src/shared/types/patient.ts
 */

import { BaseEntity } from './common';

// Types énumérés pour les patients
export type Sexe = "Homme" | "Femme";
export type GroupeSanguin = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type TypePatient = "Permanent" | "Vacancier" | "Fin Traitement";
export type CauseFin = "Transféré" | "Décès" | "Greffe";
export type SituationFamiliale = "Célibataire" | "Marié(e)" | "Divorcé(e)" | "Veuf(ve)";

// Interface Patient
export interface Patient extends BaseEntity {
  nom_complet: string;
  cin: number;
  ass_cnss: string;
  date_naissance: Date;
  sexe: Sexe;
  groupe_sanguin: GroupeSanguin;
  profession?: string;
  situation_familiale?: SituationFamiliale;
  telephone?: number;
  telephone_urgence?: number;
  adresse?: string;
  date_debut: Date;
  type_patient: TypePatient;
  date_fin?: Date | null;
  cause_fin?: CauseFin;
}