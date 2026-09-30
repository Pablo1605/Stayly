import { useParams } from "react-router-dom"
import styles from "./AccommodationPage.module.css"
import { useAccommodation } from "../../hooks/accommodation/useAccommodation";
import { uiStore } from "../../store/uiStore";
import { useShallow } from "zustand/shallow";
import { MakeReservation } from "../../components/ui/ReservationModals/MakeReservation/MakeReservation";
import { userStore } from "../../store/userStore";

interface ImageCountClasses {
  [key: number]: string;
}

const imageCountClasses: ImageCountClasses = {
  1: styles.oneImage,
  2: styles.twoImages,
  3: styles.threeImages
};

export const AccommodationPage = () => {
    const { user } = userStore();

    const {isMakeReservationModalOpen, setMakeReservationModalOpen} = uiStore(useShallow((state) => ({
        isMakeReservationModalOpen: state.isMakeReservationModalOpen,
        setMakeReservationModalOpen: state.setMakeReservationModalOpen,
    })));

    const handleOpenReservationModal = () => {
        if (!user || accommodation?.status === "UNAVAILABLE") {
            return;
        }
        setMakeReservationModalOpen(true);
    }

    const handleExitReservationModal = () => {
        setMakeReservationModalOpen(false);
    }
    const { id } = useParams<{ id: string }>()
    const accommodationId = Number(id);
    const {
        data: accommodation,
        isLoading,
        isError
    } = useAccommodation(accommodationId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !accommodation) {
        return <div>Accommodation not found</div>;
    }

    const images = accommodation.images
        ?.slice()
        .sort((a, b) => a.displayOrder - b.displayOrder) ?? [];

    const currentImageClass = imageCountClasses[images.length] || styles.defaultImage;
    const isUnavailable = accommodation.status === "UNAVAILABLE";
    return (
        <div className={styles.container}>
            <div className={styles.infoSection}>
                <h1>{accommodation?.title}</h1>
                <div className={styles.images}>
                    {images.map((image) => (
                        <img 
                            key={image.id}
                            src={image.imageUrl}
                            alt={`${accommodation.title} - ${image.displayOrder}`}
                            className={currentImageClass}
                        />
                    ))}
                </div>
                <div className={styles.infoAndRating}>
                    <div>
                        <h2>{accommodation?.address}, {accommodation?.city}</h2>
                        <p>Total: {accommodation.pricePerNight}</p>
                        <p>Max guests: {accommodation?.maxGuest} - Bedrooms: {accommodation?.maxBedrooms}</p>
                        <p>{accommodation?.description}</p>
                    </div>
                    <div>
                        <h3>{accommodation.rating}</h3>
                    </div>
                </div>
            </div>
            <div className={styles.reserveSection}>
                <div className={styles.reserveContainer}>
                    <button className={user && !isUnavailable ? styles.reserveButton : styles.disabled} onClick={handleOpenReservationModal} disabled={!user || isUnavailable}>
                        <strong>Reserve</strong>
                    </button>
                    {!user && <p className={styles.loginMessage}>Please log in to make a reservation.</p>}
                    {user && isUnavailable && <p className={styles.loginMessage}>This accommodation has already been reserved.</p>}
                </div>
            </div>
            {
                isMakeReservationModalOpen && 
                <MakeReservation
                    onClose={handleExitReservationModal}
                />
            }
        </div>
    )
}