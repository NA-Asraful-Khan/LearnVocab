# 日本 Learn - Frontend

A web-based platform to help users learn Japanese vocabulary interactively. This is the frontend of **日本 Learn**, featuring a structured learning process with role-based access control, interactive vocabulary learning, and a fully responsive UI.

## 🚀 Features

- 🔑 **Role-based Access Control**: Admins can manage users, lessons, and vocabulary.
- 📖 **Interactive Learning**: Users can view, hear pronunciations, and navigate lessons.
- 🎥 **Tutorial Section**: Embedded YouTube videos for supplementary learning.
- 🔐 **Secure Authentication**: Custom JWT-based login and registration system.
- 📱 **Fully Responsive UI**: Optimized for mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **React.js** - Frontend framework
- **Redux** - State management
- **Ant Design** - UI components
- **Tailwind CSS** - Styling
- **Axios** - API communication
- **React Router** - Navigation

## ⚡ Getting Started

### Prerequisites

Ensure you have **Node.js** and **npm** installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/japanese-learn-frontend.git
   cd japanese-learn-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file in the project root and add the following environment variables:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### 📜 Folder Structure

```
/src
  ├── components/       # Reusable UI components
  ├── pages/            # Application pages
  ├── redux/            # Redux store and slices
  ├── services/         # API calls using Axios
  ├── utils/            # Utility functions
  ├── App.js            # Main component
  ├── index.js          # Entry point
```

## 🚀 Deployment

To build the project for production:

```bash
npm run build
```

The build files will be available in the `build/` directory.

## 👨‍💻 Contributors

- [Nur A Asraful Khan](https://github.com/NA-Asraful-Khan)

## 📜 License

This project is licensed under the MIT License.
