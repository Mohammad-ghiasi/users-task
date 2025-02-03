Here's an updated README template for your project, considering the new feature of using local storage to handle user data:

---

# User Management System

A user management system built using **Next.js**, **React**, and **Express.js**. This project implements features like infinite scrolling, user editing, user deletion, and a user-friendly interface for managing user information. Additionally, the system uses **SWR** to store and manage data, ensuring that updates, deletions, and additions are reflected without needing to fetch data on every page load.

## Features

- **Infinite Scrolling**: The list of users loads dynamically as the user scrolls down the page, fetching more users without reloading the entire page.
- **User Editing**: Users can be edited directly through a modal, with updated information saved to the backend.
- **User Deletion**: Users can be deleted from the system, and the changes are reflected immediately on the page.
- **SWR**: The system leverages local cash storage to store user data, ensuring that even after updates, additions, or deletions, the data is preserved. On page load, the data is first fetched from local storage, and if no data exists, new data is fetched from the backend.
- **Authentication**: Secured API routes that require an authorization token for making requests (JWT).

## Tech Stack

- **Frontend**: Next.js, React, Chakra UI, SWR
- **Backend**: Express.js, MongoDB
- **Authentication**: JWT, Cookies (js-cookie)
- **API Calls**: Axios
- **Styling**: Tailwind CSS


## Installation

### Prerequisites

- Node.js (preferably LTS version)
- MongoDB instance (Local or Atlas)
- Yarn or npm

### Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/user-management-system.git
   ```

2. Navigate to the project directory:
   ```bash
   cd user-management-system
   ```

3. Install the required dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

4. Set up your environment variables. Create a `.env.local` file in the root of your project and include the necessary environment variables for connecting to the backend, such as your MongoDB URL and JWT secret key.

5. Run the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000` and the backend will be running at `http://localhost:3001`.

## API Endpoints

- **GET `/users/users`**: Fetch a list of users with pagination.
- **PUT `/users/updateUsers/:id`**: Update a specific user's details.
- **DELETE `/users/delete/:id`**: Delete a specific user.

All API requests are protected by **JWT** authentication. Ensure that you send the token as part of the `Authorization` header when making requests.

## User Interface

- **Users List**: Displays a list of users with infinite scrolling. The list will load more users automatically as you scroll down.
- **User Actions**: Each user has options to edit or delete. When the edit button is clicked, a modal opens to update user details.
- **Modals**: The edit modal allows updating user details (like first name, last name, email, etc.) and saving them back to the backend.
- **Toast Notifications**: Feedback is provided with toast notifications on success or failure of user actions (e.g., delete, save).
- **Local Storage**: The user list is initially fetched from local storage. If no data is available, it falls back to the backend API to fetch the data. Updates and deletions are reflected both in the UI and stored in local storage.

## Development

- To contribute to the project, create a new branch from `main`, implement your changes, and submit a pull request.
- Follow best practices for clean, readable code, and adhere to the project's existing coding standards.

---

Feel free to adjust the template further based on your specific needs!