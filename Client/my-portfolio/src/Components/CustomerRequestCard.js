export default function CustomerRequestCard({ request, onDelete }) {


  const { id, firstname, lastname, email, country, subject, created_at } = request;
  const formattedDate = new Date(created_at).toLocaleString();

  return (
    <div className="modern-card">
      <div className="card-header">
        <span className="name">{firstname} {lastname}</span>
      </div>

      <div className="card-info">
        <p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
        <p><strong>Country:</strong> {country}</p>
        <p><strong>Message:</strong> {subject.length > 80 ? subject.slice(0, 80) + '…' : subject}</p>
      </div>

      <div className="card-footer">
        <span className="date">{formattedDate}</span>
      </div>

      <div className="card-actions">
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}
