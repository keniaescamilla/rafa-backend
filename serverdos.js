const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Importa el middleware cors
const app = express();

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'apimeds'
});

// Conectar a la base de datos MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Agrega el middleware cors para permitir solicitudes desde http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Endpoint para obtener los datos de los medicamentos
app.get('/tests', (req, res) => {
  connection.query('SELECT * FROM tests', (err, rows) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error obteniendo tests');
      return;
    }
    res.json(rows); // Enviar datos como respuesta en formato JSON
  });
});

// Iniciar el servidor en el puerto 3001
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
