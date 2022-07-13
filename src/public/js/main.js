const form = document.querySelector(".formulario");
const mensaje = document.querySelector(".mensaje");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    ...data,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("/products", requestOptions)
    .then((response) => response.json())
    .then(
      (result) =>
        (mensaje.innerHTML = `Ingreso ${result.name} al sistema , total actual :${result.total}`)
    )
    .catch((error) => alert(error));

  alert("Datos enviados");
});
