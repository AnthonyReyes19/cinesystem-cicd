import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { calcularTotal, puedeSeleccionar } from '../bookingLogic';
import '../App.css';

function Sala() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Recuperamos los datos que enviamos desde el Home
  // Si alguien entra directo por URL, ponemos valores por defecto
  const { titulo, tipoSala, precioTicket } = location.state || { 
    titulo: "Película Desconocida", 
    tipoSala: "General", 
    precioTicket: 5 
  };

  const [asientos] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      numero: i + 1,
      ocupado: Math.random() < 0.2
    }))
  );

  const [seleccionados, setSeleccionados] = useState([]);

  const toggleAsiento = (asiento) => {
    if (asiento.ocupado) return;

    const yaEsta = seleccionados.find(s => s.id === asiento.id);
    if (yaEsta) {
      setSeleccionados(seleccionados.filter(s => s.id !== asiento.id));
    } else {
      if (puedeSeleccionar(seleccionados.length)) {
        setSeleccionados([...seleccionados, asiento]);
      } else {
        alert("¡Máximo 6 boletos!");
      }
    }
  };

  const total = calcularTotal(seleccionados, precioTicket);

  return (
    <div className="cine-container">
      <button onClick={() => navigate('/')}>⬅ Volver a Cartelera</button>
      
      <h1>{titulo}</h1>
      <h3 style={{ color: tipoSala.includes('VIP') ? 'gold' : 'gray' }}>
        {tipoSala} - Precio: ${precioTicket}
      </h3>

      <div className="pantalla">PANTALLA</div>
      
      <div className="sala">
        {asientos.map(asiento => {
            const esSeleccionado = seleccionados.find(s => s.id === asiento.id);
            return (
            <button
                key={asiento.id}
                onClick={() => toggleAsiento(asiento)}
                className={`asiento 
                  ${asiento.ocupado ? 'ocupado-real' : ''} 
                  ${esSeleccionado ? 'seleccionado' : ''} 
                  ${tipoSala.includes('VIP') ? 'asiento-vip' : ''}`
                }
                disabled={asiento.ocupado}
            >
                {asiento.numero}
            </button>
            )
        })}
      </div>

      <div className="resumen">
        <p>Boletos: {seleccionados.length}</p>
        <h2>Total: ${total}</h2>
        <button className="btn-pagar" disabled={seleccionados.length === 0}>
            Confirmar Compra
        </button>
      </div>
    </div>
  )
}

export default Sala;