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
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
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

  function handleClickRemove() {
    axios
      .delete(`/api/member/${id}`)
      .then(() => {
        toast({
          status: "success",
          description: "회원 탈퇴되었습니다",
          position: "top",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "warning",
          description: "회원 탈퇴 중 문제가 발생하였습니다",
          position: "top",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

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
        <Button
          isLoading={isLoading}
          colorScheme={"red"}
          onClick={handleClickRemove}
        >
          탈퇴
        </Button>
      </Box>
    </Box>
  );
}
