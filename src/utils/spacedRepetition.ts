import { Flashcard, UserLearningState } from "../types";
import { INITIAL_FLASHCARDS } from "../data/flashcardsData";

const STORAGE_KEY = "moat_academy_user_state_v1";

export const PASSING_SCORE_THRESHOLD = 80;

export function loadUserLearningState(): UserLearningState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration / Data Validation:
      // Ensure only modules with quiz score >= 80% are counted in completedModules
      if (parsed.quizScores && Array.isArray(parsed.completedModules)) {
        parsed.completedModules = parsed.completedModules.filter((id: number) => {
          const score = parsed.quizScores[id];
          return score !== undefined ? score >= PASSING_SCORE_THRESHOLD : true;
        });
      }
      return parsed;
    }
  } catch (e) {
    console.error("Öğrenci durumu yüklenemedi:", e);
  }

  // Initial default state
  const initialCardsMap: Record<string, Flashcard> = {};
  INITIAL_FLASHCARDS.forEach((card) => {
    initialCardsMap[card.id] = { ...card };
  });

  return {
    completedModules: [],
    quizScores: {},
    flashcardStates: initialCardsMap,
    currentStreak: 1,
    lastActiveDate: new Date().toISOString().split("T")[0],
    masteredCardsCount: 0,
    bookmarkedTerms: [],
  };
}

export function saveUserLearningState(state: UserLearningState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Öğrenci durumu kaydedilemedi:", e);
  }
}

/**
 * SuperMemo SM-2 Spaced Repetition Algorithm
 * Quality rating:
 * 1: Tekrar Et (Unuttum / Yanlış)
 * 2: Zor (Hatırlamakta zorlandım)
 * 3: İyi (Doğru bildim)
 * 4: Mükemmel (Çok kolay ve net hatırladım)
 */
export function calculateSM2(
  card: Flashcard,
  quality: 1 | 2 | 3 | 4
): Flashcard {
  let { repetitions, intervalDays, easeFactor } = card;

  // Map 1-4 to SM-2 scale (0-5)
  // 1 -> 1, 2 -> 3, 3 -> 4, 4 -> 5
  const qMap: Record<number, number> = { 1: 1, 2: 3, 3: 4, 4: 5 };
  const q = qMap[quality];

  if (q >= 3) {
    // Correct response
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = quality === 4 ? 4 : 3;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect / Failed
    repetitions = 0;
    intervalDays = 1;
  }

  // Update Ease Factor (EF)
  easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  const now = new Date();
  const nextDate = new Date();
  nextDate.setDate(now.getDate() + intervalDays);

  const difficulty: "kolay" | "orta" | "zor" =
    repetitions >= 3 ? "kolay" : repetitions >= 1 ? "orta" : "zor";

  return {
    ...card,
    repetitions,
    intervalDays,
    easeFactor: Number(easeFactor.toFixed(2)),
    difficulty,
    nextReviewDate: nextDate.toISOString(),
    lastReviewedDate: now.toISOString(),
  };
}

export function checkAndUpdateStreak(state: UserLearningState): UserLearningState {
  const today = new Date().toISOString().split("T")[0];
  const lastActive = state.lastActiveDate;

  if (lastActive === today) {
    return state;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let streak = state.currentStreak;
  if (lastActive === yesterdayStr) {
    streak += 1;
  } else {
    streak = 1; // reset streak if missed a day
  }

  const updatedState = {
    ...state,
    currentStreak: streak,
    lastActiveDate: today,
  };
  saveUserLearningState(updatedState);
  return updatedState;
}

/**
 * Returns all flashcards that are due for review based on SM-2 schedule.
 */
export function getDueFlashcards(
  userState: UserLearningState,
  baseFlashcards: Flashcard[]
): Flashcard[] {
  const now = new Date().getTime();
  return baseFlashcards
    .map((card) => userState.flashcardStates[card.id] || card)
    .filter((card) => {
      if (!card.nextReviewDate) return true;
      return new Date(card.nextReviewDate).getTime() <= now;
    });
}
