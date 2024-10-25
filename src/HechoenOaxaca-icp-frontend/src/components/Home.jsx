// Home.jsx
import { useCanister } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [marketplaceBackend] = useCanister("HechoenOaxaca-icp-backend"); // Conecta al canister del backend
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para obtener los productos al cargar el componente
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsRes = await marketplaceBackend.readProductos();
      setProducts(productsRes);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
                    <Card.Text>Precio: ${product.precio}</Card.Text>
                    <Card.Text>Tipo: {product.tipo}</Card.Text>
                    <Button variant="primary">Ver Detalles</Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;

