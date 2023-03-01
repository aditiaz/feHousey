import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { Routes, Route, useNavigate } from "react-router-dom";
// import { RoomsContextProvider } from "./context/roomsContext";
import { Home } from "./pages/Home";
import { DetailProperty } from "./pages/DetailProperty";
import { MyBooking } from "./pages/MyTicket";
import { RoomsContextProvider } from "./context/roomsContext";
import { Profile } from "./pages/Profile";
import { History } from "./pages/History";
import MyBookingPending from "./pages/MyBookingPending";
import IndexOwner from "./pages/IndexOwner";
import { AddProperty } from "./pages/AddProperty";
import PrivateRoutesAdmin from "./components/PrivateRoutesAdmin";
import PrivateRoutesTenant from "./components/PrivateRoutesTenant";

import { setAuthToken } from "./lib/_api";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <>
      <RoomsContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/detail/:room" element={<DetailProperty />} />

          <Route path="/" element={<PrivateRoutesAdmin />}>
            <Route path="/indexOwner/" element={<IndexOwner />} />
            <Route path="/addProperty/" element={<AddProperty />} />
          </Route>

          <Route path="/" element={<PrivateRoutesTenant />}>
            <Route path="/booking/:room" element={<MyBooking />} />
            <Route path="/bookinghistory/" element={<MyBookingPending />} />
            <Route path="/histories/" element={<History />} />
          </Route>
        </Routes>
      </RoomsContextProvider>
    </>
  );
}

export default App;
