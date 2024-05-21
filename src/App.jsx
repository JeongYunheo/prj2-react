import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { BoardWriter } from "./page/BoardWriter.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [{ path: "write", element: <BoardWriter /> }],
  },
]);

function App(props) {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
