export interface Animations {
  id: number;
  name: string;
  type: number;
  downloadCount: number;
  priority: number;
  createdAt: string;
  updatedAt: string;
  avatar: {
    path: string;
    size: number;
    mimetype: string;
    file_name: string;
  };
  contentFile: {
    path: string;
    size: number;
    mimetype: string;
    file_name: string;
  };
}
export interface AnimationDetail {
  id?: number,
  name: string,
  contentType: number,
  priority: number,
  avatar: {
    path: string;
    size: number;
    mimetype: string;
    file_name: string;
  };
  contentFile: {
    path: string;
    size: number;
    mimetype: string;
    file_name: string;
  };
}