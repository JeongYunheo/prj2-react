import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";

export function BoardEdit() {
  const [board, setBoard] = useState("");

  const id = useParams();
  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => {
      setBoard(res.data);
    });
  }, []);

  function handleClickSave() {
    axios.put("/api/board/edit", board);
  }

  if (board === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>{board.id}번 게시물 수정</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input
            defaultValue={board.title}
            onChange={(e) => setBoard({ ...board, title: e.target.value })}
          />
        </FormControl>
        <Box>
          <FormControl>본문</FormControl>
          <Textarea
            defaultValue={board.content}
            onChange={(e) => setBoard({ ...board, content: e.target.value })}
          />
        </Box>
        <Box>
          <FormControl>작성자</FormControl>
          <Input
            defaultValue={board.writer}
            onChange={(e) => setBoard({ ...board, writer: e.target.value })}
          />
        </Box>
        <Box>
          <Button onClick={handleClickSave} colorScheme={"blue"}>
            저장
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
