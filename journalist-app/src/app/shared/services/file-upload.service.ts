import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async uploadFile(file: File): Promise<string> {
    const filePath = `${this.generateFilePath()}/${file.name}`;
    const storage = getStorage();
    const fileRef = ref(storage, filePath);

    const uploadSnapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(uploadSnapshot.ref);
    return downloadUrl;
  }

  private generateFilePath(): string {
    const currentDate = new Date();
    return `feeds/${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDay()}`;
  }
}
