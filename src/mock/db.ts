import { Role } from '../types/role';

export type Company = {
  id: string;
  name: string;
  adminId: string;
};

export type User = {
  id: string;
  name: string;
  role: Role;
  companyId: string;
  phone: string;
  status: 'active' | 'inactive';
};

/**
 * MOCK DATA (in-memory)
 * This simulates a backend database.
 */

export const companies: Company[] = [
  {
    id: 'company-1',
    name: 'Demo Company',
    adminId: 'admin-1',
  },
];

export const users: User[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    role: 'admin',
    companyId: 'company-1',
    phone: '9999999999',
    status: 'active',
  },
  {
    id: 'tech-1',
    name: 'Technician One',
    role: 'technician',
    companyId: 'company-1',
    phone: '8888888888',
    status: 'active',
  },
];
