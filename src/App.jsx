import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Home.jsx";
import { BoardWriter } from "./page/board/BoardWriter.jsx";
import { BoardList } from "./page/board/BoardList.jsx";
import { BoardView } from "./page/board/BoardView.jsx";
import { BoardEdit } from "./page/board/BoardEdit.jsx";
import { MemberSignup } from "./page/member/MemberSignup.jsx";
import { MemberList } from "./page/member/MemberList.jsx";
import { MemberView } from "./page/member/MemberView.jsx";
import { MemberEdit } from "./page/member/MemberEdit.jsx";
import { MemberLogin } from "./page/member/MemberLogin.jsx";
import { LoginProvider } from "./component/LoginProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <BoardList />,
      },
      { path: "write", element: <BoardWriter /> },
      { path: "board/:id", element: <BoardView /> },
      { path: "edit/:id", element: <BoardEdit /> },
      { path: "signup", element: <MemberSignup /> },
      { path: "member/list", element: <MemberList /> },
      { path: "member/:id", element: <MemberView /> },
      { path: "member/edit/:id", element: <MemberEdit /> },
      { path: "login", element: <MemberLogin /> },
    ],
  },
]);

function App(props) {
  return (
    <LoginProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </LoginProvider>
  );
}

export default App;
