# NoVa Mart

NoVa Mart is a modern, responsive e-commerce web application built with React and TypeScript. It incorporates user authentication, product browsing with advanced filtering and sorting, profile management, and real-time alerts using Material-UI components.

# Features

- User Authentication: Sign up and sign in pages with form validation, storing user in localStorage.

- AuthContext & Routing: Global authentication state management via React Context, with:

- ProtectedRoute to guard private pages.

- ReverseProtectedRoute to redirect authenticated users away from login/signup pages.

# Product Listing:

- Fetches dummy products from a public API.

- Filters: Category, brand, rating range, price range.

- Sort: Sort by product name (A–Z, Z–A) or price (low–high, high–low).

- Search: Real-time search bar to filter products by keywords.

- Product Detail Page: View detailed information for each product, including images and descriptions.

- Profile Management: Update user profile information stored in localStorage.

- Logout: Clear user session and redirect to sign-in page.

- UI & Alerts: Uses Material-UI (MUI) for responsive layouts and components:

- Snackbar alerts for success and error messages.

- MUI inputs, buttons, cards, dialogs, and more.

# Tech Stack

- Framework: React 18 + TypeScript

- State Management: React Context API (AuthContext)

- Routing: React Router v6

- UI Library: Material-UI (MUI)

- HTTP Client: Axios

- Storage: Browser localStorage
