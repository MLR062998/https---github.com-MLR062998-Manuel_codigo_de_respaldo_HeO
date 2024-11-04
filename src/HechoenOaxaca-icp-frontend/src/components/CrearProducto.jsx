import { useCanister } from "@connect2ic/react";
import React, { useState } from "react";

const CrearProducto = () => {
  const [marketplaceBackend] = useCanister("HechoenOaxaca-icp-backend");
  const [loading, setLoading] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length > 3) {
      alert("Puedes subir un máximo de 3 imágenes.");
      return;
    }
    setImages(selectedImages);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const nombre = form.nombre.value;
    const precio = parseFloat(form.precio.value);
    const descripcion = form.descripcion.value;
    const artesano = form.artesano.value;
    const tipo = form.tipo.value;

    setLoading("Cargando...");

    const imageBlobs = await Promise.all(
      images.map((image) =>
        image.arrayBuffer().then((buffer) => new Blob([buffer], { type: image.type }))
      )
    );

    await marketplaceBackend.createProducto(nombre, precio, descripcion, artesano, tipo, imageBlobs);
    setLoading("");
    setImages([]);
    form.reset();
    navigate("/productos"); // Redirige a la lista de productos
    // Simulación de redirección al listado de productos al guardar
    document.getElementById('btnProductList').click();
  };

  return (
    <div className="row mt-5">
      <div className="col-2"></div>
      <div className="col-8">
        {loading !== "" ? (
          <div className="alert alert-primary">{loading}</div>
        ) : (
          <div></div>
        )}
        <div className="card">
          <div className="card-header">Registrar Producto</div>
          <div className="card-body">
            <form onSubmit={saveProduct} style={{ display: "inline" }}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre del Producto</label>
                <input type="text" className="form-control" id="nombre" placeholder="Ej: Olla de barro" required />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input type="number" step="0.01" className="form-control" id="precio" placeholder="Ej: 15.99" required />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <input type="text" className="form-control" id="descripcion" placeholder="Descripción breve" required />
              </div>
              <div className="form-group">
                <label htmlFor="artesano">Nombre del Artesano</label>
                <input type="text" className="form-control" id="artesano" placeholder="Nombre del artesano" required />
              </div>
              <div className="form-group">
                <label htmlFor="tipo">Tipo de Producto</label>
                <select className="form-control" id="tipo" required>
                  <option value="textil">Textil</option>
                  <option value="artesania">Artesanía</option>
                  <option value="dulces">Dulces tradicionales</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="imagenes">Subir Imágenes (Máximo 3)</label>
                <input type="file" className="form-control" id="imagenes" accept="image/*" multiple onChange={handleImageChange} />
              </div>
              <br />
              <div className="form-group">
                <input type="submit" className="btn btn-success" value="Agregar Producto" />
              </div>
            </form>
            {/* Botón invisible para simular la redirección al listado */}
            <button id="btnProductList" style={{ display: "none" }}>Ir al listado de productos</button>
          </div>
        </div>
      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default CrearProducto;
