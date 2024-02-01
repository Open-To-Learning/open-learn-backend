# Backend Project Name

This is the backend component of the [Project Name] project.

## Description

This backend server handles user authentication, data storage, and retrieval for the [Project Name] project.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your_username/backend-project.git
   ```

2. Install dependencies:

   ```bash
   cd backend-project
   npm install
   ```

3. Configure environment variables:

    already configed! 

4. Start the server:

   ```bash
   npm start
   ```

## Usage

- **Register a new user**: Send a POST request to `/api/register` with the following JSON body:

  ```json
  {
    "fullName": "John Doe",
    "userName": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Login**: Send a POST request to `/api/login` with the user's `userName` or `email` and `password`.

- **Endpoints**:

  - `/auth/register`: Register a new user[POST].
  - `/auth/login`: Login an existing user[POST].

- **Get video details**: 
  - Endpoint: `/video-url/:videoID/video-details`
  - Method: GET
  - Description: Fetches details of the video with the given videoID.

- **Get video formats**:
  - Endpoint: `/video-url/:videoID`
  - Method: GET
  - Query Parameters:
    - `audioOnly`: (true/false) Indicates whether to retrieve only audio formats.
    - `videoOnly`: (true/false) Indicates whether to retrieve only video formats.
    - `filter`: (optional) Filter the formats based on quality.
 
## Contributing

Contributions are welcome! Please follow the guidelines outlined in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
