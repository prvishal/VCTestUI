import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _bankService:BankService
  ) { }
  userId: string = "";
  bankAccounts: any[]=[];
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId']
      console.log(this.userId)
      this.getBankAccounts();
  });
  }
  getBankAccounts() {
    this._bankService.getBankAccounts(this.userId)
        .subscribe(data => {
          console.log(data)
          if (data.statusCode === 200) {
            console.log(data.data)
            if (data.data.isSuccess) {
              console.log(data.data.data)
              this.bankAccounts=data.data.data
             
            }
          }
        } );;
  }
  viewBankAccount(bankAccountId:string) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/account-view'], { queryParams: { bankAccountId: bankAccountId } }));

    window.open(url, '_parent');
  }
}
