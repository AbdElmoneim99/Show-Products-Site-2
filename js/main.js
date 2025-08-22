var productImage = document.getElementById("productImage");
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCateg = document.getElementById("productCateg");
var productDesc = document.getElementById("productDesc");
var productOld = document.getElementById("old price");
var productContainer;
var change = "Add product";
var Bedo;
var n = 0;

if (localStorage.getItem("ourProducts") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("ourProducts"));
  displayProduct();
}

function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    categ: productCateg.value,
    desc: productDesc.value,
    oPrice: productOld.value,
    img: `img/${productImage.files[0].name}`,
    n: 1,
  };
  console.log(product.img);
  if (change === "Update") {
    productContainer[Bedo] = product;
    change = "Add product";
  } else if (change === "Add product") {
    productContainer.push(product);
  }
  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  displayProduct();
  emptyInput();
}

function displayProduct() {
  var cartoona = "";
  for (var i = 0; i < productContainer.length; i++) {
    cartoona += `
            <div class="col-sm-6 col-md-6 col-lg-3 mt-5">
            <div class="picture bg-secondary text-center">
              <div class="photo">
                <img src="${productContainer[i].img}"  />
              </div>
              <div class="products">
                <h2>${productContainer[i].name}</h2>
                <h5>${productContainer[i].categ}</h5>
                <p>${productContainer[i].desc}</p>
                <span>price:</span>
                <span class="ss p-2">${productContainer[i].price}</span>
              <p>old price:<del>${productContainer[i].oPrice}</del></p>
                </br>
                 <button class="btn btn-warning" onclick="min()">
                -
            </button>

            <span>${n}</span>
            <button class="btn btn-warning" onclick="plus()">
                +
            </button>
            
            </br>
            </br>
   
           <button class="btn btn-danger " onclick="deleteRow(${i})" >
                Delete
            </button>
            </td>
          <td> 
            <button class="btn btn-warning" onclick="updatedata(${i})">
                Update
            </button>
            </br>
            </br>
              </div>
            </div>
          </div>
        `;

    document.getElementById("print").innerHTML = cartoona;
  }
}
function plus() {
  n++;
  displayProduct();
}

function min() {
  n--;
  if (n >= 0) {
    displayProduct();
  }
  if (n <= 0) {
    n = 0;
  }
}
function updatedata(i) {
  productName.value = productContainer[i].name;
  productPrice.value = productContainer[i].price;
  productCateg.value = productContainer[i].categ;
  productDesc.value = productContainer[i].desc;
  change = "Update";
  Bedo = i;
  scroll({ top: 0, behavior: "smooth" });
}

function emptyInput() {
  productName.value = null;
  productPrice.value = null;
  productCateg.value = null;
  productDesc.value = null;
}

function deleteAll() {
  productContainer.splice(0);
  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  displayProduct();
}

function deleteRow(i) {
  productContainer.splice(i, 1);
  displayProduct();
}
