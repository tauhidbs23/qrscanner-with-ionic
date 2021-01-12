import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  qrScan:any;
  QRScannerValue:any;

  constructor(private platform: Platform, private qrScanner: QRScanner) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      document.getElementsByTagName('body')[0].style.opacity = '1';
      this.qrScan.unsubscribe();
    })
  }

  startScanning() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.qrScanner.show();
        document.getElementsByTagName("body")[0].style.opacity = '0';
        this.qrScan = this.qrScanner.scan().subscribe((text: string) => {
          document.getElementsByTagName('body')[0].style.opacity = '1';
          this.qrScan.unsubscribe();
          // Save in localStorage
          this.QRScannerValue = localStorage.getItem('QRScannerValue')

          if (!this.QRScannerValue) {
            localStorage.setItem('QRScannerValue', text);
          }

          if (this.QRScannerValue !== text) {
            localStorage.setItem('QRScannerValue', text);
          }

        }, (err) => {
          console.log(err);
        });
      } else if (status.denied) {


      } else {

      }
    }).catch((e: any) => console.log('Error is', e));
  }

}
