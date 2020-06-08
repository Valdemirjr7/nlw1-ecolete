import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import './styles.css';

interface imageProps{
    onFileUploaded: (file: File) => void,
}

const Dropzone: React.FC<imageProps> = ({ onFileUploaded }) => {
    const [imageselected, setImageSelected] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);
        setImageSelected(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            

            {
                imageselected
                ? <img src={imageselected} alt="upload" />
                :  (
                    <p><FiUpload  />Imagem do estabelecimento</p>
                )
            }

        </div>
    );
}

export default Dropzone;