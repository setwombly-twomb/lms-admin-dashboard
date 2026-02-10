import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LeftOutlined,
  DownloadOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  CalendarOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';

type ExportFormat = 'csv' | 'xlsx' | 'pdf';

interface ExportOption {
  id: string;
  label: string;
  description: string;
}

const lessonExports: ExportOption[] = [
  { id: 'lesson-completions', label: 'Lesson Completions', description: 'All lesson completion records with user, date, and time spent' },
  { id: 'lesson-progress', label: 'Lesson Progress', description: 'Current progress for all enrolled learners per lesson' },
  { id: 'lesson-engagement', label: 'Lesson Engagement', description: 'Views, time on page, and interaction metrics per lesson' },
  { id: 'lesson-overdue', label: 'Overdue Assignments', description: 'Learners with overdue lesson assignments and days past due' },
];

const quizExports: ExportOption[] = [
  { id: 'quiz-results', label: 'Quiz Results', description: 'Individual quiz attempt results with scores and pass/fail status' },
  { id: 'quiz-scores', label: 'Quiz Score Summary', description: 'Aggregated score statistics per quiz (avg, median, min, max)' },
  { id: 'quiz-responses', label: 'Question-Level Responses', description: 'Per-question breakdown of answers for each quiz attempt' },
  { id: 'quiz-pass-fail', label: 'Pass/Fail Report', description: 'Pass and fail counts per quiz with retake statistics' },
];

const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Year to date', 'All time'];

export default function ExportData() {
  const [selectedExports, setSelectedExports] = useState<string[]>([]);
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelectedExports((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExported(selectedExports);
      setExporting(false);
      setSelectedExports([]);
    }, 1500);
  };

  const ExportCard = ({ item, icon }: { item: ExportOption; icon: React.ReactNode }) => {
    const isSelected = selectedExports.includes(item.id);
    const wasExported = exported.includes(item.id);
    return (
      <button
        onClick={() => toggle(item.id)}
        className={`w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all border ${
          isSelected
            ? 'bg-blue-50 border-blue-200 shadow-sm'
            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
        }`}
      >
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isSelected ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-gray-900">{item.label}</p>
            {wasExported && !isSelected && (
              <span className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircleFilled className="text-[10px]" /> Exported
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
        </div>
        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
          isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
        }`}>
          {isSelected && <span className="text-white text-xs">✓</span>}
        </div>
      </button>
    );
  };

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4"
      >
        <LeftOutlined className="text-xs" /> Back to Dashboard
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
          <DownloadOutlined className="text-indigo-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Export Data</h2>
          <p className="text-sm text-gray-500">Download lesson and quiz data as CSV, Excel, or PDF</p>
        </div>
      </div>

      {/* Options bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center gap-2">
          <CalendarOutlined className="text-gray-500 text-sm" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {dateRanges.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Format:</span>
          {(['csv', 'xlsx', 'pdf'] as ExportFormat[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                format === f
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              .{f.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          onClick={handleExport}
          disabled={selectedExports.length === 0 || exporting}
          className={`ml-auto px-5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
            selectedExports.length > 0 && !exporting
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <DownloadOutlined />
          {exporting ? 'Exporting...' : `Export ${selectedExports.length > 0 ? `(${selectedExports.length})` : ''}`}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lesson Exports */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
              <FileTextOutlined className="text-green-600 text-sm" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">Lesson Exports</h3>
          </div>
          <div className="space-y-2">
            {lessonExports.map((item) => (
              <ExportCard
                key={item.id}
                item={item}
                icon={<FileTextOutlined className={selectedExports.includes(item.id) ? 'text-blue-600' : 'text-green-600'} />}
              />
            ))}
          </div>
        </div>

        {/* Quiz Exports */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
              <QuestionCircleOutlined className="text-orange-600 text-sm" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">Quiz Exports</h3>
          </div>
          <div className="space-y-2">
            {quizExports.map((item) => (
              <ExportCard
                key={item.id}
                item={item}
                icon={<QuestionCircleOutlined className={selectedExports.includes(item.id) ? 'text-blue-600' : 'text-orange-600'} />}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
