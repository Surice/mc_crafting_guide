function calculate(){
    document.getElementById('result').innerHTML = "";
    document.getElementById('u-res').innerHTML = "";

    var inp = document.getElementById('sel-item').value,
        quan = document.getElementById('inp-quan').value / stor[inp].quan;

    var inventory = new Object(),
        required = new Object(),
        liCon = new Array(),
        compCraftStep = new Object();

    while(quan > 0){
        quan--;
        fetch(inp);
    }

    for (i in required){
        document.getElementById('result').innerHTML += `<li>${i} (${required[i]})</li>`;
    }
    for (i in inventory){
        document.getElementById('u-res').innerHTML += `<li>${i} (${inventory[i]})</li>`;
    }

    function fetch(item){
        var reqLi = new Object();

        stor[item].recipe.forEach(e =>{
            if(reqLi[e]){
                reqLi[e] += 1;
            }else{
                reqLi[e] = 1;
            }
        });
        var newItem = "<ul>";
        for (i in reqLi){
            newItem += `<li>${reqLi[i]}x ${i}</li>`;
        }
        newItem += `</ul> ---> ${stor[item].quan}x ${item}`;

        
        liCon.unshift(newItem);

        document.getElementById('cra-step').innerHTML = liCon;



        stor[item].recipe.forEach(e =>{
            if(inventory[e]){
                inventory[e] --;
                if(inventory[e] <= 0){
                    delete inventory[e];
                }
            }else{
                if(stor[e]){
                    var temp = stor[e];
                    if(temp["quan"] > 1){
                        inventory[e] = temp["quan"] -1;
                    }
                    fetch(e);
                }else{
                    if(required[e]){
                        required[e] += 1;
                    }else{
                        required[e] = 1;
                    }
                }
            }
        });
    }
}