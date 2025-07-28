import { BookOpen } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header
      className="bg-gradient-to-r from-[#f5f3f0] to-stone-50 border-b border-stone-200 shadow-sm"
      data-testid="header"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-[#693816] rounded-xl">
            <BookOpen className="w-6 h-6 text-[#f5f3f0]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Verne</h1>
            <p className="text-stone-600 text-lg">Track your literary journey</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
