import React from "react";
import "./file.css";
// import dirLogo from "../../../../assets/img/dir.svg";
import dirLogo from "../../../../assets/img/folder.svg";

// import fileLogo from "../../../../assets/img/file.svg";
import fileLogo from "../../../../assets/img/page.svg";

import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { deleteFile, downloadFile } from "../../../../actions/file";
import sizeFormat from "../../../utils/sizeFormat";

function File({ file }) {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const fileView = useSelector((state) => state.files.view);

  const openDirHandler = (file) => {
    if (file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
  };
  function downloadClickHandler(event) {
    event.stopPropagation();
    downloadFile(file);
  }
  function deleteClickHanlder(e) {
    e.stopPropagation();
    dispatch(deleteFile(file));
  }
  if (fileView === "list") {
    return (
      <div className="file" onClick={() => openDirHandler(file)}>
        <img
          src={file.type === "dir" ? dirLogo : fileLogo}
          alt=""
          className="file__img"
        />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== "dir" && (
          <button
            onClick={(event) => downloadClickHandler(event)}
            className="file__btn file__download"
          >
            Download
          </button>
        )}
        <button
          onClick={(e) => deleteClickHanlder(e)}
          className="file__btn file__delete"
        >
          Delete
        </button>
      </div>
    );
  }

  if (fileView === "plate") {
    return (
      <div className="file-plate" onClick={() => openDirHandler(file)}>
        <img
          src={file.type === "dir" ? dirLogo : fileLogo}
          alt=""
          className="file-plate__img"
        />
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns">
          {file.type !== "dir" && (
            <button
              onClick={(event) => downloadClickHandler(event)}
              className="file-plate__btn file-plate__download"
            >
              Download
            </button>
          )}
          <button
            onClick={(e) => deleteClickHanlder(e)}
            className="file-plate__btn file-plate__delete"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default File;
