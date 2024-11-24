# Vichar Frontend

The **Vichar** is a modern, responsive web application for managing and interacting with user-authored posts. It provides authentication, an intuitive dashboard for users to write and manage their blogs, and a public-facing interface to explore posts. Built using **Next.js 14**, the frontend incorporates **React Server Components**, **TypeScript**, and dynamic routing.

> **Note**: There is a hosted frontend version of the app available at [Vichar](https://vichar2.vercel.app/). But as the backend is hosted on a free render server, it may take some time to load the data.

## Table of Contents

1. [Features](#features)  
2. [Project Structure](#project-structure)  
3. [Installation](#installation)  
4. [Routing Overview](#routing-overview)  
5. [Contributing](#contributing)  
6. [License](#license)  
7. [Contact](#contact)  

## Features

- **Authentication**:
  - Login and sign-up pages with role-based access.
  - Handles "not signed up" states gracefully.

- **User Dashboard**:
  - Dedicated interface to manage user-authored posts.
  - A post editor for writing and updating blog posts.

- **Blog Rendering**:
  - Clean and responsive layouts for individual blogs.
  - Support for dynamic routing using slugs.

- **Dark Mode Support**:
  - Theme toggling.

- **Modular UI**:
  - Reusable and accessible components.

- **API Integration**:
  - Preconfigured API utilities for seamless backend communication.
  - React Query for efficient data fetching and state management.

## Project Structure

```
app/
│   favicon.ico           # App icon
│   globals.css           # Global CSS styles
│   layout.tsx            # Root layout component
│   page.tsx              # Landing page
│
├── blog/
│   └── [slug]/
│       page.tsx          # Dynamic blog detail page
│
├── dashboard/
│   page.tsx              # User dashboard page
│   └── write/
│       page.tsx          # Blog editor page
│
├── fonts/
│   GeistMonoVF.woff      # Custom font file
│   GeistVF.woff          # Custom font file
│
├── login/
│   page.tsx              # Login page
│
├── not-signed-up/
│   page.tsx              # "Not signed up" redirect page
│
└── signup/
    page.tsx              # Signup page

components/
│   checkAuth.tsx         # Higher Order Authentication wrapper component
│   dark-mode-toggle.tsx  # Dark mode toggle component
│   dashboard.tsx         # Dashboard layout and utilities
│   footer.tsx            # Footer component
│   navbar.tsx            # Navigation bar
│   theme-provider.tsx    # Theme context provider
│
├── blog/
│   blog-editor.tsx       # Blog editor component
│   blog-header.tsx       # Blog header for details view
│   blog-posts.tsx        # List of blogs
│   blog-preview.tsx      # Preview card for blogs
│   blog-render.tsx       # Render blog content
│
├── login/
│   login-comp.tsx        # Login form
│   signup-comp.tsx       # Signup form
│
└── ui/
    badge.tsx             # Badge component
    button.tsx            # Button component
    card.tsx              # Card layout
    dropdown-menu.tsx     # Dropdown menu
    input.tsx             # Input field
    label.tsx             # Label component
    separator.tsx         # Separator line
    sonner.tsx            # Notification system
    tabs.tsx              # Tab navigation
    textarea.tsx          # Text area field

lib/
    utils.ts              # Helper utilities

utils/
    api.ts                    # API calls and configurations
    react-query-provider.tsx  # React Query provider for data fetching
```

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/AvaterClasher/vichar.git
   cd vichar/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```env
   # For using the local backend
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

   Also create a new website tracking script in [Umami](https://umami.is) and change it with the existing one in [src/app/layout.tsx](src/app/layout.tsx).

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:3000`.

## Routing Overview

- **Landing Page**: `/`  
  Displays an overview of the platform.

- **Login**: `/login`  
  Page for user login.

- **Signup**: `/signup`  
  Registration page for new users.

- **Dashboard**: `/dashboard`  
  User dashboard for managing posts.

- **Write Blog**: `/dashboard/write`  
  Blog editor for creating or updating posts.

- **View Blog**: `/blog/[slug]`  
  Dynamic routing to display blog details.

- **Not Signed Up**: `/not-signed-up`  
  Redirects users who attempt unauthorized access.

## Contributing

We welcome contributions! Please feel free to submit issues, fork the repo, or create pull requests for any fixes or enhancements.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Contact

For any questions, feel free to reach out via [GitHub](https://github.com/AvaterClasher).