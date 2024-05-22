import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function MemberView() {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  return (
    <Box>
      <Box>{member.id}번 회원 정보</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input value={member.email} readOnly />
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
            <FormLabel>가입일자</FormLabel>
            <Input value={member.inserted} readOnly />
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
