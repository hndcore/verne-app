import { BookOpen } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-[#f7f6f2] border-b border-stone-200 shadow-sm" data-testid="header">
      <div className="container mx-auto px-6 py-8" data-testid="header-container">
        <div className="flex items-center gap-4" data-testid="header-content">
          <div
            className="flex items-center justify-center w-12 h-12 bg-[#693816] rounded-xl"
            data-testid="header-logo"
          >
            <BookOpen className="w-6 h-6 text-[#f5f3f0]" data-testid="header-logo-icon" />
          </div>
          <div data-testid="header-text">
            <h1
              className="text-3xl font-bold text-stone-800 tracking-tight"
              data-testid="header-title"
            >
              Verne
            </h1>
            <p className="text-stone-600 text-lg" data-testid="header-subtitle">
              Track your literary journey
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
