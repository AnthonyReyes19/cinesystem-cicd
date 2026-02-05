import { describe, it, expect } from 'vitest';
import { calcularSubtotal, calcularDescuento, puedeSeleccionar } from './bookingLogic';

describe('Logica de CineSystem', () => {
    
    it('calcula subtotal con precios variables (VIP vs Normal)', () => {
        const seleccion = [{ id: 1 }, { id: 2 }];
        // Prueba Sala Normal ($5) -> 2 * 5 = 10
        expect(calcularSubtotal(seleccion, 5)).toBe(10);
        // Prueba Sala VIP ($12) -> 2 * 12 = 24
        expect(calcularSubtotal(seleccion, 12)).toBe(24);
    });

    it('aplica descuento del 10% si hay mas de 3 boletos', () => {
        const subtotal = 100; // Supongamos que gastó 100
        const cantidad = 4;   // Llevó 4 boletos
        expect(calcularDescuento(subtotal, cantidad)).toBe(90);
    });

    it('NO aplica descuento si son 3 o menos', () => {
        const subtotal = 50;
        const cantidad = 3;
        expect(calcularDescuento(subtotal, cantidad)).toBe(50);
    });

    it('permite seleccionar asientos dentro del limite', () => {
        expect(puedeSeleccionar(1)).toBe(true);
    });
});