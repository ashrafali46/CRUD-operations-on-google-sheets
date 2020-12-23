<script>
  // Prevent forms from submitting.
  function preventFormSubmit() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', function(event) {
      event.preventDefault();
      });
    }
  }
  window.addEventListener("load", functionInit, true); 
  
  //INITIALIZE FUNCTIONS ONLOAD
  function functionInit(){  
    preventFormSubmit();
    getLastTenRows();
  };      
  
  //HANDLE FORM SUBMISSION
  function handleFormSubmit(formObject) {
    google.script.run.withSuccessHandler(createTable).processForm(formObject);
    document.getElementById("myForm").reset();
  }
  
  //GET LAST 10 ROWS
  function getLastTenRows (){
   google.script.run.withSuccessHandler(createTable).getLastTenRows();
  }
  
  
  //GET ALL DATA
  function getAllData(){
    //document.getElementById('dataTable').innerHTML = "";
    google.script.run.withSuccessHandler(createTable).getAllData();
  }
  
  
  //CREATE THE DATA TABLE
  function createTable(dataArray) {
    if(dataArray){
      var result = "<table class='table table-sm' style='font-size:0.8em'>"+
                   "<thead style='white-space: nowrap'>"+
                     "<tr>"+                               //Change table headings to match witht he Google Sheet
                      "<th scope='col'>Delete</th>"+
                      "<th scope='col'>Edit</th>"+
                      "<th scope='col'>ID</th>"+
                      "<th scope='col'>Name</th>"+
                      "<th scope='col'>Date of Assignment</th>"+
                      "<th scope='col'>Module</th>"+
                      "<th scope='col'>RICEF</th>"+
                      "<th scope='col'>Status</th>"+
                      "<th scope='col'>Description</th>"+
                    "</tr>"+
                  "</thead>";
      for(var i=0; i<dataArray.length; i++) {
          result += "<tr>";
          result += "<td><button type='button' class='btn btn-danger btn-xs deleteBtn' onclick='deleteData(this);'>Delete</button></td>";
          result += "<td><button type='button' class='btn btn-warning btn-xs editBtn' onclick='editData(this);'>Edit</button></td>";
          for(var j=0; j<dataArray[i].length; j++){
              result += "<td>"+dataArray[i][j]+"</td>";
          }
          result += "</tr>";
      }
      result += "</table>";
      var div = document.getElementById('dataTable');
      div.innerHTML = result;
      document.getElementById("message").innerHTML = "";
    }else{
      var div = document.getElementById('dataTable');
      div.innerHTML = "Data not found!";
    }
  }

  //DELETE DATA
  function deleteData(el) {
    var result = confirm("Want to delete?");
    if (result) {
      var recordId = el.parentNode.parentNode.cells[2].innerHTML;
      google.script.run.withSuccessHandler(createTable).deleteData(recordId);
    }
  }
  
  
  //EDIT DATA
  function editData(el){
    var recordId = el.parentNode.parentNode.cells[2].innerHTML; //https://stackoverflow.com/a/32377357/2391195
    google.script.run.withSuccessHandler(populateForm).getRecordById(recordId);
  }

  //POPULATE FORM
  function populateForm(records){
    document.getElementById('RecId').value = records[0][0];
    document.getElementById('name').value = records[0][1];
    document.getElementById('dateOfAssignment').value = records[0][2];
    document.getElementById("module").value = records[0][3];
    document.getElementById(records[0][4]).checked = true;
    document.getElementById('status').value = records[0][5];
    document.getElementById('description').value = records[0][6];
    document.getElementById("message").innerHTML = "<div class='alert alert-warning' role='alert'>Update Record [ID: "+records[0][0]+"]</div>";
  }
  
  //RETRIVE DATA FROM GOOGLE SHEET FOR MODULE DROPDOWN
  function createModuleDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(moduleDropDown).getDropdownList("Cmodule!A1:A9");
  }
  
  //POPULATE MODULE DROPDOWNS
  function moduleDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('module');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }
  
  //RETRIVE DATA FROM GOOGLE SHEET FOR STATUS DROPDOWN
  function createStatusDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(statusDropDown).getDropdownList("Cstatus!A1:A5");
  }
  
  //POPULATE STATUS DROPDOWNS
  function statusDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('status');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }  
</script>



