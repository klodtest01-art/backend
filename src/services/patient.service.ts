/**
 * Service pour les patients
 * Contient toute la logique métier pour gérer les patients
 */

import { PatientRepository } from '../repositories/patient.repository';
import { validatePatientData } from '../shared/utils/validation';
import type { Patient, TypePatient, Sexe, GroupeSanguin } from '../shared/types/patient';
import type { ID } from '../shared/types/common';

/**
 * Service Patient
 */
export class PatientService {
  private repository: PatientRepository;

  constructor() {
    this.repository = new PatientRepository();
  }

  /**
   * Récupère tous les patients
   * @returns Array de tous les patients
   */
  async getAllPatients(): Promise<Patient[]> {
    return this.repository.findAll();
  }

  /**
   * Récupère un patient par son ID
   * @param id - ID du patient
   * @returns Le patient
   * @throws Error si le patient n'existe pas
   */
  async getPatientById(id: ID): Promise<Patient> {
    const patient = await this.repository.findById(id);
    if (!patient) {
      throw new Error(`Patient avec l'ID ${id} non trouvé`);
    }
    return patient;
  }

  /**
   * Récupère plusieurs patients par leurs IDs
   * @param ids - Array d'IDs
   * @returns Array de patients
   */
  async getPatientsByIds(ids: ID[]): Promise<Patient[]> {
    return this.repository.findByIds(ids);
  }

  /**
   * Récupère les patients par type
   * @param type - Type de patient
   * @returns Array de patients du type demandé
   */
  async getPatientsByType(type: TypePatient): Promise<Patient[]> {
    return this.repository.findByType(type);
  }

  /**
   * Recherche de patients avec filtres
   * @param filters - Critères de recherche
   * @returns Array de patients correspondants
   */
  async searchPatients(filters: {
    search?: string;
    sexe?: Sexe;
    type?: TypePatient;
    groupeSanguin?: GroupeSanguin;
  }): Promise<Patient[]> {
    return this.repository.findByFilters(filters);
  }

  /**
   * Crée un nouveau patient
   * @param patientData - Données du patient
   * @returns Le patient créé
   * @throws Error si validation échoue ou CIN existe déjà
   */
  async createPatient(patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    // Validation des données
    const errors = validatePatientData(patientData);
    if (errors.length > 0) {
      throw new Error(`Validation échouée: ${errors.join(', ')}`);
    }

    // Vérifier que le CIN n'existe pas déjà
    const cinExists = await this.repository.existsByCin(patientData.cin);
    if (cinExists) {
      throw new Error(`Un patient avec le CIN ${patientData.cin} existe déjà`);
    }

    // Créer le patient
    return this.repository.create(patientData);
  }

  /**
   * Met à jour un patient
   * @param id - ID du patient
   * @param patientData - Données à mettre à jour
   * @returns Le patient mis à jour
   * @throws Error si le patient n'existe pas ou validation échoue
   */
  async updatePatient(id: ID, patientData: Partial<Patient>): Promise<Patient> {
    // Vérifier que le patient existe
    const existingPatient = await this.repository.findById(id);
    if (!existingPatient) {
      throw new Error(`Patient avec l'ID ${id} non trouvé`);
    }

    // Si le CIN change, vérifier qu'il n'existe pas déjà
    if (patientData.cin && patientData.cin !== existingPatient.cin) {
      const cinExists = await this.repository.existsByCin(patientData.cin, id);
      if (cinExists) {
        throw new Error(`Un patient avec le CIN ${patientData.cin} existe déjà`);
      }
    }

    // Mettre à jour
    const updatedPatient = await this.repository.update(id, patientData);
    if (!updatedPatient) {
      throw new Error(`Échec de la mise à jour du patient ${id}`);
    }

    return updatedPatient;
  }

  /**
   * Supprime un patient
   * @param id - ID du patient
   * @throws Error si le patient n'existe pas
   */
  async deletePatient(id: ID): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error(`Patient avec l'ID ${id} non trouvé`);
    }
  }

  /**
   * Récupère les statistiques des patients
   * @returns Statistiques (total, par type)
   */
  async getStatistics(): Promise<{
    total: number;
    permanent: number;
    vacancier: number;
    finTraitement: number;
  }> {
    const allPatients = await this.repository.findAll();
    
    return {
      total: allPatients.length,
      permanent: allPatients.filter(p => p.type_patient === 'Permanent').length,
      vacancier: allPatients.filter(p => p.type_patient === 'Vacancier').length,
      finTraitement: allPatients.filter(p => p.type_patient === 'Fin Traitement').length,
    };
  }
}