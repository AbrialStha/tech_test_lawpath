import React, { FormEvent, useEffect, useState } from "react";
import { PostalCodeInput } from "./container/PostalCodeInput";

const App: React.FC = () => {
  const [postalcode, setPostalcode] = useState<string>("");
  const [postalcodeError, setPostalcodeError] = useState<string>("");

  //validate Input
  useEffect(() => {
    // Postal Code Validation
    if (!postalcode) setPostalcodeError("");
    const isValid: boolean = new RegExp("^[0-9]*$").test(postalcode);
    if (!isValid)
      setPostalcodeError("Postalcode should only contains number of length 4");
  }, [postalcode]);

  // Hit APi to get postalcode, suburb and state based on querry postalcode & subrub
  const hitApi = (query: string) => {};

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    // empty Input validations
    if (postalcode === "") setPostalcodeError("PostalCode is Requred");
  };

  return (
    <div className="container-md">
      <form onSubmit={handleSubmit}>
        <PostalCodeInput
          value={postalcode}
          passError={postalcodeError}
          onChange={setPostalcode}
          onBlur={hitApi}
        />

        {/* Buttons Group */}
        <div className="hstack gap-3" style={{ margin: "30px 0" }}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            // onClick={resetForm}
            // disabled={loading}
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};
export default App;
