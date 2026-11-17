/**
 * ReadingContainer
 * Constrains editorial and learning content to comfortable reading line lengths (max 960px).
 */
export default function ReadingContainer({ children, className = "", style = {} }) {
  return (
    <div className={`reading-container ${className}`} style={style}>
      {children}
    </div>
  );
}
