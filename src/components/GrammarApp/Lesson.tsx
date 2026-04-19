import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { Lesson } from "@/data/grammarData";
import { Button } from "@/components/ui/button";

interface LessonViewProps {
  lesson: Lesson;
  onStartQuiz: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, onStartQuiz }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {lesson.content.map((section, idx) => (
        <motion.div
          key={idx}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-8 border-4 border-slate-100 shadow-xl space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${lesson.color}`}>
              <BookOpen size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">{section.title}</h3>
          </div>

          <p className="text-xl text-slate-700 leading-relaxed font-medium">
            {section.explanation}
          </p>

          <div className="space-y-4">
            <p className="font-bold text-slate-500 uppercase tracking-widest text-xs">Examples</p>
            <div className="space-y-3">
              {section.examples.map((ex, eIdx) => (
                <div
                  key={eIdx}
                  className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 text-lg text-slate-700"
                >
                  {ex.sentence.split(ex.highlight).map((part, pIdx, arr) => (
                    <span key={pIdx}>
                      {part}
                      {pIdx < arr.length - 1 && (
                        <span className={`px-2 py-0.5 rounded-lg font-black text-white ${lesson.color} mx-1 shadow-sm`}>
                          {ex.highlight}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <Button
          onClick={onStartQuiz}
          className={`h-16 px-10 rounded-2xl text-xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all ${lesson.color} border-b-8 border-black/10`}
        >
          I'm Ready for the Quiz!
          <ArrowRight className="ml-2" />
        </Button>
      </motion.div>
    </div>
  );
};

export default LessonView;