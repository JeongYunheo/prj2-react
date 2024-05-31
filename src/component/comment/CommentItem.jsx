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
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  faCalendarDay,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
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
        <Flex fontWeight={600}>
          <Box mr={3}>
            <FontAwesomeIcon icon={faUser} />
          </Box>
          <Text>{comment.nickName}</Text>
        </Flex>
        <Spacer />
        <Flex gap={2}>
          <Box>
            <FontAwesomeIcon icon={faCalendarDay} />
          </Box>
          <Box>{comment.inserted}</Box>
        </Flex>
      </Flex>
      {isEditing || (
        <Flex>
          <Box whiteSpace={"pre"}>{comment.comment}</Box>
          <Spacer />
          {account.hasAccess(comment.memberId) && (
            <Stack>
              <Box>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  colorScheme={"purple"}
                  onClick={() => setIsEditing(true)}
                >
                  수정
                </Button>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  ml={2}
                  isLoading={isProcessing}
                  colorScheme={"red"}
                  onClick={onOpen}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Box>
            </Stack>
          )}
        </Flex>
      )}
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
    </Box>
  );
}
