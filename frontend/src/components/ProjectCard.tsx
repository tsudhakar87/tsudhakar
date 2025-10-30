interface ProjectCardProps {
  title: string;
  status: string;
  date: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubLink?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  status,
  date,
  description,
  highlights,
  techStack,
  githubLink,
  className = "",
}) => {
  return (
    <div className={`project-card ${className}`}>
      <div className="project-header">
        <span className="project-status">{status}</span>
        <h2 className="project-title">{title}</h2>
        <div className="project-date">{date}</div>
      </div>

      <div className="project-content">
        <p className="project-description">{description}</p>

        <ul className="project-highlights">
          {highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>

        <div className="tech-stack">
          {techStack.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {githubLink && (
          <a href={githubLink} className="github-link">
            View on GitHub →
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
