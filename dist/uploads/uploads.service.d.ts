/// <reference types="multer" />
export declare class UploadsService {
    private s3;
    uploadFiles(files: Array<Express.Multer.File>): Promise<{
        thumbnail: string;
        original: string;
        id: string;
    }[]>;
    private s3_upload;
    remove(id: string): string;
}
