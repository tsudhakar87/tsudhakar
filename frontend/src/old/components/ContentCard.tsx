interface ContentCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  return (
    <div className={`content-card ${className}`}>
      {title && <h2 className="card-title">{title}</h2>}
      {subtitle && <h3 className="card-subtitle">{subtitle}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default ContentCard;
