export interface Posting {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePostingDto {
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
}

export interface UpdatePostingDto extends Partial<CreatePostingDto> {
    id: string;
} 