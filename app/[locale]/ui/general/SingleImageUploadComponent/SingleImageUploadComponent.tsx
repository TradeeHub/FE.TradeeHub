import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useController } from 'react-hook-form';
import { HiX } from 'react-icons/hi';

const SingleImageUploadComponent = ({ control, name }) => {
  const { field } = useController({ control, name });
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Memoize the preview URL to prevent unnecessary re-renders
  const preview = useMemo(() => {
    if (field.value && field.value[0]) {
      const file = field.value[0];
      return typeof file === 'string' ? file : URL.createObjectURL(file);
    }
    return '';
  }, [field.value]);

  useEffect(() => {
    // Clean up the object URL on unmount or when the value changes
    return () => {
      if (preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const newFile = e.dataTransfer.files[0];
    if (newFile) {
      field.onChange([newFile]);
    }
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      field.onChange([newFile]);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Prevent click from propagating
    field.onChange([]);
  };

  const handleUploadAreaClick = (e) => {
    // Prevent the file input from opening if there's already a preview
    if (!preview) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='space-y-4'>
      {!preview && (
        <div
          className={`flex justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 ${dragOver ? 'border-indigo-500' : 'border-gray-300'} border-dashed cursor-pointer`}
          onClick={handleUploadAreaClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type='file'
            onChange={handleFileChange}
            className='w-full h-full opacity-0 cursor-pointer'
            accept='image/*'
            style={{ position: 'absolute', zIndex: -1 }}
          />
          <div className='text-center'>
            <p className='mt-1 text-sm text-gray-400'>
              Drag 'n' drop a file here, or click to select a file
            </p>
          </div>
        </div>
      )}
      {preview && (
        <div className='relative' onClick={handleUploadAreaClick}>
          <img src={preview} alt='Preview' className='h-32 w-full object-cover rounded-lg' />
          <button
            type='button'
            className='absolute top-0 right-0 bg-black p-1 rounded-full text-white'
            onClick={handleRemoveImage}
          >
            <HiX className='h-4 w-4' />
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleImageUploadComponent;
