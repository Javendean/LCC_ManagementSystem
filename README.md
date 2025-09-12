# LCC Management System

This is a SvelteKit application for managing contacts and sending them messages. It uses Supabase for the database and authentication, and Twilio for sending SMS messages.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js and npm installed on your machine.

### Installing

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following environment variables. You can get these from your Supabase and Twilio dashboards.

    ```
    PUBLIC_SUPABASE_URL=your_supabase_url
    PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Features

This application provides the following features:

-   **User Authentication:**
    -   Users can sign up for a new account.
    -   Users can log in with their email and password.
    -   Users can request a password reset link if they forget their password.
-   **Contact Management:**
    -   Users can view a list of all their contacts in a data table.
    -   The data table supports sorting and filtering.
-   **CSV Upload:**
    -   Users can upload a CSV file to add multiple contacts at once.
    -   The CSV file should have the following columns: `First Name`, `Last Name`, `Phone Number`.
-   **Messaging:**
    -   Users can select multiple contacts from the data table and send them an SMS message.
    -   The messaging service is powered by Twilio.

## Project Structure

-   `src/lib`: Contains the main Svelte components, Supabase client, and type definitions.
    -   `src/lib/components`: Contains reusable Svelte components.
    -   `src/lib/supabaseClient.js`: Initializes the Supabase client.
    -   `src/lib/types.js`: Contains type definitions for the application.
-   `src/routes`: Contains the application's routes, including API endpoints and pages.
    -   `src/routes/api`: Contains the API endpoints for sending messages and uploading CSV files.
    -   `src/routes/auth`: Contains the pages for authentication (login, forgot password, update password).
    -   `src/routes/contacts`: Contains the page for displaying the user's contacts.
-   `src/app.html`: The main HTML file for the application.
-   `src/hooks.server.js`: Contains the server-side hooks for authentication and session management.
