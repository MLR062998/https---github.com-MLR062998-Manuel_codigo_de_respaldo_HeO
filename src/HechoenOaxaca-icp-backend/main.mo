// Importaciones necesarias
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Random "mo:base/Random";

// Definición del tipo Producto
type Producto = {
    id: Principal;
    nombre: Text;
    precio: Float;
    descripcion: Text;
    artesano: Text;
    tipo: Text;
    imagen: ?Blob;
};

// Definición del tipo AplicationError
type AplicationError = {
    #ProductoNoExiste: Text;
};

// Actor principal para gestionar productos
actor {
    // Tabla de productos usando HashMap
    var productos_table: HashMap.HashMap<Principal, Producto> = 
        HashMap.HashMap<Principal, Producto>(10, Principal.equal, Principal.hash);

    // Función para generar un ID aleatorio (async)
    private func generateId(): async Principal {
        // Usamos `await` solo dentro de una función async
        let randomBlob = await Random.blob();
        let randomBytes = Array.subArray(Blob.toArray(randomBlob), 0, 29);
        return Principal.fromBlob(Blob.fromArray(randomBytes));
    };

    // Crear un producto (shared async)
    public shared({caller}) func createProducto(
        nombre: Text,
        precio: Float,
        descripcion: Text,
        artesano: Text,
        tipo: Text
    ): async Producto {
        // Correcto: usamos `await` para esperar el ID generado
        let id = await generateId();
        let producto: Producto = {
            id = id;
            nombre = nombre;
            precio = precio;
            descripcion = descripcion;
            artesano = artesano;
            tipo = tipo;
            imagen = null;
        };
        productos_table.put(id, producto);  // Guardamos en el HashMap
        return producto;  // Devolvemos el producto creado
    };

    // Leer todos los productos (consulta query)
    public query func readProductos(): async [Producto] {
        return Iter.toArray(productos_table.vals());  // Convertimos a array
    };

    // Leer un producto por ID (consulta query)
    public query func readProductoById(id: Principal): async ?Producto {
        return productos_table.get(id);  // Devolvemos el producto si existe
    };

    // Eliminar un producto por ID
    public shared({caller}) func deleteProducto(
        id: Principal
    ): async Result.Result<Producto, AplicationError> {
        switch (productos_table.remove(id)) {
            case (?producto) { return #ok(producto); };
            case null { return #err(#ProductoNoExiste(Principal.toText(id))); };
        }
    };

    // Actualizar un producto existente
    public shared({caller}) func updateProducto(
        id: Principal,
        nombre: Text,
        precio: Float,
        descripcion: Text,
        artesano: Text,
        tipo: Text
    ): async Result.Result<Producto, AplicationError> {
        switch (productos_table.get(id)) {
            case (?productoExistente) {
                let updatedProducto: Producto = {
                    id = id;
                    nombre = nombre;
                    precio = precio;
                    descripcion = descripcion;
                    artesano = artesano;
                    tipo = tipo;
                    imagen = productoExistente.imagen;
                };
                productos_table.put(id, updatedProducto);
                return #ok(updatedProducto);
            };
            case null { return #err(#ProductoNoExiste(Principal.toText(id))); };
        }
    };

    // Subir una imagen a un producto
    public shared({caller}) func uploadImagen(
        id: Principal,
        imagen: Blob
    ): async Result.Result<Producto, AplicationError> {
        switch (productos_table.get(id)) {
            case (?productoExistente) {
                let updatedProducto: Producto = {
                    id = id;
                    nombre = productoExistente.nombre;
                    precio = productoExistente.precio;
                    descripcion = productoExistente.descripcion;
                    artesano = productoExistente.artesano;
                    tipo = productoExistente.tipo;
                    imagen = ?imagen;
                };
                productos_table.put(id, updatedProducto);
                return #ok(updatedProducto);
            };
            case null { return #err(#ProductoNoExiste(Principal.toText(id))); };
        }
    };
}
