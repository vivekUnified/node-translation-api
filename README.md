# Node Translation API

## Overview
The Node Translation API is a RESTful service that provides translation capabilities using a machine learning model. This API allows users to send text for translation between different languages.
This application uses pipeline from @xenova/transformers. 

## Features
- Supports multiple languages for translation.
- Asynchronous processing for translation requests.
- Easy integration with existing applications.

## Project Structure
```
node-translation-api
├── src
│   ├── controllers
│   │   └── translationController.js
│   ├── routes
│   │   └── translationRoutes.js
│   ├── services
│   │   └── translationService.js
│   └── app.js
├── package.json
├── .env
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/vivekUnified/node-translation-api.git
   ```
2. Navigate to the project directory:
   ```
   cd node-translation-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Configuration
Create a `.env` file in the root directory and add your configuration variables. For example:
```
PORT=api_port
```

## Usage
To start the server, run:
```
npm start
```
The server will be running on `http://localhost:3000`.

## API Endpoints
### Translate Text
- **Endpoint:** `POST /translate`
- **Request Body:**
  ```json
  {
    "text": "As stated before",
    "src_lang": "eng_Latn",
    "tgt_lang": "hin_Deva"
  }
  ```
- **Response:**
  ```json
  {
    "translation_text": "जैसा कि पहले कहा गया है"
  }
  ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.
