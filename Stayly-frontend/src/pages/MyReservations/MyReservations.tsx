import { useState } from "react";
import { userStore } from "../../store/userStore";
import styles from "./MyReservations.module.css"
import { useUserReservations } from "../../hooks/reservation/useReservations";
import { ReservationCard } from "../../components/ui/ReservationCard/ReservationCard";

export const MyReservations = () => {
    const user = userStore((state) => state.user);
    const [activeButton, setActiveButton] = useState(1);

    const handleClick = (id: number) => {
        setActiveButton(id);
    };

    const {
        data: reservations = [],
        isLoading,
        isError
    } = useUserReservations();

    const filteredReservations = reservations.filter((reservation) => {
        if (activeButton === 3) {
            return reservation.status === "CANCELED";
        }

        return activeButton === 2
            ? reservation.status === "COMPLETED"
            : reservation.status === "PENDING";
    });

    if (isLoading) {
        return <h1>Loading reservations...</h1>;
    }

    if (isError) {
        return <h1>Error loading reservations.</h1>;
    }

    return (
        <div className={styles.principalContainer}>
            {user ? (
                <div className={styles.reservationsSection}>
                    <h1>My Reservations</h1>
                    <p>Welcome, {user.username}! Here are your reservations.</p>
                    <div>
                        <button className={`${styles.filterButton} ${activeButton === 1 ? styles.activeFilter : ""}`} onClick={() => handleClick(1)} >Upcoming</button>
                        <button className={`${styles.filterButton} ${activeButton === 2 ? styles.activeFilter : ""}`} onClick={() => handleClick(2)}>Completed</button>
                        <button className={`${styles.filterButton} ${activeButton === 3 ? styles.activeFilter : ""}`} onClick={() => handleClick(3)}>Cancelled</button>
                    </div>

                    <div className={styles.reservationsSection}>
                        {filteredReservations.length === 0 ? (
                            <p>
                                You have no {activeButton === 1 ? "upcoming" : activeButton === 2 ? "completed" : "cancelled"} reservations.
                            </p>
                        ) : (
                            <div className={styles.reservationsContainer}>
                                {filteredReservations.map((reservation) => (
                                    <div key={reservation.id} className={styles.card}>
                                        <ReservationCard
                                            reservation={reservation}
                                            isReserved={true}
                                            activeButton={activeButton}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            ) : (
                <p>Please log in to view your reservations.</p>
            )}
        </div>
    )
}