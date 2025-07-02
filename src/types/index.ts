export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

// Core Item Types (resolves current conflicts)
export interface BaseItem extends BaseEntity {
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
}

export interface ProjectItem extends BaseItem {
  quantityNeeded: number;
  quantityFulfilled: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedCost?: number;
  project_id: string;
}

// Remove conflicting PackItem interface - consolidate into ProjectItem
export interface DonationItem extends BaseItem {
  quantity: number;
  cost: number;
  donation_id: string;
}

// Project Types (fixes ProjectDetail.tsx issues)
export interface BaseProject extends BaseEntity {
  title: string;
  description: string;
  imageUrl: string;
  organization: string;
  categoryId: string;
  itemsFulfilled: number;
  itemsNeeded: number;
}

export interface ProjectDetailData extends BaseProject {
  items?: ProjectItem[] | any[]; // Temporary compatibility for legacy Item interface
  startDate?: string;
  endDate?: string;
  status?: 'active' | 'completed' | 'paused' | 'draft';
  estimatedCost?: number;
  aboutText?: string;
  websiteUrl?: string;
  organizationWebsite?: string;
  organizationDescription?: string;
  location?: string;
  beneficiaries?: string;
  timeline?: string;
  category?: string;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
}

// User & Authentication Types
export interface UserProfile extends BaseEntity {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  bio?: string;
}

// Component Props Types (standardizes prop interfaces)
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardProps extends ComponentProps {
  title: string;
  description: string;
  imageUrl?: string;
}

// Category Types
export interface Category extends BaseEntity {
  title: string;
  description: string;
  imageUrl: string;
  projectCount: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  count: number;
  page: number;
  totalPages: number;
}

// Form Types
export interface FormState {
  isSubmitting: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// Navigation Types
export interface RouteParams {
  id?: string;
  category?: string;
  page?: string;
}

// Mock Data Types (temporary - will be replaced with Supabase types)
export interface MockProject extends BaseProject {
  // Extends BaseProject for current mock data compatibility
}

export interface MockCategory extends Category {
  // Extends Category for current mock data compatibility
}