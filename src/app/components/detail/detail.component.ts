import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _bankService:BankService
  ) { }
  bankAccountId: string = "";
  accountNumber: string = "";
  accountName: string = "";
  transactions: any[] = [];
  balance: number = 0;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bankAccountId = params['bankAccountId']
      console.log(this.bankAccountId)
      this.getBankAccountInfo();
      this.getBankAccountBalance();
      this.getBankAccountTransactions();
    });
    
  }
  getBankAccountInfo() {
    this._bankService.getBankAccountInfo(this.bankAccountId)
        .subscribe(data => {
          console.log(data)
          if (data.statusCode === 200) {
            console.log(data.data)
            if (data.data.isSuccess) {
              console.log(data.data.data)
              this.accountNumber = data.data.data.accountNumber;
              this.accountName = data.data.data.name;
              //console.log(data.data.data.userId)
              //this.router.navigate(['/dashboard?id=' + data.data.data.userId]);
              
            }
          }
        } );;
  }

  getBankAccountBalance() {
    this._bankService.getBankAccountBalance(this.bankAccountId)
        .subscribe(data => {
          console.log(data)
          if (data.statusCode === 200) {
            console.log(data.data)
            if (data.data.isSuccess) {
              console.log(data.data.data)
              this.balance=data.data.data
              console.log(data.data.data)
              
              //this.router.navigate(['/dashboard?id=' + data.data.data.userId]);
              
            }
          }
        } );;
  }

  getBankAccountTransactions() {
    this._bankService.getBankAccountTransactions(this.bankAccountId)
        .subscribe(data => {
          if (data.statusCode === 200) {
            if (data.data.isSuccess) {
              console.log(data.data.data)
              this.transactions = data.data.data;
            
            }
          }
        } );;
  }
  convertDecimal(amount:string) {
    return parseFloat(amount).toFixed(2);
  }
}
