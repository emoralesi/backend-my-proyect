import pkg from 'pg';
const { Client } = pkg;

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'pr-custom-admin',
  password: '123',
  port: 5432,
};

export function getClient() {
  return new Client(config);
}

export async function conectar(client) {
  try {
    await client.connect();
    await client.query("SET search_path TO 'schema-admin';")
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