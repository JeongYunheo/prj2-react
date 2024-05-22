import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MemberView() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => setMember(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "warning",
            description: "존재하지 않는 회원입니다",
            position: "top",
          });
          navigate("/");
        }
      });
  }, []);

  if (member == null) {
    return <Spinner />;
  }
  return (
    <Box>
      <Box> 회원 정보</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input value={member.email} isReadOnly />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <Input value={member.nickName} readOnly />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>작성일</FormLabel>
            <Input value={member.inserted} readOnly />
          </FormControl>
        </Box>
      </Box>
      <Box>
        <Button colorScheme={"green"}>수정</Button>
        <Button colorScheme={"red"}>삭제</Button>
      </Box>
    </Box>
  );
}
