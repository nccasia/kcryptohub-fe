import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, Search } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { FormEvent, useEffect, useRef, useState } from "react";

export const ComboboxSelect = ({
  label,
  items,
  selected,
  setSelected,
  className,
  isCollapsor,
}: {
  label: string;
  items: string[];
  selected: string[];
  setSelected: (selected: string[]) => void;
  className?: string;
  isCollapsor?: boolean;
}) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [isOpen, setIsOpen] = useState(false);
  const handleItemsSelect = (
    event: FormEvent<HTMLInputElement>,
    value: string
  ) => {
    if (event.currentTarget.checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((item) => item !== value));
    }
  };
  const hanleSearchItems = (event: FormEvent<HTMLInputElement>) => {
    const search = event.currentTarget.value;
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  return (
    <div className={`${className} bg-white`}>
      <div
        className={`cursor-pointer  py-1 
         flex items-center justify-center w-full`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div
          className={`${
            isOpen ? "border-cyan-900" : ""
          } ${isCollapsor? 'border-b-2' : 'border-2'} flex items-center justify-between px-1 w-full`}
        >
          <label className={`${isCollapsor? 'text-lg':''} pointer-events-none`}>{label}</label>
          {isOpen ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
        </div>
      </div>
      <Collapse
        in={isOpen}
        className={`${
          isCollapsor
            ? ""
            : ` ${
                isOpen ? "block border-cyan-900" : "hidden"
              } absolute bg-white border-2 z-10 
           max-h-[200px] `
        }`}
      >
        <div className="relative flex items-center justify-center p-1">
          <input
            type="text"
            placeholder={`Search ${label}`}
            className="p-1 rounded-none border focus:border-cyan-900 focus:outline-none w-full"
            onChange={hanleSearchItems}
          />
          <Search className="absolute right-2 text-sm" />
        </div>
        <Collapse
          in={true}
          className={`overflow-y-scroll custom-scrollbar ${
            isCollapsor ? "" : "max-h-[150px]"
          }`}
        >
          {filteredItems.length === 0
            ? "No items found"
            : filteredItems.map((item, index) => (
                <label
                  htmlFor={`${label}cb${index}`}
                  key={index}
                  className="block cursor-pointer border-l-2 pl-1 border-transparent hover:border-cyan-900 hover:bg-cyan-100 "
                >
                  <input
                    type="checkbox"
                    id={`${label}cb${index}`}
                    className="mr-2"
                    onChange={(e) => handleItemsSelect(e, item)}
                    checked={selected.includes(item)}
                  />
                  <label
                    htmlFor={`${label}cb${index}`}
                    className="w-full cursor-pointer"
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
