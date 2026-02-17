import { users, User } from '../mock/db';

export const loginByPhone = async (phone: string): Promise<User> => {
  await new Promise<void>((res) => setTimeout(() => res(), 500));

  const user = users.find(
    (u) => u.phone === phone && u.status === 'active'
  );

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
