import { useState, useEffect } from 'react';
import './CardModal.css';

function CardModal({ onSubmit, card, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Backlog');

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
      setAssignee(card.assignee);
      setPriority(card.priority);
      setStatus(card.status);
    }
  }, [card]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Título é obrigatório!');
      return;
    }

    onSubmit({ title, description, assignee, priority, status });
    onClose();
  };

  return (
    <form className="card-modal" onSubmit={handleSubmit}>
      

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Responsável"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Urgent">Urgent</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Backlog">Backlog</option>
        <option value="ToDo">ToDo</option>
        <option value="Doing">Doing</option>
        <option value="Testing">Testing</option>
        <option value="Done">Done</option>
      </select>

      <button type="submit">
        {card ? 'Salvar' : 'Criar'}
      </button>
    </form>
  );
}

export default CardModal;