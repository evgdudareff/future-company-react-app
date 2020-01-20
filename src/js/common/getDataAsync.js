//функция загрузки произвольных данных в JSON с произвольного сервера
const getDataAsync = async function(url) {
  try {
    //загружаем данные
    const response = await fetch(url);

    let parsedData = await response.json();

    //Регионы parsedData.areas

    return parsedData;
  } catch (err) {
    alert("Не удалось получить данные...");
  }
};

export default getDataAsync;
