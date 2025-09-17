import pkg from 'pg';
const { Client } = pkg;

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false, // Equivale a sslmode=require
  },
};

export function getClient() {
  return new Client(config);
}

export async function conectar(client) {
  try {
    await client.connect();
    await client.query("SET search_path TO 'schema-admin';");
    console.log('Conexión establecida con PostgreSQL');
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error);
  }
}

export async function desconectar(client) {
  try {
    await client.end();
    console.log('Conexión cerrada con PostgreSQL');
  } catch (error) {
    console.error('Error al cerrar la conexión con PostgreSQL:', error);
  }
}