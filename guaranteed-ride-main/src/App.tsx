import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GRPProvider, useGRP } from "@/contexts/GRPContext";
import { MobileShell } from '@/components/ui/MobileShell';
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import AuthScreen from "./pages/AuthScreen";
import RiderHomeScreen from "./pages/RiderHomeScreen";
import GRPConfirmScreen from "./pages/GRPConfirmScreen";
import FindingDriverScreen from "./pages/FindingDriverScreen";
import RideConfirmedScreen from "./pages/RideConfirmedScreen";
import DriverHomeScreen from "./pages/DriverHomeScreen";
import NotFound from "./pages/NotFound";
import RideHistoryScreen from "./pages/RideHistoryScreen";
import ProfileScreen from "./pages/ProfileScreen";
import WalletScreen from "./pages/WalletScreen";
import PromoCodesScreen from "./pages/PromoCodesScreen";
import ReferralScreen from "./pages/ReferralScreen";
import RideTrackingScreen from "./pages/RideTrackingScreen";
import RatingsReviewsScreen from "./pages/RatingsReviewsScreen";
import DriverEarningsScreen from "./pages/DriverEarningsScreen";
import PricingAnalyticsScreen from "./pages/PricingAnalyticsScreen";
import SmartMatchingScreen from "./pages/SmartMatchingScreen";
import AIChatsupportScreen from "./pages/AIChatsupportScreen";
import DemandForecastingScreen from "./pages/DemandForecastingScreen";
import FraudDetectionScreen from "./pages/FraudDetectionScreen";
import DriverBehaviorAnalyticsScreen from "./pages/DriverBehaviorAnalyticsScreen";
import RevenueOptimizationScreen from "./pages/RevenueOptimizationScreen";

const queryClient = new QueryClient();

// Protected route component
function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode, allowedRole?: 'rider' | 'driver' }) {
  const { user, profile, isLoading } = useGRP();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-grp border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (allowedRole && profile?.role !== allowedRole) {
    return <Navigate to={profile?.role === 'driver' ? '/driver' : '/home'} replace />;
  }
  
  return <>{children}</>;
}

// Public route - redirects if already logged in
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, isLoading } = useGRP();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-grp border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (user) {
    return <Navigate to={profile?.role === 'driver' ? '/driver' : '/home'} replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Index />} />
      <Route path="/auth" element={
        <PublicRoute>
          <AuthScreen />
        </PublicRoute>
      } />
      
      {/* Rider Routes */}
      <Route path="/home" element={
        <ProtectedRoute allowedRole="rider">
          <RiderHomeScreen />
        </ProtectedRoute>
      } />
      <Route path="/grp-confirm" element={
        <ProtectedRoute allowedRole="rider">
          <GRPConfirmScreen />
        </ProtectedRoute>
      } />
      <Route path="/finding-driver" element={
        <ProtectedRoute allowedRole="rider">
          <FindingDriverScreen />
        </ProtectedRoute>
      } />
      <Route path="/ride-confirmed" element={
        <ProtectedRoute allowedRole="rider">
          <RideConfirmedScreen />
        </ProtectedRoute>
      } />
      <Route path="/ride-history" element={
        <ProtectedRoute allowedRole="rider">
          <RideHistoryScreen />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute allowedRole="rider">
          <ProfileScreen />
        </ProtectedRoute>
      } />
      <Route path="/wallet" element={
        <ProtectedRoute allowedRole="rider">
          <WalletScreen />
        </ProtectedRoute>
      } />
      <Route path="/promos" element={
        <ProtectedRoute allowedRole="rider">
          <PromoCodesScreen />
        </ProtectedRoute>
      } />
      <Route path="/referral" element={
        <ProtectedRoute allowedRole="rider">
          <ReferralScreen />
        </ProtectedRoute>
      } />
      <Route path="/ride-tracking" element={
        <ProtectedRoute allowedRole="rider">
          <RideTrackingScreen />
        </ProtectedRoute>
      } />
      <Route path="/ratings" element={
        <ProtectedRoute allowedRole="rider">
          <RatingsReviewsScreen />
        </ProtectedRoute>
      } />
      <Route path="/pricing-analytics" element={
        <ProtectedRoute allowedRole="rider">
          <PricingAnalyticsScreen />
        </ProtectedRoute>
      } />
      <Route path="/smart-matching" element={
        <ProtectedRoute allowedRole="rider">
          <SmartMatchingScreen />
        </ProtectedRoute>
      } />
      <Route path="/ai-support" element={
        <ProtectedRoute allowedRole="rider">
          <AIChatsupportScreen />
        </ProtectedRoute>
      } />
      <Route path="/demand-forecasting" element={
        <ProtectedRoute allowedRole="rider">
          <DemandForecastingScreen />
        </ProtectedRoute>
      } />
      <Route path="/fraud-detection" element={
        <ProtectedRoute allowedRole="rider">
          <FraudDetectionScreen />
        </ProtectedRoute>
      } />
      
      {/* Driver Routes */}
      <Route path="/driver" element={
        <ProtectedRoute allowedRole="driver">
          <DriverHomeScreen />
        </ProtectedRoute>
      } />
      <Route path="/driver-earnings" element={
        <ProtectedRoute allowedRole="driver">
          <DriverEarningsScreen />
        </ProtectedRoute>
      } />
      <Route path="/driver-safety-analytics" element={
        <ProtectedRoute allowedRole="driver">
          <DriverBehaviorAnalyticsScreen />
        </ProtectedRoute>
      } />
      <Route path="/revenue-optimization" element={
        <ProtectedRoute allowedRole="driver">
          <RevenueOptimizationScreen />
        </ProtectedRoute>
      } />
      
      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GRPProvider>
          <MobileShell>
            <AppRoutes />
          </MobileShell>
        </GRPProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

