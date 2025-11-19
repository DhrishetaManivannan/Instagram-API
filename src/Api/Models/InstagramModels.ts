export interface MediaContainerResponse {
  id: string;
}

export interface MediaPublishResponse {
  id: string;
}

export interface CreatePostParams {
  igUserId?: string;      
  imageUrl: string;
  caption: string;
  accessToken?: string;   
}

export interface CommentItem {
  id: string;
  text: string;
  timestamp: string;
  username: string;
  profile_picture_url: string;
}

export interface InstagramCommentResponse {
  data: Array<{
    id: string;
    text: string;
    timestamp: string;
    from?: { username: string };
    profile_picture_url?: string;
  }>;
}

export interface UserProfile {
  id: string;
  token: string;
  username: string;
  profile_picture_url: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  biography: string;
  media: MediaItem[];
  index: number;
  onClose: () => void;
  profile: UserProfile | null;
}



export interface MediaItem {
  id: string;
  media_url: string;
  caption?: string;
  media_type: string;
  thumbnail_url?: string;
  like_count?: number;
  comments_count?: number;
  comments?: CommentItem[];
}

export interface Props {
  media: MediaItem[];
  index: number;
  onClose: () => void;
  profile: UserProfile | null;
}
export interface CreatePostModalProps {
  menuOpen: boolean;
  uploadOpen: boolean;
  onMenuClose: () => void;
  onUploadClose: () => void;
  onSelectPost: () => void;
}
