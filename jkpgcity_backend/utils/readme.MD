# Utilities

## Description
This folder contains the utilities used in the project. The utilities are used to perform various tasks such as data preprocessing, data cleaning, data transformation, etc. The utilities are used in the main code to perform the tasks.

## Files
- `Encryption.js`: This file contains the code to perform encryption. The encryption is used to encrypt the data before storing it in the database.
- `Validation.js`: This file contains the code to perform validation. The validation is used to validate the data before storing it in the database.


## Example 
```javascript
const Encryption = require('./Encryption');
const Validation = require('./Validation');

let data = "Hello World";
let encryptedData = Encryption.encrypt(data);
let isValid = Validation.validate(data);
```

