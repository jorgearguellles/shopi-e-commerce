# Shopi E-Commerce

Shopi E-Commerce is a modern e-commerce website built with React and Vite. This project demonstrates a clean, functional front-end structure with a focus on performance and maintainability, utilizing modern JavaScript practices and styling with Tailwind CSS.

## Previews

![Home](https://github.com/jorgearguellles/shopi-e-commerce/blob/main/public/1.png)
---
![Product detail](https://github.com/jorgearguellles/shopi-e-commerce/blob/main/public/2.png)
---
![Cart Side](https://github.com/jorgearguellles/shopi-e-commerce/blob/main/public/3.png)
---
![Checkout](https://github.com/jorgearguellles/shopi-e-commerce/blob/main/public/4.png)
---
![My Orders](https://github.com/jorgearguellles/shopi-e-commerce/blob/main/public/5.png)


## Table of Contents

1. [Installation](#installation)
2. [Technologies](#technologies)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Best Practices and Patterns](#best-practices-and-patterns)
6. [Licenses](#licenses)

## 1. Installation

- Clone the repository: ```git clone https://github.com/jorgearguellles/shopi-e-commerce.git && cd shopi-e-commerce```

- Install dependencies:
```npm install```

- Run the development server:
```npm run dev```

- Open your browser and visit ```http://localhost:3000```

## 2. Technologies

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces, focused on creating reusable components and managing state.
- **[Vite](https://vitejs.dev/)**: A build tool designed to provide fast development start-up and optimized build processes for modern web applications.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for creating custom designs quickly without writing custom CSS.
- **[ESLint](https://eslint.org/)**: A static code analysis tool used to identify problematic patterns in JavaScript code and enforce coding standards.


## 3. Project Structure
```css
src/
├── Components/
│   ├── Card/
│   ├── Layout/
│   ├── Navbar/
│   └── ProductDetail/
├── Context/
│   └── ShopContext.js
├── Pages/
│   ├── App.js
│   └── Home.js
└── styles/
    └── main.css
```

## 4. Features
- Search and Filter Products: Users can search for products by title and filter items.
- Responsive Design: Built with Tailwind CSS to be fully responsive across devices.
- Product Detail Page: Displays detailed information about each product.

## 5. Best Practices and Patterns
### JavaScript:
- React Functional Components: Employed functional components with hooks (like useState, useEffect, and useContext) to maintain state and manage side-effects.
- Component Reusability: Components like Card, Navbar, and ProductDetail are modular, reusable, and easily extendable.
- Context API: The ShopContext is used for global state management, making it easier to manage states like the search query and filtered product list across multiple components.
- Event Handlers: Utilized clear and concise functions for handling events, such as handleChange and handleSearch, following a consistent pattern for readability.
- Error Handling: Conditional rendering (?.length > 0) is used to handle the possibility of missing or empty data gracefully.
### Styling:
  - Tailwind CSS: Tailwind was chosen to quickly create a custom design without writing a lot of custom CSS. It allows for responsive designs and minimizes the need for redundant styles.
  - Utility-First Approach: Utilized Tailwind's utility classes for styling, ensuring fast prototyping and minimal CSS bloat.
  - Responsive Design: The project makes extensive use of Tailwind’s responsive utilities (like sm:, md:) to ensure the application is optimized for mobile and desktop views.

## 6. Licenses
This project is open-source and available under the MIT License. See the LICENSE file for more details.

## Developed by: [Jorge Arguelles](https://www.linkedin.com/in/jorgeariasarguelles/)
