 

## Project Folder Structure

Below is the folder structure of the **ecomm-renderings** project:

```plaintext
ecomm-renderings/
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.mjs
├── components/
│   ├── AddToCartButton.js
│   ├── CartIcon.js
│   ├── Layout.js
│   ├── Modal.js
│   ├── ProductModal.js
│   └── home/
│       ├── Categories.js
│       ├── FeaturedProducts.js
│       ├── Hero.js
│       ├── Newsletter.js
│       ├── SpecialOffers.js
│       └── Testimonials.js
├── contexts/
│   ├── AuthContext.js
│   ├── CartContext.js
│   ├── FilterContext.js
│   └── HeaderContext.js
├── lib/
│   ├── action.js
│   ├── cloudinary.js
│   ├── dbConnect.js
│   └── multer.js
├── model/
│   ├── cart.model.js
│   ├── product.model.js
│   └── user.model.js
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── cart.js
│   ├── index.js
│   ├── login.js
│   ├── register.js
│   ├── admin/
│   │   └── dashboard.js
│   ├── api/
│   │   ├── admin/
│   │   │   └── users.js
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   ├── logout.js
│   │   │   ├── register.js
│   │   │   └── session.js
│   │   ├── cart/
│   │   │   ├── add.js
│   │   │   ├── clear.js
│   │   │   ├── get.js
│   │   │   ├── remove.js
│   │   │   └── update.js
│   │   ├── product/
│   │   │   ├── [id].js
│   │   │   └── index.js
│   ├── components/
│   │   ├── Filter.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   └── Pagination.js
│   ├── product/
│   │   ├── [id].js
│   │   ├── create.js
│   │   └── index.js
│   ├── UI/
│   │   ├── Loader.js
│   │   ├── MobileFilter.js
│   │   ├── PaginationButton.js
│   │   ├── ProductCard.js
│   │   └── SearchBar.js
├── public/
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── service/
│   └── productService.js
├── styles/
│   └── globals.css
└── utils/
    └── constants.js
```

---

### Key Directories and Their Purpose

#### **`components/`**
Contains reusable UI components:
- `AddToCartButton.js`: Button for adding products to the cart.
- `Modal.js`: Generic modal component.
- `home/`: Specific components for the homepage (e.g., `Hero.js`, `Categories.js`).

#### **`contexts/`**
Houses React context providers for managing global state:
- `AuthContext.js`: Authentication context.
- `CartContext.js`: Shopping cart context.
- `FilterContext.js`: Product filter state.
- `HeaderContext.js`: Header-related state.

#### **`lib/`**
Utility functions and libraries:
- `dbConnect.js`: Database connection logic.
- `cloudinary.js`: Cloudinary integration for image handling.
- `multer.js`: File upload middleware.

#### **`model/`**
Defines Mongoose schemas for database models:
- `cart.model.js`: Schema for cart data.
- `product.model.js`: Schema for product data.
- `user.model.js`: Schema for user data.

#### **`pages/`**
Next.js pages and API routes, organized by feature:
- `cart.js`, `index.js`: Main pages for the application.
- `admin/dashboard.js`: Admin dashboard page.
- `api/`: API routes for user authentication, product management, and cart operations.

#### **`public/`**
Static assets like images and icons.

#### **`service/`**
Service layer logic:
- `productService.js`: Logic for interacting with product APIs.

#### **`styles/`**
Global CSS styles:
- `globals.css`: Global styles for the application.

#### **`utils/`**
Utility functions and constants:
- `constants.js`: Centralized constants for the application.

---

This structured explanation provides clarity on the purpose of each folder and file in the project. You can paste this directly into your `README.md`.
