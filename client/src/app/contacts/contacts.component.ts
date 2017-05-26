import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import {Contact} from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  first_name:string;
  last_name:string;
  phone:string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
   this.getContacts();
  }

  getContacts(){
    this.contactService.getContacts()
    .subscribe(contacts => this.contacts = contacts);
  }


  addContact(){
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.contactService.addContact(newContact)
    .subscribe(contacts =>{
      this.contacts.push(contacts);
      
      this.getContacts();
    });
  }


  deleteContact(id:any){
    var contacts = this.contacts;
    return this.contactService.deleteContact(id)
    .subscribe(data => {
      if(data.n == 1){
        for (var index = 0; index < contacts.length; index++) {
            if(contacts[index]._id == id){
              contacts.splice(index,1);
            }          
        }
      }
    });
  }

}
