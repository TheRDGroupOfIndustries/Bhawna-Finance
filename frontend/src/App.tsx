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
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="text-slate-950 text-base not-italic normal-nums font-normal accent-auto bg-white box-border caret-transparent block tracking-[normal] leading-6 list-outside list-disc pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-inter">
      <div className="box-border caret-transparent">
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        <div className="box-border caret-transparent min-h-screen">
          {!isAdminPage && <Header />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/loan-products" element={<LoanProducts />} />
            <Route path="/eligibility" element={<EligibilityProcess />} />
            <Route path="/contact" element={<ContactSupport />} />
            <Route path="/track-application" element={<TrackApplication />} />
            <Route path="/apply-now" element={<ApplyNow />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/applications/:id" element={<AdminApplicationDetail />} />
          </Routes>
          {!isAdminPage && <Footer />}
        </div>
      </div>
    </div>
  );
}

export default App;
