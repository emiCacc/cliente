import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup; //Con esta variable de tipo FormGroup "enlacé" el formulario del archivo HTML de este componente!
  titulo = 'Crear producto';
  id: string | null; //Indico que le valor de la variable 'id' puede ser string o nulo
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _productoService: ProductoService,
              private aRouter: ActivatedRoute) { 
    this.productoForm = this.fb.group({ //Establezco las categorías, los validators (validación de caracteres) y el tipo obligatorio (required)
      producto: ['', Validators.required], 
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id'); //De esta manera accedo al ID del routing
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    // console.log(this.productoForm);

    // console.log(this.productoForm.get('producto')?.value);

    const PRODUCTO: Producto = { //Con esta constante creo un objeto que "limpia" todo el array recibido anteriormente, de manera que me queda mas cómoda la lectura de las propiedades de cada artículo, de esta manera envío estos datos al BackEnd para manipularlos a gusto.
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    if(this.id !== null){
      //Si el ID es distino a null entonces se esta EDITANDO un producto
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.info('¡Producto actualizado con éxito!', 'Artículo actualizado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
      
    }else{
      //Si el ID es null entonces se esta CREANDO un producto
      console.log(PRODUCTO);
      this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('¡Producto creado con éxito!', 'Artículo agregado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }
    

  
  }
//Este metodo revisa si el ID es nulo. Si tiene algun valor es porque se esta EDITANDO el producto
  esEditar() {

    if(this.id !== null){
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        })
      })
    }
  }

} 