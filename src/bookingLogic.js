export const PRECIO_NORMAL = 5;
export const PRECIO_VIP = 10;
export const MAX_ASIENTOS = 6;

// Calcula el total a pagar
export const calcularTotal = (seleccionados) => {
    if (!seleccionados) return 0;
    
    let total = 0;
    seleccionados.forEach(asiento => {
        total += asiento.tipo === 'VIP' ? PRECIO_VIP : PRECIO_NORMAL;
    });
    return total;
};

// Valida si puedo seleccionar otro asiento
export const puedeSeleccionar = (actuales) => {
    if (actuales >= MAX_ASIENTOS) return false;
    return true;
};

// Aplica descuento (Ejemplo: Si compras más de 3, 10% descuento)
export const calcularDescuento = (total, cantidad) => {
    if (cantidad > 3) {
        return total * 0.90; // 10% off
    }
    return total;
};