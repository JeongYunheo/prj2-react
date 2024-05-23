import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MemberEdit() {
  const [member, setMember] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        const member1 = res.data;
        setMember({ ...member1, password: "" });
      })
      .catch(() => {
        toast({
          status: "error",
          description: "회원정보 조화 중 오류가 발생했습니다",
          position: "top",
        });
        navigate("/");
      });
  }, []);

  function handleClickSave() {
    axios.put("/api/member/modify", member);
  }

  return (
    <Box>
      <Box>회원 정보 수정</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input readOnly value={member.email} />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>패스워드</FormLabel>
            <Input placeholder={"암호를 변경하려면 입력하세요"} />
            <FormHelperText>
              입력하지 않으면 기존 암호를 변경하지 않습니다
            </FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>패스워드 확인</FormLabel>
            <Input />
          </FormControl>
        </Box>
        <Box>
          <FormControl>별명</FormControl>
          <Input
            onChange={(e) => setMember({ ...member, nickName: e.target.value })}
            value={member.nickName}
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
