import { useDropzone } from 'react-dropzone';
import NextImage from 'next/image';
import { styled } from '@linaria/react';
import { revalidatePath } from 'next/cache';
import { StyledButton } from './edit/page.styled';

export default function MyDropzone({
  setImage,
  selectedImage,
}: {
  setImage: (imageSrc: string | undefined) => void;
  selectedImage?: HTMLImageElement;
}) {
  const { isFileDialogActive, isFocused, isDragActive, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },

    maxFiles: 1,
    multiple: false,
    onDrop: async (file) => {
      setImage(URL.createObjectURL(file[0]));
    },

    // onDropAccepted: async (files, event) => {

    // },
    // ? somehow this fixes when you press the button in the dialog window (usually it stuck the update)
    // onDropAccepted: (file) => {
    // console.log('drop accepted', file);
    // const image = new Image();
    // image.src = URL.createObjectURL(file[0]);
    // image.onload = () => {
    //   setImage(image);
    // };
    // },
  });

  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     width: '100%',
    //     rowGap: '0.5rem',
    //     alignItems: 'flex-start',
    //   }}
    // >
    //   <h3>Image</h3>
    <>
      {selectedImage ? (
        <>
          <div
            style={{
              border: '1px dashed var(--border-color)',
              position: 'relative',
              height: '10rem',
              // calculate height based on file sizes
              width: `${(selectedImage.width / selectedImage.height) * 10}rem`,
            }}
          >
            <NextImage
              src={selectedImage.src}
              fill
              alt=""
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </>
      ) : (
        <div
          {...getRootProps()}
          style={{
            border: '1px dashed',
            borderColor:
              isDragActive || isFocused || isFileDialogActive ? '#4cd800' : 'var(--border-color)',
            padding: '1rem',
            transition: 'border-color 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '8rem',
            cursor: 'pointer',
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop me here...</p>
          ) : (
            <p>Drag & drop an image here, or click to select one</p>
          )}
        </div>
      )}
    </>
    // </div>
  );
}
