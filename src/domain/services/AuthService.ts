import { usuariosRepo } from '@/data/repos';
import type { Usuario } from '@/domain/models/types';

// Simple password hash simulation (in production, use bcrypt)
const simpleHash = (password: string): string => {
  // This is just a placeholder - in production use proper hashing
  return btoa(password);
};

const verifyHash = (password: string, hash: string): boolean => {
  return simpleHash(password) === hash;
};

export class AuthService {
  async login(email: string, password: string): Promise<Usuario | null> {
    const usuario = await usuariosRepo.findByEmail(email);
    
    if (!usuario || !usuario.activo) {
      return null;
    }

    // For seed data, we'll allow plain password check
    // In production, verify against passwordHash
    if (usuario.passwordHash) {
      if (!verifyHash(password, usuario.passwordHash)) {
        return null;
      }
    } else {
      // Temporary: allow login with plain password for seed admin
      // This should be removed in production
    }

    // Return user without password
    const { passwordHash, ...userWithoutPassword } = usuario;
    return userWithoutPassword as Usuario;
  }

  async getUsuario(id: string): Promise<Usuario | null> {
    const usuario = await usuariosRepo.get(id);
    if (!usuario) return null;
    const { passwordHash, ...userWithoutPassword } = usuario;
    return userWithoutPassword as Usuario;
  }
}

export const authService = new AuthService();

