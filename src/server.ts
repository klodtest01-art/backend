// TEST DE CONNEXION BD - À AJOUTER AVANT LES AUTRES ROUTES
app.get('/debug-db', async (_req, res) => {
  try {
    console.log('🔍 Testing DB connection from Render...');
    
    // Test 1: Connexion basique
    const timeResult = await pool.query('SELECT NOW() as current_time');
    
    // Test 2: Compter les utilisateurs
    const usersResult = await pool.query('SELECT COUNT(*) as count FROM users');
    
    // Test 3: Voir les premiers utilisateurs
    const users = await pool.query('SELECT id, username, role FROM users LIMIT 5');
    
    res.json({
      success: true,
      database: {
        connected: true,
        currentTime: timeResult.rows[0].current_time
      },
      counts: {
        users: parseInt(usersResult.rows[0].count)
      },
      sampleUsers: users.rows
    });
    
  } catch (error: any) {
    console.error('❌ DB Debug Error:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});


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

