export type RiskLevel = 'low' | 'medium' | 'high';

export interface RedFlag {
  flag: string;
  why: string;
}

export interface JobAnalysisResult {
  risk_level: RiskLevel;
  red_flags: RedFlag[];
  green_flags: string[];
  verdict: string;
}

export interface UploadedImage {
  name: string;
  size: number;
  mimeType: string;
  base64: string;
  dataUrl: string;
}

export type ThemeMode = 'light' | 'dark';
export type ActiveTab = 'home' | 'detector';
