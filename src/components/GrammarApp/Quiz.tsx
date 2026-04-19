import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, HelpCircle, ArrowRight } from "lucide-react";
import { Question } from "@/data/grammarData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QuizProps {
  questions: Question[];
  color: string;
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, color, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIdx];

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setIsAnswered(true);
    
    if (isCorrect) {
      setScore(s => s + 1);
      toast.success("Great job! That's correct! 🎉");
    } else {
      toast.error("Oops! Not quite. Try to remember the lesson! ❤️");
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center px-2">
        <span className="text-sm font-black text-slate-500 uppercase tracking-widest">
          Question {currentIdx + 1} of {questions.length}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-colors ${
                i === currentIdx ? color : i < currentIdx ? "bg-slate-300" : "bg-slate-100"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="bg-white rounded-3xl p-8 border-4 border-slate-100 shadow-xl space-y-8"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-500">
              <HelpCircle size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 pt-1">
              {currentQuestion.question}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option;
              const isCorrect = isAnswered && option === currentQuestion.correctAnswer;
              const isWrong = isAnswered && isSelected && option !== currentQuestion.correctAnswer;

              return (
                <button
                  key={option}
                  disabled={isAnswered}
                  onClick={() => handleSelect(option)}
                  className={`
                    group relative p-5 rounded-2xl border-4 text-left font-black text-xl transition-all
                    ${isSelected ? 'border-slate-800 scale-[1.02]' : 'border-slate-100 hover:border-slate-200'}
                    ${isCorrect ? 'bg-green-100 border-green-500 text-green-700' : ''}
                    ${isWrong ? 'bg-red-100 border-red-500 text-red-700' : ''}
                    ${!isAnswered && !isSelected ? 'bg-white' : ''}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {isCorrect && <Check className="text-green-600" size={24} />}
                    {isWrong && <X className="text-red-600" size={24} />}
                  </div>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100"
            >
              <p className="text-slate-600 font-medium">
                <span className="font-black text-slate-800">Note:</span> {currentQuestion.explanation}
              </p>
            </motion.div>
          )}

          <div className="flex justify-end">
            {!isAnswered ? (
              <Button
                disabled={!selectedOption}
                onClick={handleSubmit}
                className="h-14 px-10 rounded-2xl text-lg font-black bg-slate-800 hover:bg-slate-900 shadow-lg disabled:opacity-50"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className={`h-14 px-10 rounded-2xl text-lg font-black shadow-lg ${color} hover:brightness-110`}
              >
                {currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Quiz;