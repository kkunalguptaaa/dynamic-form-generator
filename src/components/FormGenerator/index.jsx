import { useState } from "react";
import { useDispatch } from "react-redux";

import AddFieldModal from "../AddFieldModal";
import { getUniqueId } from "../../utils";
import { addForm } from "../../store/reducer/formListSlice";
import "./index.css";

const FormGenerator = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [fieldList, setFieldList] = useState([]);
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const dispatch = useDispatch();

  const resetForm = () => {
    setFieldList([]);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openEditModal = (fieldValue) => {
    setEditModal(true);
    setFieldToEdit(fieldValue);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const addField = (field) => {
    setFieldList([...fieldList, field]);
    closeModal();
  };

  const saveEditedField = (editedField) => {
    const newFieldList = fieldList.map((field) => {
      if (field.id === editedField.id) {
        return editedField;
      }
      return field;
    });

    setEditModal(false);
    setFieldList(newFieldList);
    closeEditModal();
  };

  const hanleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      id: getUniqueId(),
      formFields: fieldList,
    };

    dispatch(addForm(formData));
    resetForm();
    alert(`Form created successfully with id: ${formData.id}`);
  };

  return (
    <div>
      {showEditModal ? (
        <AddFieldModal
          onClose={closeEditModal}
          onSubmit={saveEditedField}
          editModeValues={fieldToEdit}
        />
      ) : null}
      {showModal ? (
        <AddFieldModal onClose={closeModal} onSubmit={addField} />
      ) : null}
      <form onSubmit={hanleFormSubmit} className="form_container">
        <div className="form_body">
          <div>
            <h1 className="header">Create Form</h1>
          </div>
          <div className="body_title">
            <h2>Form Field List</h2>
            <button type="button" onClick={openModal} className="btn btn-ghost">
              Add Field
            </button>
          </div>
          <ul className="form_fields">
            {fieldList.map((field, index) => (
              <li
                onClick={() => openEditModal(field)}
                className="form_field"
                key={index}
              >
                {field.label}
                <span className="field_type_badge">{field.type}</span>
              </li>
            ))}
          </ul>
          {(fieldList || []).length ? (
            <div className="footer">
              <button type="submit" className="btn btn-primary btn-submit">
                Create Form
              </button>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default FormGenerator;
