# E-commerce Product Listing (Next.js)

A simple modern e-commerce frontend built using **Next.js**, featuring product listing, detail pages, filtering, and sorting functionality. This project demonstrates server-side rendering (SSR), Incremental static regeneration (ISR), component-based architecture, and clean design patterns.

## Features

- Product listing with filters and sorting (price and category)
- Product detail pages with dynamic routing
- SSR and static generation where appropriate
- Client-side cart (in-memory)
- Responsive design

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/wildanazz/ecommerce-product-listing.git
cd ecommerce-product-listing
npm install
```

### Running the Project Locally

```bash
npm run dev
```

Then open your browser and go to [http://localhost:3000](http://localhost:3000)

---

## Project Structure & Design Decisions

```bash
.
├── data/                 # Static/mock data used for local development
│   └── products.json     # Example mock products
├── public/               # Static assets (images, fonts, etc.)
├── src/                  # Application source code
│   ├── components/       # Reusable UI components (Card, Dropdown, etc.)
│   ├── pages/            # Next.js routing pages
│   │   ├── index.tsx     # Product listing page with filters/sorting
│   │   └── product/
│   │       └── [id].tsx  # Dynamic product detail page
│   ├── styles/           # CSS modules and global styles
│   ├── lib/              # Helper functions and data fetching logic
│   ├── interfaces/       # TypeScript interfaces
│   └── store/            # Global state management
```

### Key Design Considerations

- **Modular Components**: Each UI element (Card, Filter, Sort dropdown) is split into its own component to promote reusability and separation of concerns.
- **Modern Next.js Features**: Uses SSR (getServerSideProps) for dynamic product listing based on query params (filters, sort), and static generation (getStaticProps, getStaticPaths) for product detail pages to optimize performance and SEO.
- **Local JSON Data**: Products are loaded from local JSON data instead of relying on an external API, ensuring better control and zero network dependencies.
- **TypeScript**: Enforces type safety and improves code maintainability.

---

## Data Fetching Strategy

### Listing Page (`pages/index.tsx`)
- **getServerSideProps** is used to ensure filters and sorting reflect the most recent server-side results.
- This is useful for SEO and SSR as filters affect the URL and content significantly.

### Product Detail Page (`pages/product/[id].tsx`)
- **getStaticProps** with `getStaticPaths` is used because product details change infrequently.
- This optimizes performance and reduces server load by generating static pages at build time.

**Justification**:  
The listing page depends on query parameters (filters/sorting), which makes SSR the better fit. The detail page can be pre-rendered statically since it's less dynamic and improves load speed.

---

## Assumptions

### Assumptions

- The product catalog is relatively small and static.
- Users are not required to log in.
- The cart is a simple counter.

---

## Future Improvements

- Integrate user **authentication** and **checkout** flow
- Implement **pagination** for large product sets
- Refactor page metadata using a reusable SEO component with next/head

