const jsonPath = "./../json/nutrientes.json";
const proteinasRestantes = document.getElementById("proteinasRestantes");
const grasasRestantes = document.getElementById("grasasRestantes");
const carbohidratosRestantes = document.getElementById("carbohidratosRestantes");
const contenedor = document.getElementById("container");

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
                btn.addEventListener("click", ()=>{
                    const nombre = btn.getAttribute("attribute-name");
                    const alimento = alimentos.alimentos.find(a = a.nombre === nombre);
                    const input = btn.parentElement.querySelector('input');
                    const cantidad = parseFloat(input.value)

                    if (!cantidad || cantidad <= 0) return;

                    //* Agregar if para tratar por separado los alimentos que se cuentan como unidad
                    //* De los que se cuentan por gramo. Por unidad multiplicar cantidad por valores
                    //* De los que se cuentan por gramo allar factor (cantidad/alimento.cantidad_gramos)
                    //* Y restar a las proteinas restantes el producto de alimento.proteinas * factor


                })
            })
    });

