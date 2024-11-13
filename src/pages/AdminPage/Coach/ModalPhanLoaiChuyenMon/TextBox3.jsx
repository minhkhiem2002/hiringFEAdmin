import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import TextBox from 'devextreme-react/text-box';
import { Validator, RequiredRule } from 'devextreme-react/validator';

const TextBox3 = forwardRef(({ value, onChange }, ref) => {
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
    const newValue = e.value || '';
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <TextBox
      height={55}
      value={inputValue}
      onValueChanged={handleTextChange}
      label="Công việc chuyên môn"
      showClearButton={true}
    >
        <Validator ref={validatorRef}>
          <RequiredRule message="Công việc chuyên môn là bắt buộc" />
        </Validator>
      </TextBox>
  );
})

export default TextBox3;
