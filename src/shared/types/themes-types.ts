import { AnimationDetail } from "./animation-types";
import { WallpaperDetail } from "./wallpapers-type";

export interface Theme {
    id: number;
    name: string;
    priority: number;
    createdAt: string;
    updatedAt: string;
    animation: AnimationDetail;
    wallpaper: WallpaperDetail;
  }