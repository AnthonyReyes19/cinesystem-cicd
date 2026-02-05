import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { calcularSubtotal, calcularDescuento, puedeSeleccionar } from '../bookingLogic'; 
import '../App.css';

function Sala() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { titulo, tipoSala, precioTicket } = location.state || { 
    titulo: "Película", tipoSala: "General", precioTicket: 5 
  };

  const [seleccionados, setSeleccionados] = useState([]);
  const [asientos] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      id: i, numero: i + 1, ocupado: Math.random() < 0.2
    }))
  );

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

  // --- DESCUENTO ---
  const subtotal = calcularSubtotal(seleccionados, precioTicket);
  const totalPagar = calcularDescuento(subtotal, seleccionados.length);
  
  // Si el total bajó, es porque hubo descuento
  const hayDescuento = subtotal !== totalPagar; 

  // Función para finalizar la compra
  const confirmarCompra = () => {
    navigate('/ticket', {
      state: {
        titulo: titulo,
        seleccionados: seleccionados, // Se envia la lista de asientos
        total: totalPagar.toFixed(2),
        tipoSala: tipoSala
      }
    });
  };

  return (
    <div className="cine-container">
      <button className="btn-cerrar" onClick={() => navigate('/')} style={{float: 'left'}}>← Volver</button>
      <h1>{titulo}</h1>
      <h3 style={{ color: '#555', marginTop: '0' }}>
        {tipoSala}: ${precioTicket}
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
        <p>Subtotal: ${subtotal}</p>

        {/* Mensaje verde si hay descuento */}
        {hayDescuento && (
            <p className="promo">✨ ¡Descuento 10% aplicado!</p>
        )}
        
        <h2>Total: ${totalPagar.toFixed(2)}</h2>

        <br />
        <button 
            className="btn-pagar" 
            disabled={seleccionados.length === 0}
            onClick={confirmarCompra}
        >
            Confirmar Compra
        </button>

      </div>
    </div>
  )
}

export default Sala;