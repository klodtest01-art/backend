// ============================================
// TEST DE LA BASE DE DONNÉES
// ============================================

app.get('/test-db', async (_req, res) => {
  try {
    // Test 1: Vérifier la connexion basique
    const result = await pool.query('SELECT NOW() as current_time');
    
    // Test 2: Vérifier si la table users existe et a des données
    const users = await pool.query('SELECT COUNT(*) as user_count FROM users');
    
    // Test 3: Vérifier si la table patients existe
    const patients = await pool.query('SELECT COUNT(*) as patient_count FROM patients');
    
    res.json({
      success: true,
      database: {
        connected: true,
        currentTime: result.rows[0].current_time
      },
      tables: {
        users: users.rows[0].user_count,
        patients: patients.rows[0].patient_count
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur base de données',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});
