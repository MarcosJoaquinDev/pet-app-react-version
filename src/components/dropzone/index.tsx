import React, { useState } from "react";
import Dropzone from "react-dropzone";
type propsDropZone = {
  handle: (params: string) => {};
  urlPic?: string;
};
const MyDropzone: React.FC = (props: propsDropZone) => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [imageSelect, setImageSelect] = useState(false);

  const handleDropzone = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setSelectedImage([
        Object.assign(file, { preview: URL.createObjectURL(file) }),
      ]);
      console.log(file);
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr: string = reader.result as string;
        console.log(binaryStr);
        props.handle(binaryStr);
        setImageSelect(true);
      };
      reader.readAsDataURL(file);
    });
  };
  const removeImage = () => {
    props.handle(null);
    setImageSelect(false);
    setSelectedImage([]);
  };
  return (
    <>
      {imageSelect ? (
        <div>
          <img
            src={selectedImage[0]?.preview}
            alt=""
            style={{ width: "600px" }}
          />
          <a
            onClick={removeImage}
            style={{
              border: "solid 1px #2c2c2c",
              color: "red",
              bordeRadius: "4px",
            }}
          >
            Quitar
          </a>{" "}
        </div>
      ) : (
        <Dropzone onDrop={handleDropzone}>
          {({ getRootProps, getInputProps }) => (
            <section>
              {props.urlPic ? (
                <img src={props.urlPic} alt="pet" style={{ width: "300px" }} />
              ) : (
                ""
              )}
              <div
                {...getRootProps()}
                style={{
                  width: "100%",
                  border: "dashed 0.5px #2c2c2c",
                  borderRadius: "4px",
                  padding: "15px",
                }}
              >
                <input {...getInputProps()} />
                <p className="title is-3">
                  {props.urlPic ? "Cambiar foto" : "Cargar foto..."}
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      )}
    </>
  );
};

export { MyDropzone };
