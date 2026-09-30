import type { FC } from "react";
import styles from "./DeleteAccommodation.module.css"
import { useDeleteAccommodation } from "../../../../hooks/accommodation/useAccommodationMutations";

interface DeleteAccommdoationProps {
    accommodationId: number
    onClose: () => void;
}

export const DeleteAcoommodation: FC<DeleteAccommdoationProps> = ({accommodationId, onClose}) => {
    const { mutateAsync: deleteAccommodation, isPending, isError } = useDeleteAccommodation();

    const handleConfirm = async () => {
        try {
            await deleteAccommodation(accommodationId);
            onClose();
        } catch (error) {
            console.error("Accommodation deletion failed", error);
        }
    };
    return (
        <div className={styles.principalContainer}>
            <div className={styles.secondaryContainer}>
                <h1>Are you sure you want to delete this accommodation?</h1>
                {isError && <p className="error-text">Unable to cancel this reservation.</p>}
                <div className={styles.cancelButton}>
                    <button onClick={handleConfirm} disabled={isPending}>
                        {isPending ? "Deleting..." : "Yes"}
                    </button>
                    <button onClick={onClose} disabled={isPending}>No</button>
                </div>
            </div>
        </div>
    )
}