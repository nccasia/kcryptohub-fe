import { ArrowDropDown } from "@mui/icons-material"
import { useState } from "react";

export const ComboboxSelect = ({label, items}: {label: string, items: string[]}) => {
    const [isClose, setIsClose] = useState(false);
    return (
      <form className="">
        <div className="" onClick={()=>{setIsClose(!isClose)}}>
          <label className="">{label}</label>
          {isClose ? <ArrowDropDown /> : <ArrowDropDown />}
        </div>
        <div className={`${isClose? 'absolute': 'hidden'}`}>
            {items.map((item, index) => (
                <div key={index} className="">
                    <input type="checkbox" id={`cb${index}`}/>
                    <label htmlFor={`cb${index}`}>{item}</label>
                </div>
            ))}
        </div>
      </form>
    );
}