import { useParams, Link } from 'react-router-dom';
import {
  LeftOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  QuestionCircleOutlined,
} from '@ant-design/icons';

interface QuestionResult {
  id: number;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
  points: number;
  maxPoints: number;
}

interface QuizAttempt {
  quizTitle: string;
  user: string;
  score: string;
  passed: boolean;
  date: string;
  timeTaken: string;
  questions: QuestionResult[];
}

const mockAttempts: Record<string, QuizAttempt> = {
  rq1: {
    quizTitle: 'JavaScript Fundamentals Quiz',
    user: 'Emily Chen',
    score: '92%',
    passed: true,
    date: 'Feb 9, 2026 at 10:23 AM',
    timeTaken: '18 min',
    questions: [
      { id: 1, question: 'What is the difference between let and var in JavaScript?', type: 'short-answer', userAnswer: 'let is block-scoped while var is function-scoped', correctAnswer: 'let is block-scoped, var is function-scoped', correct: true, points: 10, maxPoints: 10 },
      { id: 2, question: 'Which method converts a JSON string to a JavaScript object?', type: 'multiple-choice', userAnswer: 'JSON.parse()', correctAnswer: 'JSON.parse()', correct: true, points: 10, maxPoints: 10 },
      { id: 3, question: 'What does the === operator do?', type: 'multiple-choice', userAnswer: 'Strict equality comparison', correctAnswer: 'Strict equality comparison', correct: true, points: 10, maxPoints: 10 },
      { id: 4, question: 'Arrow functions have their own "this" binding.', type: 'true-false', userAnswer: 'False', correctAnswer: 'False', correct: true, points: 10, maxPoints: 10 },
      { id: 5, question: 'What is a closure in JavaScript?', type: 'short-answer', userAnswer: 'A function that retains access to its outer scope', correctAnswer: 'A function that has access to variables from its outer (enclosing) scope', correct: true, points: 10, maxPoints: 10 },
      { id: 6, question: 'Which array method creates a new array with filtered elements?', type: 'multiple-choice', userAnswer: 'filter()', correctAnswer: 'filter()', correct: true, points: 10, maxPoints: 10 },
      { id: 7, question: 'What is the output of typeof null?', type: 'multiple-choice', userAnswer: '"null"', correctAnswer: '"object"', correct: false, points: 0, maxPoints: 10 },
      { id: 8, question: 'Promises can be in pending, fulfilled, or rejected states.', type: 'true-false', userAnswer: 'True', correctAnswer: 'True', correct: true, points: 10, maxPoints: 10 },
      { id: 9, question: 'What does the spread operator (...) do?', type: 'short-answer', userAnswer: 'Expands an iterable into individual elements', correctAnswer: 'Expands an iterable into individual elements', correct: true, points: 10, maxPoints: 10 },
      { id: 10, question: 'Which keyword is used to define a constant in JavaScript?', type: 'multiple-choice', userAnswer: 'const', correctAnswer: 'const', correct: true, points: 10, maxPoints: 10 },
    ],
  },
  rq2: {
    quizTitle: 'React Hooks Assessment',
    user: 'David Wilson',
    score: '88%',
    passed: true,
    date: 'Feb 9, 2026 at 9:15 AM',
    timeTaken: '22 min',
    questions: [
      { id: 1, question: 'What is the purpose of useState in React?', type: 'multiple-choice', userAnswer: 'To manage component state', correctAnswer: 'To manage component state', correct: true, points: 10, maxPoints: 10 },
      { id: 2, question: 'useEffect runs after every render by default.', type: 'true-false', userAnswer: 'True', correctAnswer: 'True', correct: true, points: 10, maxPoints: 10 },
      { id: 3, question: 'What hook is used for memoizing expensive calculations?', type: 'multiple-choice', userAnswer: 'useMemo', correctAnswer: 'useMemo', correct: true, points: 10, maxPoints: 10 },
      { id: 4, question: 'Explain the dependency array in useEffect.', type: 'short-answer', userAnswer: 'Controls when the effect re-runs based on value changes', correctAnswer: 'An array of values that triggers re-execution when changed', correct: true, points: 10, maxPoints: 10 },
      { id: 5, question: 'Which hook provides a way to pass data through the component tree?', type: 'multiple-choice', userAnswer: 'useContext', correctAnswer: 'useContext', correct: true, points: 10, maxPoints: 10 },
      { id: 6, question: 'useRef persists values across re-renders without causing re-render.', type: 'true-false', userAnswer: 'True', correctAnswer: 'True', correct: true, points: 10, maxPoints: 10 },
      { id: 7, question: 'What is the difference between useCallback and useMemo?', type: 'short-answer', userAnswer: 'useCallback memoizes functions, useMemo memoizes values', correctAnswer: 'useCallback returns a memoized function, useMemo returns a memoized value', correct: true, points: 10, maxPoints: 10 },
      { id: 8, question: 'Custom hooks must start with the prefix "use".', type: 'true-false', userAnswer: 'False', correctAnswer: 'True', correct: false, points: 0, maxPoints: 10 },
      { id: 9, question: 'Which hook is best for managing complex state logic?', type: 'multiple-choice', userAnswer: 'useState', correctAnswer: 'useReducer', correct: false, points: 0, maxPoints: 10 },
      { id: 10, question: 'What does useLayoutEffect do differently from useEffect?', type: 'short-answer', userAnswer: 'Fires synchronously after DOM mutations but before paint', correctAnswer: 'Fires synchronously after all DOM mutations, before the browser paints', correct: true, points: 10, maxPoints: 10 },
    ],
  },
};

// Generate a default quiz attempt for IDs not in mockAttempts
function getAttempt(id: string): QuizAttempt {
  if (mockAttempts[id]) return mockAttempts[id];
  return {
    quizTitle: 'Quiz Attempt',
    user: 'Learner',
    score: '85%',
    passed: true,
    date: 'Feb 9, 2026',
    timeTaken: '20 min',
    questions: [
      { id: 1, question: 'Sample question 1', type: 'multiple-choice', userAnswer: 'Option A', correctAnswer: 'Option A', correct: true, points: 10, maxPoints: 10 },
      { id: 2, question: 'Sample question 2', type: 'true-false', userAnswer: 'True', correctAnswer: 'False', correct: false, points: 0, maxPoints: 10 },
      { id: 3, question: 'Sample question 3', type: 'multiple-choice', userAnswer: 'Option C', correctAnswer: 'Option C', correct: true, points: 10, maxPoints: 10 },
      { id: 4, question: 'Sample question 4', type: 'short-answer', userAnswer: 'Correct answer here', correctAnswer: 'Correct answer here', correct: true, points: 10, maxPoints: 10 },
      { id: 5, question: 'Sample question 5', type: 'multiple-choice', userAnswer: 'Option B', correctAnswer: 'Option B', correct: true, points: 10, maxPoints: 10 },
    ],
  };
}

const typeBadge: Record<string, string> = {
  'multiple-choice': 'bg-blue-50 text-blue-700',
  'true-false': 'bg-purple-50 text-purple-700',
  'short-answer': 'bg-amber-50 text-amber-700',
};

const typeLabel: Record<string, string> = {
  'multiple-choice': 'Multiple Choice',
  'true-false': 'True/False',
  'short-answer': 'Short Answer',
};

export default function QuizResultDetail() {
  const { attemptId } = useParams();
  const attempt = getAttempt(attemptId || '');
  const correctCount = attempt.questions.filter((q) => q.correct).length;
  const totalPoints = attempt.questions.reduce((sum, q) => sum + q.points, 0);
  const maxPoints = attempt.questions.reduce((sum, q) => sum + q.maxPoints, 0);

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <LeftOutlined className="text-xs" /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <QuestionCircleOutlined className="text-indigo-600 text-2xl" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-900">{attempt.quizTitle}</h2>
          <p className="text-sm text-gray-500 mt-0.5">Completed by {attempt.user}</p>
        </div>
        <div className={`px-4 py-2 rounded-xl text-sm font-semibold ${attempt.passed ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {attempt.passed ? 'Passed' : 'Failed'}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Score</p>
          <p className="text-2xl font-semibold text-gray-900">{attempt.score}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Points</p>
          <p className="text-2xl font-semibold text-gray-900">{totalPoints}/{maxPoints}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Correct</p>
          <p className="text-2xl font-semibold text-gray-900">{correctCount}/{attempt.questions.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Time Taken</p>
          <p className="text-2xl font-semibold text-gray-900">{attempt.timeTaken}</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-4">Submitted {attempt.date}</p>

      {/* Question breakdown */}
      <h3 className="text-base font-semibold text-gray-900 mb-3">Question Breakdown</h3>
      <div className="space-y-3">
        {attempt.questions.map((q) => (
          <div
            key={q.id}
            className={`bg-white rounded-xl border-l-4 border border-gray-200 p-4 ${
              q.correct ? 'border-l-green-400' : 'border-l-red-400'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                {q.correct ? (
                  <CheckCircleFilled className="text-green-500 text-lg" />
                ) : (
                  <CloseCircleFilled className="text-red-500 text-lg" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-400">Q{q.id}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeBadge[q.type]}`}>
                    {typeLabel[q.type]}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">{q.points}/{q.maxPoints} pts</span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-2">{q.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className={`px-3 py-2 rounded-lg ${q.correct ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Their Answer</p>
                    <p className={`font-medium ${q.correct ? 'text-green-700' : 'text-red-700'}`}>{q.userAnswer}</p>
                  </div>
                  {!q.correct && (
                    <div className="px-3 py-2 rounded-lg bg-green-50">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Correct Answer</p>
                      <p className="font-medium text-green-700">{q.correctAnswer}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
