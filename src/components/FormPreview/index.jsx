import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { FIELD_TYPES } from "../../constants";

import "./index.css";

const FormPreview = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({});
  const { formList } = useSelector((state) => state.formList);
  const formDetails = formList.find((form) => form.id === id);
  const { formFields } = formDetails || {};

  if (!formDetails) {
    return <h2 style={{ textAlign: "center" }}>Form not found</h2>;
  }

  const getDropdown = (fieldDetails) => {
    return (
      <select
        onChange={(e) => {
          const newFormValues = { ...formValues };
          newFormValues[fieldDetails.id] = e.target.value;
          setFormValues(newFormValues);
        }}
        name={fieldDetails.label}
        value={formValues[fieldDetails.id] || ""}
        required={fieldDetails.validations?.isRequired}
      >
        {fieldDetails.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  const isFieldValid = (field) => {
    if (field.validations?.isRequired && !formValues[field.id]) {
      return false;
    }

    if (!field.validations?.minLength && !field.validations?.maxLength) {
      return true;
    }

    if (
      field.type === FIELD_TYPES.textInput ||
      field.type === FIELD_TYPES.textArea
    ) {
      if (!field.validations?.minLength) {
        return field.validations?.maxLength >= formValues[field.id]?.length;
      }

      if (!field.validations?.maxLength) {
        return field.validations?.minLength <= formValues[field.id]?.length;
      }

      return (
        field.validations?.minLength <= formValues[field.id]?.length &&
        field.validations?.maxLength >= formValues[field.id]?.length
      );
    }

    return true;
  };

  const handleInputChange = (event, field) => {
    const newFormValues = { ...formValues };
    if (
      field.type === FIELD_TYPES.checkbox ||
      field.type === FIELD_TYPES.radio
    ) {
      newFormValues[field.id] = event.target.checked;
    } else {
      newFormValues[field.id] = event.target.value;
    }
    setFormValues(newFormValues);
  };

  return (
    <div className="form_preview_container">
      <form className="form_preview">
        <h1 className="form_preview_title">Dynamic Form</h1>
        <div className="form_preview_fields">
          {(formFields || []).length
            ? formFields.map((field, index) => (
                <div className="form_preview_field" key={index}>
                  <div className="form_preview_field_label">
                    <label>{field.label}</label>
                    <div className="form_preview_field_input">
                      {field.type !== FIELD_TYPES.dropdown ? (
                        <input
                          value={formValues[field.id] || ""}
                          onChange={(event) => handleInputChange(event, field)}
                          name={field.fieldName || field.label}
                          type={field.type}
                          placeholder="Enter value"
                          required={field.validations?.isRequired}
                        />
                      ) : (
                        getDropdown(field)
                      )}
                    </div>
                  </div>
                  {!isFieldValid(field) ? (
                    <span className="error-message">
                      Please enter a valid value
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              ))
            : null}
        </div>
        <div>
          <button className="btn btn-ghost btn-submit" type="submit" disabled>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPreview;
