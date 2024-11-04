export type statusType = "Great" | "Good" | "Average" | "Bad";

export type Tag = {
  id: string;
  tagName: string;
  userId: string;
};

export type LogEntry = {
  tag?: Tag | null;
  title: string | null;
  id: string;
  report?: string | null;
  rating?: number;
  logId: string;
};

export type LogType = {
  entries?: LogEntry[];
  id: string;
  dayNumber: number;
  dayStatus?: string;
  latest?: boolean;
  userId?: string;
  content?: string | null;
  createdAt: string;
};

export type LogInfoType = {
  id: string;
  dayNumber: number;
  createdAt: string;
  latest?: boolean;
};

export interface JournalInfoType {
  id: string;
  title?: string | null;
  favorite: boolean;
  favoritedAt?: Date | null;
  trashedAt?: Date | null;
  createdAt: string;
  updatedAt: string;
}

export interface JournalType {
  id: string;
  coverPhotoUrl?: string | null;
  title?: string | null;
  content?: string | null;
  favorite: boolean;
  favoritedAt?: Date | null;
  trashedAt?: Date | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
