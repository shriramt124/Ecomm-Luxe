# folder structure 
 ecomm-renderings/
├── .gitignore
├── c
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── p
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
│   ├── home/
│   │   ├── Categories.js
│   │   ├── FeaturedProducts.js
│   │   ├── Hero.js
│   │   ├── Newsletter.js
│   │   ├── SpecialOffers.js
│   │   └── Testimonials.js
├── contexts/
│   ├── AuthContext.js
│   ├── CartContext.js
│   ├── FilterContext.js
│   ├── HeaderContext.js
├── lib/
│   ├── action.js
│   ├── cloudinary.js
│   ├── dbConnect.js
│   ├── multer.js
├── model/
│   ├── cart.model.js
│   ├── product.model.js
│   ├── user.model.js
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

# Key Directories and Their Purpose:

components/: Contains reusable UI components like buttons, modals, and layout elements.
contexts/: Houses React context providers for state management (e.g., AuthContext, CartContext).
lib/: Contains utility functions and libraries (e.g., database connection, file upload).
model/: Defines Mongoose schemas for database models (e.g., cart, product, user).
pages/: Contains Next.js pages and API routes, organized by feature (e.g., cart, product, admin).
public/: Stores static assets like images and icons.
service/: Contains service layer logic for interacting with APIs or databases.
styles/: Contains global CSS styles.
utils/: Houses utility functions and constants used across the application.