import { useState } from "react";

const useInputValidation = (validateInput) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateInput(inputValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const resetInput = () => {
      setInputValue('');
      setIsTouched(false);
  }

  return {
    value: inputValue,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    resetInput
  };
};

export default useInputValidation;
