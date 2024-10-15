import { useCanister } from "@connect2ic/react";
import React, { useState } from "react";

const ProductCreate = () => {
    const [marketplace_backend] = useCanister("marketplace_backend"); // Cambia el canister a tu backend de productos
    const [loading, setLoading] = useState("");

    const saveProduct = async (e) => {
        e.preventDefault();
        const form = e.target;
        const nombre = form.nombre.value;
        const precio = parseFloat(form.precio.value); // Convertir el precio a tipo float
        const descripcion = form.descripcion.value;
        const artesano = form.artesano.value;

        setLoading("Loading...");

        await marketplace_backend.createProducto(nombre, precio, descripcion, artesano);
        setLoading("");

        {
            document.getElementById('btnProductList').click(); // Asume que tienes un botón para mostrar la lista de productos
        }
    }

    return (
        <div className="row mt-5">
            <div className="col-2"></div>
            <div className="col-8">
                {loading !== "" 
                    ? <div className="alert alert-primary">{loading}</div>
                    : <div></div>
                }
                <div className="card">
                    <div className="card-header">
                        Registrar Producto
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveProduct} style={{display:"inline"}} >
                            <div className="form-group">
                                <label htmlFor="nombre" >Nombre del Producto</label>
                                <input type="text" className="form-control" id="nombre" placeholder="Nombre del producto" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="precio" >Precio</label>
                                <input type="number" step="0.01" className="form-control" id="precio" placeholder="19.99" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="descripcion" >Descripción</label>
                                <input type="text" className="form-control" id="descripcion" placeholder="Descripción del producto" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="artesano" >Nombre del Artesano</label>
                                <input type="text" className="form-control" id="artesano" placeholder="Nombre del artesano" required />
                            </div>
                            <br />
                            <div className="form-group">
                                <input type="submit" className="btn btn-success" value="Agregar Producto" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-2"></div>
        </div>
    );
}

export default ProductCreate;
