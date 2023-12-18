export interface AjaxRes {
  code: number;
  data: any | null;
  result?: any | null;
  success: boolean;
  timestamp: string;
  message: string;
}
