import styles from "./Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginModal } from "../LoginModal/LoginModal";
import { uiStore } from "../../../store/uiStore";
import { useShallow } from "zustand/shallow";
import { RegisterModal } from "../RegisterModal/RegisterModal";
import { userStore } from "../../../store/userStore";
import { useUser } from "../../../hooks/user/useUser";
import { useState } from "react";

export const Header = () => {
    const user = userStore((state) => state.user);
    useUser();
    const logout = userStore((state) => state.logout);
    const isAdmin = user?.role === "ADMIN";

    const navigate = useNavigate();
    const location = useLocation();

    const toHome = () => {
        navigate("/")
    }

    const toMyReservations = () => {
        navigate("/my-reservations")
    }

    const toFavorites = () => {
        navigate("/favorites")
    }
    
    const toAdminPanel = () => {
        navigate("/admin-panel")
    }

    const isHome = location.pathname === "/";
    const isMyReservations = location.pathname === "/my-reservations";
    const isFavorites = location.pathname === "/favorites";

    const { isLoginModalOpen, setLoginModalOpen, isRegisterModalOpen, setRegisterModalOpen } = uiStore(useShallow((state) => ({
        isLoginModalOpen: state.isLoginModalOpen,
        setLoginModalOpen: state.setLoginModalOpen,
        isRegisterModalOpen: state.isRegisterModalOpen,
        setRegisterModalOpen: state.setRegisterModalOpen,
    })))

    const handleOpenLoginModal = () => {
        setLoginModalOpen(true);
    }

    const handleExitLoginModal = () => {
        setLoginModalOpen(false);
    }

    const handleOpenRegisterModal = () => {
        setRegisterModalOpen(true);
    }

    const handleExitRegisterModal = () => {
        setRegisterModalOpen(false);
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.principalContainer}>
            <div className={styles.secondaryContainer}>
                <h2><img className={styles.logo} src="Logo.svg" alt="Logo"/></h2>
                <div className={styles.pageButtons}>
                    <button className={`${styles.buttonStyle} ${isHome ? styles.activeButton : ""}`} onClick={toHome}>Explore</button>
                    <button className={`${styles.buttonStyle} ${isMyReservations ? styles.activeButton : ""}`} onClick={toMyReservations}>My Reservations</button>
                    <button className={`${styles.buttonStyle} ${isFavorites ? styles.activeButton : ""}`} onClick={toFavorites}>Favorites</button>
                </div>
                <div className={styles.logOutButton}>
                    {user ? (
                        <div>
                            <button className={styles.userButton} onClick={toggleDropdown} aria-label="Open account menu" aria-expanded={isOpen}>
                                {user.profilePicture ? (
                                    <img
                                        src={user.profilePicture}
                                        alt="Profile"
                                        className={styles.userAvatar}
                                    />
                                ) : (
                                    <span className="material-symbols-outlined">
                                        person
                                    </span>
                                )}
                            </button>
                            {isOpen && (
                                <ul className={styles.dropdown}>
                                    {isAdmin && (
                                        <li
                                            className={styles.item}
                                            onClick={() => {
                                                setIsOpen(false);
                                                toAdminPanel();
                                            }}
                                        >
                                            <span className="material-symbols-outlined">
                                                admin_panel_settings
                                            </span>
                                            Admin Panel
                                        </li>
                                    )}

                                    <li
                                        className={styles.item}
                                        onClick={logout}
                                    >
                                        <span className="material-symbols-outlined">
                                            exit_to_app
                                        </span>
                                        Logout
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div className={styles.authButtons}>
                            <button onClick={handleOpenLoginModal}>Login</button>
                            <button onClick={handleOpenRegisterModal}>Register</button>
                        </div>
                    )}
                </div>
            </div>
            {isLoginModalOpen &&
                <LoginModal
                    onClose={handleExitLoginModal} />
            }
            {isRegisterModalOpen &&
                <RegisterModal
                    onClose={handleExitRegisterModal} />
            }
        </div>
    )
}