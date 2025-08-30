export function ScrollingText() {
  const announcements = [
    "Admissions for 2024-25 are now open!",
    "Annual Tech Fest 'Innovate 2024' starts next week.",
    "Results for semester exams have been declared.",
    "Guest lecture by Dr. Anya Sharma on AI ethics this Friday.",
  ];
  
  const fullText = announcements.join(" \u00A0 | \u00A0 ");

  return (
    <div className="bg-primary text-primary-foreground py-3 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-primary to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-primary to-transparent z-10"></div>
      <div className="flex">
        <div className="marquee">
          <span className="text-base md:text-lg font-medium px-6 md:px-12 notranslate">{fullText}</span>
          <span className="text-base md:text-lg font-medium px-6 md:px-12 notranslate">{fullText}</span>
        </div>
      </div>
    </div>
  );
}
