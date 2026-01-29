import { describe, it, expect } from 'vitest';
import { calcularTotal, puedeSeleccionar, calcularDescuento } from './bookingLogic';

describe('Logica de CineTix', () => {
    
    it('calcula correctamente el precio mixto (VIP + Normal)', () => {
        const seleccion = [
            { id: 1, tipo: 'NORMAL' }, // $5
            { id: 2, tipo: 'VIP' }     // $10
        ];
        expect(calcularTotal(seleccion)).toBe(15);
    });

    it('impide seleccionar más del límite permitido', () => {
        // Simulamos que ya tiene 6 asientos
        expect(puedeSeleccionar(6)).toBe(false);
        // Simulamos que tiene 2 asientos
        expect(puedeSeleccionar(2)).toBe(true);
    });

    it('aplica 10% de descuento si hay mas de 3 tickets', () => {
        const totalSinDescuento = 100;
        const cantidadTickets = 4;
        expect(calcularDescuento(totalSinDescuento, cantidadTickets)).toBe(90);
    });
});