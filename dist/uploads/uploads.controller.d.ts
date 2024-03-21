/// <reference types="multer" />
import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    uploadFiles(files: Array<Express.Multer.File>): Promise<{
        thumbnail: string;
        original: string;
        id: string;
    }[]>;
}
