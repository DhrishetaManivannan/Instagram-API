import React, { useState } from "react";
import {LeftOutlined,  RightOutlined,  HeartFilled,  HeartOutlined,  MoreOutlined,  DeleteOutlined,} from "@ant-design/icons";
import { Button, Input, List, Avatar, message, Spin } from "antd";
import styles from "./PostPopup.module.scss";
import {  getComments,  addComment,  deleteCommentApi,} from "../../../Api/Services/InstagramServices";
import {  type Props,  type CommentItem,} from "../../../Api/Models/InstagramModels";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PostPopup: React.FC<Props> = ({ media, index, onClose, profile }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(index);
  const [liked, setLiked] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>("");
  const currentMediaId = media[currentIndex].id;
  const queryClient = useQueryClient();

  const {
    data: comments = [],
    isLoading: loadingComments,
  } = useQuery({
    queryKey: ["comments", currentMediaId],
    queryFn: () => getComments(currentMediaId),
  });

  const addCommentMutation = useMutation({
    mutationFn: () => addComment(currentMediaId, commentInput),
    onSuccess: () => {
      message.success("Comment added!");
      setCommentInput("");
      queryClient.refetchQueries({ queryKey: ["comments", currentMediaId] });
    },
    onError: () => message.error("Failed to add comment"),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteCommentApi(commentId),
    onSuccess: () => {
      message.success("Comment deleted!");
      queryClient.refetchQueries({ queryKey: ["comments", currentMediaId] });
    },
    onError: () => message.error("Failed to delete comment"),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    addCommentMutation.mutate();
  };

  const deleteCommentHandler = (id: string) => {
    deleteCommentMutation.mutate(id);
  };

  const handleLike = () => setLiked((prev) => !prev);
  const prevImage = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const nextImage = () => {
    if (currentIndex < media.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const renderLeftArrow = () => (
    <Button
      className={styles.arrowLeft}
      disabled={currentIndex === 0}
      onClick={prevImage}
      icon={<LeftOutlined />}
    />
  );

  const renderRightArrow = () => (
    <Button
      className={styles.arrowRight}
      disabled={currentIndex === media.length - 1}
      onClick={nextImage}
      icon={<RightOutlined />}
    />
  );
  const deleteAction = (item: CommentItem) => {
    const isMyComment = item.username === profile?.username;
    return isMyComment
      ? [<DeleteOutlined onClick={() => deleteCommentHandler(item.id)} />]
      : [];
  };

  const renderCommentItem = (item: CommentItem) => (
    <List.Item actions={deleteAction(item)}>
      <List.Item.Meta
        avatar={<Avatar src={item.profile_picture_url} />}
        title={<strong>{item.username}</strong>}
        description={item.text}
      />
    </List.Item>
  );

  const renderComments = () => {
    if (loadingComments) return <Spin style={{ marginTop: 20 }} />;

    return (
      <List
        dataSource={comments}
        locale={{ emptyText: "No comments yet" }}
        renderItem={renderCommentItem}
      />
    );
  };
  const renderLikes = () => (
    <div className={styles.likes}>
      <Button type="text" onClick={handleLike}>
        {liked ? <HeartFilled className={styles.heart} /> : <HeartOutlined />}
      </Button>
      <span>{media[currentIndex].like_count || 0} likes</span>
    </div>
  );
  const renderAddComment = () => (
    <div className={styles.addComment}>
      <Input
        placeholder="Add a comment..."
        value={commentInput}
        onChange={handleInputChange}
        onPressEnter={handleCommentSubmit}
      />
      <Button
        type="primary"
        loading={addCommentMutation.isPending}
        onClick={handleCommentSubmit}
      >
        Post
      </Button>
    </div>
  );

  return (
    <div className={styles.postModal}>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.modalContainer}>

        <div className={styles.imageSection}>
          {renderLeftArrow()}

          <img
            src={media[currentIndex].media_url}
            alt="post"
            className={styles.modalImage}
          />

          {renderRightArrow()}
        </div>
        <div className={styles.detailsSection}>
          <div className={styles.captionHeader}>
            <strong>{profile?.username}</strong>
            <MoreOutlined className={styles.moreIcon} />
          </div>

          <p className={styles.caption}>
            <strong>{profile?.username}</strong>{" "}
            {media[currentIndex].caption || ""}
          </p>

          {renderComments()}
          {renderLikes()}
          {renderAddComment()}
        </div>
      </div>
    </div>
  );
};

export default PostPopup;
