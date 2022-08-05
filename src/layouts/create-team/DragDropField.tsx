import { FileDrop } from "react-file-drop";
import Image from "next/image";
import { AddPhotoAlternate } from "@mui/icons-material";
export const DragDropField = ({
  uploadToClient,
  createObjectURL,
  setImage,
  setCreateObjectURL,
  label,
}: any) => {
  return (
    <div className="flex-[50%] w-full">
      <label className="text-primary w-full block mb-2 py-2 md:py-0">
        {label}
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
      <div className="min-h-[202px] mt-[-26px] max-w-[300px] w-full h-[202px] mr-3 relative border border-[#848ABD] border-dashed border-2 peer-focus:border-cyan-600 rounded-lg">
        {createObjectURL ? (
          <div>
            <div className="absolute top-0 right-0 translate-y-[-30%] translate-x-[30%] z-10 ">
              <button
                type="button"
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
            frame={this}
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
                className=" md:text-xs lg:text-base text-[#848abd] cursor-pointer"
              >
                browse for an image
                <span className="text-[#848abd]">
                  <AddPhotoAlternate className="mb-1" />
                </span>
              </label>
            </p>
          </FileDrop>
        )}
      </div>
    </div>
  );
};
