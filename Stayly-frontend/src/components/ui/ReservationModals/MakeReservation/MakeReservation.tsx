import { useState, type FC } from "react";
import styles from "./MakeReservation.module.css"
import { useAccommodation } from "../../../../hooks/accommodation/useAccommodation";
import { useCreateReservation } from "../../../../hooks/reservation/useReservationMutations";
import { useParams } from "react-router-dom";

interface MakeReservationProps {
    onClose: () => void;
}

export const MakeReservation: FC<MakeReservationProps> = ({ onClose }) => {
    const { id } = useParams<{ id: string }>()
    const accommodationId = Number(id);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { mutateAsync: createReservation, isPending, isError, error } = useCreateReservation();
    const {
        data: accommodation,
        isLoading,
        isError: isAccommodationError
    } = useAccommodation(accommodationId);

    const isFormComplete = Boolean(
        checkIn &&
        checkOut &&
        checkIn < checkOut &&
        guests &&
        Number(guests) >= 1 &&
        Number(guests) <= (accommodation?.maxGuest ?? 0) &&
        paymentMethod
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isFormComplete) {
            return;
        }

        try {
            await createReservation({
                checkIn,
                checkOut,
                guests: Number(guests),
                accommodationId,
            });
            setIsConfirmed(true);
            window.setTimeout(onClose, 1500);
        } catch (error) {
            console.error("Reservation failed", error);
        }
    };

    return (
        <div className={styles.principalContainer}>
            <div className={styles.secondaryContainer}>
                <button className={styles.buttonExitModal} onClick={onClose} type="button">X</button>
                <h1>Summary</h1>
                <form className={styles.infoSection} onSubmit={handleSubmit}>
                    <p>{accommodation?.title}</p>
                    <p>{accommodation?.address}, {accommodation?.city}</p>
                    <p>Total: {accommodation?.pricePerNight}</p>
                    
                    <div className={styles.infoResrvation}> 
                        <div className={styles.formGroup}>
                            <label htmlFor="date">Check-in</label>
                            <input
                                type="date"
                                id="check-in"
                                value={checkIn}
                                onChange={(event) => setCheckIn(event.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="date">Check-out</label>
                            <input
                                type="date"
                                id="check-out"
                                value={checkOut}
                                onChange={(event) => setCheckOut(event.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="date">Guests</label>
                            <input
                                type="number"
                                id="guests"
                                min="1"
                                max={accommodation?.maxGuest}
                                value={guests}
                                onChange={(event) => setGuests(Number(event.target.value))}
                                required
                            />
                        </div>
                    </div>
                    <h3>Payment methods</h3>
                    <div className={styles.checkBox}>
                        <div>
                            <label htmlFor="visa">Visa:</label>
                            <input
                                type="radio"
                                id="visa"
                                name="paymentMethod"
                                value="Visa"
                                checked={paymentMethod === "Visa"}
                                onChange={(event) => setPaymentMethod(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="mastercard">Mastercard:</label>
                            <input
                                type="radio"
                                id="mastercard"
                                name="paymentMethod"
                                value="Mastercard"
                                checked={paymentMethod === "Mastercard"}
                                onChange={(event) => setPaymentMethod(event.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="american-express">American Express:</label>
                            <input
                                type="radio"
                                id="american-express"
                                name="paymentMethod"
                                value="American Express"
                                checked={paymentMethod === "American Express"}
                                onChange={(event) => setPaymentMethod(event.target.value)}
                            />
                        </div>
                    </div>
                    {checkOut && checkIn >= checkOut && (
                        <p className="error-text">Check-out must be after check-in.</p>
                    )}
                    {(isAccommodationError || isError) && (
                        <p className="error-text">{isError ? error.message : "Unable to load this accommodation."}</p>
                    )}
                    <div className={styles.buttonGroup}>
                        <button className={styles.buttonModal} type="submit" disabled={isLoading || isPending || isConfirmed || !isFormComplete}>
                            {isConfirmed ? "Reservation Confirmed" : isPending ? "Processing..." : "Confirm Reservation"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}