const fs = require("fs");
const path = require("path");
const pathFile = path.join(__dirname, "../db/compras.json");
const { v4: uuid } = require("uuid");

const leerListaCompra = () => {
  return JSON.parse(fs.readFileSync(pathFile));
};

const insertarProduct = (product) => {
  const db = leerListaCompra();
  product.id = uuid;
  db.push(product);
  fs.writeFileSync(pathFile, JSON.stringify(db, null, 4), "utf-8");
};

const deleteProduct = (name) => {
  const db = leerListaCompra();
  db.filter((item) => item.name === name);
  const newdb = db.filter((item) => item.name !== name);
  fs.writeFileSync(pathFile, JSON.stringify(newdb, null, 4), "utf-8");
  return true;
};

const editProduct = (name, product) => {
  const db = leerListaCompra();
  const newdb = db.filter((item) => item.name !== name);
  if (db.length != newdb.length) {
    newdb.push(product);
    fs.writeFileSync(pathFile, JSON.stringify(newdb, null, 4), "utf-8");
    return true;
  }
  return false;
};

module.exports = {
  deleteProduct,
  editProduct,
  insertarProduct,
  leerListaCompra,
};
