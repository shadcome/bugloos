import { Time } from "@angular/common";

export interface ICourse {
    title: string;
    courseImage: string;
    duration: Time;
    rate: number;
    lectureCount: number;
    subject: string;
    masterName: string;
    masterImage: string;
    price: number;
}