export interface Feed {
  status: FeedStatus;
  source: FeedSource;
  alert?: FeedAlert;
  message: string;
  keywords: string[];
  category: string;
  imagePath: string;
  createdDate: Date;
}
