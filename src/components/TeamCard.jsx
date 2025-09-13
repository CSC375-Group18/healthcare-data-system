// src/components/TeamCard.jsx
export default function TeamCard({ photo, name, role }) {
  return (
    <div className="team-card">
      <div className="team-card__photo">
        {photo ? <img src={photo} alt={name} /> : <div className="no-photo" />}
      </div>
      <div className="team-card__name">{name}</div>
      <div className="team-card__role">{role}</div>
    </div>
  );
}