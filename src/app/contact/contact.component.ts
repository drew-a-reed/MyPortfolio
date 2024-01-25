import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  send(): void {
    const { name, email, message } = this.form.value;
    const endpoint = "https://2mkop4gz3e.execute-api.us-east-2.amazonaws.com/default/sendContactEmail"
    const body = JSON.stringify({
      senderName: name,
      senderEmail: email,
      message: message
    });

    const requestOptions = {
      method: "POST",
      body
    };

    fetch(endpoint, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error in fetch: ${response.statusText}`);
        }
        return response.json();
      })
      .then((response) => {
        console.log("Email sent successfully!");
        alert("Your message was sent. I will get back to you as soon as I can");
      })
      .catch((error) => {
        console.error("An unknown error occurred:", error.message);
        // Optionally, display an error message to the user
      });
  }


  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      email: [null],
      message: [null],
    });
  }

}
