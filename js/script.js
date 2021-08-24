
function setName()
{       
    localStorage.setItem("name", document.getElementById('alias').value);
}

function showName()
{
    document.getElementById("player01").innerHTML = localStorage.getItem("name");
}

function dragOverfn(ev)
{
    ev.preventDefault();
}

function dragFn(ev)
{
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropFn(ev)
{
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}