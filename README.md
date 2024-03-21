# Pizza Ordering System

Welcome to Pizzeria Web Application! 🍕

## Features

### User Features

- **Custom Pizza Creation**: Create your own custom pizza with your preferred toppings, crust, and size.
- **Order Placement**: Place orders for delivery or pickup.
- **Authentication**: Secure login and authentication using NextAuth for users.
- **Order Tracking**: Track the status of your order from placement to delivery.

### Admin Features

- **Admin Dashboard**: Access to an admin dashboard to manage orders, view analytics, and update inventory.
- **Order Management**: View and manage all incoming orders including status updates.
- **Analytics**: Access analytics to gain insights into sales trends, popular items, etc.
- **Inventory Management**: Update and manage inventory of ingredients and supplies.

## Tech Stack

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **NextAuth**: Authentication library for Next.js applications providing various authentication methods.
- **MongoDB**: A NoSQL database for storing user data, orders, and other application data.
- **Prisma**: A modern database toolkit for Node.js and TypeScript, used for database access and schema management.

## Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/kcokoji/OIBSIP.git
```

### 2. Install dependencies:

```bash
cd OIBSIP
npm install
```

### 3. Configure environment variables:

Create a .env file based on the provided .env.example template. Update the variables with your own API keys, database connection strings, and other configuration options.

### 4. Run the development server:

```bash
npm run dev
```

The application should now be accessible at http://localhost:3000.

### 5.Environment Variables

The project relies on several environment variables for configuration. Create a .env file in the root of your project based on the provided .env.example template. Update each variable with your own values.

Example .env File

```bash

DATABASE_URL=
AUTH_SECRET=
NEXT_PUBLIC_APP_URL=
RESEND_API_KEY=

EMAIL_PASS=
EMAIL=

NEXT_PUBLIC_TEST_KEY=

```

Ensure that you keep your .env file secure and do not expose sensitive information.

### Contributing

If you would like to contribute to the project, please follow the contributing guidelines.

### License

This project is licensed under the MIT License. Feel free to fork and modify the code for your own educational or commercial purposes.

### Acknowledgments

Special thanks to the contributors and the open-source community for their valuable contributions and support.
