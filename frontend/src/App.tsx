import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { LoanProducts } from "./pages/LoanProducts";
import { EligibilityProcess } from "./pages/EligibilityProcess";
import { ContactSupport } from "./pages/ContactSupport";
import { Gallery } from "./pages/Gallery";
import { TrackApplication } from "./pages/TrackApplication";
import { ApplyNow } from "./pages/ApplyNow";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminInvoiceGenerator } from "./pages/AdminInvoiceGenerator";
import { AdminApplications } from "./pages/AdminApplications";
import { AdminApplicationDetail } from "./pages/AdminApplicationDetail";
import { AdminDailyReports } from "./pages/AdminDailyReports";
import { AdminFinancialOverview } from "./pages/AdminFinancialOverview";
import { AdminStaffPerformance } from "./pages/AdminStaffPerformance";
import { AdminLogin } from "./pages/AdminLogin";
import { FAQPage } from "./pages/FAQPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { NotFound } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const publicRoutes = ["/", "/about", "/loan-products", "/eligibility", "/contact", "/gallery", "/track-application", "/apply-now", "/faq", "/terms", "/privacy"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    if (!isAdminPage) {
      sessionStorage.removeItem("adminToken");
      localStorage.removeItem("adminToken");
    }
  }, [isAdminPage]);

  return (
    <div className="text-slate-950 text-base not-italic normal-nums font-normal accent-auto bg-white box-border block tracking-[normal] leading-6 list-outside list-disc pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-inter">
      <div className="box-border">
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        <div className="box-border min-h-screen">
          {isPublicRoute && <Header />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/loan-products" element={<LoanProducts />} />
            <Route path="/eligibility" element={<EligibilityProcess />} />
            <Route path="/contact" element={<ContactSupport />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/track-application" element={<TrackApplication />} />
            <Route path="/apply-now" element={<ApplyNow />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/invoice-generator" element={<ProtectedRoute><AdminInvoiceGenerator /></ProtectedRoute>} />
            <Route path="/admin/applications" element={<ProtectedRoute><AdminApplications /></ProtectedRoute>} />
            <Route path="/admin/applications/:id" element={<ProtectedRoute><AdminApplicationDetail /></ProtectedRoute>} />
            <Route path="/admin/reports/daily" element={<ProtectedRoute><AdminDailyReports /></ProtectedRoute>} />
            <Route path="/admin/reports/financial" element={<ProtectedRoute><AdminFinancialOverview /></ProtectedRoute>} />
            <Route path="/admin/reports/staff-performance" element={<ProtectedRoute><AdminStaffPerformance /></ProtectedRoute>} />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {isPublicRoute && <Footer />}
        </div>
      </div>
    </div>
  );
}

export default App;
