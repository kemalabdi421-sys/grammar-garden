import React from "react";
import { motion } from "framer-motion";
import { Star, Home, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface HeaderProps {
  progress: number;
  stars: number;
  onHome: () => void;
  onBack?: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ progress, stars, onHome, onBack, title }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-4 border-slate-100 px-4 py-3 sm:px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {onBack ? (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <button
              onClick={onHome}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <Home size={20} />
            </button>
          )}
          {title && <h1 className="font-bold text-slate-800 text-lg hidden sm:block">{title}</h1>}
        </div>

        <div className="flex-1 max-w-xs px-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Level Progress</span>
            <span className="text-xs font-bold text-slate-500">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-slate-100 border-2 border-slate-200" />
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 border-2 border-yellow-200 rounded-full shadow-sm">
          <motion.div
            animate={{ rotate: stars > 0 ? [0, 15, -15, 0] : 0 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Star className="text-yellow-500 fill-yellow-500" size={20} />
          </motion.div>
          <span className="font-bold text-yellow-700">{stars}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;