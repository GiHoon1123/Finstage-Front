import { Content } from "./content";

export interface ContentListApiResponse {
  status: number;
  message: string;
  data: {
    total: number;
    page: number;
    size: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    items: Content[];
  };
}
