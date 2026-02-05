import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Si entras directo por la URL, location.state es null
  if (!location.state) {
    return (
      <div className="ticket-page" style={{textAlign: 'center', marginTop: '50px'}}>
        <h1>⚠️ No hay ticket</h1>
        <p>No has comprado nada todavía.</p>
        <button className="btn-home" onClick={() => navigate('/')}>Ir al Inicio</button>
      </div>
    );
  }

  // 2. Recuperamos los datos con seguridad
  const { titulo, seleccionados, total, tipoSala } = location.state;

  // 3. Generamos el QR (Protegido con encodeURIComponent)
  // Si seleccionados no existe, ponemos lista vacía para evitar error
  const numAsientos = seleccionados ? seleccionados.length : 0;
  const listaAsientos = seleccionados ? seleccionados.map(s => s.numero).join(", ") : "";
  
  const datosQR = `CINE: ${titulo} | ASIENTOS: ${numAsientos} | TOTAL: $${total}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(datosQR)}`;

  return (
    <div className="ticket-page">
      <h1 style={{color: '#27ae60'}}>¡Compra Exitosa! 🎉</h1>
      <p>Escanea este código en la entrada.</p>

      <div className="ticket-card">
        <div className="ticket-header">
          <h2>CineSystem Ticket</h2>
          <span className="ticket-type">{tipoSala || "General"}</span>
        </div>

        <div className="ticket-body">
          <h3>{titulo || "Película"}</h3>
          <p><strong>Asientos:</strong> {listaAsientos}</p>
          <hr style={{margin: '15px 0', border: '0', borderTop: '1px dashed #ccc'}}/>
          <p style={{fontSize: '1.2rem'}}>Total: <strong style={{color: '#27ae60'}}>${total}</strong></p>
        </div>

        <div className="ticket-qr">
          <img src={qrUrl} alt="QR Code" style={{border: '1px solid #ddd', padding: '5px'}}/>
        </div>

        <div className="ticket-footer">
          <small>Ticket válido solo por hoy</small>
        </div>
      </div>

      <button className="btn-home" onClick={() => navigate('/')}>
        🏠 Volver a la Cartelera
      </button>
    </div>
  );
}

export default Ticket;