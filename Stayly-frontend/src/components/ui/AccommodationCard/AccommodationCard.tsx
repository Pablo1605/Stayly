import { useNavigate } from "react-router-dom"
import styles from "./AccommodationCard.module.css"
import type { Accommodation } from "../../../types/Accommodation"
import type { FC } from "react";
import { uiStore } from "../../../store/uiStore";
import { useFavoriteMutations } from "../../../hooks/favorite/useFavoriteMutations";
import { userStore } from "../../../store/userStore";

interface AccommodationCardProps {
    accommodation: Accommodation;
    isFavorite: boolean;
}

export const AccommodationCard: FC<AccommodationCardProps> = ({
    accommodation,
    isFavorite
}) => {
    const navigate = useNavigate();
    const { user } = userStore();
    const setLoginModalOpen = uiStore(
        (state) => state.setLoginModalOpen
    );

    const {
        addFavorite,
        removeFavorite
    } = useFavoriteMutations();

    const toAccommodationPage = () => {
        navigate(`/accommodation-page/${accommodation.id}`);
    };

    const handleFavoriteClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();
        if (!user) {
            setLoginModalOpen(true);
            return;
        }

        if (isFavorite) {
            removeFavorite(accommodation.id);
        } else {
            addFavorite(accommodation.id);
        }
    };

    const displayImage = accommodation.image ?? "";
    return (
        <div className={styles.container} onClick={toAccommodationPage}>
            {displayImage && (
                <img
                    className={styles.cardImage}
                    src={displayImage}
                    alt={accommodation.title}
                />
            )}

            <button
                type="button"
                onClick={handleFavoriteClick}
                className={styles.favoriteButton}
                style={{
                    color: isFavorite
                        ? "#FF0000"
                        : "#d6d4d4"
                }}
            >
                <span className="material-symbols-outlined">
                    favorite
                </span>
            </button>

            <div className={styles.infoAndRating}>
                <div className={styles.info}>
                    <h4>
                        {accommodation.title}
                    </h4>
                    <p>
                        {accommodation.address}
                    </p>
                    <p>
                        From{" "}
                        <strong>
                            ${accommodation.pricePerNight}
                        </strong>
                    </p>
                </div>
            </div>
        </div>
    );
};