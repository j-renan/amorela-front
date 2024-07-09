import { Component, OnInit, Input } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [MatProgressSpinnerModule],
  providers: []
})
export class LoadingComponent implements OnInit {
    @Input() tamanho: number = 40
    @Input() mensagem: string = ''
    constructor() { }

    ngOnInit() { }

}
