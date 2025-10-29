import React from "react";
import PageLayout from "../components/PageLayout";
import ContentCard from "../components/ContentCard";

const About: React.FC = () => {
  return (
    <PageLayout pageName="about me">
      <div className="content-container">
        <ContentCard>
          <p className="intro-text">
            Hi! I'm <span className="highlight">Thillainayaki Sudhakar</span>, a
            Computer Science and Biology student at Northeastern University. I'm
            passionate about building technology that makes a meaningful impact,
            particularly in areas where
            <span className="highlight">
              {" "}
              data science meets real-world applications
            </span>
            .
          </p>
          <p className="intro-text">
            I'm currently pursuing my Bachelor's degree with a focus on
            leveraging computational methods to solve complex problems in both
            biological research and software development. I enjoy the
            intersection of
            <span className="highlight">
              {" "}
              analytical thinking and creative problem-solving
            </span>
            .
          </p>
        </ContentCard>

        <ContentCard title="Technical Skills">
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <div className="skill-tags">
                <span className="skill-tag">Java</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">C#</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">R</span>
              </div>
            </div>

            <div className="skill-category">
              <h3>Frameworks & Tools</h3>
              <div className="skill-tags">
                <span className="skill-tag">React</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express.js</span>
                <span className="skill-tag">Flask</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">Azure</span>
              </div>
            </div>

            <div className="skill-category">
              <h3>Data Science</h3>
              <div className="skill-tags">
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">TensorFlow</span>
                <span className="skill-tag">Matplotlib</span>
                <span className="skill-tag">Statsmodels</span>
                <span className="skill-tag">Machine Learning</span>
                <span className="skill-tag">Data Visualization</span>
              </div>
            </div>
          </div>
        </ContentCard>

        <ContentCard title="Interests & Hobbies">
          <div className="interests-list">
            <div className="interest-item">Traveling</div>
            <div className="interest-item">Trying Different Cuisines</div>
            <div className="interest-item">
              Reading (primarily) Fantasy Novels
            </div>
            <div className="interest-item">
              Volunteering + Community Service
            </div>
            <div className="interest-item">Learning New Languages</div>
            <div className="interest-item">Open Source Projects</div>
          </div>
        </ContentCard>
      </div>
    </PageLayout>
  );
};

export default About;
