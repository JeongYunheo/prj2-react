import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { CommentComponent } from "../../component/comment/CommentComponent.jsx";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [like, setLike] = useState({
    like: false,
    count: 0,
  });
  const [isLikeProcess, setIsLikeProcess] = useState(false);
  const account = useContext(LoginContext);
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => {
        setBoard(res.data.board);
        setLike(res.data.like);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "해당 게시물이 존재하지 않습니다",
            position: "top",
          });
          navigate("/");
        }
      });
  }, []);

  function handleClickRemove() {
    axios
      .delete(`/api/board/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast({
          status: "success",
          description: `${id}번 게시물이 삭제되었습니다`,
          position: "top",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: `${id}번 게시물이 삭제 중 오류가 발생하였습니다`,
          position: "top",
        });
      })
      .finally(() => {
        onClose();
      });
  }

  if (board === null) {
    return <Spinner />;
  }

  function handleClickLike() {
    if (!account.isLoggedIn()) {
      return;
    }
    setIsLikeProcess(true);
    axios
      .put(`/api/board/like`, { boardId: board.id })
      .then((res) => {
        setLike(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setIsLikeProcess(false);
      });
  }

  return (
    <Box>
      <Box mb={10}>
        <Flex>
          <Heading>{board.id}번 게시물</Heading>
          <Spacer />
          {isLikeProcess || (
            <Flex>
              <Tooltip
                isDisabled={account.isLoggedIn()}
                hasArrow
                label={"로그인 해주세요."}
              >
                <Box
                  onClick={handleClickLike}
                  cursor={"pointer"}
                  fontSize={"3xl"}
                >
                  {like.like && <FontAwesomeIcon icon={fullHeart} />}
                  {like.like || <FontAwesomeIcon icon={emptyHeart} />}
                </Box>
              </Tooltip>
              {like.count > 0 && (
                <Box mx={3} fontSize={"3xl"}>
                  {like.count}
                </Box>
              )}
            </Flex>
          )}
          {isLikeProcess && (
            <Box pr={3}>
              <Spinner />
            </Box>
          )}
        </Flex>
      </Box>

      <Box mt={3}>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={board.title} readOnly />
        </FormControl>
      </Box>
      <Box mt={3}>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea value={board.content} readOnly />
        </FormControl>
      </Box>
      <Box mt={3}>
        {board.fileList &&
          board.fileList.map((file) => (
            <Card m={3} key={file.name}>
              <CardBody>
                <Image src={file.src} w={"100%"} />
              </CardBody>
            </Card>
          ))}
      </Box>
      <Box mt={3}>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={board.writer} readOnly />
        </FormControl>
      </Box>
      <Box mt={3}>
        <FormControl>작성일시</FormControl>
        <Input type={"datetime-local"} value={board.inserted} readOnly />
      </Box>
      {account.hasAccess(board.memberId) && (
        <Flex mt={5}>
          <Button
            colorScheme={"purple"}
            onClick={() => navigate(`/edit/${board.id}`)}
          >
            수정
          </Button>
          <Button ml={2} colorScheme={"red"} onClick={onOpen}>
            삭제
          </Button>
        </Flex>
      )}

      <Box mb={20}></Box>

      <CommentComponent boardId={board.id} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalBody>삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Flex gap={2}>
              <Button onClick={onClose}>취소</Button>
              <Button colorScheme={"red"} onClick={handleClickRemove}>
                확인
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
