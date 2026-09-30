
export type Image = {
    id: number;
    imageUrl: string;
    publicId: string;
    displayOrder: number;
}

export type CreateImageRequest = {
    imageUrl: string;
    publicId: string;
    displayOrder: number;
}