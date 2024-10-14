Press-On Nails E-Commerce Website
Project Overview
Welcome to the Press-On Nails E-Commerce Website, a platform for buying high-quality press-on nails with a variety of sizes, designs, and lengths. This website offers a seamless shopping experience with a clean interface, product filtering, and a smooth checkout process.

Live URL: Coming soon

Description
This website allows users to browse through a collection of curated press-on nails, view product details, add products to their cart, and complete purchases. It provides product sizes and stock management, ensuring that customers can easily select their preferred size and quantity.

Additionally, users can manage their carts, view wishlists, and experience responsive design across devices.

Features
User Registration and Authentication:
Users can register and log in to manage their profiles, place orders, and save wishlists.

Product Catalog:
Users can browse a wide range of press-on nails categorized by size and length. Product details, including images and available sizes, are displayed clearly.

Dynamic Product Sizes:
Each product comes in different sizes (S, M, L) with corresponding stock quantities. The size selection dynamically updates the availability in real-time.

Shopping Cart:
Users can add items to their cart, update quantities, and proceed to checkout.

Wishlist:
A heart icon allows users to add products to their wishlist for easy access later. Users can view and manage their wishlist with ease.

Responsive Design:
The website is fully responsive and mobile-friendly, ensuring a great user experience across devices.

Order Management:
Users can track their orders, and order history is accessible via their profile.

Image Magnification:
When viewing product images, users can click a magnifying glass icon to open a larger view of the image.

Why These Features?
User registration and authentication help create a personalized shopping experience.
Product catalog and filtering allow customers to easily navigate and find their desired products.
Wishlist and cart features make shopping convenient for users who may want to purchase later or track items.
Dynamic product sizes ensure users can select their correct size and avoid confusion.
User Flow
Home Page:
The user lands on the homepage, where they can browse a list of featured products or use the navigation bar to explore product categories.

Browse Products:
The user browses products, clicks on a product to view its details, selects a size, and optionally adds it to their wishlist or cart.

View Product Details:
The user can click on any product to view its detailed description, price, and available sizes. They can also click images to view larger versions of the product images.

Add to Cart and Checkout:
After adding items to the cart, the user can proceed to checkout, where they will provide shipping and payment details.

Wishlist Management:
Users can add items to their wishlist by clicking the heart icon. They can also access their wishlist from the navigation bar to review and add items to the cart later.

User Profile:
Registered users can log in to view their order history, manage their profile, and update their information.

API Information
This website uses a custom RESTful API for managing products, orders, users, and wishlist functionalities. The backend API provides endpoints to handle essential operations for the e-commerce platform, including user authentication, product management, and orders.

API Endpoints:
Products:

GET /api/products: Fetches a list of all products.
GET /api/products/:id: Retrieves detailed information for a specific product, including available sizes and images.
Orders:

POST /api/orders: Creates a new order after the user proceeds to checkout.
GET /api/orders: Retrieves order history for the logged-in user.
Wishlist:

POST /api/wishlist: Adds a product to the user's wishlist.
GET /api/wishlist: Retrieves the current wishlist for the user.
DELETE /api/wishlist/:id: Removes a product from the wishlist.
User Management:

POST /api/register: Registers a new user.
POST /api/login: Authenticates an existing user and returns a JWT.
GET /api/users: Fetches details of the currently authenticated user.

Technology Stack
Frontend:

React.js: Used for building interactive user interfaces and handling user interactions.
React Bootstrap: For responsive UI components such as navigation bars, forms, buttons, and modals.
CSS: Custom styles for additional UI design and responsive layout adjustments.
Backend:

Node.js and Express.js: Provides a RESTful API that handles authentication, products, orders, and wishlist management.
PostgreSQL: A relational database for storing user accounts, products, orders, and other site-related data.
Stripe: Handles secure payment processing for users during checkout.
Database:

PostgreSQL: Manages all product-related data, including sizes, stock quantities, user data, and order history.
Email Service:

SendGrid : Used for sending transactional emails like order confirmations, user registration emails, and updates.
Deployment:

The website will be deployed using render

How to Use

1. Installation:
   Clone the repository:
   git clone https://github.com/jade216/press-on-nails.git
   cd press-on-nails
   Install dependencies:
   npm install
2. Running the project:
   To run the frontend:
   npm start
   To run the backend(Express server):
   cd backend
   npm start

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
