export type statusType = "Great" | "Good" | "Average" | "Bad";

export type Tag = {
  id: string;
  userId: string;
  tagName: string;
} | null;

export type LogEntry = {
  tag: Tag;
  title: string;
  id: string;
  report: string;
  rating: number;
  tagId: string | null;
  logId: string;
};

export type LogType = {
  entries: LogEntry[];
  id: string;
  dayNumber: number;
  dayStatus: string;
  latest?: boolean;
  userId: string;
  createdAt: string;
};
