import { Router } from 'express';
import { AuthService } from '../services/auth.service';

const router = Router();
const authService = new AuthService();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await authService.login(username, password);
    res.json({
      success: true, // ✅ AJOUTER
      ...result
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(401).json({ 
        success: false, // ✅ AJOUTER
        message: err.message 
      });
    } else {
      res.status(500).json({ 
        success: false, // ✅ AJOUTER
        message: 'Erreur inconnue' 
      });
    }
  }
});

export default router;
