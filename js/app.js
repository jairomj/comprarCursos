const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCurso = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListener();
function cargarEventListener() {
     //Cuando agregas un curso haciendo clic en "Agregar al carrito"
     listaCurso.addEventListener('click', agregaCurso);

     //Eliminando cursos del carrito
     carrito.addEventListener('click', eliminarCurso);
     
     //vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', ()=>{
          articulosCarrito = []; //reseteando el arreglo
          limpiarHTML();//eliminando todo el html
     })
}

//funciones
function agregaCurso(e) {
     e.preventDefault();
     if (e.target.classList.contains('agregar-carrito') ) {
     const cursoSeleccionado = e.target.parentElement.parentElement;
     leerDatosCurso(cursoSeleccionado);
     }
     
}

//funcion eliminar un curso del carrito
function eliminarCurso(e) {
     if(e.target.classList.contains('borrar-curso')){
          console.log(e.target.getAttribute('data-id'));
          const cursoId = e.target.getAttribute('data-id');
          articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId ); 
          carritoHTML();
          
     }
     
}

//Lee el contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
//Crer un objeto con el contenido del curso actual
const infoCurso = {
     imagen: curso.querySelector('img').src,
     titulo: curso.querySelector('h4').textContent,
     precio: curso.querySelector('.precio span').textContent,
     id: curso.querySelector('a').getAttribute('data-id'),
     cantidad: 1
}

//Revisa si un elementoi ya existe en el carrito
const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
if (existe) {
     //Actualizamos las cantidades
     const cursos = articulosCarrito.map( (curso)=>{
          if (curso.id === infoCurso.id) {
              curso.cantidad++; 
          return curso;//retorna objeto actualizado
          }
          else{
               return curso;//retorna los objetos que no son duplicados
               console.log('Creo que no entra');
          }
     });
     articulosCarrito = [...cursos];
}else {
     //Agrega elementos al arreglo de carrito
     articulosCarrito = [...articulosCarrito, infoCurso];
}
     console.log(articulosCarrito);
     carritoHTML();
     
}

//Muestra el carrito de compras en el html
function carritoHTML() {
     //limpiar el html
     limpiarHTML();
     //recorre el carrito y genera el html
     articulosCarrito.forEach( curso => {
          const { imagen, titulo, precio, cantidad, id } =  curso;
          
          const row = document.createElement('tr');
          row.innerHTML = `
          <td><img src="${imagen}" width="100"></td>
          <td>${titulo}</td>
          <td>${precio}</td>
          <td>${cantidad}</td>
          <td>
               <a href="#" class="borrar-curso" data-id=${id}> X </a>
          </td>
          `;

          //Agrega el html del carrito en el tbody
          contenedorCarrito.appendChild(row);
     });
}

//eliminar los cursos del tbody
function limpiarHTML() {
     //forma lenta
     // contenedorCarrito.innerHTML = '';
     while (contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild)
          
     }
}