export interface StudentProfile {
  nama: string;
  jenisKelamin: 'Pria' | 'Wanita' | '';
  pekerjaan: string;
  avatarColor: string;
  registeredAt: string;
  isRegistered: boolean;
  kelas?: string;
  email?: string;
  instansi?: string;
  nim?: string;
}

export interface LikertQuestion {
  id: string;
  dimension: 'Materi' | 'Desain' | 'Fitur' | 'Dampak';
  statement: string;
}

export interface ModuleEvaluation {
  id: string;
  studentName: string;
  jenisKelamin?: string;
  pekerjaan?: string;
  studentNim?: string;
  instansi?: string;
  ratingFitur: number;
  ratingSistem: number;
  ratingMateri: number;
  likertAnswers?: Record<string, number>; // qId -> 1 (Sangat Tidak Setuju) to 5 (Sangat Setuju)
  feedbackFitur: string;
  feedbackSistem: string;
  feedbackMateri: string;
  submittedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface VideoSource {
  type: 'youtube' | 'gdrive' | 'onedrive' | 'direct' | 'upload';
  url: string;
  title: string;
  duration?: string;
}

export interface CitationExample {
  type: 'Buku' | 'Jurnal' | 'Website' | 'Berita Online';
  formula: string;
  example: string;
}

export interface UnitTableData {
  title?: string;
  headers: string[];
  rows: string[][];
}

export interface CaseDiscussion {
  question: string;
  context?: string;
  keyPoints?: string[];
  sampleAnswer?: string;
}

export interface ConceptCard {
  letterOrNumber?: string;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple' | 'blue' | 'teal';
}

export interface InteractiveDiagramStep {
  stepNumber: number;
  title: string;
  badge?: string;
  description: string;
  details?: string[];
  iconName?: string;
  color?: string;
}

export interface InteractiveDiagram {
  id: string;
  type: 'flow' | 'comparison' | 'process' | 'infographic';
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageCaption?: string;
  steps?: InteractiveDiagramStep[];
}

export interface UnitSection {
  id: string;
  subTitle: string;
  paragraphs: string[];
  keyTakeaway?: string;
  conceptCards?: ConceptCard[];
  interactiveDiagram?: InteractiveDiagram;
  exampleOrCase?: {
    title: string;
    description: string;
    takeaway: string;
  };
  tableData?: UnitTableData;
  caseDiscussion?: CaseDiscussion;
}

export interface InteractiveSimulationOption {
  id: string;
  actionText: string;
  isCorrect: boolean;
  feedbackTitle: string;
  feedbackDescription: string;
  recommendedSteps: string[];
}

export interface InteractiveSimulationCase {
  id: string;
  title: string;
  scenarioDescription: string;
  contextBadge?: string;
  evidenceItems?: string[];
  options: InteractiveSimulationOption[];
}

export interface LearningUnit {
  id: number;
  unitNumber: number;
  title: string;
  subtitle: string;
  learningObjectives?: string[];
  summaryPoints: string[];
  sections?: UnitSection[];
  video: VideoSource;
  simulationCases?: InteractiveSimulationCase[];
  practiceQuiz: QuizQuestion[];
  reflectionPrompt: string;
  checklistItems: string[];
  citationExamples?: CitationExample[];
}

export interface SIFTCase {
  id: string;
  title: string;
  source: string;
  text: string;
  category: 'Kesehatan' | 'Sains' | 'Sosial Politik' | 'Teknologi' | 'Hiburan';
  steps: {
    stop: string;
    investigate: string;
    findCoverage: string;
    trace: string;
  };
  verdict: 'Hoaks' | 'Fakta' | 'Misinformasi' | 'Perlu Konteks Tambahan';
  explanation: string;
}

export interface PlagiarismSegment {
  text: string;
  status: 'unique' | 'similar' | 'plagiarized';
  sourceName?: string;
  matchScore?: number;
  suggestion?: string;
}

export interface PlagiarismReport {
  id: string;
  fileName?: string;
  text: string;
  wordCount: number;
  similarityScore: number;
  segments: PlagiarismSegment[];
  sources: { name: string; url?: string; matchPercentage: number }[];
  aiFeedback?: string;
  createdAt: string;
}

export interface EthicsScenarioOption {
  text: string;
  score: number; // 0 - 100
  rationale: string;
  category: 'Etika Sektor Publik' | 'Hak Cipta' | 'Privasi Data' | 'Sopan Santun Digital';
}

export interface EthicsScenario {
  id: string;
  situation: string;
  category: string;
  options: EthicsScenarioOption[];
  learningTip: string;
}

export interface ProgressState {
  completedUnits: number[]; // e.g. [1, 2]
  unitQuizScores: Record<number, number>; // unitId -> percentage
  reflections: Record<number, string>; // unitId -> user reflection text
  worksheets: Record<number, string[]>; // unitId -> checked item ids
  videoWatched: Record<number, boolean>;
  siftsCompleted: string[]; // sift case IDs completed
  plagiarismChecksCount: number;
  ethicsGameCompleted: boolean;
  ethicsScore: number;
  finalExamScore: number | null;
  finalExamPassed: boolean;
  evaluationSubmitted?: boolean;
  certificateIssuedDate: string | null;
  lastUpdated: string;
}

export interface AdminConfig {
  minPassingScore: number;
  instructorName: string;
  instructorNip?: string;
  instituteName: string;
  moduleTitle: string;
  pinCode: string;
  enableAiAssistant: boolean;
}

export interface StudentRecord {
  id: string;
  profile: StudentProfile;
  progress: ProgressState;
}

export type ActiveTab = 
  | 'cover'
  | 'guide'
  | 'unit-1'
  | 'unit-2'
  | 'unit-3'
  | 'unit-4'
  | 'unit-5'
  | 'sift-lab'
  | 'plagiarism'
  | 'ethics-game'
  | 'final-quiz'
  | 'evaluation'
  | 'admin';
