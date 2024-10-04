// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import EventProgramPage from "./pages/Events/Event";
import CreateEvents from "./pages/Events/CreateEvents";
import ShowEvent from "./pages/Events/ShowEvent";
import EditEvent from "./pages/Events/EditEvent";
import DeleteEvent from "./pages/Events/DeleteEvent";

import EventView from "./pages/Events/EventView";
import AddEventParticipents from "./pages/Events/AddEventParticipents";
import EventBookingList from "./pages/Events/EventBookingList";
import EditEventBooking from "./pages/Events/EditEventBooking";
import DeleteEventBooking from "./pages/Events/DeleteEventBooking";

import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

import ShowFAQ from "./pages/Help Desk and FAQ/ShowFAQ";
import CreateTickets from "./pages/Help Desk and FAQ/createTicket";
import ViewTickets from "./pages/Help Desk and FAQ/viewTickets";
import FaqDashboard from "./pages/Help Desk and FAQ/faqDashboard";

import CreateMembershipPack from "./pages/Memberships/CreateMembershipPack";
import ViewMembershipPacks from "./pages/Memberships/ViewMembershipPacks";
import DeleteMembershipPack from "./pages/Memberships/DeleteMembershipPack";
import ShowMembershipPack from "./pages/Memberships/ShowMembershipPack";
import UpdateMembershipPack from "./pages/Memberships/UpdateMembershipPack";
import SubscribePage from "./pages/Memberships/SubscribingPage";
import ViewAvailablePacks from "./pages/Memberships/ViewAvailablePacks";
import ViewSubscription from "./pages/Memberships/ViewSubscription";
import ViewSubscriptions from "./pages/Memberships/ViewAllSubscriptions";

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            <Routes>
                <Route
                    path="/events"
                    element={
                        <ProtectedRoute>
                            <EventProgramPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/create"
                    element={
                        <ProtectedRoute>
                            <CreateEvents />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/details/:id"
                    element={
                        <ProtectedRoute>
                            <ShowEvent />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditEvent />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/delete/:id"
                    element={
                        <ProtectedRoute>
                            <DeleteEvent />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            <Routes>
                <Route path="/eventViews" element={<EventView />} />
                <Route
                    path="/eventViews/eventParticipants"
                    element={<AddEventParticipents />}
                />
                <Route
                    path="/eventBookingList"
                    element={
                        <ProtectedRoute>
                            <EventBookingList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sendEmail"
                    element={
                        <ProtectedRoute>
                            <EventBookingList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/eventBookingList/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditEventBooking />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/eventBookingList/delete/:id"
                    element={
                        <ProtectedRoute>
                            <DeleteEventBooking />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>

            <Routes>
                <Route path="/createtickets" element={<CreateTickets />} />
                <Route
                    path="/tickets"
                    element={
                        <ProtectedRoute>
                            <ViewTickets />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Routes>
                <Route path="/faq" element={<ShowFAQ />} />
                <Route
                    path="/faqdashboard"
                    element={
                        <ProtectedRoute>
                            <FaqDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Routes>
                <Route
                    path="/membership/packagecreate"
                    element={
                        <ProtectedRoute>
                            <CreateMembershipPack />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/membership/packageupdate/:id"
                    element={
                        <ProtectedRoute>
                            <UpdateMembershipPack />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/membership/packagedelete/:id"
                    element={
                        <ProtectedRoute>
                            <DeleteMembershipPack />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/membership/view"
                    element={
                        <ProtectedRoute>
                            <ViewMembershipPacks />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/subscriptions/subscriptions"
                    element={
                        <ProtectedRoute>
                            <ViewSubscriptions />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/membership/details/:id"
                    element={
                        <ProtectedRoute>
                            <ShowMembershipPack />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ViewAvailablePacks/viewpacks"
                    element={<ViewAvailablePacks />}
                />
                <Route path="/subscribe/:id" element={<SubscribePage />} />
                <Route
                    path="/subscriptions/:id"
                    element={<ViewSubscription />}
                />
            </Routes>
        </>
    );
};

export default App;
