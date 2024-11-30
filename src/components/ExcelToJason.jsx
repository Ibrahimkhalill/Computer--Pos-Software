import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./ExcelToJason.css";
import { MdOutlineContentCopy, MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

const ExcelToJsonConverter = () => {
  const [jsonResult, setJsonResult] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJson, setEditedJson] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e, isNewFile) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        setJsonResult(jsonData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleDownload = () => {
    const jsonContent = JSON.stringify(jsonResult, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "excel_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const jsonContent = JSON.stringify(jsonResult, null, 2);
    navigator.clipboard
      .writeText(jsonContent)
      .then(() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Unable to copy JSON result to clipboard", err);
      });
  };

  const handleEdit = () => {
    setEditedJson(JSON.stringify(jsonResult, null, 2));
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    try {
      const editedData = JSON.parse(editedJson);
      setJsonResult(editedData);
      setIsEditing(false);
    } catch (error) {
      alert("Invalid JSON format. Please correct the JSON and try again.");
    }
  };

  const handleCancelEdit = () => {
    // Reset edited JSON and exit editing mode
    setEditedJson("");
    setIsEditing(false);
  };

  return (
    <div className="json_full_conatiner">
      <div className="file-input-container">
        <input
          type="file"
          id="newFileInput"
          className="custom-file-input"
          onChange={(e) => handleFileChange(e, true)}
        />
        <label htmlFor="newFileInput" className="custom-file-label">
          Upload New File
        </label>
      </div>

      <div className="jason_container">
        {jsonResult && (
          <div className="main_conent">
            <div className="jason_content">
              <div className="json_button">
                {copied && <div className="copy-message">Copied!</div>}
                {!isEditing ? (
                  // Show these buttons when not in editing mode
                  <>
                    <button className="copy_button" onClick={handleCopy}>
                      <MdOutlineContentCopy title="Copy" style={{ fontSize: "1.5vw" }} />
                    </button>
                    <button className="edit_button" onClick={handleEdit}>
                      <MdModeEdit title="Edit" style={{ fontSize: "1.5vw" }} />
                    </button>
                  </>
                ) : (
                  // Show these buttons when in editing mode
                  <>
                    <button className="copy_button" onClick={handleSaveEdit}>
                      <FaSave title="Save" style={{ fontSize: "1.5vw" }} />
                    </button>
                    <button className="edit_button" onClick={handleCancelEdit}>
                      <GiCancel title="Cancel" style={{ fontSize: "1.5vw" }} />
                    </button>
                  </>
                )}
              </div>

              <h2>JSON RESULT</h2>
              {isEditing ? (
                // Render textarea when editing is true
                <textarea
                  className="json_result"
                  rows="10"
                  value={editedJson}
                  onChange={(e) => setEditedJson(e.target.value)}
                ></textarea>
              ) : (
                // Render pre tag when editing is false
                <pre className="json_result">{JSON.stringify(jsonResult, null, 2)}</pre>
              )}
            </div>
            <div className="file-input-container">
              <label className="custom-file-label" onClick={handleDownload}>
                Download JSON
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelToJsonConverter;
