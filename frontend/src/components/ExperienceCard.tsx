interface ExperienceCardProps {
  jobTitle: string;
  company: string;
  location: string;
  dates: string;
  achievements: string[];
  className?: string;
  companyLink?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  jobTitle,
  company,
  location,
  dates,
  achievements,
  className = "",
  companyLink,
}) => {
  return (
    <div className={`experience-item ${className}`}>
      <div className="job-header">
        <div>
          <h2 className="job-title">{jobTitle}</h2>
          <h3 className="company">
            {companyLink ? (
              <a href={companyLink} target="_blank" rel="noopener noreferrer">
                {company}
              </a>
            ) : (
              company
            )}
          </h3>
        </div>
        <div className="location-date">
          <div>{location}</div>
          <div>{dates}</div>
        </div>
      </div>

      <ul className="achievements">
        {achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceCard;
