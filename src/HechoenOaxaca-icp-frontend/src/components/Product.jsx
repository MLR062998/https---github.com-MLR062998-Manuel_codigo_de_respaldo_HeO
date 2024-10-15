import { useCanister, useConnect } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import Home from './Home';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Products = () => {
  
  const [marketplaceBackend] = useCanister("marketplace_backend");
  const { principal } = useConnect();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [productName, setProductName] = useState("");

  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);

  const updateProduct = async () => {
    const form = document.getElementById("formEditar");
    
    const nombre = form.nombre.value;
    const precio = parseFloat(form.precio.value); // Parsear a float
    const descripcion = form.descripcion.value;
    const artesano = form.artesano.value;

    setLoading("Loading...");

    await marketplaceBackend.updateProducto(idProduct, nombre, precio, descripcion, artesano);
    setLoading("");
    setIdProduct("");

    setShowModalEditar(false);
    fetchProducts();
  }

  const handleShowModalEditar = async (idProducto) => {
    setShowModalEditar(true);
    setIdProduct(idProducto);
    
    const producto = await marketplaceBackend.readProductoById(idProducto);

    const form = document.getElementById("formEditar");
    form.nombre.value = producto[0].nombre;
    form.precio.value = producto[0].precio;
    form.descripcion.value = producto[0].descripcion;
    form.artesano.value = producto[0].artesano;
  }

  const handleShowModalEliminar = async (idProducto, nombreProducto) => {
    setShowModalEliminar(true);
    setProductName(nombreProducto);
    setIdProduct(idProducto);
  }

  const handleCloseModalEditar = () => setShowModalEditar(false);
  const handleCloseModalEliminar = () => setShowModalEliminar(false);

  useEffect(() => {
      fetchProducts();
  }, []);

  const fetchProducts = async () => {
      setLoading("Loading...");
      try {
        const productsRes = await marketplaceBackend.readProductos();
        setProducts(productsRes);   
        setLoading("");
      } catch (e) {
          console.log(e);
          setLoading("Error happened fetching products list");
      }
  }

  const deleteProduct = async () => {
    setLoading("Loading...");

    await marketplaceBackend.deleteProducto(idProduct);
    setLoading("");
    setIdProduct("");
    setProductName("");
    setShowModalEliminar(false);
    
    fetchProducts();
  }
  
  return(
    <>
    { principal 
      ? 
      <div className="row mt-5">
        <div className="col">
          {loading !== "" 
            ? <div className="alert alert-primary">{loading}</div>
            : <div></div>
          }
          <div className="card">
            <div className="card-header">
              Lista de productos
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripción</th>
                    <th>Artesano</th>
                    <th colSpan="2">Opciones</th>
                  </tr>
                </thead>
                <tbody id="tbody">
                  {products.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td>{product.nombre}</td>
                        <td>{product.precio}</td>
                        <td>{product.descripcion}</td>
                        <td>{product.artesano}</td>
                        <td>
                          <button type="button" className="btn btn-primary" onClick={() => handleShowModalEditar(`${product.id}`)}>Editar</button>
                        </td>
                        <td>
                          <button type="button" className="btn btn-danger" onClick={() => handleShowModalEliminar(`${product.id}`, product.nombre)}>Eliminar</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>         
            </div>
          </div>
        </div>

        <Modal show={showModalEditar} onHide={handleCloseModalEditar}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-body">
                {loading !== "" 
                  ? <div className="alert alert-primary">{loading}</div>
                  : <div></div>
                }
                <form style={{display:"inline"}} id="formEditar">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre del producto</label>
                    <input type="text" className="form-control" id="nombre" placeholder="Nombre del producto" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="precio">Precio</label>
                    <input type="number" step="0.01" className="form-control" id="precio" placeholder="19.99" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <input type="text" className="form-control" id="descripcion" placeholder="Descripción del producto" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="artesano">Nombre del artesano</label>
                    <input type="text" className="form-control" id="artesano" placeholder="Nombre del artesano" />
                  </div>
                  <br />
                </form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalEditar}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={updateProduct}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModalEliminar} onHide={handleCloseModalEliminar}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-body">
                {loading !== "" 
                  ? <div className="alert alert-primary">{loading}</div>
                  : <div></div>
                }
                <p>¿Deseas eliminar el producto {productName}?</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalEliminar}>
              Cerrar
            </Button>
            <Button variant="danger" onClick={deleteProduct}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    : 
      <Home />
    }
    </>
  );
}

export default Products;
