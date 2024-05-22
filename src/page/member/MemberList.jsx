import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/member/list").then((res) => setMemberList(res.data));
  }, []);

  if (memberList.length === 0) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>회원목록</Box>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>이메일</Th>
              <Th>별명</Th>
              <Th>
                <FontAwesomeIcon icon={faCalendarCheck} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {memberList.map((member) => (
              <Tr
                cursor={"pointer"}
                key={member.id}
                _hover={{ bgColor: "gray.200" }}
                onClick={() => navigate(`/member/${member.id}`)}
              >
                <Td>{member.id}</Td>
                <Td>{member.email}</Td>
                <Td>{member.nickName}</Td>
                <Td>{member.signupDateTime}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
