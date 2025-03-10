import { ReactNode } from "react";

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl p-8 shadow-md border border-gray-200 transition hover:shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default GlassmorphismCard;
