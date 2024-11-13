import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import TextBox from 'devextreme-react/text-box';
import { Validator, RequiredRule } from 'devextreme-react/validator';

const TextBox1 = forwardRef(
  ({ value, onChange }, ref) => {
    const [inputValue, setInputValue] = useState(value || '');
    const validatorRef = useRef(null);
    useImperativeHandle(ref, () => ({
      validate: () => {
        if (validatorRef.current) {
          return validatorRef.current.instance.validate();
        }
        return { isValid: true };
      },
    }));
    const handleTextChange = (e) => {
      setInputValue(e);
      onChange(e);
    };
  
    return (
        <TextBox
          height={55}
          value={inputValue}
          onValueChange={handleTextChange}
          label="Phân loại nguồn hoạt động *"
          placeholder='Nhập phân loại nguồn hoạt động'
          showClearButton={true}
        >
          <Validator ref={validatorRef}>
            <RequiredRule message="Vui lòng nhập phân loại nguồn hoạt động" />
          </Validator>
        </TextBox>
    );
  }
);

export default TextBox1;
