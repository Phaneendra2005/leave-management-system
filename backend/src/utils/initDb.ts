import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { logger } from './logger';

const prisma = new PrismaClient();

const DEFAULT_DEPARTMENTS = [
  { name: 'Engineering', description: 'Engineering department' },
  { name: 'Human Resources (HR)', description: 'Human Resources department' },
  { name: 'Finance', description: 'Finance department' },
  { name: 'Sales', description: 'Sales department' },
  { name: 'Marketing', description: 'Marketing department' },
  { name: 'Operations', description: 'Operations department' },
  { name: 'IT', description: 'IT department' },
  { name: 'Support', description: 'Support department' },
];

export async function initializeDatabase() {
  try {
    logger.info('Initializing database...');

    // Seed Departments
    for (const dept of DEFAULT_DEPARTMENTS) {
      await prisma.department.upsert({
        where: { name: dept.name },
        update: {},
        create: dept,
      });
    }

    logger.info('Departments ready.');

    // Check if users already exist
    const userCount = await prisma.user.count();

    if (userCount === 0) {
      logger.info('No users found. Seeding default users...');

      const engineering = await prisma.department.findUnique({
        where: { name: 'Engineering' },
      });

      if (!engineering) {
        throw new Error('Engineering department not found.');
      }

      const adminPassword = await bcrypt.hash('admin123', 10);
      const managerPassword = await bcrypt.hash('manager123', 10);
      const employeePassword = await bcrypt.hash('employee123', 10);

      await prisma.user.create({
        data: {
          firstName: 'System',
          lastName: 'Admin',
          email: 'admin@company.com',
          passwordHash: adminPassword,
          role: Role.ADMIN,
          departmentId: engineering.id,
        },
      });

      const manager = await prisma.user.create({
        data: {
          firstName: 'Alice',
          lastName: 'Manager',
          email: 'manager@company.com',
          passwordHash: managerPassword,
          role: Role.MANAGER,
          departmentId: engineering.id,
        },
      });

      await prisma.user.create({
        data: {
          firstName: 'Bob',
          lastName: 'Employee',
          email: 'employee@company.com',
          passwordHash: employeePassword,
          role: Role.EMPLOYEE,
          departmentId: engineering.id,
          managerId: manager.id,
        },
      });

      logger.info('Default users created successfully.');
    } else {
      logger.info('Users already exist. Skipping user seed.');
    }

    logger.info('Database initialization completed.');
  } catch (error) {
    logger.error(`Database initialization failed: ${error}`);
  }
}