import { FIELD_TYPES } from "../constants";

export const getUniqueId = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};

export const getSerializedFieldData = ({
  id,
  formLabel,
  formFieldName,
  formType,
  options,
  isRequired,
  minLength,
  maxLength,
}) => {
  return {
    id: id || getUniqueId(),
    label: formLabel,
    fieldName: formFieldName,
    type: formType,
    options,
    validations:
      formType === FIELD_TYPES.textInput || formType === FIELD_TYPES.textArea
        ? {
            isRequired,
            minLength,
            maxLength,
          }
        : [],
  };
};
