import React, { useState, useEffect } from 'react';
import { useController } from 'react-hook-form';
import { HiX } from 'react-icons/hi';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

const ImageUploadComponent = ({ control, name }) => {
  const { field } = useController({ control, name });
  const [dragOver, setDragOver] = useState(false);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (!field.value) {
      setPreviews([]);
      return;
    }

    // Generate previews for new files
    const filePreviews = Array.from(field.value).map((file) =>
      typeof file === 'string' ? file : URL.createObjectURL(file),
    );

    setPreviews(filePreviews);

    // Cleanup function for revoking URLs
    return () =>
      filePreviews.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
  }, [field.value]);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!dragOver) setDragOver(true); // Prevent flickering by setting only if not already set
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const newFiles = e.dataTransfer.files;
    if (newFiles.length) {
      const updatedFiles = field.value
        ? [...field.value, ...newFiles]
        : [...newFiles];
      field.onChange(updatedFiles);
    }
  };

  const handleFilesChange = (e) => {
    const newFiles = e.target.files;
    if (newFiles.length) {
      const updatedFiles = field.value
        ? [...field.value, ...newFiles]
        : [...newFiles];
      field.onChange(updatedFiles);
    }
  };

  const handleRemoveImage = (index) => {
    const newFilesArray = Array.from(field.value);
    newFilesArray.splice(index, 1);
    field.onChange(newFilesArray);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  return (
    <div className='space-y-4'>
      <div
        className={`flex h-32 w-full items-center justify-center rounded-lg border-2 bg-gray-50 ${dragOver ? 'border-indigo-500' : 'border-gray-300'} cursor-pointer border-dashed`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type='file'
          multiple
          onChange={handleFilesChange}
          className='absolute h-full w-full cursor-pointer opacity-0'
          accept='image/*'
        />
        <div className='text-center'>
          <MdOutlineAddPhotoAlternate className='mx-auto h-8 w-8 text-gray-400' />
          <p className='mt-1 text-sm text-gray-400'>
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
      </div>
      <div className='flex flex-wrap gap-2'>
        {previews.map((preview, index) => (
          <div key={index} className='relative'>
            <img
              src={preview}
              alt={`preview-${index}`}
              className='h-24 w-24 rounded-md object-cover'
            />
            <button
              type='button'
              className='absolute right-0 top-0 rounded-full bg-red-600 p-1 text-white'
              onClick={() => handleRemoveImage(index)}
            >
              <HiX className='h-4 w-4' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadComponent;
