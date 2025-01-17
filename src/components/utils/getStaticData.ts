import path from 'path';
import fs from 'fs';

export const getStaticDataThreeCoins = () => {
    const filePath = path.join(process.cwd(), '/public/FirstReloadConstantDataForThreeCoins.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
}

export const getStaticDataSuggestions = () => {
    const filePath = path.join(process.cwd(), '/public/CoinNames.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
}