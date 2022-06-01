import { useEffect, useRef, useState } from "react";

export const useOutsideClick = () => {
  const [show, setShow] = useState(false);
  const nodeRef = useRef<HTMLElement>(null);
  const subNodeRef = useRef<HTMLElement>(null);  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target as Node) && subNodeRef.current && !subNodeRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return {
    show,
    setShow,
    nodeRef,
    subNodeRef
  };
};

