import { Link } from 'react-router-dom';
import {
  LeftOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  StarOutlined,
} from '@ant-design/icons';

interface LessonCompletedRow {
  id: number;
  lessonName: string;
  totalCompletions: number;
  completionsThisWeek: number;
  avgCompletionTime: string;
  satisfactionScore: number;
  repeatViews: number;
}

const mockData: LessonCompletedRow[] = [
  { id: 1, lessonName: 'CSS Fundamentals', totalCompletions: 342, completionsThisWeek: 28, avgCompletionTime: '18 min', satisfactionScore: 4.7, repeatViews: 45 },
  { id: 2, lessonName: 'JavaScript Basics', totalCompletions: 418, completionsThisWeek: 35, avgCompletionTime: '24 min', satisfactionScore: 4.5, repeatViews: 62 },
  { id: 3, lessonName: 'React Introduction', totalCompletions: 289, completionsThisWeek: 22, avgCompletionTime: '32 min', satisfactionScore: 4.8, repeatViews: 38 },
  { id: 4, lessonName: 'HTML Best Practices', totalCompletions: 376, completionsThisWeek: 18, avgCompletionTime: '15 min', satisfactionScore: 4.3, repeatViews: 29 },
  { id: 5, lessonName: 'Git Workflow', totalCompletions: 264, completionsThisWeek: 31, avgCompletionTime: '22 min', satisfactionScore: 4.6, repeatViews: 54 },
  { id: 6, lessonName: 'Responsive Design', totalCompletions: 198, completionsThisWeek: 14, avgCompletionTime: '28 min', satisfactionScore: 4.4, repeatViews: 33 },
  { id: 7, lessonName: 'TypeScript Intro', totalCompletions: 156, completionsThisWeek: 19, avgCompletionTime: '35 min', satisfactionScore: 4.2, repeatViews: 47 },
  { id: 8, lessonName: 'API Integration', totalCompletions: 213, completionsThisWeek: 16, avgCompletionTime: '30 min', satisfactionScore: 4.5, repeatViews: 41 },
  { id: 9, lessonName: 'State Management', totalCompletions: 178, completionsThisWeek: 24, avgCompletionTime: '38 min', satisfactionScore: 4.1, repeatViews: 58 },
  { id: 10, lessonName: 'Testing Basics', totalCompletions: 142, completionsThisWeek: 11, avgCompletionTime: '26 min', satisfactionScore: 4.3, repeatViews: 36 },
];

const insights = [
  {
    type: 'positive' as const,
    text: '24 lessons were completed today \u2014 highest daily count this month',
    action: 'View Details',
  },
  {
    type: 'info' as const,
    text: 'CSS Fundamentals has the fastest avg completion time (18 min)',
    action: 'View Lesson',
  },
  {
    type: 'positive' as const,
    text: '3 learners completed all assigned lessons this week \u2014 consider assigning advanced content',
    action: 'View Learners',
  },
];

const insightStyles = {
  positive: {
    border: 'border-l-green-400',
    bg: 'bg-green-50/50',
    icon: <CheckCircleOutlined className="text-green-500 text-base mt-0.5" />,
    button: 'text-green-700 hover:text-green-900 bg-green-100 hover:bg-green-200',
  },
  info: {
    border: 'border-l-blue-400',
    bg: 'bg-blue-50/50',
    icon: <InfoCircleOutlined className="text-blue-500 text-base mt-0.5" />,
    button: 'text-blue-700 hover:text-blue-900 bg-blue-100 hover:bg-blue-200',
  },
};

function renderStars(score: number) {
  const fullStars = Math.floor(score);
  const hasHalf = score - fullStars >= 0.5;
  const stars: string[] = [];
  for (let i = 0; i < fullStars; i++) stars.push('full');
  if (hasHalf) stars.push('half');
  return (
    <span className="inline-flex items-center gap-0.5">
      {stars.map((type, i) => (
        <StarOutlined
          key={i}
          className={type === 'full' ? 'text-amber-400 text-xs' : 'text-amber-300 text-xs'}
        />
      ))}
      <span className="text-gray-600 ml-1">{score}</span>
    </span>
  );
}

export default function LessonsCompleted() {
  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <LeftOutlined className="text-xs" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
          <FileDoneOutlined className="text-green-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Lesson Completions</h2>
          <p className="text-sm text-gray-500">Completion volume, timing, and learner satisfaction metrics</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {insights.map((insight, idx) => {
          const style = insightStyles[insight.type];
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 p-3 rounded-lg border-l-4 ${style.border} ${style.bg}`}
            >
              {style.icon}
              <span className="text-sm text-gray-700 flex-1">{insight.text}</span>
              <button
                className={`text-xs font-medium px-3 py-1 rounded-md transition-colors whitespace-nowrap ${style.button}`}
              >
                {insight.action}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Lesson Name</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Total Completions</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Completions This Week</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Avg Completion Time</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Satisfaction Score</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Repeat Views</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.lessonName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.totalCompletions.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      row.completionsThisWeek >= 25
                        ? 'bg-green-100 text-green-700'
                        : row.completionsThisWeek >= 15
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {row.completionsThisWeek}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.avgCompletionTime}</td>
                <td className="px-4 py-3 text-sm">{renderStars(row.satisfactionScore)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{row.repeatViews}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
