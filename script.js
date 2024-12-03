function cargarTurnos() {
    fetch('/api/turnos')
        .then(response => response.json())
        .then(turnos => {
            const turnosContainer = document.getElementById('turnosDisponibles');
            turnosContainer.innerHTML = '';

            turnos.forEach(turno => {
                const button = document.createElement('button');
                button.textContent = `Turno: ${turno.hora}`;
                button.onclick = () => asignarTurno(turno.id);
                turnosContainer.appendChild(button);
            });
        });
}

// Función para asignar un turno
function asignarTurno(idTurno) {
    fetch(`/api/asignar/${idTurno}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        const confirmacion = document.getElementById('confirmacion');
        if (data.exito) {
            confirmacion.innerHTML = `<p>¡Turno asignado exitosamente para ${data.hora}!</p>`;
        } else {
            confirmacion.innerHTML = `<p>No se pudo asignar el turno. Intenta nuevamente.</p>`;
        }
    });
}

// Cargar turnos al cargar la página
window.onload = cargarTurnos;