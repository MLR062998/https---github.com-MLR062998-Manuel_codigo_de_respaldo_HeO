import { useCanister } from "@connect2ic/react";
import React, { useState } from "react";

const ProductCreate = () => {
  const [marketplaceBackend] = useCanister("HechoenOaxaca-icp-backend"); // Referencia correcta al backend
  const [loading, setLoading] = useState("");

  const saveProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const nombre = form.nombre.value;
    const precio = parseFloat(form.precio.value);
    const descripcion = form.descripcion.value;
    const artesano = form.artesano.value;
    const tipo = form.tipo.value;

    setLoading("Cargando...");

    await marketplaceBackend.createProducto(nombre, precio, descripcion, artesano, tipo);
    setLoading("");
    form.reset(); // Limpiar el formulario después de guardar
  };

  return (
    <div className="row mt-5">
      <div className="col-2"></div>
      <div className="col-8">
        {loading && <div className="alert alert-primary">{loading}</div>}
        <div className="card">
          <div className="card-header">Registrar Producto</div>
          <div className="card-body">
            <form onSubmit={saveProduct}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre del Producto</label>
                <input type="text" className="form-control" id="nombre" required />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input type="number" step="0.01" className="form-control" id="precio" required />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <input type="text" className="form-control" id="descripcion" required />
              </div>
              <div className="form-group">
                <label htmlFor="artesano">Nombre del Artesano</label>
                <input type="text" className="form-control" id="artesano" required />
              </div>
              <div className="form-group">
                <label htmlFor="tipo">Tipo de Producto</label>
                <select className="form-control" id="tipo" required>
                  <option value="textil">Textil</option>
                  <option value="artesania">Artesanía</option>
                  <option value="dulces">Dulces tradicionales</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success mt-3">
                Agregar Producto
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default ProductCreate;
