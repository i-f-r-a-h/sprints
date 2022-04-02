/*var xhr = new XMLHttpRequest();
xhr.open('GET', '../data/products.json');
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4 && xhr.status === 200) {
    var products = JSON.parse(xhr.responseText);
    var statusHTML = '<ul class="bulleted">';
    for (var i=0; i<employees.length; i += 1) {
      if (employees[i].inoffice === true) {
        statusHTML += '<li class="in">';
      } else {
        statusHTML += '<li class="out">';
      }
      statusHTML += employees[i].name;
      statusHTML += '</li>';
    }
    statusHTML += '</ul>';
    document.getElementById('employeeList').innerHTML = statusHTML;
  }
};
xhr.send();



// let divCategory = document.getElementById('category-area');
// let html = "";
//     category.forEach(show=> {
//         html += `<div class="col-lg-3 col-md-6 col-sm-auto">
//                     <img class="img-fluid w-75 rounded" src="assets/images/homepage/${show.category_image}.jpg" alt="">
//                     <p class="text-black font-weight-bold">${show.category_name} <span><img src="icons/arrow-right-short.svg" alt=""></span></p>
//                 </div>`
//         console.log(show)
//         divCategory.innerHTML = html
//     }) */