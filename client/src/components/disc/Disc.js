import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles, uploadFile } from "../../actions/file";
import FileList from "./fileList/FileList";
import "./Disc.css";
import Popup from "./Popup";
import {
  setCurrentDir,
  setPopupDisplay,
  setFileView,
} from "../../reducers/fileReducer";
import Uploader from "./uploader/Uploader";
function Disc() {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const loader = useSelector((state) => state.app.loader);

  const dirStack = useSelector((state) => state.files.dirStack);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");
  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);
  const showPopupHandler = () => {
    dispatch(setPopupDisplay("flex"));
  };
  const backClickHandler = () => {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  };
  function fileUploadHandler(event) {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  }
  function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }
  function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }
  function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }
  if (loader) {
    return (
      <div className="loader">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  return !dragEnter ? (
    <div
      className="disc"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disc__btns">
        <button className="disc__back" onClick={() => backClickHandler()}>
          Back
        </button>
        <button className="disc__create" onClick={() => showPopupHandler()}>
          Create folder
        </button>
        <div className="disc__upload">
          <label htmlFor="disc__upload-input" className="disc__upload-label">
            Upload file
          </label>
          <input
            multiple={true}
            onChange={(event) => fileUploadHandler(event)}
            type="file"
            id="disc__upload-input"
            className="disc__upload-input"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="disc__select"
        >
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="date">Date</option>
        </select>
        <button
          className="disc__plate"
          onClick={() => dispatch(setFileView("plate"))}
        />
        <button
          className="disc__list"
          onClick={() => dispatch(setFileView("list"))}
        />
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Drag files here
    </div>
  );
}

export default Disc;
