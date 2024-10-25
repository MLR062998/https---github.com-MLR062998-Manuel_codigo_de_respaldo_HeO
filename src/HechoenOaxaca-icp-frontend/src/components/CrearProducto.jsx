import { useCanister } from "@connect2ic/react";
import React, { useState } from "react";

const CrearProducto = () => {
  //const [HechoenOaxaca-icp-backend] = useCanister("HechoenOaxaca-icp-backend");
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
              <div className="form-group">
                <label htmlFor="imagenes">Subir Imágenes (Máximo 3)</label>
                <input type="file" className="form-control" id="imagenes" accept="image/*" multiple onChange={handleImageChange} />
              </div>
              <button type="submit" className="btn btn-success mt-3">Agregar Producto</button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-2"></div>
    </div>
  );
};

// Asegúrate de que el nombre coincida con el del componente
export default CrearProducto;
