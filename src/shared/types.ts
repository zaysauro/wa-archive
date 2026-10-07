export type MessageDirection="incoming"|"outgoing"|"unknown";
export type MessageType="message"|"system";
export type MessageSource="web"|"txt"|"zip";
export interface ArchivedMessage{id:string;conversationId:string;conversationTitle:string;sender:string;direction:MessageDirection;text:string;timestampLabel:string;messageAt?:number;capturedAt:number;type:MessageType;source:MessageSource}
export interface Conversation{id:string;title:string;owner?:string;createdAt:number;updatedAt:number}
export interface Participant{id:string;conversationId:string;name:string;isOwner:boolean}
export interface ImportRecord{id:string;conversationId:string;source:"txt"|"zip";fileName:string;importedAt:number;added:number;duplicates:number}
export interface ConversationSummary{id:string;title:string;messageCount:number;incoming:number;outgoing:number;participants:Record<string,number>;firstCapturedAt?:number;lastCapturedAt?:number}