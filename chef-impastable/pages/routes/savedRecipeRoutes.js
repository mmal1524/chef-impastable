export async function getFolders(user_id, getData, isHouse) {
    console.log(user_id);
    const res = await fetch('/api/getSavedRecipes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user_id,
            getData: getData,
            isHouse: isHouse
        })
    })
    const data = await res.json();
    console.log(data);
    return data;
}

export async function saveRecipe(username, folder, recipeID, isHouse) {
    console.log({username, folder, recipeID});
    const res = await fetch('/api/saveRecipe', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: username,
            folder: folder,
            recipeID: recipeID,
            isHouse: isHouse
        })
    })
    const data = await res.json();
    console.log(data);
    return data;
}

export async function unsaveRecipe(username, recipeID, isHouse) {
    console.log({username, recipeID});
    const res = await fetch('/api/unsaveRecipe', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            recipeID: recipeID,
            isHouse: isHouse
        })
    })
    const data = await res.json();
    // console.log(data);
    return data;
}