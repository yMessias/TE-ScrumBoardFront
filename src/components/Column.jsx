import Card from './Card';
import './Column.css';

function Column({ title, cards, onMove, onDelete, onCardClick }) {
  return (
    <div className="column">
      <h3 className="column__title">
        {title} ({cards.length})
      </h3>

      <div className="column__cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onMove={onMove}
            onDelete={onDelete}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;