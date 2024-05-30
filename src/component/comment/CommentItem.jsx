import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CommentItem({ comment }) {
  function handleRemoveClick() {
    axios
      .delete(`/api/comments/remove`, {
        data: { id: comment.id },
      })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {});
  }

  return (
    <Box>
      <Box border={"1px solid black"} my={3}>
        <Flex>
          <Box>{comment.nickName}</Box>
          <Spacer />
          <Box>{comment.inserted}</Box>
        </Flex>
        <Flex>
          <Box>{comment.comment}</Box>
          <Spacer />
          <Box>
            <Button
              colorScheme={"red"}
              onClick={() => handleRemoveClick(comment.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
