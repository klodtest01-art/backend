/**
 * Service pour les utilisateurs (SANS hashage)
 */

import { UserRepository } from '../repositories/user.repository';
import { VALIDATION_CONSTANTS } from '../config/constants';
import type { User, UserRole } from '../shared/types/user';
import type { ID } from '../shared/types/common';

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const users = await this.repository.findAll();
    return users.map(({ password: _, ...user }) => user);
  }

  async getUserById(id: ID): Promise<Omit<User, 'password'>> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUserByUsername(username: string): Promise<Omit<User, 'password'>> {
    const user = await this.repository.findByUsername(username);
    if (!user) {
      throw new Error(`Utilisateur ${username} non trouvé`);
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getUsersByRole(role: UserRole): Promise<Omit<User, 'password'>[]> {
    const users = await this.repository.findByRole(role);
    return users.map(({ password: _, ...user }) => user);
  }

  /**
   * Crée un utilisateur (mot de passe en clair)
   */
  async createUser(userData: {
    username: string;
    password: string;
    role: UserRole;
    assignedPatients?: ID[];
  }): Promise<Omit<User, 'password'>> {
    //console.log('🎯 USER SERVICE - createUser appelé avec:', userData);
    if (!userData.username || userData.username.trim().length < VALIDATION_CONSTANTS.MIN_USERNAME_LENGTH) {
      throw new Error(`Le nom d'utilisateur doit contenir au moins ${VALIDATION_CONSTANTS.MIN_USERNAME_LENGTH} caractères`);
    }

    if (userData.username.length > VALIDATION_CONSTANTS.MAX_USERNAME_LENGTH) {
      throw new Error(`Le nom d'utilisateur ne peut pas dépasser ${VALIDATION_CONSTANTS.MAX_USERNAME_LENGTH} caractères`);
    }

    if (!userData.password || userData.password.length < VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH) {
      throw new Error(`Le mot de passe doit contenir au moins ${VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH} caractères`);
    }
//console.log('🔍 USER SERVICE - Vérification si username existe...');
    const usernameExists = await this.repository.existsByUsername(userData.username);
    if (usernameExists) {
      throw new Error(`Le nom d'utilisateur ${userData.username} existe déjà`);
    }
//console.log('🔍 USER SERVICE - Création de l\'utilisateur...');
    // ✅ Pas de hashage, mot de passe en clair
    const newUser = await this.repository.create({
      username: userData.username,
      password: userData.password, // En clair
      role: userData.role,
      assignedPatients: userData.assignedPatients || [],
    });
//console.log('✅ USER SERVICE - Utilisateur créé en DB:', newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async updateUser(
    id: ID,
    userData: Partial<Omit<User, 'password'>>
  ): Promise<Omit<User, 'password'>> {
    const existingUser = await this.repository.findById(id);
    if (!existingUser) {
      throw new Error(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    if (userData.username && userData.username !== existingUser.username) {
      const usernameExists = await this.repository.existsByUsername(userData.username, id);
      if (usernameExists) {
        throw new Error(`Le nom d'utilisateur ${userData.username} existe déjà`);
      }
    }

    const updatedUser = await this.repository.update(id, userData);
    if (!updatedUser) {
      throw new Error(`Échec de la mise à jour de l'utilisateur ${id}`);
    }

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(id: ID): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error(`Utilisateur avec l'ID ${id} non trouvé`);
    }
  }

  async assignPatients(userId: ID, patientIds: ID[]): Promise<Omit<User, 'password'>> {
    const user = await this.repository.updateAssignedPatients(userId, patientIds);
    if (!user) {
      throw new Error(`Utilisateur avec l'ID ${userId} non trouvé`);
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async addAssignedPatient(userId: ID, patientId: ID): Promise<Omit<User, 'password'>> {
    const user = await this.repository.addAssignedPatient(userId, patientId);
    if (!user) {
      throw new Error(`Utilisateur avec l'ID ${userId} non trouvé`);
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async removeAssignedPatient(userId: ID, patientId: ID): Promise<Omit<User, 'password'>> {
    const user = await this.repository.removeAssignedPatient(userId, patientId);
    if (!user) {
      throw new Error(`Utilisateur avec l'ID ${userId} non trouvé`);
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

}
