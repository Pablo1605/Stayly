import { useMemo, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { AccommodationCard } from "../../components/ui/AccommodationCard/AccommodationCard"
import { useAccommodations } from "../../hooks/accommodation/useAccommodations"
import styles from "./Home.module.css"

const ACCOMMODATIONS_PER_PAGE = 6

export const Home = () => {
    const {
        data: accommodations
    } = useAccommodations()

    const [allAccommodationsIndex, setAllAccommodationsIndex] = useState(0)

    const totalAllAccommodationsPages = accommodations ? Math.ceil(accommodations.length / ACCOMMODATIONS_PER_PAGE) : 0

    const visibleAllAccommodations = useMemo(() => {
        if (!accommodations || accommodations.length === 0) return []

        const startIndex = allAccommodationsIndex * ACCOMMODATIONS_PER_PAGE
        return accommodations.slice(startIndex, startIndex + ACCOMMODATIONS_PER_PAGE)
    }, [accommodations, allAccommodationsIndex])

    const trendingAccommodations = useMemo(() => {
        if (!accommodations || accommodations.length === 0) return []

        return [...accommodations].sort((a, b) => b.rating - a.rating).slice(0, 6)
    }, [accommodations])

    const recommendedAccommodations = useMemo(() => {
        if (!accommodations || accommodations.length === 0) return []

        return accommodations.slice(0, 6)
    }, [accommodations])

    const handleAllAccommodationsNext = () => {
        if (totalAllAccommodationsPages <= 1) return

        setAllAccommodationsIndex((current) => (current + 1) % totalAllAccommodationsPages)
    }

    const handleAllAccommodationsPrevious = () => {
        if (totalAllAccommodationsPages <= 1) return

        setAllAccommodationsIndex((current) =>
            (current - 1 + totalAllAccommodationsPages) % totalAllAccommodationsPages
        )
    }

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <div>
                    <p className={styles.eyebrow}>Your next stay starts here</p>
                    <h1>Find a place that feels like yours.</h1>
                    <p className={styles.heroCopy}>Thoughtfully selected stays for slow mornings, big plans and everything in between.</p>
                </div>
                <div className={styles.heroBadge}><strong>{accommodations?.length ?? 0}</strong><span>stays to discover</span></div>
            </section>
            <div className={styles.accommodationsSections}>
                <div className={styles.rouletteSection}>
                    <div className={styles.sectionHeader}>
                        <div><p className={styles.eyebrow}>Browse the collection</p><h2>All stays</h2></div>
                        {totalAllAccommodationsPages > 1 && (
                            <div className={styles.carouselControls}>
                                <button
                                    type="button"
                                    className={styles.arrowButton}
                                    onClick={handleAllAccommodationsPrevious}
                                    aria-label="Previous accommodations"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    type="button"
                                    className={styles.arrowButton}
                                    onClick={handleAllAccommodationsNext}
                                    aria-label="Next accommodations"
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={styles.cardContainer}>
                        {accommodations && accommodations.length > 0 ? (
                            visibleAllAccommodations.map((a) => (
                                <div className={styles.card} key={a.id}>
                                    <AccommodationCard
                                        accommodation={a}
                                        isFavorite={Boolean(a.isFavorite)}
                                    />
                                </div>
                            ))
                        ) : (
                            <div>
                                <h1>There are no accommodations available at the moment.
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.rouletteSection}>
                    <h2>Trending</h2>
                    <div className={styles.cardContainer}>

                        {accommodations ? (
                            trendingAccommodations.map((a) => (

                                <div className={styles.card} key={a.id}>
                                    <AccommodationCard
                                        accommodation={a}
                                        isFavorite={Boolean(a.isFavorite)}
                                    />
                                </div>
                            ))
                        ) : (
                            <div>
                                <h1>There are no accommodations available at the moment.
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.rouletteSection}>
                    <h2>Recommended</h2>
                    <div className={styles.cardContainer}>

                        {accommodations ? (
                            recommendedAccommodations.map((a) => (

                                <div className={styles.card} key={a.id}>
                                    <AccommodationCard
                                        accommodation={a}
                                        isFavorite={Boolean(a.isFavorite)}
                                    />
                                </div>
                            ))
                        ) : (
                            <div>
                                <h1>There are no accommodations available at the moment.
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}