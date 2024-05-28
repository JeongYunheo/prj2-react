import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
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
    fileNameList.push(<li>{files[i].name}</li>);
  }

  return (
    <Box>
      <Box>글 작성 화면</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea onChange={(e) => setContent(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
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
      <Box>
        <ul>{fileNameList}</ul>
      </Box>
      <Box>
        <FormLabel>작성자</FormLabel>
        <Input readOnly value={account.nickName} />
      </Box>
      <Box>
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
