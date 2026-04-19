import React from "react";
import { motion } from "framer-motion";
import { Trophy, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  score: number;
  total: number;
  onRetry: () => void;
  onHome: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ score, total, onRetry, onHome }) => {
  const percentage = (score / total) * 100;
  const isPerfect = score === total;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-[40px] p-10 max-w-sm w-full text-center shadow-2xl border-b-[12px] border-slate-200"
      >
        <div className="relative mb-8">
          <motion.img
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8cd659a4-5a1e-4f85-8826-f31e1f32aa44/success-celebration-4074c045-1776077670773.webp"
            alt="Winner"
            className="w-48 h-48 mx-auto rounded-full border-8 border-yellow-100 shadow-xl"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-4 -right-4 p-4 bg-yellow-400 rounded-full shadow-lg border-4 border-white"
          >
            <Trophy className="text-white" size={32} />
          </motion.div>
        </div>

        <h2 className="text-4xl font-black text-slate-800 mb-2">
          {isPerfect ? "Superstar!" : "Great Job!"}
        </h2>
        <p className="text-slate-500 font-bold mb-8 text-lg">
          You got <span className="text-blue-500">{score}</span> out of <span className="text-blue-500">{total}</span> correct!
        </p>

        <div className="space-y-4">
          <Button
            onClick={onHome}
            className="w-full h-16 rounded-2xl text-xl font-black bg-blue-500 hover:bg-blue-600 shadow-lg border-b-8 border-blue-700 active:border-b-0 active:translate-y-2 transition-all"
          >
            <Home className="mr-2" />
            Back Home
          </Button>
          <Button
            variant="outline"
            onClick={onRetry}
            className="w-full h-14 rounded-2xl text-lg font-bold border-4 border-slate-100 hover:bg-slate-50"
          >
            <RefreshCw className="mr-2" size={20} />
            Try Again
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessModal;