import { User } from './interface';

export const admin: User = {
  id: 1,
  name: 'Jese',
  email: 'da.jese007@gmail.com',
  avatar: './assets/images/avatar.jpg',
};

export const guest: User = {
  name: 'unknown',
  email: 'unknown',
  avatar: './assets/images/avatar-default.jpg',
};
