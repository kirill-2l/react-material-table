import React, { useState } from "react";
import { SketchPicker } from "react-color";
import ColorizeIcon from "@material-ui/icons/Colorize";
import clsx from "clsx";
import "./colorpicker.scss";

const ColorPicker = ({ color, active, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const handleColorPickerStatus = () =>
    setDisplayColorPicker(!displayColorPicker);

  const test = (e) => console.log(e);
  return (
    <div className="colorpicker">
      <div className="colorpicker__field">
        <div
          className={clsx("colorpicker__color", {
            "colorpicker__color--active": active,
          })}
          style={{ backgroundColor: `${color}` }}
        >
          <input
            type="text"
            className="colorpicker__color-val"
            disabled={!active ? "disabled" : ""}
            onChange={(e) => onChange(e.target.value)}
            value={color}
          />
        </div>
        {active && (
          <ColorizeIcon
            fontSize="small"
            onClick={() => handleColorPickerStatus()}
          />
        )}
      </div>

      {displayColorPicker && (
        <div className="colorpicker__interface">
          <div
            className="colorpicker__interface-overlay"
            onClick={() => setDisplayColorPicker(false)}
          />

          <SketchPicker
            color={color}
            onChange={(colors) => onChange(colors.hex)}

          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
