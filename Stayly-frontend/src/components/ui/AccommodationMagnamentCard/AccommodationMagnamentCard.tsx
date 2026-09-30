import type { FC } from "react";
import type { Accommodation } from "../../../types/Accommodation";
import styles from "./AccommodationMagnamentCard.module.css"
import { ViewAccommodation } from "../AccommodationModals/ViewAccommodation/ViewAccommdodation";
import { DeleteAcoommodation } from "../AccommodationModals/DeleteAccommodation/DeleteAccommodation";

interface AccommodationMagnamentprops {
    accommodation: Accommodation;
    isViewAccommodationModalOpen: boolean;
    isDeleteAccommodationModalOpen: boolean;
    handleOpenViewAccommodationModal: () => void;
    handleExitViewAccommodationModal: () => void;
    handleOpenDeleteAccommodationModal: () => void;
    handleExitDeleteAccommodationModal: () => void;
    handleOpenEditAccommodationModal: () => void;
}

export const AccommodationMagnamentCard: FC<AccommodationMagnamentprops> = ({ accommodation, isViewAccommodationModalOpen, isDeleteAccommodationModalOpen, handleOpenViewAccommodationModal, handleExitViewAccommodationModal, handleOpenDeleteAccommodationModal, handleExitDeleteAccommodationModal, handleOpenEditAccommodationModal }) => {

    const displayImage = accommodation.image ?? "";
    
    return (
        <div className={styles.container}>
            <div className={styles.imageInfo}>
                {displayImage && <img className={styles.image} src={displayImage} alt={accommodation.title} />}
                <div className={styles.content}>
                    <h2>{accommodation.title}</h2>
                    <p>{accommodation.city}</p>
                    <p>Max guests: {accommodation?.maxGuest} - Bedrooms: {accommodation?.maxBedrooms}</p>
                    <p>
                        From{" "}

                        <strong>
                            ${accommodation.pricePerNight}
                        </strong>

                    </p>
                </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.actions}>
                <button onClick={handleOpenViewAccommodationModal}>View</button>
                <button onClick={handleOpenEditAccommodationModal}>Edit</button>
                <button onClick={handleOpenDeleteAccommodationModal}>Delete</button>
            </div>
            {
                isViewAccommodationModalOpen &&
                <ViewAccommodation
                 accommodation={accommodation}
                 onClose={handleExitViewAccommodationModal}
                />
            }
            {
                isDeleteAccommodationModalOpen &&
                <DeleteAcoommodation
                 accommodationId={accommodation.id}
                 onClose={handleExitDeleteAccommodationModal}
                />
            }
        </div>
    )
}