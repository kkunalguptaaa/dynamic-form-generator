import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FormList = () => {
  const { formList } = useSelector((state) => state.formList);
  const navigate = useNavigate();

  const handlePreviewForm = (formId) => {
    navigate(`/form-preview/${formId}`);
  };

  return (
    <div>
      <ul className="form_fields">
        {(formList || []).length ? (
          formList.map((form, index) => (
            <li className="form_field" key={index}>
              {form.id}
              <span
                onClick={() => {
                  handlePreviewForm(form.id);
                }}
                className="field_type_badge"
              >
                Preview Form
              </span>
            </li>
          ))
        ) : (
          <h2 style={{ textAlign: "center" }}>No form found</h2>
        )}
      </ul>
    </div>
  );
};

export default FormList;
