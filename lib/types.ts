export type Score = {
  name: string;
  time: number; // in milliseconds
  date: string;
};

export type User = {
  name: string;
  startTime: number;
};

export type Lecture = {
  id: string;
  time: string;
  instructor: string;
  status: 'Open' | 'Full' | 'Wait List' | 'TBA';
}

export type Tutorial = {
  id: string;
  time: string;
  ta: string;
  status: 'Open' | 'Full' | 'Wait List' | 'TBA';
}

export type Course = {
  id: string;
  name: string;
  description: string;
  credits: number;
  lectures: Lecture[];
  tutorials: Tutorial[];
  selectedLecture?: Lecture;
  selectedTutorial?: Tutorial;
}
