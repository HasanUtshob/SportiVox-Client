# 🏆 Sportivox - Sports Management System

A comprehensive sports facility management system built with React that enables users to book courts, manage memberships, process payments, and handle administrative tasks efficiently.

![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF.svg)
![Firebase](https://img.shields.io/badge/Firebase-11.10.0-orange.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-38B2AC.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 🌟 Features

### 🔐 Authentication & Authorization

- **Firebase Authentication** with email/password and Google Sign-in
- **Role-based access control** (Admin, Member, User)
- **Protected routes** with automatic redirects
- **User profile management** with avatar upload

### 🏟️ Court Management

- **Browse available courts** with detailed information
- **Real-time availability** checking
- **Multiple view modes** (Cards/Table view)
- **Pagination** for better performance
- **Court booking system** with time slot selection

### 💳 Payment System

- **Stripe integration** for secure payments
- **Coupon system** with discount calculations
- **Payment history** tracking
- **Transaction management**
- **Multiple payment methods** support

### 📊 Dashboard & Analytics

- **Admin dashboard** with comprehensive statistics
- **User dashboard** with booking history
- **Interactive charts** using Chart.js
- **Real-time data** updates
- **Responsive design** for all devices

### 🎯 Booking Management

- **Time slot selection** with conflict prevention
- **Booking approval workflow**
- **Status tracking** (Pending → Approved → Confirmed)
- **Email notifications** for booking updates
- **Booking history** and management

### 👥 User Management

- **User registration** with profile setup
- **Member management** for admins
- **Role assignment** and permissions
- **User activity** tracking

### 📢 Communication

- **Announcement system** for important updates
- **Admin-to-user** messaging
- **Notification system** with SweetAlert2

## 🛠️ Tech Stack

### Frontend

- **React 19.1.0** - Modern React with latest features
- **Vite 7.0.4** - Fast build tool and dev server
- **React Router 7.6.3** - Client-side routing
- **TailwindCSS 4.1.11** - Utility-first CSS framework
- **DaisyUI 5.0.46** - Component library for Tailwind

### State Management & Data Fetching

- **TanStack React Query 5.83.0** - Server state management
- **React Context** - Global state management
- **React Hook Form 7.60.0** - Form handling

### UI & Animation

- **Framer Motion 12.23.3** - Smooth animations
- **React Icons 5.5.0** - Icon library
- **Lottie React 2.4.1** - Lottie animations
- **SweetAlert2 11.22.2** - Beautiful alerts

### Charts & Visualization

- **Chart.js 4.5.0** - Chart library
- **React Chart.js 2 5.3.0** - React wrapper for Chart.js
- **Recharts 3.1.0** - Recharts for React

### Authentication & Payments

- **Firebase 11.10.0** - Authentication and backend services
- **Stripe React 3.7.0** - Payment processing
- **Axios 1.10.0** - HTTP client

### Development Tools

- **ESLint 9.30.1** - Code linting
- **Vite Plugin React 4.6.0** - React support for Vite

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Firebase account** for authentication
- **Stripe account** for payments

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/sportivox-client.git
cd sportivox-client
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Stripe Configuration
VITE_STRIPE_KEY=your_stripe_publishable_key

# API Configuration
VITE_API_URL=http://localhost:5000
```

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
sportivox-client/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── Images/
│   │   │   └── logo.png
│   │   ├── Login.json
│   │   ├── register.json
│   │   └── react.svg
│   ├── Component/
│   │   ├── About.jsx
│   │   ├── Banner.jsx
│   │   ├── Loading.jsx
│   │   ├── PromotionsSection.jsx
│   │   └── UserInfo.jsx
│   ├── Context/
│   │   ├── AuthContext.jsx
│   │   └── AuthProvider.jsx
│   ├── Dashboard/
│   │   ├── Header.jsx
│   │   └── Page/
│   │       ├── AllUsers.jsx
│   │       ├── Announcements.jsx
│   │       ├── ApprovedBookings.jsx
│   │       ├── ConfirmedBookings.jsx
│   │       ├── DashboardNavbar.jsx
│   │       ├── DashboardSidebar.jsx
│   │       ├── ManageAnnouncements.jsx
│   │       ├── ManageBookings.jsx
│   │       ├── ManageBookingsApproval.jsx
│   │       ├── ManageCoupons.jsx
│   │       ├── ManageCourts.jsx
│   │       ├── ManageMembers.jsx
│   │       ├── PendingBookings.jsx
│   │       └── Component/
│   │           ├── AddCourtForm.jsx
│   │           ├── CardTemp.jsx
│   │           ├── DashboardStats.jsx
│   │           ├── MyBookingStats.jsx
│   │           ├── StateCard.jsx
│   │           └── UpdateCourtForm.jsx
│   ├── Firebase/
│   │   └── firebase_init.js
│   ├── hooks/
│   │   ├── useAuth.jsx
│   │   ├── useAxios.jsx
│   │   └── useUserData.jsx
│   ├── LayOut/
│   │   ├── AuthLayOut.jsx
│   │   ├── DashboardLayout.jsx
│   │   └── MainLayout.jsx
│   ├── page/
│   │   ├── BookingModal.jsx
│   │   ├── Courts.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Forbidden.jsx
│   │   ├── Home.jsx
│   │   ├── MyProfile.jsx
│   │   ├── NotFound.jsx
│   │   ├── Register.jsx
│   │   └── SignIn.jsx
│   ├── Payment/
│   │   ├── CheckoutForm.jsx
│   │   ├── PaymentHistory.jsx
│   │   └── PaymentModal.jsx
│   ├── Router/
│   │   ├── AdminRoute.jsx
│   │   ├── MemberRoute.jsx
│   │   ├── PrivateRoutes.jsx
│   │   └── Router.jsx
│   ├── Shared/
│   │   ├── Footer.jsx
│   │   └── Navber.jsx
│   ├── index.css
│   └── main.jsx
├── .firebaserc
├── .gitignore
├── eslint.config.js
├── firebase.json
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🌐 API Integration

The application connects to a backend server deployed at:

```
http://localhost:5000
```

### Key API Endpoints:

- `GET /Users` - User management
- `GET /courts` - Court information
- `POST /bookings` - Create bookings
- `GET /coupons` - Coupon management
- `POST /create-payment-intent` - Payment processing

## 🎨 UI/UX Features

- **Responsive Design** - Works on all device sizes
- **Dark/Light Mode** - Theme switching capability
- **Smooth Animations** - Framer Motion powered transitions
- **Loading States** - Beautiful loading indicators
- **Error Handling** - User-friendly error messages
- **Accessibility** - WCAG compliant components

## 🔒 Security Features

- **Protected Routes** - Role-based access control
- **JWT Token** handling for API requests
- **Input Validation** - Form validation with React Hook Form
- **XSS Protection** - Sanitized user inputs
- **HTTPS** - Secure data transmission

## 🚀 Deployment

### Firebase Hosting

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 Code Style

- Follow **ESLint** configuration
- Use **Prettier** for code formatting
- Follow **React best practices**
- Use **semantic commit messages**

## 🐛 Known Issues

- None currently reported

## 📈 Performance Optimizations

- **Code Splitting** with React.lazy()
- **Image Optimization** with proper formats
- **Bundle Analysis** with Vite
- **Caching Strategies** for API calls
- **Lazy Loading** for components

## 🔮 Future Enhancements

- [ ] Mobile app development
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Calendar integration
- [ ] SMS notifications

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@shutshob](https://github.com/hasanutshob)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Firebase for authentication services
- Stripe for payment processing
- TailwindCSS for the utility-first CSS framework
- All contributors who helped improve this project

---

⭐ **Star this repository if you found it helpful!**

For support, email your.email@example.com or create an issue on GitHub.
