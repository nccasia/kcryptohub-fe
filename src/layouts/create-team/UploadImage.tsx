import Image from "next/image";
import React, { useEffect } from "react";
import { FileDrop } from "react-file-drop";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { DragDropField } from "./DragDropField";
export const UploadImage = ({
  createObjectURL,
  uploadToClient,
  setCreateObjectURL,
  setImage,
  image,
}: {
  createObjectURL: string;
  uploadToClient: (event: any) => void;
  setCreateObjectURL: (image: string) => void;
  setImage: (image: any) => void;
  image?: File;
}) => {
  useEffect(() => {
    if (image?.name) {
      setCreateObjectURL(URL.createObjectURL(image));
    }
  }, [image]);
  return (
    <div className="my-5">
      <div className="flex sm:flex-row flex-col items-center justify-center">
        <DragDropField uploadToClient={uploadToClient} createObjectURL={createObjectURL} setImage={setImage} setCreateObjectURL={setCreateObjectURL} label="Team Logo"/>
        <div className="text-gray-500 ml-3 mt-5 text-sm md:flex-col justify-center flex-[50%] ">
          Your Team Logo must be one of the following image formats:
          <ul className="px-14">
            <li className="list-disc">
              <a>.JPG</a>
            </li>
            <li className="list-disc">
              <a>.JPEG</a>
            </li>
            <li className="list-disc">
              <a>.SVG</a>
            </li>
            <li className="list-disc">
              <a>.PNG </a>
            </li>
            <li className="list-disc">
              <a>.WEBP</a>
            </li>
          </ul>
          Maximum file size for image: 15MB
        </div>
      </div>
    </div>
  );
};
