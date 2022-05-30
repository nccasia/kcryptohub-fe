import { ArrowDropDown, ArrowDropUp, Search } from "@mui/icons-material"
import { FormEvent, useState } from "react";

export const ComboboxSelect = ({label, items, onChange}: {label: string, items: string[], onChange?:()=>void}) => {
    const [isClose, setIsClose] = useState(false);
    const [filteredItems, setFilteredItems] = useState(items);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemsSelect = (event: FormEvent<HTMLInputElement>) => {

    }
    const hanleSearchItems = (event: FormEvent<HTMLInputElement>) => {
        const search = event.currentTarget.value;
        const filtered = items.filter(item => item.toLowerCase().includes(search.toLowerCase()));
        setFilteredItems(filtered);
    }
    return (
      <form className=" bg-white" onChange={}>
        <div
          className={`cursor-pointer border-2 mb-2 px-1 ${
            isClose ? "border-black" : ""
          }`}
          onClick={() => {
            setIsClose(!isClose);
          }}
        >
          <label className="">{label}</label>
          {isClose ? <ArrowDropUp /> : <ArrowDropDown />}
        </div>
        <div
          className={`${
            isClose ? "absolute" : "hidden"
          }  bg-white border-2 z-10 
          ${isClose ? "border-black" : ""} max-h-[200px] `}
        >
          <div className="relative flex items-center justify-center p-1">
            <input
              type="text"
              placeholder="Search"
              className="p-1 rounded-none border focus:border-black focus:outline-none"
              onChange={hanleSearchItems}
            />
            <Search className="absolute right-2 text-sm" />
          </div>
          <div className="p-1 overflow-y-scroll custom-scrollbar max-h-[150px]">
            {items.map((item, index) => (
              <div key={index} className="">
                <input
                  type="checkbox"
                  id={`${label}cb${index}`}
                  className="mr-2"
                />
                <label htmlFor={`${label}cb${index}`} className="w-full">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    );
}