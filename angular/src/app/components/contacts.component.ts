import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from "../services/contact.service";
import { Contact } from "./contact";
import { Subscription } from "rxjs/Subscription";
import { BroadcastService } from "@azure/msal-angular";
import { AuthService } from '../services/auth.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy  {
    private error = "";
    public loadingMessage = "Loading...";
    Contacts: Contact[];
    public newContactName = "";
    public newContactEmail = "";
    public editContactId = "";
    public formAction = "Add";
    private submitted = false;
    private subscription: Subscription;
    constructor(public authService: AuthService, private contactService: ContactService, private broadcastService : BroadcastService) { }

    onSubmit(form: any){
      if (form.isValid){
        console.log("form is valid");
      } else {
        console.log(form.controls.name.errors);
      }
    }
    ngOnInit() {
        this.populate();

        this.subscription = this.broadcastService.subscribe("msal:acquireTokenFailure", (payload) => {
          console.log("acquire token failure " + JSON.stringify(payload));
          if (payload.errorDesc == "consent_required" || payload.errorDesc == "interaction_required" ) {
            this.authService.msal.acquireTokenPopup(['http://hackerdemo.com/idlabapi/user_impersonation']).then( (token) => {
            this.contactService.getItems().subscribe( (results) => {
                this.error = '';
                this.Contacts = results;
                this.loadingMessage = "";
              },  (err) => {
                console.log("acquire token failure2 " + JSON.stringify(err));
                this.error = err;
                this.loadingMessage = "";
              });
            }, (error) => {
              console.log("acquire token failure3 " + JSON.stringify(error));
            });
          }
    });

   this.subscription = this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
    console.log("acquire token success");
    });
  }

  public populate() {
    this.contactService.getItems().subscribe(result => {
      console.log("loading contacts");
      this.Contacts = result;
      this.loadingMessage = "";
    }, error => {
      console.log("access token silent failed: " + JSON.stringify(error));
      this.error = error;
      this.loadingMessage = "";
    });
  }

  public reset(form) {
    form.reset();
    this.loadingMessage = "";
    this.newContactName = "";
    this.newContactEmail = "";
    this.editContactId = "";
    this.formAction = "Add";
  }

  public edit(contact: Contact) {
    this.newContactEmail = contact.EmailAddress;
    this.newContactName = contact.Name;
    this.editContactId = contact.Id;
    this.formAction="Update";
  }

  public delete(form: any) {
    this.contactService.deleteItem(this.editContactId)
      .subscribe( (results) => {
        this.reset(form);
        this.populate();
      }, (err) => {
        console.log("add contact failed: " + JSON.stringify(err));
        this.error = err;
        this.loadingMessage = "";
      })
  }

  public add(form: any) {
    this.submitted = true;
    if(form.valid) {
      this.contactService.postItem({
        'id': this.editContactId,
        'name': this.newContactName,
        'emailAddress': this.newContactEmail
      }).subscribe( (results) => {
        this.reset(form);
        this.populate();
      }, (err) => {
        console.log("add contact failed: " + JSON.stringify(err));
        this.error = err;
        this.loadingMessage = "";
      })
    }
    else {
    }
  };

//extremely important to unsubscribe
  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}