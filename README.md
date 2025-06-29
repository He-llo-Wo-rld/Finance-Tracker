# Personal Finance Tracker 💰

A modern web application for tracking personal income and expenses, built with Next.js 14 and TypeScript.

## ✨ Features

- **🔐 Secure Authentication**: Email/password and Google OAuth
- **💳 Transaction Management**: Add, view, and delete income/expense transactions
- **📊 Data Visualization**: Interactive charts showing financial overview
- **🏷️ Categories**: Organize expenses by categories
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🎨 Modern UI**: Clean interface with Tailwind CSS
- **📈 Analytics**: Detailed financial analytics and statistics

## 🚀 Technologies

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB + Mongoose
- **Authentication**: NextAuth.js + bcryptjs + Google OAuth
- **Charts**: Recharts
- **Icons**: Lucide React

## 💾 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd myProject
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env.local` file:

```env
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📱 Usage

1. **Create Account**: Register with email/password or sign in with Google
2. **Add Transactions**: Track your income and expenses
3. **View Analytics**: See your financial data in charts and statistics
4. **Manage Categories**: Organize transactions by categories
5. **Monitor Balance**: Keep track of your current financial status

## 🎯 Demo Features

- **Dashboard**: Overview of income, expenses, and balance
- **Transaction Form**: Easy-to-use form for adding new transactions
- **Chart Visualization**: Pie charts and bar charts for data analysis
- **Responsive Design**: Optimized for all device sizes
- **Professional Design**: Clean and modern interface

## 🔒 Security

- Secure authentication with NextAuth.js
- Password hashing with bcryptjs
- Protected API routes
- Input validation and sanitization

## 🎨 Design

- Modern, clean interface
- Consistent color scheme
- Responsive grid layouts
- Smooth animations and transitions
- Professional typography

## 📊 Analytics

- Income vs expenses comparison
- Category-wise expense breakdown
- Transaction statistics
- Visual charts and graphs

---

**Built with ❤️ for portfolio demonstration**
