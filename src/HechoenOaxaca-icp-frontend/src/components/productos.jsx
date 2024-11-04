import React, { useEffect, useState } from "react"; 
import { useCanister } from "@connect2ic/react";
import { useConnect } from "@connect2ic/react";
import Home from './Home';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createMachine } from 'xstate';

const myMachine = createMachine({
  predictableActionArguments: true,
});

const Products = () => {
  const [marketplaceBackend] = useCanister("HechoenOaxaca-icp-backend");
  const { principal } = useConnect();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const fetchProducts = async () => {
    setLoading("Cargando...");
    try {
      const productsRes = await marketplaceBackend.readProductos();
      setProducts(productsRes);
      setLoading("");
    } catch (e) {
      console.log(e);
      setLoading("Error al cargar los productos.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("Puedes subir un máximo de 3 imágenes.");
      return;
    }
    setSelectedImages(files);
  };

  const updateProduct = async () => {
    const form = document.getElementById("formEditar");
    const nombre = form.nombre.value;
    const precio = parseFloat(form.precio.value);
    const descripcion = form.descripcion.value;
    const artesano = form.artesano.value;
    const tipo = form.tipo.value;

    setLoading("Actualizando producto...");

    const imageBlobs = await Promise.all(
      selectedImages.map((image) =>
        image.arrayBuffer().then((buffer) => new Blob([buffer], { type: image.type }))
      )
    );

    await marketplaceBackend.updateProducto(idProduct, nombre, precio, descripcion, artesano, tipo, imageBlobs);
    setLoading("");
    setShowModalEditar(false);
    fetchProducts();
  };

  const handleShowModalEditar = async (idProducto) => {
    setShowModalEditar(true);
    setIdProduct(idProducto);
    const producto = await marketplaceBackend.readProductoById(idProducto);
    
    if (producto) {
      const form = document.getElementById("formEditar");
      form.nombre.value = producto.nombre;
      form.precio.value = producto.precio;
      form.descripcion.value = producto.descripcion;
      form.artesano.value = producto.artesano;
      form.tipo.value = producto.tipo;
    }
  };

  const handleShowModalEliminar = (idProducto) => {
    setIdProduct(idProducto);
    setShowModalEliminar(true);
  };

  const deleteProduct = async () => {
    setLoading("Eliminando producto...");
    await marketplaceBackend.deleteProducto(idProduct);
    setLoading("");
    setShowModalEliminar(false);
    fetchProducts();
  };

  return (
    <>
      {principal ? (
        <div className="row mt-5">
          <div className="col">
            {loading && <div className="alert alert-primary">{loading}</div>}
            <div className="card">
              <div className="card-header">Lista de productos</div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Descripción</th>
                      <th>Artesano</th>
                      <th>Imágenes</th> {/* Columna nueva para las imágenes */}
                      <th>Tipo</th>
                      <th colSpan="2">Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.nombre}</td>
                        <td>{product.precio}</td>
                        <td>{product.descripcion}</td>
                        <td>{product.artesano}</td>
                        {/* Muestra las imágenes */}
                        <td>
                          {product.imagenes && product.imagenes.length > 0 ? (
                            product.imagenes.map((imagen, index) => (
                              <img 
                                key={index} 
                                src={URL.createObjectURL(imagen)} 
                                alt={`Imagen de ${product.nombre}`} 
                                style={{ maxWidth: "50px", maxHeight: "50px", marginRight: "5px" }} 
                              />
                            ))
                          ) : (
                            <span>Sin imagen</span>
                          )}
                        </td>
                        <td>{product.tipo}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleShowModalEditar(product.id)}
                          >
                            Editar
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleShowModalEliminar(product.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal para editar producto */}
            <Modal show={showModalEditar} onHide={() => setShowModalEditar(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Actualizar producto</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form id="formEditar">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre del producto</label>
                    <input type="text" className="form-control" id="nombre" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="precio">Precio</label>
                    <input type="number" step="0.01" className="form-control" id="precio" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <input type="text" className="form-control" id="descripcion" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="artesano">Nombre del artesano</label>
                    <input type="text" className="form-control" id="artesano" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tipo">Tipo de producto</label>
                    <select className="form-control" id="tipo">
                      <option value="textil">Textil</option>
                      <option value="artesania">Artesanía</option>
                      <option value="dulces">Dulces tradicionales</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="imagenes">Imágenes (máximo 3)</label>
                    <input type="file" className="form-control" id="imagenes" accept="image/*" multiple onChange={handleImageChange} />
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModalEditar(false)}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={updateProduct}>
                  Guardar
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Modal para eliminar producto */}
            <Modal show={showModalEliminar} onHide={() => setShowModalEliminar(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmación</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>¿Estás seguro que deseas eliminar este producto?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModalEliminar(false)}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={deleteProduct}>
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </>
  );
};

export default Products;
