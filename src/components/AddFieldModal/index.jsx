import { useState } from "react";

import { getSerializedFieldData } from "../../utils";
import { FIELD_TYPES, FIELD_TYPE_LABELS } from "../../constants";
import "./index.css";

const AddFieldModal = (props) => {
  const { onClose, onSubmit, editModeValues } = props;
  const {
    id,
    label,
    type,
    fieldName,
    validations,
    options: fieldOptions,
  } = editModeValues || {};

  const [formLabel, setFormLabel] = useState(label || "");
  const [formType, setFormType] = useState(type || FIELD_TYPES.textInput);
  const [minLength, setMinLength] = useState(validations?.minLength || "");
  const [maxLength, setMaxLength] = useState(validations?.maxLength || "");
  const [options, setOptions] = useState(fieldOptions || [""]);
  const [formFieldName, setFormFieldName] = useState(fieldName || "");
  const [isRequired, setIsRequired] = useState(
    validations?.isRequired || false,
  );

  const resetForm = () => {
    setFormLabel("");
    setFormType(FIELD_TYPES.textInput);
    setIsRequired(false);
    setMinLength("");
    setMaxLength("");
    setOptions([""]);
    setFormFieldName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = getSerializedFieldData({
      id,
      formLabel,
      formFieldName,
      formType,
      options,
      isRequired,
      minLength,
      maxLength,
    });

    resetForm();
    onSubmit(formData);
  };

  return (
    <div className="modal_outer_container">
      <div className="modal_container">
        <div className="modal_header">
          <h1 className="modal_title">Add Field</h1>
          <button onClick={onClose} className="btn-close">
            X
          </button>
        </div>
        <div className="modal_body">
          <form onSubmit={handleSubmit} className="form_cotainer">
            <div className="field_item">
              <label htmlFor="field-label">Field Label</label>
              <input
                type="text"
                name="field-label"
                placeholder="Enter field label"
                value={formLabel}
                onChange={(e) => setFormLabel(e.target.value)}
                required
              />
            </div>
            <div className="field_item">
              <label htmlFor="field-type">Field Type</label>
              <select
                name="field-type"
                placeholder="Select field type"
                onChange={(e) => setFormType(e.target.value)}
                value={formType}
                required
              >
                {Object.keys(FIELD_TYPES).map((key) => (
                  <option key={key} value={FIELD_TYPES[key]}>
                    {FIELD_TYPE_LABELS[key]}
                  </option>
                ))}
              </select>
            </div>
            {formType === FIELD_TYPES.dropdown ? (
              <div className="field_item">
                <label htmlFor="field-options">Options</label>
                {options.map((_, index) => (
                  <div key={index} className="option_item">
                    <input
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index] = e.target.value;
                        setOptions(newOptions);
                      }}
                      value={options[index] || ""}
                      type="text"
                      name="field-options"
                      placeholder="Enter Option"
                      required
                    />
                    <button
                      onClick={() => {
                        const newOptions = [...options];
                        newOptions.splice(index, 1);
                        setOptions(newOptions);
                      }}
                      type="button"
                      className="btn btn-ghost btn-delete-option"
                      disabled={options.length === 1}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newOptions = [...options];
                    newOptions.push("");
                    setOptions(newOptions);
                  }}
                  type="button"
                  className="btn btn-ghost btn-add-option"
                >
                  Add Option
                </button>
              </div>
            ) : null}
            {formType === FIELD_TYPES.radio ? (
              <div className="field_item">
                <label htmlFor="field-options">Field Name</label>
                <input
                  type="text"
                  name="field-options"
                  placeholder="Enter Field Name"
                  value={formFieldName}
                  onChange={(e) => setFormFieldName(e.target.value)}
                  required
                />
              </div>
            ) : null}
            {formType === FIELD_TYPES.textInput ||
            formType === FIELD_TYPES.textArea ? (
              <div className="validations">
                <h3 className="validations_title">Validations</h3>
                <div className="field_item checkbox">
                  <input
                    type="checkbox"
                    name="field-required"
                    checked={isRequired}
                    onChange={(e) => setIsRequired(e.target.checked)}
                  />
                  <label htmlFor="field-required">Required</label>
                </div>
                <div className="length_validation">
                  <div className="field_item">
                    <label htmlFor="field-minlen">Min Length</label>
                    <input
                      name="field-minlen"
                      placeholder="Enter min length"
                      type="number"
                      value={minLength}
                      onChange={(e) => setMinLength(e.target.value)}
                    />
                  </div>
                  <div className="field_item">
                    <label htmlFor="field-maxlen ">Max Length</label>
                    <input
                      name="field-maxlen"
                      placeholder="Enter max length"
                      type="number"
                      value={maxLength}
                      onChange={(e) => setMaxLength(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <div className="footer">
              <button className="btn btn-primary btn-submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFieldModal;
