interface NavaigationHeaderProps {
  sections: string[];
  currentSection: number;
  className?: string;
}
export const NavigationHeader: React.FC<NavaigationHeaderProps> = ({
  sections,
  currentSection,
}) => {
  return (
    <div className="flex flex-row items-center bg-white rounded-md overflow-hidden shadow-sm">
      {sections.map((section: string, index) => {
        const isCurrentSection = index == currentSection;
        return (
          <div
            className={`py-3 flex-1 text-center
                                 ${isCurrentSection && "text-white bg-primary"}
                            }
                  `}
          >
            {section}
          </div>
        );
      })}
    </div>
  );
};
