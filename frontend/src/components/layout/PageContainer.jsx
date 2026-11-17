/**
 * PageContainer
 * Applies fluid page gutters across all viewport sizes.
 */
export default function PageContainer({ children, className = "", style = {} }) {
  return (
    <div className={`page-container ${className}`} style={style}>
      {children}
    </div>
  );
}
