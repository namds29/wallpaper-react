export type CategoryResponse = {
  id: number;
  name: string;
  chartColor: string;
  createdAt: string;
  avatar: {
    file_name: string;
    path: string;
  };
  useCount: number,
  downloadCount: number
};
export type ListCategory = {
  id: number,
  name: string
} 
export type CategoryDetail = {
  file_name:string,
  path: string;
  id: number;
  name: string;
  chartColor: string;
  createdAt: string;
  useCount: number;
  downloadCount: number
};

export type Wallpaper = {
  id: number;
  name: string;
  priceType: any;
  price: number;
  priorityNewest: number;
  priorityCategory: number;
  trendingPriority: number;
  author: string;
  website: string;
  type: number;
  downloadCount: number;
  useCount: number;
  createdAt: string;
  updatedAt: string;
  avatar: {
      path: string;
      size: number;
      mimetype: string;
      file_name: string;
  };
  contentFile: File[];
  categoryId: number;
  tag: string;
};