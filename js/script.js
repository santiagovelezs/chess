let board;
function setName()
{       
    localStorage.setItem("name", document.getElementById('alias').value);       
}

function showName()
{
    document.getElementById("player01").innerHTML = localStorage.getItem("name");
    board = new Board(); 
}

function dragOverfn(ev)
{
    ev.preventDefault();
}

function dragFn(ev)
{
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("from", ev.target.parentElement.id);
    console.log("dragFn: ev.target.id: "+ev.target.id, "ev.target: "+ev.target.parentElement.id)
}

function dropFn(ev)
{
    ev.preventDefault();      
    var data = ev.dataTransfer.getData("text");
    var from = ev.dataTransfer.getData("from");
    console.log("dropFn: from "+from)
    console.log("dropFn: data "+ev.target.id)
    if(board.validMov(from, ev.target.id)) 
    {
        ev.target.appendChild(document.getElementById(data));        
        board.movePiece(from, ev.target.id);
    }
    
}



function reset()
{
    
    board.reset();
}

class Board
{
    constructor()
    {
        this.matriz = [            
            "t1n","c1n","a1n","qn","kn","a2n","c2n","t2n",
            "pn1","pn2","pn3","pn4","pn5","pn6","pn7","pn8",
            "","","","","","","","",
            "","","","","","","","",
            "","","","","","","","",
            "","","","","","","","",
            "pb1","pb2","pb3","pb4","pb5","pb6","pb7","pb8",
            "t1b","c1b","a1b","qb","kb","a2b","c2b","t2b"
        ];
    }

    movePiece(f,t)
    {
        let p = this.matriz[f];
        console.log("p,f,t "+p,f,t)
        if(this.validMov(f,t))
        {
            this.matriz[t] = this.matriz[f];
            this.matriz[f] = "";
            console.log(this.matriz);
        }
        
    }

    validMov(f,t)
    {
        let p = this.matriz[f];
        if(p.indexOf("pn") >= 0)
        {
            if(t-f == 8 | (f<=15) & (t-f==16))
                return true;
            return false;
        }
        if(p.indexOf("tn") >= 0)
        {

        }
    }

    reset()
    {
        document.getElementById("a7").appendChild(document.getElementById("p1n"));
        document.getElementById("b7").appendChild(document.getElementById("p2n"));
        document.getElementById("c7").appendChild(document.getElementById("p3n"));
        document.getElementById("d7").appendChild(document.getElementById("p4n"));
        document.getElementById("e7").appendChild(document.getElementById("p5n"));
        document.getElementById("f7").appendChild(document.getElementById("p6n"));
        document.getElementById("g7").appendChild(document.getElementById("p7n"));
        document.getElementById("h7").appendChild(document.getElementById("p8n"));

        document.getElementById("a8").appendChild(document.getElementById("t1n"));
        document.getElementById("b8").appendChild(document.getElementById("c1n"));
        document.getElementById("c8").appendChild(document.getElementById("a1n"));
        document.getElementById("d8").appendChild(document.getElementById("qn"));
        document.getElementById("e8").appendChild(document.getElementById("kn"));
        document.getElementById("f8").appendChild(document.getElementById("a2n"));
        document.getElementById("g8").appendChild(document.getElementById("c2n"));
        document.getElementById("h8").appendChild(document.getElementById("t2n"));

        document.getElementById("a2").appendChild(document.getElementById("p1b"));
        document.getElementById("b2").appendChild(document.getElementById("p2b"));
        document.getElementById("c2").appendChild(document.getElementById("p3b"));
        document.getElementById("d2").appendChild(document.getElementById("p4b"));
        document.getElementById("e2").appendChild(document.getElementById("p5b"));
        document.getElementById("f2").appendChild(document.getElementById("p6b"));
        document.getElementById("g2").appendChild(document.getElementById("p7b"));
        document.getElementById("h2").appendChild(document.getElementById("p8b"));

        document.getElementById("a1").appendChild(document.getElementById("t1b"));
        document.getElementById("b1").appendChild(document.getElementById("c1b"));
        document.getElementById("c1").appendChild(document.getElementById("a1b"));
        document.getElementById("d1").appendChild(document.getElementById("qb"));
        document.getElementById("e1").appendChild(document.getElementById("kb"));
        document.getElementById("f1").appendChild(document.getElementById("a2b"));
        document.getElementById("g1").appendChild(document.getElementById("c2b"));
        document.getElementById("h1").appendChild(document.getElementById("t2b"));
    }  

    isEmpty(cell)
    {
        console.log("cell: "+cell)
        console.log("Nodes: "+document.getElementById(cell).firstChild)
        if(!document.getElementById(cell).hasChildNodes())
            return true;
        return false;
    }

    
}