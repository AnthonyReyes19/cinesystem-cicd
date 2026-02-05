import { describe, it, expect } from 'vitest';
import { calcularTotal, puedeSeleccionar } from './bookingLogic';

describe('Logica de CineSystem', () => {
    it('calcula correctamente el precio según la sala', () => {
        const seleccion = [{ id: 1 }, { id: 2 }];
        
        // Probamos con precio de sala Normal ($5)
        expect(calcularTotal(seleccion, 5)).toBe(10);
        
        // Probamos con precio de sala VIP ($12)
        expect(calcularTotal(seleccion, 12)).toBe(24);
    });

    it('impide seleccionar más del límite permitido', () => {
        expect(puedeSeleccionar(6)).toBe(false); // Ya tengo 6
        expect(puedeSeleccionar(2)).toBe(true);  // Tengo 2
    });
});