import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Dropdown.module.css";

const Dropdown = ({ options, onSelect, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0]);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    } else {
      setPosition(null); // 드롭다운이 닫힐 때 position 초기화
    }
  }, [isOpen]);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (option, e) => {
    e.stopPropagation();
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdownHeader} onClick={handleClick}>
        <span>{selected}</span>
        {isOpen && <span className={styles.inverseArrow}>▲</span>}
        {!isOpen && <span className={styles.arrow}>▲</span>}
      </div>
      {isOpen &&
        position && // position이 있을 때만 렌더링
        createPortal(
          <div
            className={styles.dropdownContent}
            style={{
              position: "absolute",
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
              visibility: position ? "visible" : "hidden", // 추가
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className={styles.dropdownItem}
                onClick={(e) => handleSelect(option, e)}
              >
                {option}
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Dropdown;
