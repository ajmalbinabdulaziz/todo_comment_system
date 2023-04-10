import { useState } from "react";

const InlineEdit = ({ value, setValue }) => {

    const [editingValue, setEditingValue] = useState(value);

    const onChange = (event) => setValue(event.target.value);
    
    const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
          event.target.blur();
        }
      }

    const onBlur = (event) => {
        if (event.target.value.trim() === "") {
            setEditingValue(value);
        } else {
          setValue(event.target.value)
        }
    }  

    return (
      <input
        className="bg-transparent border p-8 hover:cursor-pointer hover:bg-[#d3d3d3]"       
        type="text"
        aria-label="Field name"
        value={editingValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    )
  }

  export default InlineEdit