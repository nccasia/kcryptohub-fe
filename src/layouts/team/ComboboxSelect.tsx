import { Skill } from "@/type/Skill";
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, Search } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { useOutsideClick } from "hook/OuterClick";
import { FormEvent, LegacyRef, Ref, useState } from "react";
const getName = (item: any) => {
  if(item.skillName){
    return item.skillName;
  }
  return item
}
export const ComboboxSelect = ({
  label,
  items,
  selected,
  setSelected,
  className,
  isCollapsor,
}: {
  label: string;
  items: any[];
  selected: number[];
  setSelected: (selected: number[]) => void;
  className?: string;
  isCollapsor?: boolean;
}) => {
  const [filteredItems, setFilteredItems] = useState(items);
  //const [isOpen, setIsOpen] = useState(false);

  const { show, setShow, nodeRef, subNodeRef } = useOutsideClick();

  const handleItemsSelect = (
    event: FormEvent<HTMLInputElement>,
    value: string
  ) => {
    if (event.currentTarget.checked) {
      setSelected([...selected, parseInt(value)]);
    } else {
      setSelected(selected.filter((item) => item !== parseInt(value)));
    }
  };
  const hanleSearchItems = (event: FormEvent<HTMLInputElement>) => {
    const search = event.currentTarget.value;
    const filtered = items.filter((item) =>
      getName(item).toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  return (
    <div className={`${className} bg-white`}>
      <div
        className={`cursor-pointer  py-1 
         flex items-center justify-center w-full`}
        onClick={() => {
          setShow(!show);
        }}
      >
        <div
          className={`${show ? "border-cyan-900" : ""} ${
            isCollapsor ? "" : "border-2"
          } flex items-center justify-between px-1 w-full`}
          ref={nodeRef as LegacyRef<HTMLDivElement>}
        >
          <label
            className={`${isCollapsor ? "text-lg" : ""} pointer-events-none`}
          >
            {label}
          </label>
          {show ? (
            <KeyboardArrowUpOutlined className="pointer-events-none" />
          ) : (
            <KeyboardArrowDownOutlined className="pointer-events-none" />
          )}
        </div>
      </div>
      <Collapse
        in={show}
        className={`${
          isCollapsor
            ? ""
            : ` ${
                show ? "block border-cyan-900" : "hidden"
              } absolute bg-white border-2 z-10 
           max-h-[200px] `
        }`}
        ref={subNodeRef as Ref<unknown>}
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
                    onChange={(e) => handleItemsSelect(e, item.id)}
                    checked={selected.includes(item.id)}
                  />
                  <label
                    htmlFor={`${label}cb${index}`}
                    className="w-full cursor-pointer"
                  >
                    {getName(item)}
                  </label>
                </label>
              ))}
        </Collapse>
      </Collapse>
    </div>
  );
};
