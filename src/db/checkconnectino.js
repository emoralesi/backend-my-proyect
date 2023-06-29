import pg from "pg";
const {Pool} = pg;

// checkConnection asycn function
export const checkConnection = async (query) => {
    var connection;
    try {
        connection = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'pr-custom-admin',
            password: '123',
            port: 5432,
          })
      console.log('connected to database');
      await connection.query("SET search_path TO 'schema-admin';")
      const result = await connection.query(query)
      if (result.rows.length > 0) {
        return result.rows;
      }else{
        return null;
      }
      
    } catch (err) {
      console.error(err.message);
    } finally {
      if (connection) {
        try {
          // Always close connections
          await connection.end(); 
          console.log('close connection success');
        } catch (err) {
          console.error(err.message);
        }
      }
    }
  }
  
  export default {checkConnection}