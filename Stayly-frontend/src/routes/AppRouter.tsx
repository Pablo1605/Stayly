import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "../components/layout/Layout"
import { MyReservations } from "../pages/MyReservations/MyReservations";
import { Favorites } from "../pages/Favorites/Favorites";
import { AdminPanel } from "../pages/AdminPanel/AdminPanel";
import { AccommodationPage } from "../pages/AccommodationPage/AccommodationPage";
import { Home } from "../pages/Home/Home";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/my-reservations" element={<MyReservations />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/accommodation-page/:id" element={<AccommodationPage />} />
                
                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                    <Route path="/admin-panel" element={<AdminPanel />} />
                </Route>

            </Route>

            <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
    )
}