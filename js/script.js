const jsonPath = "./../json/nutrientes.json";
const proteinasRestantes = document.getElementById("proteinasRestantes");
const grasasRestantes = document.getElementById("grasasRestantes");
const carbohidratosRestantes = document.getElementById("carbohidratosRestantes");
const contenedor = document.getElementById("container");
const resetButton = document.getElementById("resetButton");



// Guardar valores en LocalStorage
if (!localStorage.getItem("proteinas")) {
    localStorage.setItem("proteinas", 140);
}

if (!localStorage.getItem("grasas")) {
    localStorage.setItem("grasas", 70);
}

if (!localStorage.getItem("carbohidratos")) {
    localStorage.setItem("carbohidratos", 353);
}

let proteinas = parseFloat(localStorage.getItem("proteinas"));
let grasas = parseFloat(localStorage.getItem("grasas"));
let carbohidratos = parseFloat(localStorage.getItem("carbohidratos"));
// Actualizar valores en LocalStorage
function actualizarValores() {
    localStorage.setItem("proteinas", proteinas);
    localStorage.setItem("grasas", grasas);
    localStorage.setItem("carbohidratos", carbohidratos);
    proteinasRestantes.textContent = proteinas.toFixed(2);
    grasasRestantes.textContent = grasas.toFixed(2);
    carbohidratosRestantes.textContent = carbohidratos.toFixed(2);
}

actualizarValores();

fetch(jsonPath)
    .then(response => response.json())
    .then(alimentos => {
        alimentos.alimentos.forEach(a => {
            contenedor.innerHTML +=
                `<div class="alimento" id="${a.nombre}">
                <p class="nombre-alimento">${a.nombre}</p>
                <div class="cantidad">
                    <p>Cantidad</p>
                    <div class="contador">
                        <input type="number" min="0"></input>
                        <button class="confirmar" attribute-name="${a.nombre}"><i class="fa-solid fa-check"></i></button>
                    </div>
                </div>
            </div>`;

        });
        document.querySelectorAll(".confirmar").forEach(btn => {
            btn.addEventListener("click", () => {
                const nombre = btn.getAttribute("attribute-name");
                const alimento = alimentos.alimentos.find(a => a.nombre === nombre);
                const input = btn.parentElement.querySelector('input');
                const cantidad = parseFloat(input.value)

                if (!cantidad || cantidad <= 0) return;

                if (nombre.toLowerCase() == "huevo"
                    || nombre.toLowerCase() == "banana"
                    || nombre.toLowerCase() == "manzana"
                    || nombre.toLowerCase() == "pera"
                    || nombre.toLowerCase() == "naranja"
                ) {
                    proteinas -= (alimento.proteina * cantidad);
                    grasas -= (alimento.grasas * cantidad);
                    carbohidratos -= (alimento.carbohidratos * cantidad);
                    actualizarValores();
                } else {
                    const factor = cantidad / alimento.cantidad_gramos
                    proteinas -= (alimento.proteina * factor);
                    grasas -= (alimento.grasas * factor);
                    carbohidratos -= (alimento.carbohidratos * factor);
                    actualizarValores();
                }
            })
        })
    });

resetButton.addEventListener("click", () => {
    proteinas = 140;
    grasas = 70;
    carbohidratos = 353;
    actualizarValores();
})