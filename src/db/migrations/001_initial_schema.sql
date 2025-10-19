-- ============================================
-- MIGRATION 001: Schéma Initial
-- Création de toutes les tables et types
-- ============================================

-- Créer les types énumérés (ENUM)
-- Ces types garantissent que seules les valeurs valides sont insérées

CREATE TYPE sexe_type AS ENUM ('Homme', 'Femme');

CREATE TYPE groupe_sanguin_type AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');

CREATE TYPE type_patient_type AS ENUM ('Permanent', 'Vacancier', 'Fin Traitement');

CREATE TYPE cause_fin_type AS ENUM ('Transféré', 'Décès', 'Greffe');

CREATE TYPE situation_familiale_type AS ENUM ('Célibataire', 'Marié(e)', 'Divorcé(e)', 'Veuf(ve)');

CREATE TYPE user_role_type AS ENUM ('admin', 'user');

-- ============================================
-- TABLE: users
-- Stocke les utilisateurs du système
-- ============================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role_type NOT NULL DEFAULT 'user',
    assigned_patients INTEGER[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour recherche rapide par username
CREATE INDEX idx_users_username ON users(username);

-- ============================================
-- TABLE: patients
-- Stocke les informations des patients
-- ============================================
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    nom_complet VARCHAR(200) NOT NULL,
    cin BIGINT UNIQUE NOT NULL,
    ass_cnss VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    sexe sexe_type NOT NULL,
    groupe_sanguin groupe_sanguin_type NOT NULL,
    profession VARCHAR(200),
    situation_familiale situation_familiale_type,
    telephone BIGINT,
    telephone_urgence BIGINT,
    adresse TEXT,
    date_debut DATE NOT NULL,
    type_patient type_patient_type NOT NULL,
    date_fin DATE,
    cause_fin cause_fin_type,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contrainte: date_fin doit être après date_debut
    CONSTRAINT check_date_fin CHECK (date_fin IS NULL OR date_fin >= date_debut),
    
    -- Contrainte: cause_fin est obligatoire si type = 'Fin Traitement'
    CONSTRAINT check_cause_fin CHECK (
        (type_patient = 'Fin Traitement' AND cause_fin IS NOT NULL) OR 
        (type_patient != 'Fin Traitement' AND cause_fin IS NULL)
    )
);

-- Index pour recherches fréquentes
CREATE INDEX idx_patients_nom ON patients(nom_complet);
CREATE INDEX idx_patients_cin ON patients(cin);
CREATE INDEX idx_patients_type ON patients(type_patient);
CREATE INDEX idx_patients_date_debut ON patients(date_debut);

-- ============================================
-- TABLE: medical_records
-- Stocke les dossiers médicaux des patients
-- ============================================
CREATE TABLE medical_records (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    sub_category VARCHAR(100),
    date DATE NOT NULL,
    details TEXT,
    created_by INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour recherches fréquentes
CREATE INDEX idx_medical_records_patient ON medical_records(patient_id);
CREATE INDEX idx_medical_records_category ON medical_records(category);
CREATE INDEX idx_medical_records_date ON medical_records(date);

-- ============================================
-- TRIGGER: Auto-update updated_at
-- Met à jour automatiquement le champ updated_at
-- ============================================

-- Fonction trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour patients
CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour users
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour medical_records
CREATE TRIGGER update_medical_records_updated_at
    BEFORE UPDATE ON medical_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FIN DU SCRIPT
-- ============================================