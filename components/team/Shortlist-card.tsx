import React, { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
function ShortlistCard({
  handleRemoveFromShortList,
  teamId,
}: {
  handleRemoveFromShortList: (id: number) => void;
  teamId: number;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      {show ? (
        <div
          className="relative"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <BookmarkIcon
            className={`absolute text-[#848abd] cursor-pointer ${
              show ? "bg-white text-[#848abd]" : ""
            }`}
          ></BookmarkIcon>
          <div className="absolute w-[220px] bg-white border-2 border-[#848ABD] top-[24px] right-[-24px] rounded-lg shadow-lg">
            <div className="text-left px-2">
              <li className="list-none py-2 cursor-pointer border-b-[1px] font-nunito">
                <a
                  className="text-[#848abd] font-medium"
                  onClick={() => handleRemoveFromShortList(teamId)}
                >
                  Remove from Shortlist
                </a>
              </li>
            </div>
          </div>
        </div>
      ) : (
        <BookmarkIcon
          className={`absolute text-[#848abd] cursor-pointer hover:bg-white hover:text-[#848abd] ${
            show ? "hidden" : ""
          }`}
          onMouseEnter={() => setShow(true)}
        ></BookmarkIcon>
      )}
    </div>
  );
}

export default ShortlistCard;
