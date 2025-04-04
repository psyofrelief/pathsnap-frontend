export interface Link {
  id: string;
  title?: string;
  short_url: string;
  url: string;
  qr_code: string;
  clicks: number;
  created_at: string;
}
