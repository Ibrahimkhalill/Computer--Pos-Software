// Import the useState hook
import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import "./exceltojson.css";
import { GiCancel } from "react-icons/gi";
import { PiDownloadSimple } from "react-icons/pi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExcelToJsonConverter = () => {
  const [jsonResult, setJsonResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];
  
    if (file) {
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
          if (jsonData.length === 0) {
            toast.error("This file is empty. Please choose a non-empty file.");
            
            // Clear the file input value
            fileInput.value = "";
          } else {
            setJsonResult(jsonData);
          }
        };
  
        reader.readAsArrayBuffer(file);
      } else {
        // Handle file with an invalid extension
        alert("Please select a valid Excel file with extension .xlsx or .xls");
        
        // Clear the file input value
        fileInput.value = "";
      }
    }
  };
  
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonResult),
        mode: "cors", // Add this line
      });

      if (response.ok) {
        // Data saved successfully
        toast.success("Data saved successfully!");
        console.log("JSON data saved successfully");
      } else {
        toast.error("Failed to save data. Please try again.");
        console.error("Failed to save JSON data:", response.statusText);
      }
    } catch (error) {
      toast.error("Failed to save data. Please try again.");
      console.error("Error saving JSON data:", error);
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

  const isValidUrl = (url) => {
    try {
      new URL(url);

      const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
      const lowercasedUrl = url.toLowerCase();
      return imageExtensions.some((ext) => lowercasedUrl.endsWith(ext));
    } catch (error) {
      return false;
    }
  };

  const handleCancel = () => {
    setJsonResult(null); // Clear the JSON result
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="json_full_container">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="file-input-container">
        <input
          ref={fileInputRef}
          type="file"
          id="newFileInput"
          className="custom-file-input"
          onChange={handleFileChange}
        />
        <label htmlFor="newFileInput" className="custom-file-label">
          Upload New File
        </label>
      </div>

      {jsonResult ? (
        <div className="json_container">
          <div className="main_content_json">
            <div>JSON RESULT</div>
            <div className="json_button">
              <button className="copy_button" onClick={handleDownload}>
                <PiDownloadSimple
                  title="Download"
                  style={{ fontSize: "1.5vw" }}
                />
              </button>
              <button className="download_button" onClick={handleCancel}>
                <GiCancel title="Cancel" style={{ fontSize: "1.5vw" }} />
              </button>
            </div>
            <div className="table_div_excel_json">
              <table border={1}>
                <thead>
                  <tr>
                    {Object.keys(jsonResult[0]).map((header) => (
                      <th
                        style={{ background: "rgb(19, 65, 88)" }}
                        key={header}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jsonResult.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex}>
                          {/* Check if the content is a valid image URL */}
                          {isValidUrl(value) ? (
                            // eslint-disable-next-line jsx-a11y/img-redundant-alt
                            <img
                              style={{ width: "4vw", height: "3.5vw" }}
                              src={value}
                              alt={`Image-${index}-${colIndex}`}
                            />
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {jsonResult && (
            <div className="file-input-container_save">
              <label className="custom-file-label" onClick={handleSave}>
                Save
              </label>
            </div>
          )}
        </div>
      ) : (
        <div className="table_div_excel_json_empty">
          <table border={1}>
            <thead>
              <tr>
                <th>New Column</th>
                <th>New Column</th>
                <th>New Column</th>
                <th>New Column</th>
              </tr>
            </thead>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExcelToJsonConverter;
