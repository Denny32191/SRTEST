import {encoded, translations} from './data.js'

function decodeFields(encodedData, translationsData) {
    const decodedData = encodedData.map(item => {
        const decodedItem = {};
        for (const key in item) {
            if (key.endsWith('Id') && key !== 'groupId' && key !== 'service' && key !== 'formatSize' && key !== 'ca') {
                decodedItem[key] = translationsData[item[key]] || item[key];
            } else {
                decodedItem[key] = item[key];
            }
        }
        return decodedItem;
    });
    
    // Поиск уникальных идентификаторов
    const uniqueIds = new Set();
    encodedData.forEach(item => {
        Object.keys(item).forEach(key => {
            if (key.endsWith("Id")) {
                uniqueIds.add(item[key]);
            }
        });
    });
    
    // Преобразование в массив
    const uniqueIdsArray = Array.from(uniqueIds);
    
    return { decodedData, uniqueIds: uniqueIdsArray };
}

const { decodedData, uniqueIds } = decodeFields(encoded, translations);

console.log("Расшифрованные данные:");
console.log(decodedData);
console.log("Уникальные ID:", uniqueIds);