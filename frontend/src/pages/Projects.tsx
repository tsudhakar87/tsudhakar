import { useEffect } from "react";
import PageLayout from "../components/PageLayout";
import ProjectCard from "../components/ProjectCard";

const Projects: React.FC = () => {
  useEffect(() => {
    const projectCards = document.querySelectorAll(".project-card");

    const handleMouseMove =
      (card: Element, header: HTMLElement) => (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = ((mouseEvent.clientX - rect.left) / rect.width) * 100;
        const y = ((mouseEvent.clientY - rect.top) / rect.height) * 100;

        header.style.setProperty("--mouse-x", `${x}%`);
        header.style.setProperty("--mouse-y", `${y}%`);
      };

    const handleMouseLeave = (header: HTMLElement) => () => {
      header.style.setProperty("--mouse-x", "50%");
      header.style.setProperty("--mouse-y", "50%");
    };

    const listeners: Array<{
      element: Element;
      mousemove: (e: Event) => void;
      mouseleave: () => void;
    }> = [];

    projectCards.forEach((card) => {
      const header = card.querySelector(".project-header") as HTMLElement;
      if (header) {
        const mousemoveHandler = handleMouseMove(card, header);
        const mouseleaveHandler = handleMouseLeave(header);

        card.addEventListener("mousemove", mousemoveHandler);
        card.addEventListener("mouseleave", mouseleaveHandler);

        listeners.push({
          element: card,
          mousemove: mousemoveHandler,
          mouseleave: mouseleaveHandler,
        });
      }
    });

    // cleanup function
    return () => {
      listeners.forEach(({ element, mousemove, mouseleave }) => {
        element.removeEventListener("mousemove", mousemove);
        element.removeEventListener("mouseleave", mouseleave);
      });
    };
  }, []);

  const projectsData = [
    {
      title: "Restaurant Review Sentiment Analyzer",
      status: "Completed",
      date: "2024",
      description:
        "full-stack aws application processing restaurant review data through cloud pipeline",
      highlights: [
        "built data pipeline using s3, lambda, rds, and ec2 for automated processing",
        "created interactive streamlit dashboard for sentiment visualization",
        "implemented nlp sentiment analysis on customer reviews",
      ],
      techStack: ["python", "aws", "streamlit", "nlp"],
    },
    {
      title: "Indexers Data Processing System",
      status: "Completed",
      date: "2025",
      description: "large-scale data processing system for json file analysis",
      highlights: [
        "processed hundreds of thousands of json files efficiently",
        "utilized pandas for data manipulation and analysis",
        "optimized performance for large dataset handling",
      ],
      techStack: ["python", "pandas", "json"],
    },
    {
      title: "NU-CLEAR Co-op Review Platform",
      status: "Completed",
      date: "2024",
      description:
        "comprehensive database-driven platform for northeastern university co-op program reviews",
      highlights: [
        "engineered rest api backend with flask and mysql database",
        "implemented user authentication and review management system",
        "deployed with docker containerization for scalability",
      ],
      techStack: ["mysql", "flask", "streamlit", "docker"],
    },
    {
      title: "Catalyst Course Scheduler",
      status: "Hackathon",
      date: "2024",
      description:
        "intelligent course scheduling assistant built during hackathon",
      highlights: [
        "developed reactive ui components with typescript and react",
        "implemented scheduling algorithms for optimal course arrangement",
        "created user-friendly interface for academic planning",
      ],
      techStack: ["typescript", "react", "algorithms"],
    },
    {
      title: "Cosmic Checklist",
      status: "Hackathon",
      date: "2024",
      description:
        "star-themed productivity application with interactive task management",
      highlights: [
        "built responsive frontend with react and typescript",
        "implemented local storage for task persistence",
        "designed engaging space-themed user experience",
      ],
      techStack: ["react", "typescript", "css"],
    },
  ];

  return (
    <div style={{ height: "100vh", overflow: "auto" }}>
      <PageLayout pageName="Projects">
        <div className="content-container">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              status={project.status}
              date={project.date}
              description={project.description}
              highlights={project.highlights}
              techStack={project.techStack}
            />
          ))}
        </div>
      </PageLayout>
    </div>
  );
};

export default Projects;
