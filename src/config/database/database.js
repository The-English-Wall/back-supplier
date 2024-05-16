import { Sequelize } from 'sequelize';
import { envs } from '../enviroments/enviroments.js';

export const sequelize = new Sequelize(`postgresql://${envs.DB_USERNAME_SUPPLIER}:${envs.DB_PASSWORD_SUPPLIER}@${envs.DB_HOST_SUPPLIER}:${envs.DB_PORT}/${envs.DB_NAME_SUPPLIER}`, {
  logging: false,
  ssl: true
});

export async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log('db auth ok!');
  } catch (error) {
    throw new Error('Authentication error', error);
  }
}

export async function sincronize() {
  try {
    await sequelize.sync({ force: true });
    console.log('db Sync ok!');
  } catch (error) {
    throw new Error('Synchronization error');
  }
}