-- ============================================
-- SCRIPT DE REMPLISSAGE COMPLET
-- Remplit toutes les tables avec des données de test
-- ============================================

-- ============================================
-- 1. NETTOYER LES DONNÉES EXISTANTES
-- ============================================

DELETE FROM medical_records;
DELETE FROM patients;
DELETE FROM users;

-- Réinitialiser les séquences
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE patients_id_seq RESTART WITH 1;
ALTER SEQUENCE medical_records_id_seq RESTART WITH 1;

-- ============================================
-- 2. UTILISATEURS
-- Mots de passe en clair (comme demandé)
-- ============================================

INSERT INTO users (username, password, role, assigned_patients) VALUES
('admin', 'admin123', 'admin', '{}'),
('medecin1', 'user123', 'user', '{}'),
('infirmier1', 'user123', 'user', '{}'),
('medecin2', 'user123', 'user', '{}');

-- ============================================
-- 3. PATIENTS PERMANENTS (8 patients)
-- ============================================

INSERT INTO patients (
  nom_complet, cin, ass_cnss, date_naissance, sexe, groupe_sanguin,
  profession, situation_familiale, telephone, telephone_urgence, adresse,
  date_debut, type_patient, date_fin, cause_fin
) VALUES
-- Patient 1
('Ahmed Ben Salem', 12345678, 'CNSS123456', '1975-03-15', 'Homme', 'A+',
 'Enseignant', 'Marié(e)', 98765432, 22334455, '12 Rue de la République, Sfax',
 '2020-01-10', 'Permanent', NULL, NULL),

-- Patient 2
('Fatma Trabelsi', 87654321, 'CNSS789012', '1982-07-22', 'Femme', 'O+',
 'Infirmière', 'Marié(e)', 97123456, 71234567, '45 Avenue Habib Bourguiba, Sfax',
 '2019-05-15', 'Permanent', NULL, NULL),

-- Patient 3
('Mohamed Jebali', 11223344, 'CNSS345678', '1968-11-30', 'Homme', 'B+',
 'Commerçant', 'Marié(e)', 50123456, 71987654, '8 Rue Mohamed Ali, Sfax',
 '2018-09-20', 'Permanent', NULL, NULL),

-- Patient 4
('Amira Gharbi', 99887766, 'CNSS901234', '1990-04-18', 'Femme', 'AB+',
 'Pharmacienne', 'Célibataire', 24567890, 73456789, '23 Avenue de la Liberté, Sfax',
 '2021-02-28', 'Permanent', NULL, NULL),

-- Patient 5
('Karim Mansour', 55667788, 'CNSS567890', '1955-08-05', 'Homme', 'A-',
 'Retraité', 'Veuf(ve)', 29876543, 74567890, '67 Rue des Martyrs, Sfax',
 '2017-06-12', 'Permanent', NULL, NULL),

-- Patient 6
('Salma Bouazizi', 44556677, 'CNSS234567', '1978-12-25', 'Femme', 'O-',
 'Comptable', 'Divorcé(e)', 52345678, 72345678, '34 Rue de Tunis, Sfax',
 '2020-11-08', 'Permanent', NULL, NULL),

-- Patient 7
('Youssef Mejri', 33445566, 'CNSS678901', '1985-02-14', 'Homme', 'B-',
 'Ingénieur', 'Marié(e)', 58765432, 73210987, '19 Avenue Majida Boulila, Sfax',
 '2019-08-03', 'Permanent', NULL, NULL),

-- Patient 8
('Houda Dridi', 22334455, 'CNSS123789', '1970-09-09', 'Femme', 'A+',
 'Secrétaire', 'Marié(e)', 98123456, 71456789, '56 Rue Mongi Slim, Sfax',
 '2018-03-17', 'Permanent', NULL, NULL),

-- Patient 9
('Sofiane Khalil', 19283746, 'CNSS998877', '1992-01-20', 'Homme', 'AB-',
 'Architecte', 'Célibataire', 52987654, 71234098, '89 Rue de Sousse, Sfax',
 '2022-03-12', 'Permanent', NULL, NULL),

-- Patient 10
('Leila Sassi', 38475629, 'CNSS556677', '1965-10-10', 'Femme', 'B+',
 'Médecin', 'Marié(e)', 24987632, 73456123, '102 Avenue Hedi Chaker, Sfax',
 '2016-07-05', 'Permanent', NULL, NULL);

-- ============================================
-- 4. PATIENTS VACANCIERS (3 patients)
-- ============================================

INSERT INTO patients (
  nom_complet, cin, ass_cnss, date_naissance, sexe, groupe_sanguin,
  profession, situation_familiale, telephone, telephone_urgence, adresse,
  date_debut, type_patient, date_fin, cause_fin
) VALUES
-- Patient 11
('Pierre Martin', 77889900, 'EUR123456', '1972-06-20', 'Homme', 'A+',
 'Médecin', 'Marié(e)', 33612345678, 33687654321, 'Paris, France',
 '2024-07-01', 'Vacancier', '2024-07-31', NULL),

-- Patient 12
('Maria Garcia', 66778899, 'ESP789012', '1980-03-12', 'Femme', 'O+',
 'Professeur', 'Marié(e)', 34623456789, 34698765432, 'Madrid, Espagne',
 '2024-08-10', 'Vacancier', '2024-08-25', NULL),

-- Patient 13
('Hans Schmidt', 55668899, 'DEU345678', '1965-11-05', 'Homme', 'B+',
 'Ingénieur', 'Marié(e)', 49151234567, 49178901234, 'Berlin, Allemagne',
 '2024-06-15', 'Vacancier', '2024-06-30', NULL);

-- ============================================
-- 5. PATIENTS FIN DE TRAITEMENT (3 patients)
-- ============================================

INSERT INTO patients (
  nom_complet, cin, ass_cnss, date_naissance, sexe, groupe_sanguin,
  profession, situation_familiale, telephone, telephone_urgence, adresse,
  date_debut, type_patient, date_fin, cause_fin
) VALUES
-- Patient 14
('Ali Zghal', 99001122, 'CNSS445566', '1960-05-10', 'Homme', 'A-',
 'Fonctionnaire', 'Marié(e)', 20123456, 75123456, '78 Rue de Gabes, Sfax',
 '2015-01-05', 'Fin Traitement', '2024-03-20', 'Greffe'),

-- Patient 15
('Leila Hamdi', 88990011, 'CNSS778899', '1975-08-22', 'Femme', 'O-',
 'Enseignante', 'Marié(e)', 23456789, 74890123, '90 Avenue Hédi Chaker, Sfax',
 '2016-04-12', 'Fin Traitement', '2024-01-15', 'Transféré'),

-- Patient 16
('Nabil Kallel', 77880099, 'CNSS112233', '1958-12-30', 'Homme', 'B+',
 'Retraité', 'Veuf(ve)', 27890123, 73567890, '45 Rue de Sousse, Sfax',
 '2014-09-08', 'Fin Traitement', '2023-11-05', 'Décès');

-- ============================================
-- 6. ASSIGNER LES PATIENTS AUX UTILISATEURS
-- ============================================

-- Médecin1 → Patients 1-5
UPDATE users SET assigned_patients = ARRAY[1, 2, 3, 4, 5] WHERE username = 'medecin1';

-- Infirmier1 → Patients 6-10
UPDATE users SET assigned_patients = ARRAY[6, 7, 8, 9, 10] WHERE username = 'infirmier1';

-- Médecin2 → Patients 11-13
UPDATE users SET assigned_patients = ARRAY[11, 12, 13] WHERE username = 'medecin2';

-- Admin → Tous les patients (array vide = accès total)
UPDATE users SET assigned_patients = '{}' WHERE username = 'admin';

-- ============================================
-- 7. DOSSIERS MÉDICAUX - ANTÉCÉDENTS MÉDICAUX
-- ============================================

INSERT INTO medical_records (patient_id, category, sub_category, date, details, created_by) VALUES
(1, 'antecedents', 'Médicaux', '2020-01-10', 'Diabète type 2 diagnostiqué en 2010. HTA depuis 2015. Traitement: Metformine 1000mg x2/j, Ramipril 10mg/j.', 1),
(2, 'antecedents', 'Médicaux', '2019-05-15', 'IRC stade 5 sur néphropathie diabétique. Anémie chronique. Rétinopathie diabétique non proliférante.', 1),
(3, 'antecedents', 'Médicaux', '2018-09-20', 'HTA compliquée de cardiopathie ischémique (IDM en 2015). Dyslipidémie mixte sous statines.', 1),
(4, 'antecedents', 'Médicaux', '2021-02-28', 'Lupus érythémateux systémique depuis 2018. Néphropathie lupique classe IV. Traitement: Prednisone 20mg/j, Hydroxychloroquine.', 1),
(5, 'antecedents', 'Médicaux', '2017-06-12', 'Polykystose rénale autosomique dominante. HTA. Pas d''antécédent d''hématurie.', 1),
(6, 'antecedents', 'Médicaux', '2020-11-08', 'Glomérulonéphrite chronique. HTA. Dyslipidémie. Hypothyroïdie sous Levothyrox 75µg/j.', 1),
(7, 'antecedents', 'Médicaux', '2019-08-03', 'Néphropathie hypertensive. Hyperparathyroïdie secondaire. Troubles phosphocalciques.', 1),
(8, 'antecedents', 'Médicaux', '2018-03-17', 'IRC sur néphroangiosclérose. Obésité (IMC 32). Apnée du sommeil appareillée (PPC).', 1),
(9, 'antecedents', 'Médicaux', '2022-03-12', 'Néphrite interstitielle chronique. Pas d''antécédent particulier. Découverte fortuite IRC.', 1),
(10, 'antecedents', 'Médicaux', '2016-07-05', 'IRC stade terminal sur cause indéterminée. HTA. BPCO stade 2 sous bronchodilatateurs.', 1);

-- ============================================
-- 8. ANTÉCÉDENTS CHIRURGICAUX
-- ============================================

INSERT INTO medical_records (patient_id, category, sub_category, date, details, created_by) VALUES
(1, 'antecedents', 'Chirurgicaux', '2019-06-15', 'Création FAV radio-céphalique gauche (15/06/2019). Maturation satisfaisante en 6 semaines.', 1),
(2, 'antecedents', 'Chirurgicaux', '2018-11-20', 'Appendicectomie (2005). Cholécystectomie cœlioscopique (2015). Herniorraphie inguinale droite (2017).', 1),
(3, 'antecedents', 'Chirurgicaux', '2018-03-10', 'Pose cathéter tunnellisé jugulaire droit (urgence). Pontage coronarien x3 (2016). Arthroplastie genou gauche (2020).', 1),
(4, 'antecedents', 'Chirurgicaux', '2020-12-05', 'Biopsie rénale (2019). Création FAV brachio-basilique gauche transposée.', 1),
(5, 'antecedents', 'Chirurgicaux', '2017-01-20', 'Néphrectomie droite (kyste infecté 2010). Pose KT tunnellisé puis FAV brachio-céphalique gauche.', 1),
(6, 'antecedents', 'Chirurgicaux', '2020-08-15', 'Hystérectomie totale (2012). Création FAV radio-céphalique droite.', 1),
(7, 'antecedents', 'Chirurgicaux', '2019-05-22', 'Prothèse vasculaire bras droit (FAV native thrombosée). Révisions x2 pour sténose.', 1),
(8, 'antecedents', 'Chirurgicaux', '2017-11-08', 'Césarienne x2. Création FAV brachio-céphalique droite.', 1);

-- ============================================
-- 9. ALLERGIES
-- ============================================

INSERT INTO medical_records (patient_id, category, sub_category, date, details, created_by) VALUES
(1, 'antecedents', 'Allergies', '2020-01-10', 'Allergie à la pénicilline (éruption cutanée + œdème de Quincke en 2008). Éviction stricte.', 1),
(2, 'antecedents', 'Allergies', '2019-05-15', 'Allergie aux AINS (asthme induit). Contre-indication formelle.', 1),
(4, 'antecedents', 'Allergies', '2021-02-28', 'Allergie aux produits de contraste iodés (réaction anaphylactique grade II). Utilisation produits sans iode uniquement.', 1),
(5, 'antecedents', 'Allergies', '2017-06-12', 'Allergie au latex (eczéma de contact). Utilisation matériel sans latex.', 1),
(6, 'antecedents', 'Allergies', '2020-11-08', 'Pas d''allergie médicamenteuse connue à ce jour.', 1),
(7, 'antecedents', 'Allergies', '2019-08-03', 'Allergie à la Bétadine (dermite). Utilisation Chlorhexidine pour antisepsie.', 1),
(9, 'antecedents', 'Allergies', '2022-03-12', 'Pas d''allergie connue.', 1),
(10, 'antecedents', 'Allergies', '2016-07-05', 'Allergie aux sulfamides (Stevens-Johnson en 1995). Éviction absolue.', 1);
