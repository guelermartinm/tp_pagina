const qtyBuzo    = document.getElementById("qtyBuzo");
const qtyRemera  = document.getElementById("qtyRemera");
const qtyCargo   = document.getElementById("qtyCargo");
const qtyCamisa  = document.getElementById("qtyCamisa");
const qtyShort   = document.getElementById("qtyShort");
const qtyMochila = document.getElementById("qtyMochila");

const resultados    = document.getElementById("resultados");
const totalSinEl    = document.getElementById("totalSin");
const descuentoEl   = document.getElementById("descuento");
const totalFinalEl  = document.getElementById("totalFinal");
const promoAplicada = document.getElementById("promoAplicada");

document.getElementById("calcularBtn").addEventListener("click", () => {
  const productos = [
    { nombre: "Buzo Archivo Negro",    precio: 120000, cantidad: Number(qtyBuzo.value)    || 0 },
    { nombre: "Remera Prototipo Gris", precio:  66000, cantidad: Number(qtyRemera.value)  || 0 },
    { nombre: "Pantalón Cargo OPS",    precio: 180000, cantidad: Number(qtyCargo.value)   || 0 },
    { nombre: "Camisa Uniforme",       precio: 150000, cantidad: Number(qtyCamisa.value)  || 0 },
    { nombre: "Short Archivo",         precio:  95000, cantidad: Number(qtyShort.value)   || 0 },
    { nombre: "Mochila Utilitaria",    precio: 130000, cantidad: Number(qtyMochila.value) || 0 },
  ];

  const totalSinDesc = productos.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  const totalUnidades = productos.reduce(
    (acc, p) => acc + p.cantidad,
    0
  );

  if (totalUnidades === 0) {
    alert("Agregá al menos 1 unidad de algún producto.");
    resultados.style.display = "none";
    return;
  }

  // --- PROMO 1: 2° producto al 50% (por producto) ---
  let descPromo1 = 0;
  productos.forEach(p => {
    const pares = Math.floor(p.cantidad / 2); // cada 2 prendas, una al 50%
    descPromo1 += pares * p.precio * 0.5;
  });

  // --- PROMO 2: 3x2 (por producto) ---
  let descPromo2 = 0;
  productos.forEach(p => {
    const grupos3 = Math.floor(p.cantidad / 3); // cada 3, una gratis
    descPromo2 += grupos3 * p.precio;
  });

  // --- PROMO 3: 10% OFF desde $30.000 ---
  let descPromo3 = 0;
  if (totalSinDesc >= 30000) {
    descPromo3 = totalSinDesc * 0.10;
  }

  // Elegimos la promo que más descuenta (no acumulables)
  const descuentos = [
    { nombre: "2° producto al 50%", valor: descPromo1 },
    { nombre: "3x2 en el mismo producto", valor: descPromo2 },
    { nombre: "10% OFF desde $30.000", valor: descPromo3 },
  ];

  let mejor = { nombre: "Sin promoción aplicable", valor: 0 };

  descuentos.forEach(promo => {
    if (promo.valor > mejor.valor) {
      mejor = promo;
    }
  });

  const totalFinal = totalSinDesc - mejor.valor;

  totalSinEl.textContent    = totalSinDesc.toLocaleString();
  descuentoEl.textContent   = mejor.valor.toLocaleString();
  totalFinalEl.textContent  = totalFinal.toLocaleString();
  promoAplicada.textContent = mejor.nombre;

  resultados.style.display = "block";
});
