import React, { useState, useRef } from 'react';
import classes from './Register.module.css';

const ImageUpload = ({ onFileSelect, file, error }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            // Validate file type
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(selectedFile.type)) {
                alert("Please upload only JPG or PNG images");
                // Clear input
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }

            onFileSelect(selectedFile);

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleRemove = () => {
        setPreviewUrl(null);
        onFileSelect(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const triggerInput = () => {
        if (fileInputRef.current && !file) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={classes.uploadWrapper}>
            <h3 className={classes.uploadTitle}>
                📤 Upload Payment Screenshot
                <span className={classes.mandatory}>*</span>
            </h3>

            <div
                className={`${classes.uploadBox} ${file ? classes.uploadBoxHasFile : ''} ${error ? classes.inputError : ''}`}
                onClick={triggerInput}
            >
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className={classes.fileInputHidden}
                />

                {!previewUrl ? (
                    <div className={classes.uploadPrompt}>
                        <div className={classes.uploadIcon}>+</div>
                        <p className={classes.uploadText}>Click to upload screenshot</p>
                        <p className={classes.uploadSubtext}>JPG, PNG only</p>
                    </div>
                ) : (
                    <div className={classes.previewContainer}>
                        <img src={previewUrl} alt="Payment Receipt Preview" className={classes.imagePreview} />
                        <div className={classes.fileDetails}>
                            <span className={classes.fileName}>{file.name}</span>
                            <button
                                type="button"
                                className={classes.removeBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove();
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {error && <span className={classes.errorText}>{error}</span>}
        </div>
    );
};

export default ImageUpload;
