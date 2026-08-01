import { defaultAdminConfig, defaultEvaluationsSample } from '../data/defaultData';
import { AdminConfig, ModuleEvaluation, ProgressState, StudentProfile } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'emodul_student_profile',
  PROGRESS: 'emodul_student_progress',
  ADMIN_CONFIG: 'emodul_admin_config',
  UNITS_DATA: 'emodul_custom_units',
  PLAGIARISM_REPORTS: 'emodul_plagiarism_history',
  EVALUATIONS: 'emodul_evaluations_list',
  STUDENTS_LIST: 'emodul_registered_students_list'
};

export const defaultProfile: StudentProfile = {
  nama: 'Udin Barudin',
  jenisKelamin: 'Pria',
  pekerjaan: 'Mahasiswa / Akademisi',
  avatarColor: '#3b82f6',
  registeredAt: new Date().toISOString(),
  isRegistered: true,
  email: 'udinbarudin@fip.unj.ac.id',
  instansi: 'Universitas Negeri Jakarta',
  nim: '2024010012',
  kelas: 'Kelas A'
};

export const emptyProfile: StudentProfile = {
  nama: '',
  jenisKelamin: '',
  pekerjaan: '',
  avatarColor: '#3b82f6',
  registeredAt: new Date().toISOString(),
  isRegistered: false
};

export const defaultProgress: ProgressState = {
  completedUnits: [],
  unitQuizScores: {},
  reflections: {},
  worksheets: {},
  videoWatched: {},
  siftsCompleted: [],
  plagiarismChecksCount: 0,
  ethicsGameCompleted: false,
  ethicsScore: 0,
  finalExamScore: null,
  finalExamPassed: false,
  certificateIssuedDate: null,
  lastUpdated: new Date().toISOString()
};

export function getStoredProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) return defaultProfile;
    return JSON.parse(raw);
  } catch {
    return defaultProfile;
  }
}

export function saveStoredProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    // Also save to registered students list if registered
    if (profile.isRegistered && profile.nama) {
      saveStudentToList(profile);
    }
  } catch (e) {
    console.error('Failed to save profile:', e);
  }
}

export function getStoredStudents(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS_LIST);
    if (!raw) {
      return [defaultProfile];
    }
    return JSON.parse(raw);
  } catch {
    return [defaultProfile];
  }
}

function saveStudentToList(profile: StudentProfile): void {
  try {
    const list = getStoredStudents();
    const existingIdx = list.findIndex(s => s.email === profile.email || s.nim === profile.nim);
    if (existingIdx >= 0) {
      list[existingIdx] = profile;
    } else {
      list.unshift(profile);
    }
    localStorage.setItem(STORAGE_KEYS.STUDENTS_LIST, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save student list:', e);
  }
}

export function deleteStoredStudent(identifier: string): StudentProfile[] {
  try {
    const list = getStoredStudents();
    const updated = list.filter(s => s.nim !== identifier && s.email !== identifier && s.nama !== identifier);
    localStorage.setItem(STORAGE_KEYS.STUDENTS_LIST, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete student:', e);
    return getStoredStudents();
  }
}

export function clearAllStudents(): StudentProfile[] {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENTS_LIST, JSON.stringify([]));
    return [];
  } catch (e) {
    console.error('Failed to clear students:', e);
    return [];
  }
}

export function deleteStoredEvaluation(evalId: string): ModuleEvaluation[] {
  try {
    const list = getStoredEvaluations();
    const updated = list.filter(e => e.id !== evalId);
    localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete evaluation:', e);
    return getStoredEvaluations();
  }
}

export function clearAllEvaluations(): ModuleEvaluation[] {
  try {
    localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify([]));
    return [];
  } catch (e) {
    console.error('Failed to clear evaluations:', e);
    return [];
  }
}

export function getStoredEvaluations(): ModuleEvaluation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVALUATIONS);
    if (!raw) {
      return defaultEvaluationsSample;
    }
    return JSON.parse(raw);
  } catch {
    return defaultEvaluationsSample;
  }
}

export function saveStoredEvaluation(evalData: ModuleEvaluation): void {
  try {
    const list = getStoredEvaluations();
    list.unshift(evalData);
    localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save evaluation:', e);
  }
}

export function getStudentKey(profile?: StudentProfile): string {
  if (!profile || !profile.nama) return 'default';
  const key = profile.nim || profile.email || profile.nama;
  return key.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
}

export function getStoredProgress(profile?: StudentProfile): ProgressState {
  try {
    const activeProfile = profile || getStoredProfile();
    const studentKey = getStudentKey(activeProfile);
    const raw = localStorage.getItem(`${STORAGE_KEYS.PROGRESS}_${studentKey}`) || localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveStoredProgress(progress: ProgressState, profile?: StudentProfile): void {
  try {
    const activeProfile = profile || getStoredProfile();
    const studentKey = getStudentKey(activeProfile);
    const updated = {
      ...progress,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(`${STORAGE_KEYS.PROGRESS}_${studentKey}`, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function getStoredAdminConfig(): AdminConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_CONFIG);
    if (!raw) return defaultAdminConfig;
    return { ...defaultAdminConfig, ...JSON.parse(raw) };
  } catch {
    return defaultAdminConfig;
  }
}

export function saveStoredAdminConfig(config: AdminConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ADMIN_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save admin config:', e);
  }
}

export function calculateCompletionPercentage(progress: ProgressState, totalUnits: number = 5): number {
  let score = 0;
  score += (progress.completedUnits.length / totalUnits) * 50;

  if (progress.ethicsGameCompleted) score += 15;
  if (progress.siftsCompleted.length > 0) score += 15;
  if (progress.finalExamPassed) score += 20;

  return Math.min(100, Math.round(score));
}

export function resetAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.PLAGIARISM_REPORTS);
}
