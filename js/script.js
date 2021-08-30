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
    let target = ev.target;
    let to = target;
    if (document.getElementById(target.id).tagName == "I")
    {
        to = target.parentElement;
        //console.log(document.getElementById(target.id).tagName);
        console.log("Target: "+target.parentElement.id);
    }
    
    console.log("dropFn: from "+from)
    console.log("dropFn: data "+ev.target.id)
    if(board.validMov(from, to.id)) 
    {
        if(to.hasChildNodes())
            to.removeChild(to.firstChild);
        to.appendChild(document.getElementById(data));        
        board.movePiece(from, to.id);
    }
    
}



function reset()
{    
    board.reset();
    document.getElementById("0").appendChild(document.getElementById("tn1"));
    document.getElementById("1").appendChild(document.getElementById("cn1"));
    document.getElementById("2").appendChild(document.getElementById("an1"));
    document.getElementById("3").appendChild(document.getElementById("qn"));
    document.getElementById("4").appendChild(document.getElementById("kn"));
    document.getElementById("5").appendChild(document.getElementById("an2"));
    document.getElementById("6").appendChild(document.getElementById("cn2"));
    document.getElementById("7").appendChild(document.getElementById("tn2"));

    document.getElementById("8").appendChild(document.getElementById("pn1"));
    document.getElementById("9").appendChild(document.getElementById("pn2"));
    document.getElementById("10").appendChild(document.getElementById("pn3"));
    document.getElementById("11").appendChild(document.getElementById("pn4"));
    document.getElementById("12").appendChild(document.getElementById("pn5"));
    document.getElementById("13").appendChild(document.getElementById("pn6"));
    document.getElementById("14").appendChild(document.getElementById("pn7"));
    document.getElementById("15").appendChild(document.getElementById("pn8"));        

    document.getElementById("48").appendChild(document.getElementById("pb1"));
    document.getElementById("49").appendChild(document.getElementById("pb2"));
    document.getElementById("50").appendChild(document.getElementById("pb3"));
    document.getElementById("51").appendChild(document.getElementById("pb4"));
    document.getElementById("52").appendChild(document.getElementById("pb5"));
    document.getElementById("53").appendChild(document.getElementById("pb6"));
    document.getElementById("54").appendChild(document.getElementById("pb7"));
    document.getElementById("55").appendChild(document.getElementById("pb8"));

    document.getElementById("56").appendChild(document.getElementById("tb1"));
    document.getElementById("57").appendChild(document.getElementById("cb1"));
    document.getElementById("58").appendChild(document.getElementById("ab1"));
    document.getElementById("59").appendChild(document.getElementById("qb"));
    document.getElementById("60").appendChild(document.getElementById("kb"));
    document.getElementById("61").appendChild(document.getElementById("ab2"));
    document.getElementById("62").appendChild(document.getElementById("cb2"));
    document.getElementById("63").appendChild(document.getElementById("tb2"));

    document.getElementById("movs").innerHTML = "";
}

class Board
{
    constructor()
    {
        this.matriz = [            
            "tn1","cn1","an1","qn","kn","an2","cn2","tn2",
            "pn1","pn2","pn3","pn4","pn5","pn6","pn7","pn8",
            "","","","","","","","",
            "","","","","","","","",
            "","","","","","","","",
            "","","","","","","","",
            "pb1","pb2","pb3","pb4","pb5","pb6","pb7","pb8",
            "tb1","cb1","ab1","qb","kb","ab2","cb2","tb2"
        ];

        this.movements = "";

        this.nmov = 0;
        this.jug = 0;
    }

    movePiece(f,t)
    {
        let p = this.matriz[f];
        console.log("p,f,t "+p,f,t)
        if(this.validMov(f,t))
        { 
            if(this.nmov % 8 == 0)
            {                
                this.movements += "<br>";                                
            }          
            if(this.nmov % 2 == 0)
            {
                this.jug++;
                this.movements += "<b>"+this.jug+".</b> ";                                
            }            
            this.nmov++;
               
            this.movements += document.getElementById(t).getAttribute("name") + " ";
            document.getElementById("movs").innerHTML = this.movements;
            this.matriz[t] = this.matriz[f];
            this.matriz[f] = "";
            console.log(this.matriz);
        }
        
    }

    validPawnN(f,t)
    {
        if(t-f == 8 | (f<=15) & (t-f==16) & (this.matriz[t-8]==""))
        {
            if(this.matriz[t]=="")
                return true;                
        }            
        if((t-f) == 7 | (t-f) == 9 & this.matriz[t].indexOf("b")>=0 & ((Math.floor(f/8) + 1) == Math.floor(t/8)))                          
            return true;                         
            
        return false;
    }

    validPawnB(f,t)
    {
        if(f-t == 8 | (f>=48) & (f-t==16) & (this.matriz[f-8]==""))
        {
            if(this.matriz[t]=="")
                return true;
        } 
        if((f-t) == 7 | (f-t) == 9 & this.matriz[t].indexOf("n")>=0 & ((Math.floor(f/8) - 1) == Math.floor(t/8)))                          
            return true;                
        return false;
    }

    validTorre(f,t,c)
    {
        if(Math.abs(t-f)%8==0)
        {
            let n = Math.floor(Math.abs(t-f)/8);
            for(let i=0; i<n-1; i++)
            {
                if((t*1)<(f*1))
                {
                    if(this.matriz[((f*1)-((i+1)*8))] != "")
                        return false;
                }
                else
                {
                    console.log("t>f: "+this.matriz[(((i+1)*8)+(f*1))])
                    if(this.matriz[(((i+1)*8)+(f*1))] != "")
                        return false;
                }
                
            }
            if(this.matriz[t].indexOf(c)>=0)
            {
                return false;
            }
            return true;
        }
        else
        {
            if(Math.floor(t/8) == Math.floor(f/8))
            {
                if(this.matriz[t].indexOf(c)>=0)
                    return false;
                if(t>f)
                {
                    console.log("f: "+f);
                    for(let i=++f; i<t; i++)
                    {
                        console.log("fi: "+i);
                        if(this.matriz[i]!="")
                            return false;
                    }
                }
                if(t<f)
                {
                    console.log("f: "+f);
                    for(let i=--f; i>t; i--)
                    {
                        console.log("fi: "+i);
                        if(this.matriz[i]!="")
                            return false;
                    }
                }
                return true;                    
            }
            else
            {
                return false;
            }                
        }
    }
    
    validCab(f,t)
    {
        let filaF = Math.floor(f/8)+1;
        let colF = (f-filaF*7)+1;
        console.log("Fila From: "+filaF);
        console.log("Col From: "+colF);
    }

    validMov(f,t)
    {
        let p = this.matriz[f];
        if(p.indexOf("pn") >= 0)        
            return this.validPawnN(f,t);
        
        if(p.indexOf("pb") >= 0)        
            return this.validPawnB(f,t);
        
        if(p.indexOf("tn") >= 0)        
            return this.validTorre(f,t, "n");
              
        if(p.indexOf("tb") >= 0)
            return this.validTorre(f,t, "b");

        if(p.indexOf("cb") >= 0)
            return this.validCab(f,t);
    }

    reset()
    {
        this.matriz = [            
            "tn1","cn1","an1","qn","kn","an2","cn2","tn2",
            "pn1","pn2","pn3","pn4","pn5","pn6","pn7","pn8",
            "","","","","","","","",
            "","","","","","","","",
            "","","","","","","","",
            "","","","","","","","",
            "pb1","pb2","pb3","pb4","pb5","pb6","pb7","pb8",
            "tb1","cb1","ab1","qb","kb","ab2","cb2","tb2"
        ];
        this.movements = "";
        this.jug = 0;
        this.nmov = 0;
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