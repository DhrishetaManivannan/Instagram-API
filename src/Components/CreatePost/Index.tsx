import React, { useState } from "react";
import { Modal, Button, Input, message } from "antd";
import {PictureOutlined,  VideoCameraOutlined,  LineChartOutlined,} from "@ant-design/icons";
import { useMutation} from "@tanstack/react-query";
import { postToInstagram } from "../../Api/Services/InstagramServices";
import styles from "./CreatePost.module.scss";
import { type CreatePostModalProps } from "../../Api/Models/InstagramModels";

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  menuOpen,uploadOpen,
  onMenuClose,onUploadClose,onSelectPost,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async (payload: { imageUrl: string; caption: string }) => {
      return postToInstagram(payload);
    },
    onSuccess: (data) => {
      message.success(`Post published successfully! ID: ${data.id}`);
      setImageUrl("");
      setCaption("");
      onUploadClose();
    },

    onError: (error: any) => {
      message.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  const handleMenuSelectPost = () => {
    onSelectPost();
  };

  const handlePost = () => {
    if (!imageUrl.trim() || !caption.trim()) {
      message.warning("Please enter both image URL and caption!");
      return;
    }

    createPost({
      imageUrl,
      caption,
    });
  };


  return (
    <>
      <Modal
        open={menuOpen}
        footer={null}
        closable={false}
        centered={false}
        onCancel={onMenuClose}
        className={styles.createMenuModal}
      >
        <div className={styles.menuOption} onClick={handleMenuSelectPost}>
          <span>Post</span>
          <PictureOutlined className={styles.icon} />
        </div>
        <div className={styles.menuOption}>
          <span>Live video</span>
          <VideoCameraOutlined className={styles.icon} />
        </div>
        <div className={styles.menuOption}>
          <span>Ad</span>
          <LineChartOutlined className={styles.icon} />
        </div>
      </Modal>

      <Modal
        open={uploadOpen}
        footer={null}
        closable={false}
        centered
        onCancel={onUploadClose}
        className={styles.uploadModal}
      >
        <h3 className={styles.title}>Create new post</h3>
        <div className={styles.uploadBox}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Image URL</label>
            <Input
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={handleImageUrlChange}
              className={styles.inputField}
            />

            <label className={styles.label}>Caption</label>
            <Input.TextArea
              rows={4}
              placeholder="Write a caption..."
              value={caption}
              onChange={handleCaptionChange}
              className={styles.textArea}
            />
            {imageUrl.trim() !== "" && (
              <div className={styles.preview}>
                <img src={imageUrl} alt="Preview" className={styles.previewImage} />
              </div>
            )}

            <Button
              type="primary"
              loading={isPending}
              className={styles.postButton}
              onClick={handlePost}
            >
              {isPending ? "Posting..." : "Post image to Instagram"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreatePostModal;
