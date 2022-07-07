import React from "react";

interface IInputFieldProps {
  label: string;
  placeholder: string;
  error: string;
  value: string;
  loading: boolean;
  suggestion: string[];
  onChange: (changeValue: string) => void;
}

export const InputField: React.FC<IInputFieldProps> = ({
  label,
  placeholder,
  error,
  value,
  loading,
  suggestion,
  onChange,
}) => {
  return (
    <div className="inputfield mb-3">
      <label className="form-label">{label}</label>
      <input
        className={error !== "" ? "form-control is-invalid" : "form-control"}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
      <div className="invalid-feedback">{error}</div>
      {
        //-->
        /**
         * ? Display the Suggestions Logic based on loading and
         * ? suggestions props
         *  */
      }

      {loading ? (
        <div
          className="d-flex align-items-center text-warning"
          style={{ margin: "10px 0" }}
        >
          <div
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></div>
          <span>&nbsp; &nbsp; Loading Suggestions...</span>
        </div>
      ) : (
        suggestion.length > 0 && (
          <div
            className="container-md hstack gap-3"
            style={{ margin: "10px 0" }}
          >
            <span>Suggestions: </span>
            {suggestion.map((value, index) => (
              <span
                className="badge text-bg-secondary"
                key={index}
                role="button"
                onClick={() => onChange(value)}
              >
                {value}
              </span>
            ))}
          </div>
        )
      )}
    </div>
  );
};
