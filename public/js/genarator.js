let nanoid=(e=21)=>{let n="",r=crypto.getRandomValues(new Uint8Array(e));for(;e--;){
    let t=63&r[e];
    n+=t<36?t.toString(36):t<62?(t-26).toString(36).toUpperCase():t<63?"_":"-"}
    return n
}

const array=[];
document.getElementById("sub").onclick=()=>{
    let id=nanoid(10);
    array.push(id);
    document.getElementById("roomID").value=id;

}





