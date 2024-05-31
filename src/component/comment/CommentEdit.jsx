import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
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
  const { onClose, onOpen, isOpen } = useDisclosure();

  function handleCommentSubmit() {
    setIsProcessing(true);
    axios
      .put("/api/comment/edit", {
        id: comment.id,
        comment: commentText,
      })
      .then(() => {
        toast({
          description: "댓글이 수정되었습니다.",
          position: "top",
          status: "success",
        });
      })
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
          onClick={onOpen}
          variant={"outline"}
          colorScheme={"blue"}
        >
          <FontAwesomeIcon icon={faPencil} />
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>수정확인</ModalHeader>
          <ModalBody>댓글을 저장하시겠습니까></ModalBody>
          <ModalFooter>
            <Button colorScheme={"gray"} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme={"blue"} onClick={handleCommentSubmit}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
