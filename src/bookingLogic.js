// Nota: Quitamos las constantes fijas de precio de aquí para pasarlas dinámicamente
export const MAX_ASIENTOS = 6;

// Ahora la función recibe el precio del ticket como parámetro
export const calcularTotal = (seleccionados, precioTicket) => {
    if (!seleccionados) return 0;
    return seleccionados.length * precioTicket;
};

export const puedeSeleccionar = (actuales) => {
    return actuales < MAX_ASIENTOS;
};