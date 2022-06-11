//Componentes
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Component, OnInit } from '@angular/core';
//Libreria
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  titulo: String = "Inventario de productos";
  listProductos: Producto[] = [];
  listProductos$!: Observable<Producto[]>;

  constructor(private _productoService: ProductoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }


  obtenerProductos() {
    // this.listProductos$ = this._productoService.getProductos();
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProducto(id:any){
    this._productoService.eliminarProducto(id).subscribe(data => {
    this.toastr.error('El producto fue eliminado con éxito', 'Producto eliminado');
    this.obtenerProductos();
    }, error => {
      console.log(error);
    })
  }

}
