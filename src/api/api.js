const BASE_URL = "https://coffee-cat.onrender.com/1.0/cofeecat/";



export const getCardapio = async () => {
  let url = `${BASE_URL}produtos`;
  const response = await fetch(url);
  console.log(response)
  const data = await response.json();
  console.log(data)
  return data.produtos;
};

