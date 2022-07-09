![check-code-coverage](https://img.shields.io/badge/code--coverage-100%25-brightgreen)
# Tech Test
Create an online form using React that accepts a postcode, suburb and state. When the user
submits the form, it should check the inputs with the Australia Post API to validate that it is a
valid address.

## Tests to pass:
 - Check that the entered postcode matches the suburb. If not, display an error message. For example "The postcode 2000 does not match the suburb Broadway".
- Check that the entered suburb matches the state. If not, display an error message. For example: "The suburb Ferntree Gully does not exist in the state Tasmania"
- If the postcode, suburb and state match, then display a success message. For
example: "The postcode, suburb and state entered are valid".

# Running the Application
Clone the Repo
```
git clone https://github.com/AbrialStha/tech_test_lawpath.git
```

Install Dependencies
```
cd tech_test_lawpath
yarn
```

create .env (see .env.sample for keys) and enter the api auth key
```
REACT_APP_AUTH_KEY={api_auth_key_here}
```

Then the application is ready to start
```
yarn start
```

# Running the Test
For testing the applicaiton I choose to use cypress as i do not have much experience with jest and react-testing-library with react and I find cypress to be lot easier to debug and see the errors realtime.

For opening the test runner
```
yarn test
```

For running the component test
```
yarn test:component
```

For running the E2E test
```
yarn test:e2e
```

Both the test will provide the code coverage for the relalistic purpose I have not covered full coverage on the E2E part.