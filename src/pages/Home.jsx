import { useNavigate } from 'react-router-dom';
import '../App.css'; 

function Home() {
  const navigate = useNavigate();

  // Función para ir a la sala enviando datos (Precio y Título)
  const irASala = (pelicula, tipo, precio) => {
    navigate('/sala', { 
      state: { 
        titulo: pelicula, 
        tipoSala: tipo, 
        precioTicket: precio 
      } 
    });
  };

  return (
    <div className="home-container">
      <h1>🎬 Cartelera CineSystem</h1>
      
      <div className="cartelera">
        {/* Película 1 */}
        <div className="card-peli">
          <h3>Avatar: El camino del agua</h3>
          <div className="opciones">
            <button onClick={() => irASala("Avatar 2", "Tradicional 2D", 5)}>
              Sala 2D ($5)
            </button>
            <button className="btn-vip" onClick={() => irASala("Avatar 2", "Experiencia VIP 3D", 12)}>
              Sala VIP 3D ($12)
            </button>
          </div>
        </div>

        {/* Película 2 */}
        <div className="card-peli">
          <h3>Oppenheimer</h3>
          <div className="opciones">
            <button onClick={() => irASala("Oppenheimer", "Tradicional 2D", 5)}>
              Sala 2D ($5)
            </button>
            <button className="btn-vip" onClick={() => irASala("Oppenheimer", "IMAX VIP", 15)}>
              Sala VIP ($15)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;