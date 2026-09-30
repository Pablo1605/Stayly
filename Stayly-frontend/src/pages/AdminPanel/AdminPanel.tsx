import { useState } from "react";
import styles from "./AdminPanel.module.css"
import { uiStore } from "../../store/uiStore";
import { useShallow } from "zustand/shallow";
import { AddEditAccommodation } from "../../components/ui/AccommodationModals/AddEditAccommodation/AddEditAccommodation";
import { useAccommodations } from "../../hooks/accommodation/useAccommodations";
import { AccommodationMagnamentCard } from "../../components/ui/AccommodationMagnamentCard/AccommodationMagnamentCard";
import type { Accommodation } from "../../types/Accommodation";
import { useQuery } from "@tanstack/react-query";
import { getUserCount } from "../../api/userApi";
export const AdminPanel = () => {
    const {
            data: accommodations
        } = useAccommodations()
    const { data: userCount = 0 } = useQuery({
        queryKey: ["users", "count"],
        queryFn: getUserCount,
    });


    const [selectedViewAccommodation, setSelectedViewAccommodation] = useState<Accommodation | null>(null);
    const [selectedDeleteAccommodation, setSelectedDeleteAccommodation] = useState<Accommodation | null>(null);
    const [selectedEditAccommodation, setSelectedEditAccommodation] = useState<Accommodation | null>(null);

    const {isCreateOrEditAccommodationModalOpen, setCreateOrEditAccommodationModalOpen} = uiStore(useShallow((state)=>({
        isCreateOrEditAccommodationModalOpen: state.isCreateOrEditAccommodationModalOpen,
        setCreateOrEditAccommodationModalOpen: state.setCreateOrEditAccommodationModalOpen,
    })))

    const handleOpenAddEditAccommodationModal = () => {
        setCreateOrEditAccommodationModalOpen(true);
    }

    const handleExitAddEditAccommodationModal = () => {
        setCreateOrEditAccommodationModalOpen(false);
    }

    const handleOpenViewAccommodationModal = (accommodation: Accommodation) => setSelectedViewAccommodation(accommodation);
    const handleExitViewAccommodationModal = () => setSelectedViewAccommodation(null);
    const handleOpenDeleteAccommodationModal = (accommodation: Accommodation) => setSelectedDeleteAccommodation(accommodation);
    const handleExitDeleteAccommodationModal = () => setSelectedDeleteAccommodation(null);
    const handleOpenEditAccommodationModal = (accommodation: Accommodation) => setSelectedEditAccommodation(accommodation);
    const handleExitEditAccommodationModal = () => setSelectedEditAccommodation(null);

    return (
        <div className={styles.principalContainer}>
            <h1>¡Welcome, administrator!</h1>
            <p>General overview of the platform</p>
            <div className={styles.secondaryContainer}>
                    <div className={styles.content}>
                        <div className={styles.dashboardInfo}>
                            <div className={styles.box}>
                                <p>Total Accommodations:</p>
                                <p><strong>{accommodations?.length ?? 0}</strong></p>
                            </div>
                            <div className={styles.box}>
                                <p>Total Users:</p>
                                <p><strong>{userCount}</strong></p>
                            </div>
                        </div>
                        <div className={styles.titleButton}>
                            <h2>Accommodations</h2>
                            <button onClick={handleOpenAddEditAccommodationModal}>Add accommodation</button>
                        </div>
                        <div className={styles.accommodationsSection}>
                            {accommodations && accommodations.length > 0 ? (
                                <div className={styles.accommodationContainer}>
                                    {accommodations.map((a) => (
                                        <div className={styles.card} key={a.id}>
                                            <AccommodationMagnamentCard
                                                accommodation={a}
                                                isViewAccommodationModalOpen={selectedViewAccommodation?.id === a.id}
                                                isDeleteAccommodationModalOpen={selectedDeleteAccommodation?.id === a.id}
                                                handleOpenViewAccommodationModal={() => handleOpenViewAccommodationModal(a)}
                                                handleExitViewAccommodationModal={handleExitViewAccommodationModal}
                                                handleOpenDeleteAccommodationModal={() => handleOpenDeleteAccommodationModal(a)}
                                                handleExitDeleteAccommodationModal={handleExitDeleteAccommodationModal}
                                                handleOpenEditAccommodationModal={() => handleOpenEditAccommodationModal(a)}
                                            />
                                        </div>
                                    ))}
                                </div>
                        ) : (
                            <div>
                                <h1>There are no accommodations.
                                </h1>
                            </div>
                        )}
                        </div>
                    </div>
            </div>
            {
                isCreateOrEditAccommodationModalOpen && 
                <AddEditAccommodation
                 onClose={handleExitAddEditAccommodationModal}
                />
            }
            {selectedEditAccommodation && (
                <AddEditAccommodation
                    accommodation={selectedEditAccommodation}
                    onClose={handleExitEditAccommodationModal}
                />
            )}
        </div>
    )
}