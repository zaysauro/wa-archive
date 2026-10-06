import {openDB,type DBSchema} from "idb";import type {ArchivedMessage} from "../shared/types";
interface ArchiveDB extends DBSchema{messages:{key:string;value:ArchivedMessage;indexes:{"by-conversation":string;"by-captured-at":number}}}
const dbPromise=openDB<ArchiveDB>("wa-archive",1,{upgrade(db){const store=db.createObjectStore("messages",{keyPath:"id"});store.createIndex("by-conversation","conversationId");store.createIndex("by-captured-at","capturedAt")}});
export async function saveMessages(messages:ArchivedMessage[]){const db=await dbPromise;const tx=db.transaction("messages","readwrite");let added=0;for(const message of messages){if(!(await tx.store.get(message.id)))added++;await tx.store.put(message)}await tx.done;return{added,total:messages.length}}
export async function getAllMessages(){return(await dbPromise).getAll("messages")}
export async function getConversationMessages(id:string){return(await dbPromise).getAllFromIndex("messages","by-conversation",id)}