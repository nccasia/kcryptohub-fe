import Image from "next/image";
import React from "react";
import { FileDrop } from "react-file-drop";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
export const UploadImage = ({
  createObjectURL,
  uploadToClient,
  setCreateObjectURL,
  setImage,
}: {
  createObjectURL: string;
  uploadToClient: (event: any) => void;
  setCreateObjectURL: (image: string) => void;
  setImage: (image: any) => void;
}) => {
  return (
    <div className="my-5">
      <div className="flex items-center justify-center">
        <div className="flex-[50%] ">
          <label className="text-primary w-full block mb-2 py-2 md:py-0">
            Team Logo
            <span className="float-right text-gray-400 ">optional</span>
          </label>
          <input
            id="image"
            type="file"
            autoComplete="off"
            accept="image/*"
            className="h-0 w-0 peer"
            onChange={uploadToClient}
          />
          <div className="min-h-[202px] mt-[-26px] max-w-[300px] w-full h-[202px] mr-3 relative border border-[#cae0e7] border-dashed border-2 peer-focus:border-cyan-600">
            {createObjectURL ? (
              <div>
                <div className="absolute top-0 right-0 translate-y-[-30%] translate-x-[30%] z-10 ">
                  <button
                    className="h-[30px] flex justify-center items-center w-[30px] rounded-full bg-gray-400 text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      setImage(null);
                      setCreateObjectURL("");
                    }}
                  >
                    x
                  </button>
                </div>
                <Image
                  src={createObjectURL}
                  layout="fill"
                  alt=""
                  draggable={true}
                />
              </div>
            ) : (
              <FileDrop
                onDrop={(files, event) => {
                  event.preventDefault();
                  uploadToClient({ target: { files: files } });
                }}
              >
                <div className="md:text-xs lg:text-base  absolute top-0 left-0 w-full h-1/2 flex items-center justify-center">
                  Upload Image
                </div>
                <p className="md:text-xs lg:text-base w-full h-[50px] absolute top-1/2 left-0 text-center">
                  Drag and drop an image
                </p>
                <p className=" md:text-xs lg:text-base w-full h-[50px] absolute top-3/4 left-0 text-center">
                  or{" "}
                  <label
                    htmlFor="image"
                    className=" md:text-xs lg:text-base text-cyan-800 cursor-pointer"
                  >
                    browse for an image
                    <span className="text-red-500">
                      <AddPhotoAlternateIcon />
                    </span>
                  </label>
                </p>
              </FileDrop>
            )}
          </div>
        </div>

        <div className="text-gray-500 ml-3 mt-5 text-sm flex-col justify-center flex-[50%] ">
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
