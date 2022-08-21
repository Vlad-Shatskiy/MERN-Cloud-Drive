import React, { useDebugValue, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir } from "../../actions/file";
import { setPopupDisplay } from "../../reducers/fileReducer";
import Input from "../utils/Input";
import "./popup.css";
function Popup() {
  const [dirName, setDirName] = useState("");
  const popupDisplay = useSelector((state) => state.files.popupDisplay);
  const currentDir = useSelector((state) => state.files.currentDir);

  const dispatch = useDispatch();
  const createHandler = () => {
    dispatch(createDir(currentDir, dirName));
    setDirName("");
    dispatch(setPopupDisplay("none"));
  };
  return (
    <div
      className="popup"
      onClick={() => dispatch(setPopupDisplay("none"))}
      style={{ display: popupDisplay }}
    >
      <div
        className="popup__content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="popup__header">
          <div className="popup__title" style={{ color: "black" }}>
            Create new folder
          </div>
          <button
            className="popup__close"
            onClick={() => dispatch(setPopupDisplay("none"))}
            style={{ color: "black" }}
          >
            X
          </button>
        </div>
        <Input
          type="text"
          placeholder="Enter name of the folder"
          value={dirName}
          setValue={setDirName}
        />
        <button
          className="popup__create"
          onClick={() => createHandler()}
          style={{ color: "black" }}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default Popup;
