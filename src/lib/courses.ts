import type { Course } from './types';

export const allCourses: Course[] = [
  { id: 'HIST F101', name: 'History of the Ancient World', description: 'From Mesopotamia to the Roman Empire.', credits: 3.0, lectures: [], tutorials: [] },
  { 
    id: 'PHIL F202', 
    name: 'Existentialism', 
    description: 'Nietzsche, Sartre, and the meaning of life.', 
    credits: 3.0, 
    lectures: [
      { id: 'LEC01', time: 'MWF 10:00-10:50', instructor: 'Prof. Sartre', status: 'Open' },
      { id: 'LEC02', time: 'TTh 13:00-14:20', instructor: 'Prof. Camus', status: 'Full' },
      { id: 'LEC03', time: 'MWF 15:00-15:50', instructor: 'Prof. Nietzsche', status: 'Wait List' },
    ],
    tutorials: [
      { id: 'TUT01', time: 'M 14:00-14:50', ta: 'Simone de B.', status: 'Open' },
      { id: 'TUT02', time: 'W 14:00-14:50', ta: 'Martin H.', status: 'Full' },
      { id: 'TUT03', time: 'F 14:00-14:50', ta: 'Jean-Paul S.', status: 'Open' },
    ]
  },
  { id: 'ART F110', name: 'Introduction to Pottery', description: 'Get your hands dirty.', credits: 3.0, lectures: [], tutorials: [] },
  {
    id: 'CS F404',
    name: 'Advanced Algorithms',
    description: 'A deep dive into complex algorithms and data structures.',
    credits: 3.0,
    lectures: [
      { id: 'LEC01', time: 'MWF 9:00-9:50', instructor: 'Prof. Turing', status: 'Full' },
      { id: 'LEC02', time: 'TTh 11:00-12:20', instructor: 'Prof. Knuth', status: 'Wait List' },
      { id: 'LEC03', time: 'MWF 13:00-13:50', instructor: 'Prof. Cormen', status: 'Open' },
      { id: 'LEC04', time: 'TTh 14:30-15:50', instructor: 'Prof. Knuth', status: 'Full' },
      { id: 'LEC05', time: 'MWF 10:00-10:50', instructor: 'Prof. Turing', status: 'Full' },
    ],
    tutorials: [
      { id: 'TUT01', time: 'M 16:00-16:50', ta: 'Ada L.', status: 'Open' },
      { id: 'TUT02', time: 'T 16:00-16:50', ta: 'Grace H.', status: 'Full' },
      { id: 'TUT03', time: 'W 16:00-16:50', ta: 'Charles B.', status: 'Wait List' },
      { id: 'TUT04', time: 'R 16:00-16:50', ta: 'John von N.', status: 'Full' },
      { id: 'TUT05', time: 'F 16:00-16:50', ta: 'Alan T.', status: 'TBA' },
    ]
  },
  { id: 'BIO F101', name: 'Principles of Biology', description: 'The science of life.', credits: 4.0, lectures: [], tutorials: [] },
  { id: 'CHEM F101', name: 'General Chemistry', description: 'Matter and its properties.', credits: 4.0, lectures: [], tutorials: [] },
  { id: 'PHYS F211', name: 'Classical Mechanics', description: 'Motion, forces, and energy.', credits: 4.0, lectures: [], tutorials: [] },
  { id: 'MATH F151', name: 'Calculus I', description: 'Limits, derivatives, and integrals.', credits: 4.0, lectures: [], tutorials: [] },
  { id: 'ENG F205', name: 'Shakespeare', description: 'Comedies, tragedies, and histories.', credits: 3.0, lectures: [], tutorials: [] },
  { id: 'PSYCH F101', name: 'Introduction to Psychology', description: 'The study of the mind and behavior.', credits: 3.0, lectures: [], tutorials: [] },
  {
    id: 'CS F499',
    name: 'Compilers',
    description: 'Design and implementation of compilers.',
    credits: 3.0,
    lectures: [
      { id: 'LEC01', time: 'TTh 8:30-9:50', instructor: 'Prof. Aho', status: 'Full' },
      { id: 'LEC02', time: 'MWF 11:00-11:50', instructor: 'Prof. Ullman', status: 'Open' },
      { id: 'LEC03', time: 'TTh 13:00-14:20', instructor: 'Prof. Sethi', status: 'Wait List' },
      { id: 'LEC04', time: 'MWF 14:00-14:50', instructor: 'Prof. Lam', status: 'TBA' },
      { id: 'LEC05', time: 'TTh 16:00-17:20', instructor: 'Prof. Aho', status: 'Full' },
    ],
    tutorials: [
      { id: 'TUT01', time: 'M 17:00-17:50', ta: 'Ken T.', status: 'Full' },
      { id: 'TUT02', time: 'T 17:00-17:50', ta: 'Dennis R.', status: 'Wait List' },
      { id: 'TUT03', time: 'W 17:00-17:50', ta: 'Bjarne S.', status: 'TBA' },
      { id: 'TUT04', 'time': 'R 17:00-17:50', ta: 'Guido van R.', status: 'Open' },
      { id: 'TUT05', time: 'F 17:00-17:50', ta: 'James G.', status: 'Full' },
    ]
  },
  { id: 'SOC F101', name: 'Introduction to Sociology', description: 'The study of social life and change.', credits: 3.0, lectures: [], tutorials: [] },
  { id: 'ECON F101', name: 'Principles of Microeconomics', description: 'Supply, demand, and market structures.', credits: 3.0, lectures: [], tutorials: [] },
  { id: 'ANTH F102', name: 'Cultural Anthropology', description: 'Exploring human diversity.', credits: 3.0, lectures: [], tutorials: [] },
  { 
    id: 'MUS F100', 
    name: 'Music Appreciation', 
    description: 'From Bach to the Beatles.', 
    credits: 3.0, 
    lectures: [
      { id: 'LEC01', time: 'TTh 10:00-11:20', instructor: 'Prof. Mozart', status: 'Open' },
      { id: 'LEC02', time: 'MWF 11:00-11:50', instructor: 'Prof. Beethoven', status: 'Full' },
      { id: 'LEC03', time: 'TTh 14:00-15:20', instructor: 'Prof. Bach', status: 'Open' },
    ],
    tutorials: [
      { id: 'TUT01', time: 'T 15:00-15:50', ta: 'John L.', status: 'Open' },
      { id: 'TUT02', time: 'R 15:00-15:50', ta: 'Paul M.', status: 'Full' },
      { id: 'TUT03', time: 'F 15:00-15:50', ta: 'George H.', status: 'Open' },
    ]
  },
  { id: 'FREN F101', name: 'Beginner\'s French', description: 'Bonjour! Parlez-vous français?', credits: 3.0, lectures: [], tutorials: [] },
  { id: 'GEO F101', name: 'Physical Geography', description: 'Landforms, weather, and climate.', credits: 3.0, lectures: [], tutorials: [] },
  { id: 'ASTR F101', name: 'Introduction to Astronomy', description: 'The study of stars, planets, and galaxies.', credits: 3.0, lectures: [], tutorials: [] },
  { id: 'DANCE F101', name: 'Introduction to Modern Dance', description: 'Movement and expression.', credits: 2.0, lectures: [], tutorials: [] },
  { id: 'FILM F101', name: 'Introduction to Film Studies', description: 'Analyzing the language of cinema.', credits: 3.0, lectures: [], tutorials: [] },
  { id: 'MKTG F301', name: 'Principles of Marketing', description: 'The 4 Ps of marketing.', credits: 3.0, lectures: [], tutorials: [] },
];
