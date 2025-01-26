import React, { useState } from "react";

const Dropdown = ({ options, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); 
  };

  return (
    <div className="relative w-64">
      <button
        className="w-full px-4 py-2 text-left border rounded-lg bg-white shadow focus:outline-none"
        onClick={toggleDropdown}
      >
        {selectedOption || placeholder}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Search types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border-b focus:outline-none"
          />
          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => selectOption(option)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
