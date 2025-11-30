// Establecer fecha de hoy por defecto
window.addEventListener('load', function() {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('todayDate').value = hoy;
    document.getElementById('startDate').value = hoy;
});

// Función 1: Calcular días transcurridos
function calcularDiasTranscurridos() {
    const error = document.getElementById('error1');
    const result = document.getElementById('result1');
    error.classList.remove('show');
    result.classList.remove('show');

    const todayDateInput = document.getElementById('todayDate').value;
    const futureDateInput = document.getElementById('futureDate').value;

    if (!todayDateInput || !futureDateInput) {
        mostrarError('error1', 'Por favor completa ambas fechas');
        return;
    }

    const today = new Date(todayDateInput);
    const futureDate = new Date(futureDateInput);

    if (futureDate < today) {
        mostrarError('error1', 'La fecha futura debe ser mayor o igual a la fecha hoy');
        return;
    }

    const diferencia = futureDate - today;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    document.getElementById('resultValue1').textContent = `${dias} día${dias !== 1 ? 's' : ''}`;
    result.classList.add('show');
}

// Función 2: Sumar días a una fecha
function sumarDiasAFecha() {
    const error = document.getElementById('error2');
    const result = document.getElementById('result2');
    error.classList.remove('show');
    result.classList.remove('show');

    const startDateInput = document.getElementById('startDate').value;
    const daysToAddInput = document.getElementById('daysToAdd').value;

    if (!startDateInput || !daysToAddInput) {
        mostrarError('error2', 'Por favor completa todos los campos');
        return;
    }

    const dias = parseInt(daysToAddInput);

    if (isNaN(dias) || dias < 0) {
        mostrarError('error2', 'Ingresa un número válido de días');
        return;
    }

    const startDate = new Date(startDateInput);
    const resultDate = new Date(startDate);
    resultDate.setDate(resultDate.getDate() + dias);

    const dia = String(resultDate.getDate()).padStart(2, '0');
    const mes = String(resultDate.getMonth() + 1).padStart(2, '0');
    const año = resultDate.getFullYear();

    document.getElementById('resultValue2').textContent = `${dia}-${mes}-${año}`;
    result.classList.add('show');
}

// Función para mostrar errores
function mostrarError(elementId, mensaje) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = mensaje;
    errorElement.classList.add('show');
}

// Función para limpiar calculador 1
function limpiarCalculador1() {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('todayDate').value = hoy;
    document.getElementById('futureDate').value = '';
    document.getElementById('error1').classList.remove('show');
    document.getElementById('result1').classList.remove('show');
}

// Función para limpiar calculador 2
function limpiarCalculador2() {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = hoy;
    document.getElementById('daysToAdd').value = '';
    document.getElementById('error2').classList.remove('show');
    document.getElementById('result2').classList.remove('show');
}

// Permitir Enter para calcular
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.id === 'futureDate') {
            calcularDiasTranscurridos();
        } else if (activeElement.id === 'daysToAdd') {
            sumarDiasAFecha();
        }
    }
});