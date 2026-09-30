export type AccommodationStatus = 'AVAILABLE' | 'UNAVAILABLE';

export type AccommodationImage = {
    id: number;
    imageUrl: string;
    publicId: string;
    displayOrder: number;
}

export type Accommodation = {
    id: number;
    title: string;
    description: string;
    pricePerNight: string;
    maxGuest: number;
    maxBedrooms: number;
    status: AccommodationStatus;
    address: string;
    city: string;
    rating: number;
    image?: string;
    images?: AccommodationImage[];
    isFavorite?: boolean;
}

export type CreateAccommodationRequest = {
    title: string;
    description: string;
    pricePerNight: string;
    maxGuest: number;
    maxBedrooms: number;
    address: string;
    city: string;
    rating: number;
    images: File[];
}

export type UpdateAccommodationRequest = Omit<CreateAccommodationRequest, "images" | "rating"> & {
    image?: AccommodationImage[];
};

export type AccommodationCard = {
    id: number;
    title: string;
    pricePerNight: string;
    city: string;
    rating: number;
    image: string;
    images?: AccommodationImage[];
}

export type searchAccommodationRequest = {
    city: string;
    title: string;
    minPrice: string;
    maxPrice: string;
    minGuest: number;
    maxGuest: number;
    maxBedrooms: number;
    images?: AccommodationImage[];
}