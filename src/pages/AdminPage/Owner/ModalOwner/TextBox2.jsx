import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import TextBox from 'devextreme-react/text-box';
import { Validator, RequiredRule } from 'devextreme-react/validator';

const TextBox2 = ({ value, onChange }) => {
    const [inputValue, setInputValue] = useState(value || '');
    const handleTextChange = (e) => {
      setInputValue(e);
      onChange(e);
    };
    return (
      <TextBox
        height={55}
        value={inputValue}
        onValueChange={handleTextChange}
        label="Chuyên môn của bộ phận"
        placeholder="Nhập chuyên môn của bộ phận"
        showClearButton={true}
      >
        
      </TextBox>
    );
  }

export default TextBox2;
