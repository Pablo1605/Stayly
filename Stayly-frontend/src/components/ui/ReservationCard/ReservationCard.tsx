import { useState, type FC } from "react";
import type { Reservation, ReservationSummary } from "../../../types/Reservation";
import styles from "./ReservationCard.module.css";
import { CancelReservation } from "../ReservationModals/CancelReservation/CancelReservation";

interface ReservationCardProps {
    reservation: Reservation | ReservationSummary;
    isReserved: boolean;
    activeButton: number;
}

export const ReservationCard: FC<ReservationCardProps> = ({ reservation, activeButton }) => {
    const isSummary = "title" in reservation;
    const title = isSummary ? reservation.title : reservation.accommodation.title;
    const image = isSummary ? reservation.image : reservation.accommodation.image;
    const guests = "guests" in reservation ? reservation.guests : undefined;

    const [isCancelReservationModalOpen, setCancelReservationModalOpen] = useState(false);
    const handleOpenCancelReservationModal = () => {
        setCancelReservationModalOpen(true);
    }

    const handleExitCancelReservationModal = () => {
        setCancelReservationModalOpen(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageInfo}>
                {image && <img className={styles.image} src={image} alt={title} />}
                <div className={styles.content}>
                    <h2>{title}</h2>
                    <p>{reservation.checkIn} to {reservation.checkOut}</p>
                    {guests !== undefined && <p>{guests} {guests === 1 ? "guest" : "guests"}</p>}
                </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.statusActions}>
                <p><strong>{reservation.status}</strong></p>
                <p>Total: ${reservation.totalPrice}</p>
                {activeButton === 1 && <button onClick={handleOpenCancelReservationModal}>Cancel reservation</button>}
            </div>
            {isCancelReservationModalOpen &&
                <CancelReservation
                    reservationId={reservation.id}
                    onClose={handleExitCancelReservationModal}
                />}
        </div>
    );
}