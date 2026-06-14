import "./StatCard.css";

const StatCard = ({ count, title, description, icon: Icon, trend, tone = "primary" }) => {
  return (
    <article className={`stat-card stat-${tone}`}>
      <div className="stat-card-top">
        <div className="stat-icon">{Icon && <Icon size={22} />}</div>
        {trend && <span className="stat-trend">{trend}</span>}
      </div>

      <strong className="stat-count">{count}</strong>
      <span className="stat-title">{title}</span>
      {description && <p>{description}</p>}
    </article>
  );
};

export default StatCard;
