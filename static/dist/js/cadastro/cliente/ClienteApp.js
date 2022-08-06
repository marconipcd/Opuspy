//Define variables for input elements
var fieldEl = document.getElementById("filter-field");
var typeEl = document.getElementById("filter-type");
var valueEl = document.getElementById("filter-value");

//Custom filter example
function customFilter(data){
    return data.car && data.rating < 3;
}

//Trigger setFilter function with correct parameters
function updateFilter(){
  var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
  var typeVal = typeEl.options[typeEl.selectedIndex].value;

  var filter = filterVal == "function" ? customFilter : filterVal;

  if(filterVal == "function" ){
    typeEl.disabled = true;
    valueEl.disabled = true;
  }else{
    typeEl.disabled = false;
    valueEl.disabled = false;
  }

  if(filterVal){
    table.setFilter(filter,typeVal, valueEl.value);
  }
}

//Update filters on value change
document.getElementById("filter-field").addEventListener("change", updateFilter);
document.getElementById("filter-type").addEventListener("change", updateFilter);
document.getElementById("filter-value").addEventListener("keyup", updateFilter);

//Clear filters on "Clear Filters" button click
document.getElementById("filter-clear").addEventListener("click", function(){
  fieldEl.value = "endereco";
  typeEl.value = "like";
  valueEl.value = "";

  table.clearFilter();
});

//Build Tabulator
var table = new Tabulator("#example-table", {
 	layout:"fitColumns",
    pagination:"local",
    paginationSize:15,
    paginationSizeSelector:[15,50,100],
    movableColumns:true,
    paginationCounter:"rows",
    responsiveLayout:"hide",
    locale:true,
    langs:{
     	"pagination":{
            	"page_size":"Qtd por Página", //label for the page size select element
                "page_title":"Show Page",//tooltip text for the numeric page button, appears in front of the page number (eg. "Show Page" will result in a tool tip of "Show Page 1" on the page 1 button)
                "first":"Primeira", //text for the first page button
                "first_title":"Primeira Página", //tooltip text for the first page button
                "last":"Última",
                "last_title":"Última Página",
                "prev":"Anterior",
                "prev_title":"Próxima Página",
                "next":"Próxima",
                "next_title":"Próxima Página",
                "all":"Todos",
                "counter":{
                    "showing": "Mostrando",
                    "of": "de",
                    "rows": "resultados",
                    "pages": "páginas",
                }
            }
       },
      columns:[
      {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"left", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
      }}
    ],
    
});