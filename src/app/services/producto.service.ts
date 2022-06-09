import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //url = 'http://localhost:4000/api/productos/';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(environment.apiURL).pipe(
      map(products => products));
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(environment.apiURL + id);
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(environment.apiURL, producto);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get(environment.apiURL + id);
  }

  editarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(environment.apiURL + id, producto);
  }
}
