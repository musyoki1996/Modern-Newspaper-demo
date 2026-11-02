export type Category = 
  | 'Kenya'
  | 'Politics'
  | 'World'
  | 'Entertainment'
  | 'Celebrity'
  | 'Business'
  | 'Technology'
  | 'Sports'
  | 'Lifestyle'
  | 'Education'
  | 'Health'
  | 'Opinion'
  | 'Investigations';

export type ArticleStatus = 'draft' | 'in_review' | 'approved' | 'published' | 'scheduled' | 'archived';

export type StaffRole = 
  | 'Super Administrator'
  | 'Publisher'
  | 'Managing Editor'
  | 'Editor'
  | 'Journalist'
  | 'Reporter'
  | 'Photographer'
  | 'Video Editor'
  | 'SEO Editor'
  | 'Moderator'
  | 'Advertising Manager';

export interface Author {
  id: string;
  name: string;
  role: StaffRole;
  avatar: string;
  bio: string;
  twitter?: string;
  articlesCount?: number;
}

export interface EditorialNote {
  id: string;
  authorName: string;
  authorRole: StaffRole;
  note: string;
  timestamp: string;
}

export interface ArticleRevision {
  id: string;
  editor: string;
  timestamp: string;
  changeSummary: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string; // HTML or Markdown paragraphs
  category: Category;
  tags: string[];
  featuredImage: string;
  imageCaption: string;
  imageCredit: string;
  gallery?: { url: string; caption: string }[];
  videoUrl?: string;
  audioUrl?: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  status: ArticleStatus;
  isBreaking: boolean;
  isLead: boolean;
  isTrending: boolean;
  isSponsored?: boolean;
  sponsorName?: string;
  views: number;
  shares: number;
  reactions: {
    love: number;
    applaud: number;
    insightful: number;
    surprised: number;
  };
  seoTitle?: string;
  seoDescription?: string;
  editorialNotes?: EditorialNote[];
  revisions?: ArticleRevision[];
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: CommentReply[];
  isFlagged?: boolean;
  isApproved?: boolean;
}

export interface CommentReply {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface LiveBlogEntry {
  id: string;
  timestamp: string;
  title: string;
  content: string;
  badge?: 'BREAKING' | 'KEY TAKEAWAY' | 'DEVELOPING' | 'OFFICIAL' | 'ANALYSIS';
  author: string;
  imageUrl?: string;
}

export interface MultimediaItem {
  id: string;
  type: 'video' | 'podcast' | 'gallery';
  title: string;
  category: Category;
  duration?: string;
  mediaUrl: string;
  thumbnailUrl: string;
  publishedAt: string;
  description: string;
  author: string;
  views: number;
}

export interface AdCampaign {
  id: string;
  title: string;
  advertiser: string;
  slot: 'header_leaderboard' | 'in_article_mid' | 'sidebar_sticky' | 'homepage_billboard' | 'between_stories';
  status: 'active' | 'paused' | 'ended';
  imageUrl: string;
  targetUrl: string;
  impressions: number;
  clicks: number;
  startDate: string;
  endDate: string;
  budgetUsd: number;
}

export interface ReaderUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'reader' | 'subscriber' | 'staff';
  staffRole?: StaffRole;
  savedArticleIds: string[];
  readingHistory: { articleId: string; viewedAt: string }[];
  categoryPreferences: Category[];
  newsletterOptIn: boolean;
  notificationPreferences: {
    breaking: boolean;
    politics: boolean;
    business: boolean;
    sports: boolean;
    entertainment: boolean;
  };
}

export interface AnalyticsSummary {
  realtimeVisitors: number;
  todayPageViews: number;
  monthlyVisitors: number;
  avgEngagementTime: string;
  trafficSources: { name: string; percentage: number }[];
  geoDistribution: { country: string; percentage: number; flag: string }[];
  deviceDistribution: { device: string; percentage: number }[];
  categoryPerformance: { category: string; views: number }[];
}
