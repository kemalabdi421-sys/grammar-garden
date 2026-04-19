import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import Header from "./components/GrammarApp/Header";
import Home from "./components/GrammarApp/Home";
import LessonView from "./components/GrammarApp/Lesson";
import Quiz from "./components/GrammarApp/Quiz";
import SuccessModal from "./components/GrammarApp/SuccessModal";
import { grammarData, Lesson } from "./data/grammarData";

function App() {
  const [view, setView] = useState<"home" | "lesson" | "quiz" | "success">("home");
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [stars, setStars] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [quizScore, setQuizScore] = useState({ score: 0, total: 0 });

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("grammar-stars");
    const savedLessons = localStorage.getItem("completed-lessons");
    if (saved) setStars(parseInt(saved));
    if (savedLessons) setCompletedLessons(JSON.parse(savedLessons));
  }, []);

  const handleSelectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setView("lesson");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = () => {
    setView("quiz");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (score: number) => {
    const total = currentLesson?.questions.length || 0;
    setQuizScore({ score, total });
    
    // Reward stars for correct answers
    const newStars = stars + (score * 10);
    setStars(newStars);
    localStorage.setItem("grammar-stars", newStars.toString());

    // Mark lesson as completed
    if (currentLesson && score >= Math.ceil(total * 0.7)) {
      const newCompleted = [...new Set([...completedLessons, currentLesson.id])];
      setCompletedLessons(newCompleted);
      localStorage.setItem("completed-lessons", JSON.stringify(newCompleted));
    }

    setView("success");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setView("quiz");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHome = () => {
    setView("home");
    setCurrentLesson(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progress = Math.round((completedLessons.length / grammarData.length) * 100);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden relative">
      <Header 
        progress={progress} 
        stars={stars} 
        onHome={handleHome}
        onBack={view !== "home" ? (view === "quiz" ? () => setView("lesson") : handleHome) : undefined}
        title={currentLesson?.title}
      />

      <main className="pb-20 pt-8 relative z-10">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Home 
                lessons={grammarData} 
                onSelectLesson={handleSelectLesson}
                completedLessons={completedLessons}
              />
            </motion.div>
          )}

          {view === "lesson" && currentLesson && (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <LessonView 
                lesson={currentLesson} 
                onStartQuiz={handleStartQuiz} 
              />
            </motion.div>
          )}

          {view === "quiz" && currentLesson && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <Quiz 
                questions={currentLesson.questions}
                color={currentLesson.color}
                onComplete={handleQuizComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {view === "success" && (
        <SuccessModal 
          score={quizScore.score}
          total={quizScore.total}
          onRetry={handleRetry}
          onHome={handleHome}
        />
      )}

      {/* Decorative background elements using Framer Motion instead of custom CSS */}
      <div className="fixed inset-0 -z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        />
        <motion.div 
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        />
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 4 }}
          className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;