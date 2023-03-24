import { useState } from "react";

async function addToListButton({ingredients}) {
    const ingrArr = ingredients.map(a => a.ingr);
    const [username, setUsername] = useState("");
    const [shoppingList, setShoppingList] = useState("");
    const [fridge, setFridge] = useState([]);
    const [success, setSuccess] = useState(false);

    console.log("button pressed")


    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getShoppingList: {
                get() {
                    return this.shoppingList
                },
            },
            getUsername: {
                get() {
                    return this.username
                },
            },
            getFridge: {
                get() {
                    return this.fridge
                },
            },
        });
        setShoppingList(thisUser.getShoppingList);
        setUsername(thisUser.getUsername);
        setFridge(thisUser.getFridge);
    }, []);

    for (let i = 0; i < ingrArr.length(); i++) {
        // check if already in shopping list (for all items)
        var idxSL = await indexMatch(shoppingList, ingrArr[i]);
        if (idxSL == -1) {
            // item not found in shopping list
            // check if already in fridge
            var idxF = await indexMatch(fridge, ingrArr[i]);
            if (idxF == -1) {
                // item not found in fridge
                var data = await addIngredient(username, ingrArr[i]);
                //localStorage.setItem('user', JSON.stringify(data));
                
                setShoppingList(shoppingList => [...shoppingList, ingrArr[i]]);
                console.log("added")
                console.log(shoppingList)
                setSuccess(true);
                // confirmation popup? can tell if added
            } else {
                // item already owned in fridge, error message?
            }

        } else {
            // item already in list, error message?
        }
    }
    
}

// for add to shopping list
async function indexMatch(array, q) {
    //console.log(array);
    return array ? array.findIndex(item => q.toUpperCase() === item.toUpperCase()) : -1;
}

async function addIngredient(username, item) {
    //try {
        console.log(item);
        const res = await fetch('/api/addShoppingListItem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                item: item,
            })
        })
        const data = await res.json();
        console.log(data);
        return data;
    //} catch (error) {
    //    res.json(error);
    //    return res.status(405).end();
    //}
}
