export type Tag = {
  id: string;
  tagNameEn: string;
  tagNameVn: string;
  createdAt: string;
};

export type DropdownOption = {
  label: string;
  value: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: User;
  slug: string;
  isPublished: boolean;
  metaTitle: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tags: Tag[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdTime: string;
  lastLoggingTime: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type PaginationRequest = {
  page?: string;
};

export type PaginationResult<T> = {
  data: T[];
  pageInfo: PageInfo;
};

export type PageInfo = {
  next: number;
  totalCount: number;
  size: number;
};

export type BlogFilter = {
  tagSlug?: string;
  q?: string;
};

export type TagWithBlogCount = {
  tag: Tag;
  count: number;
};
