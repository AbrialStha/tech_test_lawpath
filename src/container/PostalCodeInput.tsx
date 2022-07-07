import React from "react";

interface IPostalCodeInputProps {
  value: string;
  passError: string;
  onChange: (changeValue: string) => void;
  onBlur: (value: string) => void;
}

export const PostalCodeInput: React.FC<IPostalCodeInputProps> = ({
  value,
  passError,
  onChange,
  onBlur,
}) => {
  return (
    <div className="postalcode mb-3">
      <label className="form-label">Postal Code</label>
      <input
        name="postalcode"
        placeholder="eg: 2007"
        className={passError !== "" ? "form-control is-invalid" : "form-control"}
        type="string"
        pattern="\d*"
        maxLength={4}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onBlur={() => onBlur(value)}
      />
      <div className="invalid-feedback">{passError}</div>
    </div>
  );
};
