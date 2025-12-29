import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { LoanProducts } from "./pages/LoanProducts";
import { EligibilityProcess } from "./pages/EligibilityProcess";
import { ContactSupport } from "./pages/ContactSupport";
import { TrackApplication } from "./pages/TrackApplication";
import { ApplyNow } from "./pages/ApplyNow";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminApplications } from "./pages/AdminApplications";
import { AdminApplicationDetail } from "./pages/AdminApplicationDetail";
import { AdminDailyReports } from "./pages/AdminDailyReports";
import { AdminFinancialOverview } from "./pages/AdminFinancialOverview";
import { AdminStaffPerformance } from "./pages/AdminStaffPerformance";
import { AdminLogin } from "./pages/AdminLogin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    // If we're not on an admin page, clear the admin session to force re-login upon return
    if (!isAdminPage) {
      sessionStorage.removeItem("adminToken");
      localStorage.removeItem("adminToken"); // Clean up legacy storage if any
    }
  }, [isAdminPage]);

  return (
    <div className="text-slate-950 text-base not-italic normal-nums font-normal accent-auto bg-white box-border block tracking-[normal] leading-6 list-outside list-disc pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-inter">
      <div className="box-border">
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        <div className="box-border min-h-screen">
          {!isAdminPage && <Header />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/loan-products" element={<LoanProducts />} />
            <Route path="/eligibility" element={<EligibilityProcess />} />
            <Route path="/contact" element={<ContactSupport />} />
            <Route path="/track-application" element={<TrackApplication />} />
            <Route path="/apply-now" element={<ApplyNow />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/applications" element={<ProtectedRoute><AdminApplications /></ProtectedRoute>} />
            <Route path="/admin/applications/:id" element={<ProtectedRoute><AdminApplicationDetail /></ProtectedRoute>} />

            {/* Admin Coming Soon Routes */}
            <Route path="/admin/reports/daily" element={<ProtectedRoute><AdminDailyReports /></ProtectedRoute>} />
            <Route path="/admin/reports/financial" element={<ProtectedRoute><AdminFinancialOverview /></ProtectedRoute>} />
            <Route path="/admin/reports/staff-performance" element={<ProtectedRoute><AdminStaffPerformance /></ProtectedRoute>} />
          </Routes>
          {!isAdminPage && <Footer />}
        </div>
      </div>
    </div>
  );
}

export default App;
