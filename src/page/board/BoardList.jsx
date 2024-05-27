import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });
  }, [searchParams]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      <Box>게시물 목록</Box>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>TITLE</Th>
              <Th>
                <FontAwesomeIcon icon={faUserSecret} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr
                onClick={() => navigate(`/board/${board.id}`)}
                key={board.id}
                cursor={"pointer"}
                _hover={{ bgColor: "gray.200" }}
              >
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>{board.writer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box>
        {pageNumbers.map((pageNumber) => (
          <Button
            onClick={() => navigate(`/?page=${pageNumber}`)}
            key={pageNumber}
            colorScheme={
              pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
            }
          >
            {pageNumber}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
