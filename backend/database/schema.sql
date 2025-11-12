-- Crear base de datos
CREATE DATABASE IF NOT EXISTS zapatillas_db;
USE zapatillas_db;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  marca VARCHAR(100) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de ventas
CREATE TABLE IF NOT EXISTS ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  fecha DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_ventas_producto ON ventas(producto_id);
CREATE INDEX idx_ventas_fecha ON ventas(fecha);
CREATE INDEX idx_productos_marca ON productos(marca);

-- Datos de ejemplo
INSERT INTO productos (nombre, marca, precio, stock) VALUES
('Air Max 90', 'Nike', 129.99, 50),
('Ultraboost 21', 'Adidas', 179.99, 30),
('Chuck Taylor', 'Converse', 59.99, 100),
('574 Core', 'New Balance', 84.99, 45),
('Suede Classic', 'Puma', 69.99, 60),
('Old Skool', 'Vans', 64.99, 80),
('Gel-Kayano', 'Asics', 159.99, 25),
('Classic Leather', 'Reebok', 74.99, 55);

-- Generar datos de ventas de ejemplo (últimos 12 meses)
INSERT INTO ventas (producto_id, cantidad, precio_unitario, fecha)
SELECT 
  FLOOR(1 + RAND() * 8) as producto_id,
  FLOOR(1 + RAND() * 10) as cantidad,
  (SELECT precio FROM productos WHERE id = FLOOR(1 + RAND() * 8) LIMIT 1) as precio_unitario,
  DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 365) DAY) as fecha
FROM 
  (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) t1,
  (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) t2,
  (SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) t3
LIMIT 200;
