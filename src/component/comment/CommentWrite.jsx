import { Box, Button, Textarea, Tooltip, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LoginProvider.jsx";

export function CommentWrite({ boardId, setIsProcessing, isProcessing }) {
  const [comment, setComment] = useState("");
  const account = useContext(LoginContext);
  const toast = useToast();

  function handleCommentSubmitClick() {
    setIsProcessing(true);
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
        setIsProcessing(false);
      });
  }

  return (
    <Box>
      <Textarea
        isDisabled={!account.isLoggedIn()}
        placeholder={
          account.isLoggedIn()
            ? "댓글을 작성해 보세요"
            : "댓글을 작성하시려면 로그인 하세요"
        }
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Tooltip
        label={"로그인 하세요"}
        isDisabled={account.isLoggedIn()}
        placement="top-start"
      >
        <Button
          isDisabled={comment.trim().length === 0 || !account.isLoggedIn()}
          isLoading={isProcessing}
          onClick={handleCommentSubmitClick}
          colorScheme={"blue"}
        >
          전송
        </Button>
      </Tooltip>
    </Box>
  );
}
