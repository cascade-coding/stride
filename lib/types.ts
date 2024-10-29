export type statusType = "Great" | "Good" | "Average" | "Bad";

export type Tag = {
  id: string;
  tagName: string;
  userId: string;
};

export type LogEntry = {
  tag?: Tag | null;
  title: string;
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
