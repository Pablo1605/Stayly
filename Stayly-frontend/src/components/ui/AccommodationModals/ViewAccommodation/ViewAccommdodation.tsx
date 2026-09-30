import type { FC } from "react";
import styles from "./ViewAccommodation.module.css"
import type { Accommodation } from "../../../../types/Accommodation";

interface ViewAccommodationProps {
    accommodation: Accommodation;
    onClose: () => void;
}

interface ImageCountClasses {
  [key: number]: string;
}

const imageCountClasses: ImageCountClasses = {
  1: styles.oneImage,
  2: styles.twoImages,
  3: styles.threeImages
};

export const ViewAccommodation: FC<ViewAccommodationProps> = ({accommodation, onClose}) => {

    const images = accommodation.images
        ?.slice()
        .sort((a, b) => a.displayOrder - b.displayOrder) ?? [];

    const currentImageClass = imageCountClasses[images.length] || styles.defaultImage;

    return (
        <div className={styles.principalContainer}>
            <div className={styles.secondaryContainer}>
                <button className={styles.buttonExitModal} onClick={onClose}>X</button>
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
            </div>
        </div>
    )
}