import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "react-hot-toast";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {DarkModeProvider} from "./context/DarkModeContext";

import GlobalStyles from "./styles/GlobalStyles";

import Account from "./pages/Account";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Checkin from "./pages/Checkin";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import ProtectedRoutes from "./ui/ProtectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{margin: "8px"}}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
              borderRadius: "7px",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
