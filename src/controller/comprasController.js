const model = require("../model/comprasModel");
module.exports = {
  findAll: (req, res) => {
    const datos = model.leerListaCompra();
    res.status(200).json({ data: datos });
  },
  create: (req, res) => {
    const body = req.body;
    model.insertarProduct(body);
    const lista = model.leerListaCompra()
    const sumWithInitial = lista.reduce(
      (previousValue, currentValue) => previousValue + currentValue.price,
      0
    );
    res.status(200).json({ success: true, name: body.name, total :sumWithInitial * lista.length });
  },
  edit: (req, res) => {
    const body = req.body;
    const name = req.params.name;
    console.log(name);
    const resultado = model.editProduct(name, body);
    res.status(resultado ? 200 : 404).json({ success: resultado });
  },

  delete: (req, res) => {
    const name = req.params.name;
    model.deleteProduct(name);
    res.status(200).json({ success: true });
  },
};
