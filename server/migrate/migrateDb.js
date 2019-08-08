// Сброс базы на начальные значения
const rimraf = require("rimraf");
const fs = require('fs');
const ncp = require('ncp').ncp;

ncp.limit = 16;

try {
    // Дропаем текущую базу
    fs.unlinkSync(`${__dirname}/../db/shopDb.json`);
    // Удаляем папку с изображениями
    rimraf.sync(`${__dirname}/../images` );
    // Восстанавливаем базу из бэкапа
    fs.createReadStream(`${__dirname}/../db/backup/shopDb.json`).pipe(fs.createWriteStream(`${__dirname}/../db/shopDb.json`));
    // Восстанавливаем картинки из бэкапа
    ncp(`${__dirname}/../db/backup/images`, `${__dirname}/../images`, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('Migration complete!');
        process.exit()
    });
}catch (e) {
    console.log("Migration failed! Error: ", e);
}
