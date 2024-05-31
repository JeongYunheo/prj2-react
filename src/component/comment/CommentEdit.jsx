import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function CommentEdit({
  comment,
  setIsEditing,
  setIsProcessing,
  isProcessing,
}) {
  const [commentText, setCommentText] = useState(comment.comment);

  function handleCommentSubmit() {
    axios.put("/api/comment/edit", {
      id: comment.id,
      comment: commentText,
    });
  }

  return (
    <Flex>
      <Box>
        <Textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          variant={"outline"}
          colorScheme={"gray"}
          onClick={() => setIsProcessing(false)}
        >
          취소
        </Button>
        <Button
          onClick={handleCommentSubmit}
          variant={"outline"}
          colorScheme={"blue"}
        >
          저장
        </Button>
      </Box>
    </Flex>
  );
}
