import { useState } from 'react'
import './App.css'
import { calcularTotal, puedeSeleccionar, calcularDescuento } from './bookingLogic'

function App() {
  // Generamos 20 asientos (Los primeros 5 son VIP)
  const [asientos] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      numero: i + 1,
      tipo: i < 5 ? 'VIP' : 'NORMAL', // Los primeros 5 son VIP
      precio: i < 5 ? 10 : 5
    }))
  );

  const [seleccionados, setSeleccionados] = useState([]);

  const toggleAsiento = (asiento) => {
    const yaEstaSeleccionado = seleccionados.find(s => s.id === asiento.id);

    if (yaEstaSeleccionado) {
      // Deseleccionar
      setSeleccionados(seleccionados.filter(s => s.id !== asiento.id));
    } else {
      // Intentar seleccionar
      if (puedeSeleccionar(seleccionados.length)) {
        setSeleccionados([...seleccionados, asiento]);
      } else {
        alert("¡Máximo 6 entradas por persona!");
      }
    }
  };

  const subtotal = calcularTotal(seleccionados);
  const totalFinal = calcularDescuento(subtotal, seleccionados.length);
  const hayDescuento = subtotal !== totalFinal;

  return (
    <div className="cine-container">
      <h1>🎬 CineTix CI/CD</h1>
      <div className="pantalla">PANTALLA</div>
      
      <div className="sala">
        {asientos.map(asiento => {
          const esSeleccionado = seleccionados.find(s => s.id === asiento.id);
          return (
            <button
              key={asiento.id}
              onClick={() => toggleAsiento(asiento)}
              className={`asiento ${asiento.tipo} ${esSeleccionado ? 'ocupado' : ''}`}
            >
              {asiento.numero}
            </button>
          )
        })}
      </div>

      <div className="resumen">
        <h3>Entradas: {seleccionados.length}</h3>
        <p>Subtotal: ${subtotal}</p>
        {hayDescuento && <p className="promo">¡Descuento aplicado! (10%)</p>}
        <h2>Total a Pagar: ${totalFinal.toFixed(2)}</h2>
      </div>
    </div>
  )
}

export default App