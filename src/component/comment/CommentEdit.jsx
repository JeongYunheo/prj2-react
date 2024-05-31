import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { faDeleteLeft, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CommentEdit({
  comment,
  setIsEditing,
  setIsProcessing,
  isProcessing,
}) {
  const [commentText, setCommentText] = useState(comment.comment);

  function handleCommentSubmit() {
    setIsProcessing(true);
    axios
      .put("/api/comment/edit", {
        id: comment.id,
        comment: commentText,
      })
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
    setIsProcessing(false);
    setIsEditing(false);
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
          onClick={() => setIsEditing(false)}
        >
          <FontAwesomeIcon icon={faDeleteLeft} />
        </Button>
        <Button
          isLoading={isProcessing}
          onClick={handleCommentSubmit}
          variant={"outline"}
          colorScheme={"blue"}
        >
          <FontAwesomeIcon icon={faPencil} />
        </Button>
      </Box>
    </Flex>
  );
}
