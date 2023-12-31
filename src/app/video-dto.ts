export interface VideoDTO {
    id: string;
    title: string;
    description: string;
    tags: Array<string>;
    videoUrl: string;
    videoStatus: string;
    thumbnailUrl: string;
    likesCount: number;
    dislikesCount: number;
    viewCount: number;
}