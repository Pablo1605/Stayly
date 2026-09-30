import type { FC } from "react";
import styles from "./CancelReservation.module.css"
import { useDeleteReservation } from "../../../../hooks/reservation/useReservationMutations";

interface CancelReservationModal {
    reservationId: number;
    onClose: () => void;
}

export const CancelReservation: FC<CancelReservationModal> = ({ reservationId, onClose }) => {
    const { mutateAsync: cancelReservation, isPending, isError } = useDeleteReservation();

    const handleConfirm = async () => {
        try {
            await cancelReservation(reservationId);
            onClose();
        } catch {
        }
    };

    return (
        <div className={styles.principalContainer}>
            <div className={styles.secondaryConatiner}>
                <h2>Are you sure you want to cancel the reservation?</h2>
                {isError && <p className="error-text">Unable to cancel this reservation.</p>}
                <div className={styles.cancelButton}>
                    <button onClick={handleConfirm} disabled={isPending}>
                        {isPending ? "Cancelling..." : "Yes"}
                    </button>
                    <button onClick={onClose} disabled={isPending}>No</button>
                </div>
            </div>
        </div>
    )
}