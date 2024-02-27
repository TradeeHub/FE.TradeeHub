import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';
import { HiX } from 'react-icons/hi';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

const SingleImageUploadForm= <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
}) => {
  // const { field } = useController({ field });
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const preview = useMemo(() => {
    if (field.value && field.value[0]) {
      const file = field.value[0];
      return typeof file === 'string' ? file : URL.createObjectURL(file);
    }
    return '';
  }, [field.value]);

  useEffect(() => {
    return () => {
      if (preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dragOver) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Check if the mouse is actually leaving the upload area, not just moving over a child element
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return; // If moving to a child element, don't change the state
    }
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const newFiles = Array.from(e.dataTransfer.files); // Convert FileList to array
    if (newFiles.length) {
      const updatedFiles = field.value
        ? [...field.value, ...newFiles]
        : [...newFiles];
      field.onChange(updatedFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      field.onChange([newFile]);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    field.onChange([]);
  };

  const handleUploadAreaClick = () => {
    if (!preview && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='space-y-4'>
      {!preview && (
        <div
          className={`flex h-32 w-full items-center justify-center rounded-lg border-2 bg-gray-50 ${dragOver ? 'border-indigo-500' : 'border-gray-300'} cursor-pointer border-dashed`}
          onClick={handleUploadAreaClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{ position: 'relative' }} // Add relative positioning here
        >
          <input
            ref={fileInputRef}
            multiple
            type='file'
            onChange={handleFileChange}
            className='h-full w-full cursor-pointer opacity-0'
            accept='image/*'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              opacity: 0,
              pointerEvents: 'none',
            }} // Add pointer-events: none
          />
          <div
            className='text-center'
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <MdOutlineAddPhotoAlternate className='mx-auto h-8 w-8 text-gray-400' />
            <p className='mt-1 text-sm text-gray-400'>
              Drag 'n' drop, or click to select
            </p>
          </div>
        </div>
      )}
      {preview && (
        <div className='relative' onClick={handleUploadAreaClick}>
          <img
            src={preview}
            alt='Preview'
            className='h-32 w-full rounded-lg object-contain'
          />
          <button
            type='button'
            className='absolute right-0 top-0 rounded-full bg-black p-1 text-white'
            onClick={handleRemoveImage}
          >
            <HiX className='h-4 w-4' />
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleImageUploadForm;
