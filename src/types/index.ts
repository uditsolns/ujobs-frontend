/**
 * TypeScript Type Definitions Index
 * Re-exports all type definitions
 */

// Re-export all types
export * from './job';
export * from './api';
export type { Candidate, CandidateSearchParams, WorkerExperience } from './candidate';

// Legacy exports for backward compatibility
export interface Question {
  id: number;
  question: string;
  questions_answer: AnswerOption[];
}

export interface AnswerOption {
  id: number;
  option: string;
  answer?: string;
}

export interface Skill {
  id: number;
  skill_name: string;
}

