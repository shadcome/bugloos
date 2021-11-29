import { Time } from "@angular/common";

export interface ICourse {
    id: number;
    title: string;
    duration: Time;
    rate: number;
    lectureCount: number;
    subject: string;
    masterName: string;
    price: number;
    discount: number;
}