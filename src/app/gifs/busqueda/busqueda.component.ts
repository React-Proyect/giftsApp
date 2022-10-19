import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

    @ViewChild('txtBuscar')
    txtBuscar!: ElementRef<HTMLInputElement>;

    constructor(
        private _gifsServices: GifsService
    ) { }

    public buscar() {
        const valor = this.txtBuscar.nativeElement.value.trim();
        if (valor !== '') {
            this._gifsServices.buscarGifs(valor);
        }
        this.txtBuscar.nativeElement.value = '';
    }


}
