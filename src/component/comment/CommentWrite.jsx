import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function CommentWrite() {
  const [comment, setComment] = useState("");

  function handleCommentSubmitClick({ boardId }) {
    axios
      .post("/api/comment/add", {
        boardId,
        comment,
      })
      .then((res) => {})
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <Box>
      <Textarea
        placeholder={"댓글을 작성해 보세요"}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={handleCommentSubmitClick} colorScheme={"blue"}>
        전송
      </Button>
    </Box>
  );
}
