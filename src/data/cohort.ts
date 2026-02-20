import type { CohortMember } from '../types';

const courses = [
  'Training Management',
  'Safety & Compliance',
  'Leadership Essentials',
  'Technical Onboarding',
  'Communication Skills',
];

function makeMember(
  id: number,
  name: string,
  email: string,
  completionPct: number,
  quizAvgScore: number,
  lessonsCompleted: number,
  lessonsTotal: number,
  lastActiveDate: string,
): CohortMember {
  return {
    id: String(id),
    name,
    email,
    completionPct,
    quizAvgScore,
    lessonsCompleted,
    lessonsTotal,
    lastActiveDate,
    courseBreakdown: courses.map((c) => ({
      courseName: c,
      completion: Math.min(100, Math.max(0, completionPct + Math.floor(Math.random() * 30 - 15))),
      quizScore: Math.random() > 0.15 ? Math.min(100, Math.max(0, quizAvgScore + Math.floor(Math.random() * 20 - 10))) : null,
    })),
  };
}

export const mockCohortMembers: CohortMember[] = [
  // === ON TRACK (~39 members) — completion >= 70% and quiz >= 70% ===
  makeMember(1, 'Alice Johnson', 'alice.johnson@example.com', 95, 92, 19, 20, '2026-02-17'),
  makeMember(2, 'Brian Chen', 'brian.chen@example.com', 88, 85, 18, 20, '2026-02-17'),
  makeMember(3, 'Carla Rivera', 'carla.rivera@example.com', 92, 90, 18, 20, '2026-02-16'),
  makeMember(4, 'David Kim', 'david.kim@example.com', 85, 78, 17, 20, '2026-02-17'),
  makeMember(5, 'Elena Popov', 'elena.popov@example.com', 90, 88, 18, 20, '2026-02-16'),
  makeMember(6, 'Frank Torres', 'frank.torres@example.com', 78, 82, 16, 20, '2026-02-15'),
  makeMember(7, 'Grace Liu', 'grace.liu@example.com', 82, 76, 16, 20, '2026-02-17'),
  makeMember(8, 'Henry Patel', 'henry.patel@example.com', 94, 91, 19, 20, '2026-02-17'),
  makeMember(9, 'Iris Nakamura', 'iris.nakamura@example.com', 76, 80, 15, 20, '2026-02-16'),
  makeMember(10, 'James O\'Brien', 'james.obrien@example.com', 88, 84, 18, 20, '2026-02-15'),
  makeMember(11, 'Kara Singh', 'kara.singh@example.com', 91, 87, 18, 20, '2026-02-17'),
  makeMember(12, 'Liam Nguyen', 'liam.nguyen@example.com', 83, 79, 17, 20, '2026-02-16'),
  makeMember(13, 'Mia Hoffmann', 'mia.hoffmann@example.com', 79, 75, 16, 20, '2026-02-14'),
  makeMember(14, 'Noah Carter', 'noah.carter@example.com', 86, 83, 17, 20, '2026-02-17'),
  makeMember(15, 'Olivia Martinez', 'olivia.martinez@example.com', 93, 89, 19, 20, '2026-02-17'),
  makeMember(16, 'Patrick Dunn', 'patrick.dunn@example.com', 81, 77, 16, 20, '2026-02-15'),
  makeMember(17, 'Quinn Murphy', 'quinn.murphy@example.com', 75, 73, 15, 20, '2026-02-16'),
  makeMember(18, 'Rachel Ahmed', 'rachel.ahmed@example.com', 87, 86, 17, 20, '2026-02-17'),
  makeMember(19, 'Samuel Brooks', 'samuel.brooks@example.com', 90, 88, 18, 20, '2026-02-16'),
  makeMember(20, 'Tara Wilson', 'tara.wilson@example.com', 84, 81, 17, 20, '2026-02-15'),
  makeMember(21, 'Ulrich Meyer', 'ulrich.meyer@example.com', 77, 74, 15, 20, '2026-02-17'),
  makeMember(22, 'Vivian Chang', 'vivian.chang@example.com', 96, 94, 19, 20, '2026-02-17'),
  makeMember(23, 'Wesley Park', 'wesley.park@example.com', 82, 78, 16, 20, '2026-02-14'),
  makeMember(24, 'Xena Johansson', 'xena.johansson@example.com', 89, 85, 18, 20, '2026-02-16'),
  makeMember(25, 'Yusuf Ali', 'yusuf.ali@example.com', 73, 71, 15, 20, '2026-02-15'),
  makeMember(26, 'Zoe Bennett', 'zoe.bennett@example.com', 91, 90, 18, 20, '2026-02-17'),
  makeMember(27, 'Adam Fischer', 'adam.fischer@example.com', 80, 76, 16, 20, '2026-02-16'),
  makeMember(28, 'Bella Santos', 'bella.santos@example.com', 86, 82, 17, 20, '2026-02-17'),
  makeMember(29, 'Caleb Wright', 'caleb.wright@example.com', 74, 72, 15, 20, '2026-02-15'),
  makeMember(30, 'Diana Petrova', 'diana.petrova@example.com', 88, 84, 18, 20, '2026-02-17'),
  makeMember(31, 'Ethan Cooper', 'ethan.cooper@example.com', 92, 89, 18, 20, '2026-02-16'),
  makeMember(32, 'Fiona McAllister', 'fiona.mcallister@example.com', 85, 80, 17, 20, '2026-02-14'),
  makeMember(33, 'George Tanaka', 'george.tanaka@example.com', 79, 75, 16, 20, '2026-02-17'),
  makeMember(34, 'Hannah Berg', 'hannah.berg@example.com', 94, 91, 19, 20, '2026-02-17'),
  makeMember(35, 'Isaac Fernandez', 'isaac.fernandez@example.com', 83, 79, 17, 20, '2026-02-16'),
  makeMember(36, 'Julia Kovalenko', 'julia.kovalenko@example.com', 87, 83, 17, 20, '2026-02-15'),
  makeMember(37, 'Kevin Sato', 'kevin.sato@example.com', 76, 74, 15, 20, '2026-02-17'),
  makeMember(38, 'Laura Andersen', 'laura.andersen@example.com', 90, 87, 18, 20, '2026-02-16'),
  makeMember(39, 'Marcus Reed', 'marcus.reed@example.com', 71, 70, 14, 20, '2026-02-15'),

  // === AT RISK (~12 members) — completion 40-69% or quiz 40-69% ===
  makeMember(40, 'Nadia Okafor', 'nadia.okafor@example.com', 62, 58, 12, 20, '2026-02-16'),
  makeMember(41, 'Oscar Lindqvist', 'oscar.lindqvist@example.com', 55, 65, 11, 20, '2026-02-15'),
  makeMember(42, 'Priya Sharma', 'priya.sharma@example.com', 68, 62, 14, 20, '2026-02-14'),
  makeMember(43, 'Robert Huang', 'robert.huang@example.com', 48, 55, 10, 20, '2026-02-16'),
  makeMember(44, 'Sofia Morales', 'sofia.morales@example.com', 58, 52, 12, 20, '2026-02-13'),
  makeMember(45, 'Tyler Jackson', 'tyler.jackson@example.com', 65, 48, 13, 20, '2026-02-15'),
  makeMember(46, 'Uma Krishnan', 'uma.krishnan@example.com', 42, 60, 8, 20, '2026-02-14'),
  makeMember(47, 'Victor Novak', 'victor.novak@example.com', 60, 45, 12, 20, '2026-02-16'),
  makeMember(48, 'Wendy Zhao', 'wendy.zhao@example.com', 52, 68, 10, 20, '2026-02-13'),
  makeMember(49, 'Xavier Dupont', 'xavier.dupont@example.com', 66, 55, 13, 20, '2026-02-15'),
  makeMember(50, 'Yasmin El-Amin', 'yasmin.elamin@example.com', 45, 50, 9, 20, '2026-02-14'),
  makeMember(51, 'Zach Morrison', 'zach.morrison@example.com', 58, 42, 12, 20, '2026-02-12'),

  // === BEHIND (~9 members) — completion < 40% or quiz < 40% or inactive 5+ days ===
  makeMember(52, 'Amber Cline', 'amber.cline@example.com', 22, 30, 4, 20, '2026-02-08'),
  makeMember(53, 'Boris Volkov', 'boris.volkov@example.com', 35, 28, 7, 20, '2026-02-10'),
  makeMember(54, 'Cynthia Reeves', 'cynthia.reeves@example.com', 18, 25, 4, 20, '2026-02-06'),
  makeMember(55, 'Derek Ozawa', 'derek.ozawa@example.com', 30, 35, 6, 20, '2026-02-11'),
  makeMember(56, 'Emma Lachlan', 'emma.lachlan@example.com', 12, 20, 2, 20, '2026-02-05'),
  makeMember(57, 'Freddie Walsh', 'freddie.walsh@example.com', 38, 32, 8, 20, '2026-02-09'),
  makeMember(58, 'Gloria Medina', 'gloria.medina@example.com', 25, 22, 5, 20, '2026-02-07'),
  makeMember(59, 'Howard Ng', 'howard.ng@example.com', 8, 15, 2, 20, '2026-02-04'),
  makeMember(60, 'Ingrid Dahl', 'ingrid.dahl@example.com', 32, 38, 6, 20, '2026-02-10'),
];

export const cohortCategoryScores = [
  { category: 'Training Management', score: 92 },
  { category: 'Safety & Compliance', score: 78 },
  { category: 'Leadership Essentials', score: 85 },
  { category: 'Technical Onboarding', score: 88 },
  { category: 'Communication Skills', score: 72 },
];
