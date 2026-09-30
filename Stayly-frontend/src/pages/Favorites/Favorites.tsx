import { AccommodationCard } from "../../components/ui/AccommodationCard/AccommodationCard";
import { useFavorites } from "../../hooks/favorite/useFavorites";
import { userStore } from "../../store/userStore";
import styles from "./Favorites.module.css"
import { useNavigate } from "react-router-dom";

export const Favorites = () => {
    const user = userStore((state) => state.user);
    const navigate = useNavigate();

    const handleExploreAccommodations = () => {
        navigate("/");
    }

    const {
        data: favorites = [],
        isLoading,
        isError
    } = useFavorites();

    if (isLoading) {
        return <h1>Loading favorites...</h1>;
    }

    if (isError) {
        return <h1>Error loading favorites.</h1>;
    }

    return (
        <div className={styles.principalContainer}>
            <h1>
                Accommodations you marked as favorites
            </h1>
            {user ? (
                favorites.length === 0 ? (
                    <div className={styles.noFavoritesContainer}>
                        <span className="material-symbols-outlined">
                            favorite
                        </span>
                        <h1>Don't you have any favorites yet?</h1>
                        <p>Add your favorite accommodations to view them here.</p>
                        <button onClick={handleExploreAccommodations}>
                            Explore accommodations
                        </button>
                    </div>

                ) : (

                    <div className={styles.favoritesContainer}>
                        <div className={styles.cardsContainer}>

                            {favorites.map((favorite) => (
                                <div key={favorite.id} className={styles.card}>
                                    <AccommodationCard
                                        accommodation={favorite.accommodation}
                                        isFavorite={true}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>

                )
            ) : (
                <p>Please log in to view your favorites.</p>
            )}
        </div>
    );
};