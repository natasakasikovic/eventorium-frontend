import { RemoveImageRequest } from "../../shared/model/remove-image-request.model";

export interface UpdateImagesRequest {
    newImages: File[];
    removedImages: RemoveImageRequest[];
}