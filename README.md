# Tech Test Lawpath
Create an online form using React that accepts a postcode, suburb and state. When the user
submits the form, it should check the inputs with the Australia Post API to validate that it is a
valid address.

## Tests to pass:
 - Check that the entered postcode matches the suburb. If not, display an error message. For example "The postcode 2000 does not match the suburb Broadway".
- Check that the entered suburb matches the state. If not, display an error message. For example: "The suburb Ferntree Gully does not exist in the state Tasmania"
- If the postcode, suburb and state match, then display a success message. For
example: "The postcode, suburb and state entered are valid".