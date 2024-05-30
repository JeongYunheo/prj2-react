import { Box, Button, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function CommentWrite({ boardId, isSending, setIsSending }) {
  const [comment, setComment] = useState("");
  const toast = useToast();

  function handleCommentSubmitClick() {
    setIsSending(true);
    axios
      .post("/api/comment/add", {
        boardId,
        comment,
      })
      .then((res) => {
        setComment("");
        toast({
          status: "success",
          position: "top",
          description: "댓글 작성이 완료되었습니다",
        });
      })
      .catch(() => {})
      .finally(() => {
        setIsSending(false);
      });
  }

  return (
    <Box>
      <Textarea
        placeholder={"댓글을 작성해 보세요"}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        isLoading={isSending}
        onClick={handleCommentSubmitClick}
        colorScheme={"blue"}
      >
        전송
      </Button>
    </Box>
  );
}
