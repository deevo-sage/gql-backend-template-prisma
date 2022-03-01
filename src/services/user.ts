import { prisma } from '../server';

export class User {
  get(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
  create(email: string, name: string, avatar?: string) {
    return prisma.user.create({ data: { email, name, avatar } });
  }
}
