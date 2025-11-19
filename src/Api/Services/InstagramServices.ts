import {  graphGet,graphPost,getIgUserId,} from "../Interceptor/AxiosInterceptor";
import axiosInstance from "../Interceptor/AxiosInterceptor";
import {type UserProfile,type MediaItem,type MediaContainerResponse,type MediaPublishResponse,type CreatePostParams,type InstagramCommentResponse,} from "../Models/InstagramModels";

export const createMediaContainer = (params: CreatePostParams) => {
  const igUserId = params.igUserId || getIgUserId();
  return graphPost<MediaContainerResponse>(`${igUserId}/media`, {
    image_url: params.imageUrl,
    caption: params.caption,
  });
};

export const publishMediaContainer = (creationId: string, igUserId?: string) => {
  const id = igUserId || getIgUserId();
  return graphPost<MediaPublishResponse>(`${id}/media_publish`, {
    creation_id: creationId,
  });
};

export const postToInstagram = async (params: CreatePostParams) => {
  const container = await createMediaContainer(params);
  return publishMediaContainer(container.id, params.igUserId);
};

export const getComments = async (mediaId: string) => {
  const data = await graphGet<InstagramCommentResponse>(`${mediaId}/comments`, {
    fields: "id,text,timestamp,from,profile_picture_url",
  });

  return (data.data || []).map((c) => ({
    id: c.id,
    text: c.text,
    timestamp: c.timestamp,
    username: c.from?.username || "Unknown User",
    profile_picture_url:
      c.profile_picture_url ||
      "https://cdn-icons-png.flaticon.com/512/847/847969.png",
  }));
};

export const addComment = (mediaId: string, messageText: string) =>
  graphPost(`${mediaId}/comments`, { message: messageText });

export const deleteCommentApi = (commentId: string) => {
  return axiosInstance.delete(`/${commentId}`);
};


export const fetchProfileAndMedia = async () => {
  const id =  getIgUserId();

  const profile = await graphGet<UserProfile>(`${id}`, {
    fields:
      "username,profile_picture_url,biography,followers_count,follows_count,media_count",
  });

  const media = await graphGet<{ data: MediaItem[] }>(`${id}/media`, {
    fields:
      "id,media_type,media_url,thumbnail_url,caption,like_count,comments_count",
  });

  return { profile, media: media.data };
};
