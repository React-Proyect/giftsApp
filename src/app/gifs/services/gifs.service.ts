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
        if (localStorage.getItem('historial') &&
            localStorage.getItem('resultados')) {
            this._historial = JSON.parse(localStorage.getItem('historial')!);
            this.resultados = JSON.parse(localStorage.getItem('resultados')!);
        }
    }


    public async buscarGifs(query: string) {
        query = query.trim().toLowerCase();
        if (!this._historial.includes(query)) {
            this._historial.unshift(query);
            this._historial = this._historial.splice(0, 10)

            localStorage.setItem('historial', JSON.stringify(this.historial));
        }

        this.resultados = await this.apiSearch(query);
        this.resultados && localStorage.setItem('resultados', JSON.stringify(this.resultados));
    }

    apiSearch(query: string): Promise<Gif[]> {
        const params = new HttpParams()
            .set('api_key', this._apiKey)
            .set('limit', '12')
            .set('q', query);
        return new Promise<Gif[]>((resolve, reject) => {
            this._http.get<SearchGifsResponse>(`${this._api}/search`, { params }).subscribe(
                {
                    next: (res) => res.data.length > 0 ? resolve(res.data) : resolve([]),
                    error: () => resolve([])
                }
            );
        })
    }
}
