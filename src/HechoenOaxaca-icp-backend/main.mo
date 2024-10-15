import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Random "mo:base/Random";

// Estructura para los productos
type Producto = {
    id: Principal;
    nombre: Text;
    precio: Float;
    descripcion: Text;
    artesano: Text;
    tipo: Text;  // Nuevo campo para el tipo de producto
    imagen: ?Blob;
};

// Definimos errores posibles
type AplicationError = {
    #ProductoNoExiste: Text;
};

actor {
    // Tabla HashMap para almacenar productos
    var productos_table: HashMap.HashMap<Principal, Producto> = 
        HashMap.HashMap(10, Principal.equal, Principal.hash);

    // Genera un ID aleatorio de manera correcta
    public func generateId(): async Principal {
        let randomBlob = await Random.blob();  // Uso correcto de await dentro de una función async
        let randomBytes = Array.subArray<Nat8>(Blob.toArray(randomBlob), 0, 29);  
        return Principal.fromBlob(Blob.fromArray(randomBytes));
    };

    // Crear un nuevo producto
    public shared({caller}) func createProducto(
        nombre: Text,
        precio: Float,
        descripcion: Text,
        artesano: Text,
        tipo: Text
    ): async Producto {
        let id = await generateId();  // Llamada async correctamente manejada

        let producto: Producto = {
            id = id;
            nombre = nombre;
            precio = precio;
            descripcion = descripcion;
            artesano = artesano;
            tipo = tipo;
            imagen = null;
        };

        productos_table.put(id, producto);  // Almacena el producto en la tabla
        return producto;
    };

    // Obtener todos los productos
    public query func readProductos(): async [Producto] {
        let productosIter = productos_table.vals();
        return Iter.toArray(productosIter);
    };

    // Obtener un producto por ID
    public query func readProductoById(id: Principal): async ?Producto {
        return productos_table.get(id);
    };

    // Eliminar un producto
    public shared({caller}) func deleteProducto(
        id: Principal
    ): async Result.Result<Producto, AplicationError> {
        switch (productos_table.remove(id)) {
            case (?producto) { return #ok(producto); };
            case null { return #err(#ProductoNoExiste(Principal.toText(id))); };
        }
    };

    // Actualizar un producto
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

    // Subir imagen a un producto
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
