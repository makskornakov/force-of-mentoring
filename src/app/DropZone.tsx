import { useDropzone } from 'react-dropzone';
import NextImage from 'next/image';
import { styled } from '@linaria/react';

export default function MyDropzone({
  setImage,
  selectedImage,
}: {
  setImage: (imageSrc: HTMLImageElement | undefined) => void;
  selectedImage?: HTMLImageElement;
}) {
  const { isFileDialogActive, isFocused, isDragActive, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },

    maxFiles: 1,
    multiple: false,
    onDrop: (file) => {
      const image = new Image();
      image.src = URL.createObjectURL(file[0]);
      image.alt = file[0].name;

      image.onload = () => {
        setImage(image);
      };
    },
  });

  return (
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
        <StyledDropzone
          {...getRootProps()}
          focused={isDragActive || isFocused || isFileDialogActive}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop me here...</p>
          ) : (
            <p>Drag & drop an image here, or click to select one</p>
          )}
        </StyledDropzone>
      )}
    </>
  );
}
const StyledDropzone = styled.div<{ focused?: boolean }>`
  border: 1px dashed;
  border-color: ${(props) => (props.focused ? '#a18bf8' : 'var(--border-color)')};
  padding: 1rem;
  transition: border-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  height: 8rem;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    border-color: #a18bf8;
  }
`;
