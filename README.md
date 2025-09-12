# Project Title

A brief description of what this project does and who it's for.

## Features

- **User Authentication**: Secure login and registration using Supabase.
- **Contact Management**: Add, view, and manage contacts.
- **CSV Upload**: Bulk upload contacts from a CSV file.
- **SMS Messaging**: Send SMS messages to selected contacts via Twilio.
- **Responsive Data Table**: A sortable, filterable, and paginated table for contacts.

## Tech Stack

- **SvelteKit**: The web framework for building the application.
- **Supabase**: The backend-as-a-service for database and authentication.
- **Twilio**: The service for sending SMS messages.
- **Tailwind CSS**: The utility-first CSS framework for styling.
- **Svelte-Table**: The library for creating data tables.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- A [Supabase](https://supabase.com/) account and project.
- A [Twilio](https://www.twilio.com/) account and phone number.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

### Configuration

1.  **Create a `.env` file** in the root of the project by copying the example file:

    ```bash
    cp .env.example .env
    ```

2.  **Set up Supabase environment variables:**

    - `PUBLIC_SUPABASE_URL`: Your Supabase project URL.
    - `PUBLIC_SUPABASE_ANON_KEY`: Your Supabase project's anonymous key.
    - `SUPABASE_URL`: Your Supabase project URL (for server-side).
    - `SUPABASE_ANON_KEY`: Your Supabase project's anonymous key (for server-side).

3.  **Set up Twilio environment variables:**

    - `TWILIO_ACCOUNT_SID`: Your Twilio Account SID.
    - `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token.
    - `TWILIO_PHONE_NUMBER`: Your Twilio phone number.

4.  **Set up the database schema:**

    Run the following SQL in your Supabase project's SQL editor to create the `contacts` table:

    ```sql
    CREATE TABLE contacts (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name TEXT,
        last_name TEXT,
        phone_number TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        user_id UUID REFERENCES auth.users(id)
    );
    ```

## Usage

1.  **Start the development server:**

    ```bash
    pnpm dev
    ```

2.  **Open your browser** and navigate to `http://localhost:5173`.

3.  **Sign up or log in** to access the application.

## Project Structure

```
.
├── src
│   ├── hooks.server.js       # Server-side hooks (auth, session)
│   ├── lib
│   │   ├── components        # Reusable Svelte components
│   │   ├── supabaseClient.js # Supabase client initialization
│   │   └── types.js          # Type definitions
│   └── routes
│       ├── +layout.svelte    # Root layout
│       ├── +layout.server.js # Layout server-side logic
│       ├── api               # API endpoints
│       ├── contacts          # Contacts page and server logic
│       └── login             # Login page
└── static                    # Static assets
```
