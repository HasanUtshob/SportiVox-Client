import { createBrowserRouter } from "react-router";
import MainLayout from "../LayOut/MainLayout";
import Home from "../page/Home";
import Courts from "../page/Courts";
import Coaches from "../page/Coaches";
import Demo from "../page/Demo";
import AuthLayOut from "../LayOut/AuthLayOut";
import SignIn from "../page/SignIn";
import Register from "../page/Register";
// import MyProfile from "../page/MyProfile";
import About from "../Component/About";
import ContactUs from "../page/ContactUs";
import PrivacyPolicy from "../page/PrivacyPolicy";
import TermsOfService from "../page/TermsOfService";
import Support from "../page/Support";
import CommunityForum from "../page/CommunityForum";
import UserGuide from "../page/UserGuide";
import Reviews from "../page/Reviews";
import DashboardLayout from "../LayOut/DashboardLayout";
import Dashboard from "../page/Dashboard";
import ManageCourts from "../Dashboard/Page/ManageCourts";
import ManageCoaches from "../Dashboard/Page/ManageCoaches";
import PendingBookings from "../Dashboard/Page/PendingBookings";
import ManageBookingsApproval from "../Dashboard/Page/ManageBookingsApproval ";
import ApprovedBookings from "../Dashboard/Page/ApprovedBookings";
import ConfirmedBookings from "../Dashboard/Page/ConfirmedBookings";
import PaymentHistory from "../Payment/PaymentHistory";
import ManageMembers from "../Dashboard/Page/ManageMembers";
import AllUsers from "../Dashboard/Page/AllUsers ";
import ManageBookings from "../Dashboard/Page/ManageBookings ";
import ManageCoupons from "../Dashboard/Page/ManageCoupons";
import ManageAnnouncements from "../Dashboard/Page/ManageAnnouncements";
import Announcements from "../Dashboard/Page/Announcements";
import AdminRoute from "./AdminRoute";
import Forbidden from "../page/Forbidden";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "../page/NotFound";
import MemberRoute from "./MemberRoute";
import MyProfile from "../page/MyProfile";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/Courts",
        Component: Courts,
      },
      {
        path: "/Coaches",
        Component: Coaches,
      },
      {
        path: "/demo",
        Component: Demo,
      },
      {
        path: "/About",
        Component: About,
      },
      {
        path: "/Contact",
        Component: ContactUs,
      },
      {
        path: "/Privacy",
        Component: PrivacyPolicy,
      },
      {
        path: "/Terms",
        Component: TermsOfService,
      },
      {
        path: "/Support",
        Component: Support,
      },
      {
        path: "/Forum",
        Component: CommunityForum,
      },
      {
        path: "/Guide",
        Component: UserGuide,
      },
      {
        path: "/Reviews",
        Component: Reviews,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayOut,
    children: [
      {
        path: "/SignIn",
        Component: SignIn,
      },
      {
        path: "/Register",
        Component: Register,
      },
    ],
  },

  // Dashboard
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/Dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
      },
      {
        path: "/My_Profile",
        element: (
          <PrivateRoutes>
            <MyProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/Manage_Courts",
        element: (
          <AdminRoute>
            <ManageCourts />
          </AdminRoute>
        ),
      },
      {
        path: "/Manage_Coaches",
        element: (
          <AdminRoute>
            <ManageCoaches />
          </AdminRoute>
        ),
      },
      {
        path: "/Pending_Bookings",
        Component: PendingBookings,
      },
      {
        path: "/Manage_bookings_approval",
        element: (
          <AdminRoute>
            <ManageBookingsApproval />
          </AdminRoute>
        ),
      },
      {
        path: "/Approved_Bookings",
        element: (
          <MemberRoute>
            <ApprovedBookings />
          </MemberRoute>
        ),
      },
      {
        path: "/Confirmed_Bookings",
        element: (
          <MemberRoute>
            <ConfirmedBookings />
          </MemberRoute>
        ),
      },
      {
        path: "/Payment_History",
        element: (
          <MemberRoute>
            <PaymentHistory />
          </MemberRoute>
        ),
      },
      {
        path: "/Manage_Members",
        element: (
          <AdminRoute>
            <ManageMembers />
          </AdminRoute>
        ),
      },
      {
        path: "/All_Users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/Manage_Bookings",
        element: (
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        ),
      },
      {
        path: "/Manage_Coupons",
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        ),
      },
      {
        path: "/Make_Announcement",
        element: (
          <AdminRoute>
            <ManageAnnouncements />
          </AdminRoute>
        ),
      },
      {
        path: "/Announcements",
        Component: Announcements,
      },
      {
        path: "/forbidden", // 🔒 make sure this stays relative too
        Component: Forbidden,
      },
    ],
  },
]);
