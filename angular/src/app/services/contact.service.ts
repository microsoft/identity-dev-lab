import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Contact } from "../components/contact";

@Injectable()
export class ContactService {

    private apiEndpoint: string = "https://idlabapi.azurewebsites.net/contacts";

    constructor(private http: HttpClient) { }

    getItems(): Observable<Contact[]> {
        return this.http.get(this.apiEndpoint)
          .map((response: Contact[]) =>
            response
          )
          .catch(response => (Observable.throw(response))
          )
    }
   
    postItem(item: any) {
        return this.http.post(this.apiEndpoint, item, {responseType: 'text'})
            .map((response) => {
                return response;
            })
    }

    deleteItem(id: string) {
        return this.http.delete(this.apiEndpoint + "/" + id, {responseType: 'text'})
            .map((response) => {
                return response;
            })
    }
}
