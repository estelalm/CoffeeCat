

function navigate(location) {
    if(location == 'previous'){
        history.back();
    }else{
    window.location.href = location;

    }
}

function isLogged(){
    let isLogged = localStorage.getItem('login') 
    return isLogged;
}