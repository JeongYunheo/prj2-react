import { useNavigate } from "react-router-dom";
import { Center, Flex, Spacer } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  return (
    <Flex
      px={{
        lg: 200,
        base: 0,
      }}
      gap={3}
      height={20}
      backgroundColor="gray.300"
    >
      <Center
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
        p={6}
        fontSize={20}
        fontWeight="bold"
      >
        Home
      </Center>
      {account.isLoggedIn() && (
        <Center
          onClick={() => navigate("/write")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={6}
          fontSize={20}
          fontWeight="bold"
        >
          글쓰기
        </Center>
      )}
      <Spacer />
      {account.isLoggedIn() && (
        <Center
          onClick={() => navigate(`/member/${account.id}`)}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={6}
          fontSize={20}
          fontWeight="bold"
        >
          <FontAwesomeIcon icon={faUser} />
          {account.nickName}
        </Center>
      )}
      {account.isAdmin() && (
        <Center
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={6}
          fontSize={20}
          fontWeight="bold"
        >
          회원목록
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={6}
          fontSize={20}
          fontWeight="bold"
        >
          회원가입
        </Center>
      )}
      {account.isLoggedIn() || (
        <Center
          onClick={() => navigate("/login")}
          cursor={"pointer"}
          _hover={{
            bgColor: "gray.200",
          }}
          p={6}
          fontSize={20}
          fontWeight="bold"
        >
          로그인
        </Center>
      )}
      <Center
        onClick={() => {
          account.logout();
          navigate("/login");
        }}
        cursor={"pointer"}
        _hover={{
          bgColor: "gray.200",
        }}
        p={6}
        fontSize={20}
        fontWeight="bold"
      >
        로그아웃
      </Center>
    </Flex>
  );
}
