import './Card.css';
import PriorityBadge from './PriorityBadge';

const STATUSES = ['Backlog', 'ToDo', 'Doing', 'Testing', 'Done'];

function Card({ card, onMove, onDelete, onClick }) {
  return (
    <div className="card" onClick={() => onClick(card)}>
      <div className="card__header">
        <h4 className="card__title">{card.title}</h4>

        <button
          className="card__delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
        >
          ×
        </button>
      </div>

      {card.description && (
        <p className="card__description">{card.description}</p>
      )}

      <div className="card__footer">
        <span className="card__assignee">{card.assignee}</span>
        <PriorityBadge priority={card.priority} />
      </div>

      <select
        className="card__move"
        value={card.status}
        onChange={(e) => {
          e.stopPropagation();
          onMove(card.id, e.target.value);
        }}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}

export default Card;