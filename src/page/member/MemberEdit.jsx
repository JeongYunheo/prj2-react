import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberEdit() {
  const [member, setMember] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [oldNickName, setOldNickName] = useState("");
  const [isCheckedNickName, setIsCheckedNickName] = useState(true);
  const account = useContext(LoginContext);
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
        setOldNickName(member1.nickName);
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
    axios
      .put("/api/member/modify", { ...member, oldPassword })
      .then((res) => {
        toast({
          status: "success",
          description: "회원 정보가 수정되었습니다",
          position: "top",
        });
        account.login(res.data.token);
        navigate(`/member/${id}`);
      })
      .catch(() => {
        toast({
          status: "error",
          description: "회원 정보가 수정되지 않았습니다",
          position: "top",
        });
      })
      .finally(() => {
        onClose();
        setOldPassword("");
      });
  }

  if (member === null) {
    return <Spinner />;
  }

  let isDisableNickNameCheckButton = false;
  if (member.nickName === oldNickName) {
    isDisableNickNameCheckButton = true;
  }
  if (member.nickName.length == 0) {
    isDisableNickNameCheckButton = true;
  }

  let isDisableSaveButton = false;
  if (member.password !== passwordCheck) {
    isDisableSaveButton = true;
  }
  if (member.nickName.trim().length === 0) {
    isDisableSaveButton = true;
  }

  if (isCheckedNickName) {
    isDisableNickNameCheckButton = true;
  }

  if (!isCheckedNickName) {
    isDisableSaveButton = true;
  }

  function handleClickNickName() {
    axios
      .get(`/api/member/check?nickName=${member.nickName}`)
      .then((res) => {
        toast({
          status: "warning",
          description: "사용할 수 없는 별명입니다",
          position: "top",
        });
      }) // 이미 있는 이메일
      .catch((err) => {
        if (err.response.status === 404) {
          // 사용할 수 있는 이메일
          toast({
            status: "info",
            description: "사용할 수 있는 별명입니다",
            position: "top",
          });
          setIsCheckedNickName(true);
        }
      })
      .finally();
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
            <Input
              onChange={(e) =>
                setMember({ ...member, password: e.target.value })
              }
              placeholder={"암호를 변경하려면 입력하세요"}
            />
            <FormHelperText>
              입력하지 않으면 기존 암호를 변경하지 않습니다
            </FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>패스워드 확인</FormLabel>
            <Input onChange={(e) => setPasswordCheck(e.target.value)} />
            {member.password === passwordCheck || (
              <FormHelperText>암호가 일치하지 않습니다</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box>
          <FormControl>별명</FormControl>
          <InputGroup>
            <Input
              onChange={(e) => {
                const newNickName = e.target.value.trim();
                setMember({ ...member, nickName: newNickName });
                setIsCheckedNickName(newNickName === oldNickName);
              }}
              value={member.nickName}
            />
            <InputRightElement w={"75px"} mr={1}>
              <Button
                size={"sm"}
                onClick={handleClickNickName}
                isDisabled={isDisableNickNameCheckButton}
              >
                중복 확인
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box>
          <Button
            isDisabled={isDisableSaveButton}
            onClick={onOpen}
            colorScheme={"blue"}
          >
            저장
          </Button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>기존 암호 확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>기존 암호</FormLabel>
              <Input onChange={(e) => setOldPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button colorScheme={"blue"} onClick={handleClickSave}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
