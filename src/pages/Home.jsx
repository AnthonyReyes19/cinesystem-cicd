import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const navigate = useNavigate();
  
  // Estados para manejar la ventanita (Modal)
  const [modalAbierto, setModalAbierto] = useState(false);
  const [peliSeleccionada, setPeliSeleccionada] = useState(null);

  const peliculas = [
    {
      id: 1,
      titulo: "Avatar: El camino del agua",
      poster: "https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg",
    },
    {
      id: 2,
      titulo: "Oppenheimer",
      poster: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg",
    },
    {
      id: 3,
      titulo: "Super Mario Bros",
      poster: "https://upload.wikimedia.org/wikipedia/en/4/44/The_Super_Mario_Bros._Movie_poster.jpg",
    }
  ];

  // 1. Al hacer clic en "Comprar", abrimos la ventana y guardamos qué peli es
  const abrirModal = (peli) => {
    setPeliSeleccionada(peli);
    setModalAbierto(true);
  };

  // 2. Función para navegar a la sala con el precio correcto
  const irASala = (tipo, precio) => {
    setModalAbierto(false); // Cerramos el modal
    navigate('/sala', { 
      state: { 
        titulo: peliSeleccionada.titulo, 
        tipoSala: tipo, 
        precioTicket: precio 
      } 
    });
  };

  return (
    <div className="home-container">
      <h1 className="titulo-principal">🍿 Cartelera CineSystem</h1>
      
      <div className="cartelera-horizontal">
        {peliculas.map((peli) => (
          <div key={peli.id} className="movie-card">
            <img src={peli.poster} alt={peli.titulo} className="poster-img" />
            <div className="movie-info">
              <h3>{peli.titulo}</h3>
              {/* UN SOLO BOTÓN */}
              <button className="btn-comprar-main" onClick={() => abrirModal(peli)}>
                🎟 Comprar Boletos
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- VENTANITA EMERGENTE (MODAL) --- */}
      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Elige tu experiencia</h2>
            <p>Para la película: <strong>{peliSeleccionada?.titulo}</strong></p>
            
            <div className="modal-botones">
              <button 
                className="btn-opcion" 
                onClick={() => irASala("Sala 2D Tradicional", 5)}
              >
                Sala 2D
              </button>
              
              <button 
                className="btn-opcion btn-vip-modal" 
                onClick={() => irASala("Sala VIP Experience", 9)} // PRECIO $9
              >
                Sala VIP
              </button>
            </div>

            <button className="btn-cerrar" onClick={() => setModalAbierto(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;