import { useAppSelector } from "@/redux/hooks";
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  Search,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useOutsideClick } from "hook/OuterClick";
import { FormEvent, LegacyRef, Ref, useEffect, useState } from "react";

export const ComboboxSelect = ({
  label,
  items,
  selected,
  setSelected,
  className,
  isCollapsor,
  isSwitched,
}: {
  label: string;
  items: string[];
  selected: string[];
  setSelected: (selected: string[]) => void;
  className?: string;
  isCollapsor?: boolean;
  isSwitched?: boolean;
}) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const { show, setShow, nodeRef, subNodeRef } = useOutsideClick();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setFilteredItems(items);
  }, [items]);
  useEffect(() => {
    setFilteredItems(
      items?.filter((item) =>
        item.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, items]);
  const handleItemsSelect = (
    event: FormEvent<HTMLInputElement>,
    value: any
  ) => {
    if (event.currentTarget.checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((item) => item !== value));
    }
  };
  const hanleSearchItems = (event: FormEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

  return (
    <div className={`${className} bg-white text-[#606060] `}>
      <div
        className={`cursor-pointer 
         flex items-center justify-center w-full`}
        onClick={() => {
          setShow(!show);
        }}
        ref={nodeRef as LegacyRef<HTMLDivElement>}
      >
        <div
          className={`${show ? "" : ""} ${
            isCollapsor ? "" : ""
          } flex items-center justify-between px-1 w-full hover:text-[#848abd]`}
        >
          <label
            className={`${isCollapsor ? "text-lg" : ""} pointer-events-none ${
              isSwitched ? "text-[#848abd]" : ""
            }`}
          >
            {label}
          </label>
          {show ? (
            <KeyboardArrowUpOutlined
              className={`${
                isSwitched ? "text-[#848abd]" : ""
              } pointer-events-none`}
            />
          ) : (
            <KeyboardArrowDownOutlined
              className={`pointer-events-none ${
                isSwitched ? "text-[#848abd]" : ""
              }`}
            />
          )}
        </div>
      </div>
      <Collapse
        in={show}
        className={`${
          isCollapsor
            ? ""
            : ` ${
                show ? "block" : "hidden"
              } absolute bg-white border-[1px] mt-3 rounded-lg z-[100] 
           max-h-[200px] `
        }`}
        ref={subNodeRef as Ref<unknown>}
      >
        <div className="relative flex items-center justify-center p-1">
          <input
            type="text"
            placeholder={`Search ${label === "Skills" ? "Skills" : ""}`}
            className="shadow w-full  text-[#606060] bg-white pl-5 px-1 py-2 focus:outline-none  rounded-full"
            onChange={hanleSearchItems}
          />
          <Search className="absolute right-4 text-sm" />
        </div>
        <Collapse
          in={true}
          className={`overflow-y-scroll custom-scrollbar ${
            isCollapsor ? "" : "max-h-[150px]"
          }`}
        >
          {filteredItems?.length === 0
            ? "No items"
            : filteredItems?.map((item, index) => (
                <label
                  htmlFor={`${label}cb${index}${isCollapsor ? 0 : 1}`}
                  key={index}
                  className="block cursor-pointer border-l-2 pl-1 mt-2 border-transparent lg:max-w-[350px] sm:max-w-[250px] overflow-hidden hover:border-cyan-900 hover:bg-cyan-100 "
                >
                  <input
                    type="checkbox"
                    id={`${label}cb${index}${isCollapsor ? 0 : 1}`}
                    className="mr-2"
                    onChange={(e) => handleItemsSelect(e, item)}
                    checked={selected.includes(item)}
                  />
                  <label
                    htmlFor={`${label}cb${index}${isCollapsor ? 0 : 1}`}
                    className="w-full cursor-pointer "
                  >
                    {item}
                  </label>
                </label>
              ))}
        </Collapse>
      </Collapse>
    </div>
  );
};
