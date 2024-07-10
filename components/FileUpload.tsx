'use client';
import React, { useState } from 'react';
import axios from 'axios';

interface FileUploadProps {
    onUpload: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://api.uploadthing.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer YOUR_API_KEY',  // Replace with your API key
                },
            });
            onUpload(response.data.url); // Adjust according to the response structure
        } catch (error) {
            console.error('Upload failed', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;