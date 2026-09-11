import "../page-title-styles.css";

interface PageHeaderProps {
  text?: string;
  imageSrc?: string;
  altText?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ text, imageSrc, altText }) => {
  return (
    <div className="heading">
      {text ? (
        <h1 className="page-title">{text}</h1>
      ) : (
        <img src={imageSrc} alt={altText} />
      )}
    </div>
  );
};

export default PageHeader;
