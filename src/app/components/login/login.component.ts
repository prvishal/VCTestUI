import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
//_authenticationService: AuthenticationService;
  
  loginForm: FormGroup;
  
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) {
    /* this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      pass: ['', [Validators.required]],
    }); */
    this.loginForm = new FormGroup({
      userName: new FormControl(),
      pass: new FormControl()
    });
   }
  ngOnInit(): void {
    
    
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  get f() {
    return this.loginForm.controls;
  }
  login() {
    if (!this.f.userName.value && !this.f.pass.value) {
      return;
    } else {
      this._authenticationService.login(this.f.userName.value, this.f.pass.value)
        .subscribe(data => {
          if (data.statusCode === 200) {
            if (data.data.isSuccess) {
              const url = this.router.serializeUrl(this.router.createUrlTree(['/dashboard'], { queryParams: { userId: data.data.data.userId } }));
              window.open(url, '_parent');
            }
          }
          if (data.statusCode === 404) {
            alert(data.message)
          }
        } );;
    }
  }
}
