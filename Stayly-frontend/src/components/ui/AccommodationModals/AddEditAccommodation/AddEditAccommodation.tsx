import { useState, type FC, type FormEvent } from "react"
import styles from "./AddEditAccommodation.module.css"
import type { Accommodation, CreateAccommodationRequest, UpdateAccommodationRequest } from "../../../../types/Accommodation"
import { useCreateAccommodation, useUpdateAccommodation } from "../../../../hooks/accommodation/useAccommodationMutations"

interface AddEditAccommodationProps {
    onClose: () => void;
    accommodation?: Accommodation;
}

type AccommodationForm = {
    title: string;
    description: string;
    city: string;
    address: string;
    pricePerNight: string;
    maxGuest: string;
    maxBedrooms: string;
};

export const AddEditAccommodation: FC<AddEditAccommodationProps> = ({ onClose, accommodation }) => {
    const isEditMode = Boolean(accommodation);
    const [form, setForm] = useState<AccommodationForm>({
        title: accommodation?.title ?? "",
        description: accommodation?.description ?? "",
        city: accommodation?.city ?? "",
        address: accommodation?.address ?? "",
        pricePerNight: accommodation?.pricePerNight ?? "",
        maxGuest: accommodation?.maxGuest?.toString() ?? "",
        maxBedrooms: accommodation?.maxBedrooms?.toString() ?? "",
    });
    const [images, setImages] = useState<File[]>([]);
    const [validationError, setValidationError] = useState("");
    const createMutation = useCreateAccommodation();
    const updateMutation = useUpdateAccommodation();
    const isPending = createMutation.isPending || updateMutation.isPending;
    const requestError = createMutation.isError || updateMutation.isError;

    const handleChange = (field: keyof AccommodationForm, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
        setValidationError("");
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const hasEmptyTextField = [form.title, form.description, form.city, form.address]
            .some((value) => value.trim() === "");
        const hasInvalidNumber = [form.pricePerNight, form.maxGuest, form.maxBedrooms]
            .some((value) => !Number.isFinite(Number(value)) || Number(value) <= 0);

        if (hasEmptyTextField || hasInvalidNumber) {
            setValidationError("Complete all fields with valid positive values.");
            return;
        }

        if (!isEditMode && (images.length < 1 || images.length > 3)) {
            setValidationError("A new accommodation must have between 1 and 3 images.");
            return;
        }

        const commonData = {
            title: form.title.trim(),
            description: form.description.trim(),
            city: form.city.trim(),
            address: form.address.trim(),
            pricePerNight: form.pricePerNight,
            maxGuest: Number(form.maxGuest),
            maxBedrooms: Number(form.maxBedrooms),
        };

        try {
            if (accommodation) {
                const data: UpdateAccommodationRequest = {
                    ...commonData,
                    image: accommodation.images,
                };
                await updateMutation.mutateAsync({ accommodationId: accommodation.id, data });
            } else {
                const data: CreateAccommodationRequest = {
                    ...commonData,
                    rating: Number((1 + Math.random() * 4).toFixed(1)),
                    images,
                };
                await createMutation.mutateAsync(data);
            }
            onClose();
        } catch {
            setValidationError("Unable to save the accommodation.");
        }
    };

    return (
        <div className={styles.principalContainer}>
            <div className={styles.secondaryContainer}>
                <h1>{isEditMode ? "Edit Accommodation" : "Add Accommodation"}</h1>
                <button className={styles.buttonExitModal} onClick={onClose}>X</button>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={form.title}
                            onChange={(event) => handleChange("title", event.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            value={form.description}
                            onChange={(event) => handleChange("description", event.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="city">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            value={form.city}
                            onChange={(event) => handleChange("city", event.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="address">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={form.address}
                            onChange={(event) => handleChange("address", event.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.priceAndGuests}>
                        <div className={styles.formGroupNumber}>
                            <label htmlFor="price-per-night">
                                Price per night
                            </label>
                            <input
                                type="number"
                                min="1"
                                id="price-per-night"
                                value={form.pricePerNight}
                                onChange={(event) => handleChange("pricePerNight", event.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroupNumber}>
                            <label htmlFor="number-of-guests">
                                Number of guests
                            </label>
                            <input
                                type="number"
                                min="1"
                                id="number-of-guests"
                                value={form.maxGuest}
                                onChange={(event) => handleChange("maxGuest", event.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroupNumber}>
                            <label htmlFor="number-of-bedrooms">Number of bedrooms</label>
                            <input
                                type="number"
                                min="1"
                                id="number-of-bedrooms"
                                value={form.maxBedrooms}
                                onChange={(event) => handleChange("maxBedrooms", event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="images">
                            Images
                        </label>
                        <input
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                            required={!isEditMode}
                            onChange={(event) => {
                                setImages(Array.from(event.target.files ?? []));
                                setValidationError("");
                            }}
                        />
                        {!isEditMode && <small>Select between 1 and 3 images.</small>}
                    </div>
                    {(validationError || requestError) && (
                        <p className="error-text">{validationError || "Unable to save the accommodation."}</p>
                    )}
                    <div className={styles.buttonMessage}>
                        <button className={styles.buttonIs} type="submit" disabled={isPending}>
                            {isPending ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}