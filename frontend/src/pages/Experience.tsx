import React from "react";
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
          achievements={["Full-Stack Development & Integration: Design, build, test and maintain software applications and internal tools while integrating with internal and external APIs, cloud services, and relational databases to support data health and application administration", 
            "meowwww"]}
        />
        <ExperienceCard
          jobTitle="Teaching Assistant"
          company="Khoury College of Computer Sciences, Northeastern University"
          location="Boston, MA"
          dates="September 2024 - April 2025"
          achievements={["Teaching Assistant for Fundamentals of Computer Science 1 (affectionately known as 'Fundies'), and Object-Orietned Design",
            "Assisting professors in grading, conducting office hours, and providing support to students in understanding course material"
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
          achievements={["meow", "meowwww"]}
        />
        <ExperienceCard
          jobTitle="ViTAL Hacks Event & Relations Co-Lead"
          company="ViTAL: Northeastern University's Healthcare Innovation Core"
          companyLink="https://vitalnortheastern.org/"
          location="Northeastern University"
          dates="October 2024 - Present"
          achievements={["meow", "meowwww"
          ]}
        />
      </ContentCard>
    </PageLayout>
  );
};

export default Experience;
