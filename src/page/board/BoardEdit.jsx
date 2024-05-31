import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormHelperText,
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
  Spinner,
  Stack,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [removeFileList, setRemoveFileList] = useState([]);
  const [addFileList, setAddFileList] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => setBoard(res.data.board));
  }, []);

  function handleClickSave() {
    axios
      .putForm("/api/board/edit", {
        id: board.id,
        title: board.title,
        content: board.content,
        removeFileList,
        addFileList,
      })
      .then(() => {
        toast({
          status: "success",
          description: `${board.id}번 게시물이 수정되었습니다`,
          position: "top",
        });
        navigate(`/board/${board.id}`);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast({
            status: "error",
            description: `게시물이 수정되지 않았습니다. 작성 내용을 확인해주세요`,
            position: "top",
          });
        }
      })
      .finally(() => {
        onClose();
      });
  }

  if (board === null) {
    return <Spinner />;
  }

  const fileNameList = [];
  for (let addFile of addFileList) {
    // 이미 있는 파일과 중복된 파일멍인지
    let duplicate = false;
    for (let file of board.fileList) {
      if (file.name === addFile.name) {
        duplicate = true;
        break;
      }
    }
    fileNameList.push(
      <Flex>
        <li>
          {addFile.name}
          {duplicate && <Badge colorScheme={"red"}>override</Badge>}
        </li>
      </Flex>,
    );
  }

  function handleRemoveSwitchChange(name, checked) {
    if (checked) {
      setRemoveFileList([...removeFileList, name]);
    } else {
      setRemoveFileList(removeFileList.filter((item) => item !== name));
    }
  }

  return (
    <Box>
      <Box>
        <Heading>{board.id}번 게시물 수정</Heading>
      </Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input
              defaultValue={board.title}
              onChange={(e) => setBoard({ ...board, title: e.target.value })}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea
              defaultValue={board.content}
              onChange={(e) => setBoard({ ...board, content: e.target.value })}
            />
          </FormControl>
        </Box>
        <Box>
          {board.fileList &&
            board.fileList.map((file) => (
              <Card m={3} key={file.name}>
                <CardFooter>
                  <Flex>
                    <Box mr={3}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Box>
                    <Box mr={1}>
                      <Switch
                        onChange={(e) =>
                          handleRemoveSwitchChange(file.name, e.target.checked)
                        }
                      />
                    </Box>
                    <Box>
                      <Text>{file.name}</Text>
                    </Box>
                  </Flex>
                </CardFooter>
                <CardBody>
                  <Box>
                    <Image
                      w={"100%"}
                      sx={
                        removeFileList.includes(file.name)
                          ? { filter: "blur(8px)" }
                          : {}
                      }
                      src={file.src}
                    />
                  </Box>
                </CardBody>
              </Card>
            ))}
        </Box>
        <Box>
          <FormControl>
            <FormLabel>파일</FormLabel>
            <Input
              multiple
              type={"file"}
              accept="image/*"
              onChange={(e) => {
                setAddFileList(e.target.files);
              }}
            />
            <FormHelperText>총 용량은 10MB를 초과할 수 없습니다</FormHelperText>
          </FormControl>
        </Box>
        {fileNameList.length > 0 && (
          <Box>
            <Card>
              <CardHeader>선택된 파일 목록</CardHeader>
              <CardBody>
                <Stack>{fileNameList}</Stack>
              </CardBody>
            </Card>
          </Box>
        )}

        <Box>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input defaultValue={board.writer} readOnly />
          </FormControl>
        </Box>
        <Box>
          <Button onClick={onOpen} colorScheme={"blue"}>
            저장
          </Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>저장하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleClickSave} colorScheme={"blue"}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
