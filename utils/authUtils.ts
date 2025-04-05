import { Role } from '@/types/types';

export const isStudentRole = (role: Role | undefined): boolean => {
  return role === 'STUDENT';
};

export const requireStudentRole = (role: Role | undefined): boolean => {
  if (!isStudentRole(role)) {
    console.warn('Access denied: User must be a student');
    return false;
  }
  return true;
};
