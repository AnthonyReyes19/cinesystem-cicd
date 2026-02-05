export const MAX_ASIENTOS = 0;

// 1. Calcula el Subtotal
export const calcularSubtotal = (seleccionados, precioTicket) => {
    if (!seleccionados) return 0;
    return seleccionados.length * precioTicket;
};

// 2. AQUÍ ESTÁ EL DESCUENTO (Regla: Más de 3 boletos = 10% off)
export const calcularDescuento = (subtotal, cantidad) => {
    if (cantidad > 3) {
        return subtotal * 0.90; // Multiplicar por 0.90 es restar el 10%
    }
    return subtotal;
};

export const puedeSeleccionar = (actuales) => {
    return actuales < MAX_ASIENTOS;
};