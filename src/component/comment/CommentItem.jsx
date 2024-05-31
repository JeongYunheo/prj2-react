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
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { LoginContext } from "../LoginProvider.jsx";
import { CommentEdit } from "./CommentEdit.jsx";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const account = useContext(LoginContext);
  const toast = useToast();

  function handleRemoveClick() {
    setIsProcessing(true);
    axios
      .delete(`/api/comment/remove`, {
        data: { id: comment.id },
      })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        onClose();
        setIsProcessing(false);
        toast({
          description: "댓글이 삭제되었습니다",
          status: "info",
          position: "top",
        });
      });
  }

  return (
    <Box>
      <Flex mb={3}>
        <Box>
          <Flex>
            <Text fontWeight={600}>{comment.nickName}</Text>
            <Spacer />
            <Text>{comment.inserted}</Text>
          </Flex>
        </Box>
        <Box>
          {isEditing || (
            <Flex>
              <Box>{comment.comment}</Box>
              <Spacer />
              {account.hasAccess(comment.memberId) && (
                <Box>
                  <Button
                    size={"sm"}
                    colorScheme={"purple"}
                    onClick={() => setIsEditing(true)}
                  >
                    수정
                  </Button>
                  <Button
                    size={"sm"}
                    isLoading={isProcessing}
                    colorScheme={"red"}
                    onClick={onOpen}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Box>
              )}
            </Flex>
          )}
        </Box>
        {isEditing && (
          <CommentEdit
            comment={comment}
            setIsEditing={setIsEditing}
            setIsProcessing={setIsProcessing}
            isProcessing={isProcessing}
          />
        )}
        {account.hasAccess(comment.memberId) && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>삭제 확인</ModalHeader>
              <ModalBody>댓글을 삭제하시겠습니까?</ModalBody>
              <ModalFooter>
                <Button mr={2} onClick={onClose}>
                  취소
                </Button>
                <Button
                  isLoading={isProcessing}
                  colorScheme={"red"}
                  onClick={handleRemoveClick}
                >
                  삭제
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Flex>
    </Box>
  );
}
