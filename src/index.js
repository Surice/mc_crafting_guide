function calculate(){
    document.getElementById('result').innerHTML = "";
    document.getElementById('u-res').innerHTML = "";

    var inp = document.getElementById('sel-item').value,
        quan = document.getElementById('inp-quan').value / stor[inp].quan;

    var inventory = new Object(),
        required = new Object(),
        craftArray = new Array();

    while(quan > 0){
        quan--;
        fetch(inp);
    }

    for (i in required){
        document.getElementById('result').innerHTML += `<li>${required[i]}x (${stackCal(required[i])}) ${i}</li>`;
    }
    for (i in inventory){
        document.getElementById('u-res').innerHTML += `<li>${inventory[i]}x ${i}</li>`;
    }

    function stackCal(num){
        num = num/64;
        var num2 = num.toString();
        num2 = num2.split('.')[0];
        num = num - num2;
        var res = num2+ " stack´s "+ num*64;
        return res;
    }

    async function fetch(item){
/*
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
            newItem += `<li><table><tr><td>${reqLi[i]}</td><td>x</td><td>${i}</td></tr></table></li>`;
        }
        newItem += `</ul> ---> ${stor[item].quan}x ${item}`;
        
        craftArray.unshift(newItem);
        document.getElementById('cra-step').innerHTML = craftArray.join(' ');
*/


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