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
        </Routes>
    );
}

export default AppRouter;