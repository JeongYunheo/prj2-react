import { Box, Heading } from "@chakra-ui/react";
import { CommentWrite } from "./CommentWrite.jsx";
import { CommentList } from "./CommentList.jsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export function CommentComponent({ boardId }) {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <Box>
      <Box mb={3}>
        <Heading>
          Comment <FontAwesomeIcon icon={faComment} />
        </Heading>
      </Box>
      <CommentWrite
        boardId={boardId}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />
      <CommentList
        boardId={boardId}
        setIsProcessing={setIsProcessing}
        isProcessing={isProcessing}
      />
    </Box>
  );
}
