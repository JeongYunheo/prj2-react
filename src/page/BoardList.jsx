import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);

  // [{id=5, title:"제목 1", writer: "누구1"}
  // {id=5, title:"제목 1", writer: "누구1"}
  // {id=5, title:"제목 1", writer: "누구1"}]

  return (
    <Box>
      <Box>게시물 목록</Box>
      <Box>
        <Table>
          <Thead>
            <Th>#</Th>
            <Th>TITLE</Th>
            <Th>
              <FontAwesomeIcon icon={faUserSecret} />
            </Th>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr key={board.id}>
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.writer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
