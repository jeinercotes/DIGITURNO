const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Datos simulados de turnos
let turnos = [
    { id: 1, hora: '10:00 AM', asignado: false },
    { id: 2, hora: '11:00 AM', asignado: false },
    { id: 3, hora: '12:00 PM', asignado: false },
    { id: 4, hora: '01:00 PM', asignado: false },
];

// Obtener los turnos disponibles
app.get('/api/turnos', (req, res) => {
    const turnosDisponibles = turnos.filter(turno => !turno.asignado);
    res.json(turnosDisponibles);
});

// Asignar un turno
app.post('/api/asignar/:id', (req, res) => {
    const idTurno = parseInt(req.params.id);
    const turno = turnos.find(t => t.id === idTurno);

    if (turno && !turno.asignado) {
        turno.asignado = true;
        res.json({ exito: true, hora: turno.hora });
    } else {
        res.json({ exito: false });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});