import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function BoardWriter() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const account = useContext(LoginContext);
  const toast = useToast();
  const navigate = useNavigate();

  function handleSaveClick() {
    setLoading(true);
    axios
      .postForm(
        "/api/board/add",
        {
          title,
          content,
          files,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then(() => {
        toast({
          description: "새 글이 작성되었습니다.",
          status: "success",
          position: "top",
        });
        navigate("/");
      })
      .catch((e) => {
        const code = e.response.status;

        if (code === 400) {
          toast({
            status: "error",
            description: "작성되지 않습니다. 입력한 내용을 확인하세요",
            position: "top",
          });
        }
      })
      .finally(() => setLoading(false));
  }

  let disableSaveButton = false;
  if (title.trim().length === 0) {
    disableSaveButton = true;
  }
  if (content.trim().length === 0) {
    disableSaveButton = true;
  }

  // file list
  const fileNameList = [];
  for (let i = 0; i < files.length; i++) {
    fileNameList.push(
      <Box>
        <text fontSize={"mb"}>{files[i].name}</text>
      </Box>,
    );
  }

  return (
    <Box>
      <Box mb={10}>
        <Heading>새 글 작성</Heading>
      </Box>
      <Box mt={3}>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
      </Box>
      <Box mt={3}>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea onChange={(e) => setContent(e.target.value)} />
        </FormControl>
      </Box>
      <Box mt={3}>
        <FormControl>
          <FormLabel>파일</FormLabel>
          <Input
            multiple
            type={"file"}
            accept="image/*"
            onChange={(e) => {
              setFiles(e.target.files);
            }}
          />
          <FormHelperText>총 용량은 10MB를 초과할 수 없습니다</FormHelperText>
        </FormControl>
      </Box>
      {fileNameList.length > 0 && (
        <Box mt={3}>
          <Card>
            <CardHeader>
              <Heading size={"mb"}>선택된 파일 목록</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing={4}>
                {fileNameList}
              </Stack>
            </CardBody>
          </Card>
        </Box>
      )}
      <Box mt={3}>
        <FormLabel>작성자</FormLabel>
        <Input readOnly value={account.nickName} />
      </Box>
      <Box mt={5}>
        <Button
          isLoading={loading}
          isDisabled={disableSaveButton}
          colorScheme={"blue"}
          onClick={handleSaveClick}
        >
          저장
        </Button>
      </Box>
    </Box>
  );
}
