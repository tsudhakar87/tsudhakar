import React from "react";
import HomeButton from "./HomeButton";
import PageHeader from "./PageHeader";
import Navigation from "./Navigation";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  pageName?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  pageName,
  className = "",
}) => {
  const isHomePage = pageName === "Home";

  return (
    <div className={`page-layout ${className}`}>
      {isHomePage ? (
        <PageHeader imageSrc="/assets/name-header.svg" altText="Home Header" />
      ) : (
        <PageHeader text={pageName} altText="Contact Header" />
      )}

      <Navigation />

      <main className="page-content">{children}</main>

      {!isHomePage ? <HomeButton /> : null}
    </div>
  );
};

export default PageLayout;
