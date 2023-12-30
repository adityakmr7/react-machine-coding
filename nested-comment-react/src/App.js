// import "./styles.css";
import React, { useState, useEffect } from "react";
import Comment from "./components/Comment";
import useNode from "./hooks/useNode";
import "./styles.css";
const comments = {
  id: 1,
  items: [],
};
// const comments = {
//   id: 1,
//   items: [
//     {
//       id: 8383883,
//       name: "hello",
//       items: [
//         {
//           id: 97943,
//           name: "hello world",
//           items: [{ id: 8484848, name: "hello world 123", items: [] }],
//         },
//       ],
//     },
//     {
//       id: 73737,
//       name: "reactjs",
//       items: [
//         {
//           id: 738383,
//           name: "javascript",
//           items: [],
//         },
//       ],
//     },
//   ],
// };

// Steps
// Figure out the data finalStructur
// create comment box ui
// write logic for reply edit and delete functions

export default function App() {
  const [commentsData, setCommentsData] = useState(comments);
  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };
  return (
    <div className="App">
      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
      />
    </div>
  );
}
