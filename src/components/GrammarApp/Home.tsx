import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Lesson } from "@/data/grammarData";

interface HomeProps {
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
  completedLessons: string[];
}

const Home: React.FC<HomeProps> = ({ lessons, onSelectLesson, completedLessons }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/8cd659a4-5a1e-4f85-8826-f31e1f32aa44/educational-mascot-53a29c34-1776077670026.webp"
          alt="Grammar Owl"
          className="w-32 h-32 mx-auto rounded-full border-4 border-blue-200 shadow-lg"
        />
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Ready to Learn Grammar?
        </h2>
        <p className="text-slate-600 text-lg max-w-md mx-auto">
          Choose a fun adventure below to start your English journey!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {lessons.map((lesson, index) => {
          const IconComponent = (Icons as any)[lesson.icon];
          const isCompleted = completedLessons.includes(lesson.id);

          return (
            <motion.button
              key={lesson.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectLesson(lesson)}
              className={`group relative p-6 rounded-3xl text-left border-b-8 active:border-b-0 active:translate-y-2 transition-all overflow-hidden ${lesson.color} border-black/10`}
            >
              <div className="relative z-10 flex flex-col h-full gap-4">
                <div className="p-3 bg-white/30 rounded-2xl w-fit">
                  {IconComponent && <IconComponent className="text-white" size={32} />}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{lesson.title}</h3>
                  <p className="text-white/90 font-medium">{lesson.description}</p>
                </div>
                {isCompleted && (
                  <div className="mt-auto flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full w-fit">
                    <Icons.CheckCircle size={16} className="text-white" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Completed</span>
                  </div>
                )}
              </div>
              
              {/* Decorative background shape */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Home;