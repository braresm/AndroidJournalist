import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  doc,
  docData,
  serverTimestamp,
  addDoc,
  updateDoc,
  deleteDoc,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NewsroomCategory } from '../enums/newsroom-category';
import { Newsroom } from '../interfaces/newsroom';

@Injectable({
  providedIn: 'root',
})
export class NewsroomService {
  private newsroomCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.newsroomCollection = collection(this.firestore, 'newsrooms');
  }

  getNewsroom(id: string) {
    const documentReference = doc(this.firestore, `newsrooms/${id}`);
    return docData(documentReference, { idField: 'id' });
  }

  create(newsroom: Newsroom) {
    newsroom.createdDate = serverTimestamp();
    return addDoc(this.newsroomCollection, newsroom);
  }

  update(newsroom: Newsroom) {
    const documentReference = doc(this.firestore, `newsrooms/${newsroom.id}`);
    return updateDoc(documentReference, { ...newsroom });
  }

  delete(id: string) {
    const documentReference = doc(this.firestore, `newsrooms/${id}`);
    return deleteDoc(documentReference);
  }

  getNewsrooms(category: NewsroomCategory) {
    const newsroomQuery = query(
      this.newsroomCollection,
      where('category', '==', category)
    );

    return collectionData(newsroomQuery, {
      idField: 'id',
    }) as Observable<Newsroom[]>;
  }
}
