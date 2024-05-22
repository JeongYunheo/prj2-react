import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export function MemberSignup() {
  return (
    <Box>
      <Box>회원가입</Box>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input></Input>
          </FormControl>
        </Box>
        <FormControl>
          <FormLabel>아이디</FormLabel>
          <Input></Input>
        </FormControl>
        <Box>
          <FormControl>
            <FormLabel>암호</FormLabel>
            <Input />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <Input></Input>
          </FormControl>
        </Box>
        <Box>
          <Button colorScheme={"blue"}>가입</Button>
        </Box>
      </Box>
    </Box>
  );
}
