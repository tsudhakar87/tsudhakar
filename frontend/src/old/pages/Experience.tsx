import PageLayout from "../components/PageLayout";
import ContentCard from "../components/ContentCard";
import ExperienceCard from "../components/ExperienceCard";

const Experience: React.FC = () => {
  return (
    <PageLayout pageName="experience">
      <ContentCard title="Professional Experience">
        <ExperienceCard
          jobTitle="Full-Stack Software Engineering Co-op"
          company="LineVision, Inc."
          companyLink="https://www.linevisioninc.com/"
          location="Charlestown, MA"
          dates="June 2025 - Present"
          achievements={[
            "Design, build, test and maintain software applications and internal tools while integrating with internal and external APIs, cloud services, and relational databases to support data health and application administration",
            "Reduced dashboard loading times from 18s to 7s through Sequelize query optimization and enhanced performance-critical components by refactoring Python codebase with Rust/PyO3 integrations",
            "Deliver reliable customer-facing UI bug fixes through automated CI/CD pipelines and increased API repository test coverage by ~20% with Jest to enhance backend reliability and release confidence",
          ]}
        />
        <ExperienceCard
          jobTitle="Teaching Assistant"
          company="Khoury College of Computer Sciences, Northeastern University"
          location="Boston, MA"
          dates="September 2024 - April 2025"
          achievements={[
            "Teaching Assistant for Fundamentals of Computer Science 1 (affectionately known as 'Fundies'), and Object-Oriented Design",
            "Assisting professors in grading, conducting office hours, and providing support to students in understanding course material",
          ]}
        />
      </ContentCard>
      <ContentCard title="Extracurricular Experience">
        <ExperienceCard
          jobTitle="Software Developer"
          company="Code4Community"
          companyLink="https://www.c4cneu.com/"
          location="Northeastern University"
          dates="September 2025 - Present"
          achievements={[
            "Collaborating on a team to develop a software solution for a local nonprofit organization",
          ]}
        />
        <ExperienceCard
          jobTitle="ViTAL Hacks Event & Relations Co-Lead"
          company="ViTAL: Northeastern University's Healthcare Innovation Core"
          companyLink="https://vitalnortheastern.org/"
          location="Northeastern University"
          dates="October 2024 - Present"
          achievements={[
            "Lead event logistics for ViTAL’s annual healthcare hackathon, managing supplies, food coordination, and merchandise planning",
            "Develop a scheduling system for participants, judges, speakers, and mentors and establish communication infrastructure",
          ]}
        />
        <ExperienceCard
          jobTitle="Outreach Coordinator"
          company="South Indian Student Association (SISA)"
          companyLink="https://nusisa.wixsite.com/sisa"
          location="Northeastern University"
          dates="July 2025 - Present"
          achievements={[
            "Design promotional newsletters in Canva and manage email communications via Mailchimp to engage a diverse student body",
            "Facilitate collaboration with other cultural organizations on campus to promote inclusivity and cultural exchange",
          ]}
        />
      </ContentCard>
    </PageLayout>
  );
};

export default Experience;
