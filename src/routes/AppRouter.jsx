import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

import RestaurantLayout from "../components/RestaurantLayout/RestaurantLayout";
import RestaurantHome from "../pages/Restaurant/RestaurantHome/RestaurantHome";
import AddListing from "../pages/Restaurant/AddListing/AddListing";
import ManageMenu from "../pages/Restaurant/ManageMenu/ManageMenu";
import Profile from "../pages/Restaurant/Profile/Profile"
import Notifications from "../pages/Restaurant/Notifications/Notifications";

import CharityLayout from "../components/CharityLayout/CharityLayout";
import CharityHome from "../pages/Charity/CharityHome/CharityHome";
import ClaimedListings from "../pages/Charity/ClaimedListings/ClaimedListings";
import CharityProfile from "../pages/Charity/CharityProfile/CharityProfile";
import CharityNotifications from "../pages/Charity/Notifications/CharityNotifications";

import DonorDashboard from "../pages/Donor/DonorDashboard/DonorDashboard";
import Donation from "../pages/Donor/Donation/Donation";
import DonorProfile from "../pages/Donor/DonorProfile/DonorProfile";

import AdminLayout from "../components/AdminLayout/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import UsersManagement from "../pages/Admin/UsersManagement/UsersManagement";
import RegistrationRequests from "../pages/Admin/RegistrationRequests/RegistrationRequests";
import DonationsMonitoring from "../pages/Admin/DonationsMonitoring/DonationsMonitoring";
import FoodWasteMonitoring from "../pages/Admin/FoodWasteMonitoring/FoodWasteMonitoring";
import SystemSettings from "../pages/Admin/SystemSettings/SystemSettings";
import Reports from "../pages/Admin/Reports/Reports";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Restaurant Routes */}
            <Route path="/restaurant" element={<RestaurantLayout><RestaurantHome /></RestaurantLayout>} />
            <Route path="/restaurant/add-listing" element={<RestaurantLayout><AddListing /></RestaurantLayout>} />
            <Route path="/restaurant/manage-menu" element={<RestaurantLayout><ManageMenu /></RestaurantLayout>} />
            <Route path="/restaurant/notifications" element={<RestaurantLayout><Notifications /></RestaurantLayout>} />
            <Route path="/restaurant/profile" element={<RestaurantLayout><Profile /></RestaurantLayout>} />

            {/* Charity Routes */}
            <Route path="/charity" element={<CharityLayout><CharityHome /></CharityLayout>} />
            <Route path="/charity/claimed" element={<CharityLayout><ClaimedListings /></CharityLayout>} />
            <Route path="/charity/profile" element={<CharityLayout><CharityProfile /></CharityLayout>} />
            <Route
                path="/charity/notifications"
                element={
                    <CharityLayout>
                        <CharityNotifications />
                    </CharityLayout>
                }
            />
            {/* Donor Routes */}

            <Route path="/donor" element={<DonorDashboard />} />
            <Route path="/donor/donation" element={<Donation />} />
            <Route path="/donor/profile" element={<DonorProfile />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/users" element={<AdminLayout><UsersManagement /></AdminLayout>} />
            <Route path="/admin/requests" element={<AdminLayout><RegistrationRequests /></AdminLayout>} />
            <Route path="/admin/donations" element={<AdminLayout><DonationsMonitoring /></AdminLayout>} />
            <Route path="/admin/food-waste" element={<AdminLayout><FoodWasteMonitoring /></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><SystemSettings /></AdminLayout>} />
            <Route path="/admin/reports" element={<AdminLayout><Reports /></AdminLayout>} />
        </Routes>
    );
}

export default AppRouter;