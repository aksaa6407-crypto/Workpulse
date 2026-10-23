# React Employee Dashboard & Management System

A modern, responsive Employee Dashboard and Registration Web Application built with **React**, **React Router**, and **Bootstrap 5**.

---

## 📋 Requirements & Features Checklist

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **React Library** | Built using React 19 + Vite for optimal performance and hot reloading | ✅ Completed |
| **Navbar with Links** | Navigation bar featuring **Home** and **Employee Form** links with active state indicators and mobile responsiveness | ✅ Completed |
| **Home / Employee Dashboard (Same)** | Home (`/`) and Dashboard (`/dashboard`) route to the same unified view | ✅ Completed |
| **External API Integration** | Fetches user records directly from [`https://jsonplaceholder.typicode.com/users`](https://jsonplaceholder.typicode.com/users) | ✅ Completed |
| **Display Fields (`id`, `name`, `email`)** | Prominently displays `id`, `name`, and `email` across all view presentations | ✅ Completed |
| **Tabular, Card, or List View** | Interactive view switcher supporting **Tabular View**, **Card View**, and **List View** modes | ✅ Completed |
| **Employee Form** | Complete registration form containing **Name**, **Designation**, **Location**, and **Salary** with client validation and live preview | ✅ Completed |
| **Navigation & Routing** | Seamless routing between `/` (Home/Dashboard), `/dashboard`, `/employee-form`, and 404 fallback | ✅ Completed |
| **CSS Library** | Styled using **Bootstrap 5**, Google Fonts (**Inter** & **Outfit**), and **Lucide React** icons | ✅ Completed |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or download this repository.
2. Navigate to the project root directory:
   ```bash
   cd employee-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit:
   ```text
   http://localhost:5173/
   ```

### Production Build
To create a production-optimized build:
```bash
npm run build
```

---

## 📁 Project Structure

```text
employee-dashboard/
├── public/                 # Static assets & favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Top navigation with 'Home' and 'Employee Form' links
│   │   └── Footer.jsx      # Footer information & API attribution
│   ├── context/
│   │   └── EmployeeContext.jsx # Central state, API fetching & local storage caching
│   ├── pages/
│   │   ├── Dashboard.jsx   # Home / Dashboard (Card, Table, and List views)
│   │   ├── EmployeeForm.jsx# Form with Name, Designation, Location, Salary
│   │   └── NotFound.jsx    # 404 page handler
│   ├── App.jsx             # React Router routing configuration
│   ├── App.css
│   ├── index.css           # Bootstrap 5 imports & custom design system tokens
│   └── main.jsx            # Application entry point with BrowserRouter & Provider
├── index.html              # HTML shell with Google Fonts & SEO tags
├── package.json            # Project dependencies & build scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## 🛠️ Technology Stack
- **Library / Framework:** React 19, Vite
- **Routing:** React Router DOM (v7)
- **Styling:** Bootstrap 5, Custom CSS variables, Glassmorphism
- **Icons:** Lucide React
- **Typography:** Inter, Outfit (Google Fonts)
- **API:** JSONPlaceholder Users API (`https://jsonplaceholder.typicode.com/users`)
