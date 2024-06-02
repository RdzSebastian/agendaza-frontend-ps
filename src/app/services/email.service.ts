import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    constructor(private http: HttpClient) { }

    sendEmail(to: string, subject: string, text: string) {
        const body = {
            to: to,
            subject: subject,
            text: text
        };
        return this.http.post('/api/send-email', body);
    }
}