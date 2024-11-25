import pkg from 'pg';
const { Pool } = pkg;
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'adamo',
    password: 'Asss1221.',
    port: 5432,
});

// Endpoint para obtener provincias
app.get('/api/provincias', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM provincia');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener provincias');
    }
});

// Endpoint para obtener poblaciones por provincia
app.get('/api/poblaciones/:provincia_id', async(req, res) => {
    const { provincia_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM poblacion WHERE provincia_id = $1', [provincia_id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener poblaciones');
    }
});

// Endpoint para obtener tipos de vía
app.get('/api/tipos_via', async(req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT tipo_via FROM via');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener tipos de vía');
    }
});

// Endpoint para buscar la dirección
app.post('/api/buscarDireccion', async(req, res) => {
    const { numero, cp, nombre_via, poblacion_id } = req.body;
    try {
        const query = `
            SELECT * FROM direccion
            JOIN via ON direccion.via_id = via.id
            WHERE direccion.numero = $1 AND direccion.cp = $2 AND via.nombre_via = $3 AND via.poblacion_id = $4
        `;
        const result = await pool.query(query, [numero, cp, nombre_via, poblacion_id]);
        if (result.rows.length > 0) {
            res.json({ cobertura: true });
        } else {
            res.json({ cobertura: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al buscar la dirección');
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});