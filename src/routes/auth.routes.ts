import { Router, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const router = Router();
const authService = new AuthService();

/**
 * POST /auth/login
 * Authentifie un utilisateur
 */
router.post('/login', async (req: Request, res: Response) => {
  console.log('🔐 Login attempt:', req.body);
  
  const { username, password } = req.body;

  // Validation basique
  if (!username || !password) {
    res.status(400).json({
      success: false,
      message: 'Username et password sont requis'
    });
    return;
  }

  try {
    const result = await authService.login(username, password);
    res.json({
      success: true,
      ...result
    });
  } catch (err: unknown) {
    console.error('❌ Login error:', err);
    
    if (err instanceof Error) {
      res.status(401).json({
        success: false,
        message: err.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
    }
  }
});

export default router;
