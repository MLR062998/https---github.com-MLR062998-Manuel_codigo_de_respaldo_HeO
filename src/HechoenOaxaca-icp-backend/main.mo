import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Random "mo:base/Random";

// Definimos el tipo Producto
type Producto = {
    id: Principal;
    nombre: Text;
    precio: Float;
    descripcion: Text;
    artesano: Text;
    tipo: Text;  // Nuevo campo para el tipo de producto
    imagen: ?Blob;
};

type AplicationError = {
    #ProductoNoExiste: Text;
};

actor {
    var productos_table: HashMap.HashMap<Principal, Producto> = 
        HashMap.HashMap(10, Principal.equal, Principal.hash);

    public func generateId(): async Principal {
        let randomBlob = await Random.blob();
        let randomBytes = Array.subArray<Nat8>(Blob.toArray(randomBlob), 0, 29);
        return Principal.fromBlob(Blob.fromArray(randomBytes));
    };

    public shared({caller}) func createProducto(
        nombre: Text,
        precio: Float,
        descripcion: Text,
        artesano: Text,
        tipo: Text  // Nuevo parámetro para el tipo
    ): async Producto {
        let id = await generateId();

        let producto: Producto = {
            id = id;
            nombre = nombre;
            precio = precio;
            descripcion = descripcion;
            artesano = artesano;
            tipo = tipo;  // Asignamos el tipo de producto
            imagen = null;
        };

        productos_table.put(id, producto);
        return producto;
    };

    public query func readProductos(): async [Producto] {
        return Iter.toArray(productos_table.vals());
    };

    public query func readProductoById(id: Principal): async ?Producto {
        return productos_table.get(id);
    };

    public shared({caller}) func deleteProducto(
        id: Principal
    ): async Result.Result<Producto, AplicationError> {
        switch (productos_table.remove(id)) {
            case (?producto) { return #ok(producto); };
            case null { return #err(#ProductoNoExiste(Principal.toText(id))); };
        }
    };

    public shared({caller}) func updateProducto(
        id: Principal,
        nombre: Text,
        precio: Float,
        descripcion: Text,
        artesano: Text,
        tipo: Text  // Actualizamos también el tipo
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
