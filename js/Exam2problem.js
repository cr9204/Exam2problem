function toggleAll()
{
    if (document.getElementById("menu").value == "Display Category List")
    {
        document.getElementById("sectDisplay").style.visibility = "visible";
        document.getElementById("sectAdd").style.visibility = "hidden";
        document.getElementById("sectUpdate").style.visibility = "hidden";
        document.getElementById("sectDelete").style.visibility = "hidden";
        document.getElementById("sectAbout").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Add Product Category")
    {
        document.getElementById("sectDisplay").style.visibility = "hidden";
        document.getElementById("sectAdd").style.visibility = "visible";
        document.getElementById("sectUpdate").style.visibility = "hidden";
        document.getElementById("sectDelete").style.visibility = "hidden";
        document.getElementById("sectAbout").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Update Category Descriptions")
    {
        document.getElementById("sectDisplay").style.visibility = "hidden";
        document.getElementById("sectAdd").style.visibility = "hidden";
        document.getElementById("sectUpdate").style.visibility = "visible";
        document.getElementById("sectDelete").style.visibility = "hidden";
        document.getElementById("sectAbout").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete Category")
    {
        document.getElementById("sectDisplay").style.visibility = "hidden";
        document.getElementById("sectAdd").style.visibility = "hidden";
        document.getElementById("sectUpdate").style.visibility = "hidden";
        document.getElementById("sectDelete").style.visibility = "visible";
        document.getElementById("sectAbout").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "About")
    {
        document.getElementById("sectDisplay").style.visibility = "hidden";
        document.getElementById("sectAdd").style.visibility = "hidden";
        document.getElementById("sectUpdate").style.visibility = "hidden";
        document.getElementById("sectDelete").style.visibility = "hidden";
        document.getElementById("sectAbout").style.visibility = "visible";
    }
    else
    {
        document.getElementById("sectDisplay").style.visibility = "hidden";
        document.getElementById("sectAdd").style.visibility = "hidden";
        document.getElementById("sectUpdate").style.visibility = "hidden";
        document.getElementById("sectDelete").style.visibility = "hidden";
        document.getElementById("sectAbout").style.visibility = "hidden";
    }
}

function GetCategories()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    };

    objRequest.open("GET", url, true);
    objRequest.send();
}
function GenerateOutput(result)
{
    var count = 0;
    var displaytext = "";

    for (count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
        displaytext += "<tr><td id='cid'>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>" + result.GetAllCategoriesResult[count].CDescription + "<tr>";
    }
        document.getElementById("catList").innerHTML += displaytext + "<hr><hr><hr>";
}

function addCategory()
{
  var reqObject = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    var catID = document.getElementById("catID").value;
    var catName = document.getElementById("catName").value;
    var catDesc = document.getElementById("catDesc").value;
    
    var newCategory = '{"CategoryID":"' + catID + '","CategoryName":"' + catName + '","CategoryDescription":"' + catDesc + '"}';
    
    reqObject.onreadystatechange = function()
    {
        if (reqObject.readyState == 4 && reqObject.status == 200)
        {
            var result = JSON.parse(reqObject.responseText);
            OperationResult(result);
        }
    };
    
    reqObject.open("POST", url, true);
    reqObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    reqObject.send(newCategory);
    
}
function OperationResult(output)
{

    if (output.WasSuccessful == 1)
    {
        document.getElementById("result").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

function updateDescription()
{
    var reqObject = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    var catDesc = document.getElementById("catDesc2").value;
    
    reqObject.onreadystatechange = function()
    {
        if (reqObject.readyState == 4 && reqObject.status == 200)
        {
            var result = JSON.parse(reqObject.responseText);
            OperationResult2(result);
        }
    };
    
    reqObject.open("POST", url, true);
    reqObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    reqObject.send(catDesc);
    
}
function OperationResult2(output)
{

    if (output.WasSuccessful == 1)
    {
        document.getElementById("result2").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result2").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}


function deleteCategory()
{

    confirm("Are you sure?");
    
    var reqObject = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory";
    
    var catID = document.getElementById("cid2").value;

    reqObject.onreadystatechange = function()
    {
        if (reqObject.readyState == 4 && reqObject.status == 200)
        {
            var result = JSON.parse(reqObject.responseText);
            opresult(result);
        }
    };
    
    reqObject.open("GET", url, true);
    reqObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    reqObject.send(catID);
    
}
function opresult(output)
{

    if (output.WasSuccessful == 1)
    {
        document.getElementById("result3").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result3").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}
