import React, { useState } from 'react';

interface FileDownloaderProps {
  fileHistory: any[]; // Adjust the type as per your data structure
}

const FileDownloader: React.FC<{ file?: string; fileHistory?: any[] }> = ({
    file,
    fileHistory,
  }) => {
    const [selectedFile, setSelectedFile] = useState<string>('');
  
    const handleFileSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedFile(event.target.value);
    };
  
    return (
      <div>
       
  
        {fileHistory && Array.isArray(fileHistory) && fileHistory.length > 0 ? (
          <select onChange={handleFileSelect}>
            <option value="">Select a file</option>
            {fileHistory.map((file, index) => (
              <option key={index} value={file.fileName || file}>
                {file.fileName || file}
              </option>
            ))}
          </select>
        ) : (
          <p>No File History</p>
        )}
  
        {selectedFile && (
          <a href={selectedFile} download>
            Download Selected File
          </a>
        )}
      </div>
    );
  };
  

export default FileDownloader;
