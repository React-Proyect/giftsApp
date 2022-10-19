import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    private _apiKey: string = 'BvYnz30Ir24SF5XtbJVffQLJ7rvgly44';
    private _api: string = 'https://api.giphy.com/v1/gifs';
    private _historial: string[] = []

    public resultados: Gif[] = [];

    get historial() {
        return [...this._historial]
    }

    constructor(
        private _http: HttpClient
    ) {
        if(localStorage.getItem('historial') &&
        localStorage.getItem('resultados')){
            this._historial = JSON.parse(localStorage.getItem('historial')!);
            this.resultados = JSON.parse(localStorage.getItem('resultados')!);
        }
    }


    public buscarGifs(query: string) {
        query = query.trim().toLowerCase();
        if (!this._historial.includes(query)) {
            this._historial.unshift(query);
            this._historial = this._historial.splice(0, 10)

            localStorage.setItem('historial', JSON.stringify(this.historial));
        }

        const params = new HttpParams()
        .set('api_key', this._apiKey)
        .set('limit', '10')
        .set('q', query);

        this._http.get<SearchGifsResponse>(`${this._api}/search`, {params}).subscribe(
            (res) => {
                this.resultados = res.data;
                localStorage.setItem('resultados', JSON.stringify(this.resultados));
            }
        );
    }
}
