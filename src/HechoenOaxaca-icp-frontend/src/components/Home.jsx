// Home.jsx
import { useCanister } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Compra from './Compra';

const Home = () => {
  const [marketplaceBackend] = useCanister('HechoenOaxaca-icp-backend');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsRes = await marketplaceBackend.readProductos();
      setProducts(productsRes);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handlePurchase = (product) => {
    // Lógica de compra aquí
    alert(`Compraste el producto: ${product.nombre}`);
    setShowModal(false);
  };

  return (
    <section className="mt-5 text-center">
      <h1>Hecho a mano, hecho con el corazón</h1>
      <div className="container mt-4">
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{product.nombre}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Artesano: {product.artesano}
                    </Card.Subtitle>
                    <Card.Text>{product.descripcion}</Card.Text>
                    <Card.Text>Precio: ICP {product.precio}</Card.Text>
                    <Button variant="primary" onClick={() => handleShowDetails(product)}>
                      Ver Detalles
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de detalles del producto */}
      <Compra
        show={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
        onPurchase={handlePurchase}
      />
    </section>
  );
};

export default Home;