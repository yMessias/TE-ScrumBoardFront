import { useState, useEffect } from 'react';
import Board from './components/Board';
import Modal from './components/Modal';
import CardModal from './components/CardModal';
import { getCards, createCard, moveCard, deleteCard } from './services/api';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const fetchCards = async () => {
    const data = await getCards();
    setCards(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCreate = async (cardData) => {
    const created = await createCard(cardData);
    setCards((prev) => [...prev, created]);
  };

  const handleMove = async (id, status) => {
    const updated = await moveCard(id, status);
    setCards((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const handleDelete = async (id) => {
    await deleteCard(id);
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (data) => {
    if (selectedCard) {
      const updated = {
        ...selectedCard,
        ...data,
      };

      setCards((prev) =>
        prev.map((c) => (c.id === selectedCard.id ? updated : c))
      );
    } else {
      await handleCreate(data);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="app">
      <h1>Scrum Board</h1>

      <button onClick={() => setIsModalOpen(true)}>
        Novo Card
      </button>

      <Board
        cards={cards}
        onMove={handleMove}
        onDelete={handleDelete}
        onCardClick={handleCardClick}
      />

      <Modal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  title={selectedCard ? 'Editar Card' : 'Novo Card'}
>
  <CardModal
    card={selectedCard}
    onSubmit={handleSubmit}
    onClose={handleCloseModal}
  />
</Modal>
    </div>
  );
}

export default App;