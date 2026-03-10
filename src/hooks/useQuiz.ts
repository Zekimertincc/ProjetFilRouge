import { useCallback, useEffect, useMemo, useState } from "react";
import type { Kana } from "../composants/kanaData";
import { useLocalStorage } from "./useLocalStorage";

type Feedback =
  | { type: "correct"; message: string }
  | { type: "incorrect"; message: string }
  | null;

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function useQuiz(kanaData: Kana[]) {
  const shuffledKana = useMemo(() => {
    return shuffleArray(kanaData);
  }, [kanaData]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [bestScore, setBestScore] = useLocalStorage<number>(
    "kana-best-score",
    0
  );

  const currentKana = shuffledKana[currentIndex] ?? null;

  useEffect(() => {
    if (score.correct > bestScore) {
      setBestScore(score.correct);
    }
  }, [score.correct, bestScore, setBestScore]);

  const goToNextQuestion = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev + 1 < shuffledKana.length) {
        return prev + 1;
      }
      return 0;
    });

    setFeedback(null);
  }, [shuffledKana.length]);

  const handleSubmit = useCallback(() => {
    if (!currentKana) return;

    const normalizedAnswer = userAnswer.trim().toLowerCase();
    if (!normalizedAnswer || feedback) return;

    const isCorrect =
      normalizedAnswer === currentKana.romanji.trim().toLowerCase();

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    setFeedback({
      type: isCorrect ? "correct" : "incorrect",
      message: isCorrect
        ? `✓ Correct ! "${currentKana.romanji}"`
        : `✗ Incorrect — c'était "${currentKana.romanji}"`,
    });

    setUserAnswer("");

    window.setTimeout(() => {
      goToNextQuestion();
    }, 1200);
  }, [currentKana, userAnswer, feedback, goToNextQuestion]);

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setUserAnswer("");
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
  }, []);

  const successRate =
    score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  const canSubmit =
    userAnswer.trim().length > 0 && feedback === null && currentKana !== null;

  return {
    currentKana,
    currentIndex,
    totalQuestions: shuffledKana.length,
    userAnswer,
    setUserAnswer,
    score,
    bestScore,
    successRate,
    feedback,
    canSubmit,
    handleSubmit,
    resetQuiz,
  };
}