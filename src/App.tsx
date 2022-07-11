import React, { FormEvent, useEffect, useState } from "react";
import { InputField } from "./components/InputField";
import { PostalCodeInput } from "./components/PostalCodeInput";
import { appService } from "./service/app.service";

interface IApiresponse {
  postal: string;
  suburb: string;
  state: string;
}
interface ISuggestion {
  suburb: string[];
  state: string[];
}

const App: React.FC = () => {
  const [postalcode, setPostalcode] = useState<string>("");
  const [postalcodeError, setPostalcodeError] = useState<string>("");

  const [suburb, setSuburb] = useState<string>("");
  const [suburbError, setSuburbError] = useState<string>("");

  const [state, setState] = useState<string>("");
  const [stateError, setStateError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<IApiresponse[]>([]);
  const [suggestion, setSuggestion] = useState<ISuggestion>({
    suburb: [],
    state: [],
  });

  useEffect(() => {
    //? Postal Code Input Validation
    if (!postalcode) setPostalcodeError("");
    const isValid: boolean = new RegExp("^[0-9]*$").test(postalcode);
    if (!isValid)
      setPostalcodeError("Postalcode should only contains number of length 4");
    if(isValid) setPostalcodeError("")

    if (!suburb) setSuburbError("");
    if (!state) setStateError("");
  }, [postalcode, suburb, state]);

  // Hit APi to get postalcode, suburb and state based on querry postalcode & subrub
  const hitApi = async (query: string) => {
    if (!query) return;
    if (postalcode.length !== 4) {
      setPostalcodeError("Postalcode should only contains number of length 4");
      return;
    }
    setLoading(true);

    const response = await appService.getPostalDetails(query);
    if (response) {
      const transformData: IApiresponse[] = response.map((data) => {
        return {
          postal: String(data.postcode),
          suburb: data.location,
          state: data.state,
        };
      });
      setApiResponse(transformData);
      // set suggestions
      const transformSuggestion: ISuggestion = {
        suburb: Array.from(new Set(transformData.map((data) => data.suburb))),
        state: Array.from(new Set(transformData.map((data) => data.state))),
      };
      setSuggestion(transformSuggestion);
    }

    //reset loading
    setLoading(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // empty Input validations
    if (postalcode === "") setPostalcodeError("PostalCode is Required");
    if (suburb === "") setSuburbError("Suburb is Required");
    if (state === "") setStateError("State is Required");

    // Handle Submit Actions
    if (postalcode && suburb && state) {
      //? Check if postal and suburb matches
      const isPostalSuburbMatch = apiResponse.find(
        (detail) =>
          detail.postal === postalcode &&
          detail.suburb.toLocaleLowerCase() === suburb.toLocaleLowerCase()
      );
      if (!isPostalSuburbMatch)
        setSuburbError(
          `The postal code ${postalcode} does not matches the suburb ${suburb}, try changing the postal code or choose suburb from suggestion`
        );

      //? Check if the state matches the suburb or not
      const isSuburbMatchesState = apiResponse.find(
        (details) =>
          details.suburb.toLocaleLowerCase() === suburb.toLocaleLowerCase() &&
          details.state.toLocaleLowerCase() === state.toLocaleLowerCase()
      );
      if (!isSuburbMatchesState)
        setStateError(
          `The suburb ${suburb} does not exist in the state ${state}, try changing the postal code or choose state from suggestion`
        );

      //? if all matches
      const isAllMatch = apiResponse.find(
        (details) =>
          details.postal === postalcode &&
          details.suburb.toLocaleLowerCase() === suburb.toLocaleLowerCase() &&
          details.state.toLocaleLowerCase() === state.toLocaleLowerCase()
      );
      if (isAllMatch) {
        alert(
          `The postcode ${postalcode}, suburb ${suburb} and state ${state} entered are valid.`
        );
        resetForm();
      }
    }
  };

  const resetForm = () => {
    //? Reset Input Fields
    setPostalcode("");
    setSuburb("");
    setState("");
    //?Reset Errors
    setPostalcodeError("");
    setSuburbError("");
    setStateError("");
    //? Reset api,suggestiona and loading
    setLoading(false);
    setApiResponse([]);
    setSuggestion({
      suburb: [],
      state: [],
    });
  };

  return (
    <div className="container-md">
      <h1 style={{ margin: "50px 0" }}>Tech Test</h1>
      <form onSubmit={handleSubmit}>
        <PostalCodeInput
          value={postalcode}
          error={postalcodeError}
          onChange={setPostalcode}
          onBlur={hitApi}
        />
        <InputField
          label="Enter Suburb"
          placeholder="eg: Broadway"
          value={suburb}
          onChange={setSuburb}
          error={suburbError}
          loading={loading}
          suggestion={suggestion.suburb}
        />

        <InputField
          label="Enter State"
          placeholder="eg: NSW"
          value={state}
          onChange={setState}
          error={stateError}
          loading={loading}
          suggestion={suggestion.state}
        />

        {/* Buttons Group */}
        <div className="hstack gap-3" style={{ margin: "30px 0" }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Validate Input
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};
export default App;
