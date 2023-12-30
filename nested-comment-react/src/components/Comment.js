import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import "../styles.css";
const Comment = ({
  comment = {},
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }
    if (editMode) setEditMode(false);
  };

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };
  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };
  return (
    <div>
      <div
        className={comment?.id === 1 ? "inputContainer" : "commentContainer"}
      >
        {comment?.id === 1 ? (
          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              placeholder="type..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Action
              handleClick={onAddComment}
              className="reply comment"
              type="COMMENT"
            />
          </>
        ) : (
          <div>
            <span
              ref={inputRef}
              suppressContentEditableWarning={true}
              contentEditable={editMode}
              style={{ wordWrap: "break-word" }}
            >
              {comment?.name}
            </span>
            <div
              style={{
                display: "flex",
                marginTop: "5px",
              }}
            >
              {editMode ? (
                <>
                  <Action
                    handleClick={onAddComment}
                    type="SAVE"
                    className="reply"
                  />
                  <Action
                    type="CANCEL"
                    className="reply"
                    handleClick={() => {
                      if (inputRef.current) {
                        inputRef.current.innerText = comment.name;
                      }
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    handleClick={handleNewComment}
                    type={
                      <>{expand ? <span>⬆️</span> : <span>⬇️</span>} REPLY</>
                    }
                    className="reply"
                  />
                  <Action
                    type="EDIT"
                    handleClick={() => setEditMode(true)}
                    className="reply"
                  />
                  <Action
                    type="DELETE"
                    handleClick={handleDelete}
                    className="reply"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}>
        {showInput && (
          <div className="inputContainer">
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="inputContainer__input"
              autoFocus
            />
            <Action type="SAVE" className="reply" handleClick={onAddComment} />
            <Action
              type="CANCEL"
              className="reply"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}
        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleDeleteNode={handleDeleteNode}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
