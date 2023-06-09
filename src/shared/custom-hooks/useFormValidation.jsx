/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import { useReducer, useState, useEffect } from 'react';

import formValidationReducer from './formValidationReducer';

const useFormValidation = () => {
  const [inputsStates, dispatch] = useReducer(formValidationReducer, {});
  const [formIsValid, setFormIsValid] = useState(false);

  const setFormData = (inputs) => {
    let newState = {};
    for (const input of inputs) {
      const inputStateKey = `${input}IsValid`;
      if (inputsStates.hasOwnProperty(inputStateKey)) {
        newState = {
          ...newState,
          [inputStateKey]: inputsStates[inputStateKey],
        };
      }
      if (!inputsStates.hasOwnProperty(inputStateKey)) {
        newState = { ...newState, [inputStateKey]: false };
      }
    }
    dispatch({ type: 'SET_FORM_DATA', payload: newState });
  };

  const inputValidationChangeHandler = (inputIsValid, fieldName) => {
    const inputStateKey = `${fieldName}IsValid`;

    if (inputsStates.hasOwnProperty(inputStateKey)) {
      inputIsValid
        ? dispatch({ type: 'VALIDATE_INPUT', payload: inputStateKey })
        : dispatch({
            type: 'INVALIDATE_INPUT',
            payload: `${fieldName}IsValid`,
          });
    }
  };

  useEffect(() => {
    // console.log(inputsStates);
    setFormIsValid(() =>
      Object.values(inputsStates).every((isValid) => isValid)
    );
  }, [inputsStates]);

  return [formIsValid, inputValidationChangeHandler, setFormData];
};

export default useFormValidation;
