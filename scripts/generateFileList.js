"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var soundsDir = path.join(__dirname, '../public/sounds');
var categoriesOutputPath = path.join(__dirname, '../public/categories.json');
var dataOutputPath = path.join(__dirname, '../public/data.json');
var categories = [];
var simpleCategories = [];
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}
function generateJsonFiles() {
    var categoryDirs = fs.readdirSync(soundsDir);
    categoryDirs.forEach(function (categoryDir, categoryIndex) {
        var categoryPath = path.join(soundsDir, categoryDir);
        if (fs.statSync(categoryPath).isDirectory()) {
            var soundFiles = fs.readdirSync(categoryPath);
            var sounds = soundFiles.map(function (soundFile, soundIndex) { return ({
                id: soundIndex + 1,
                name: path.parse(soundFile).name,
                file: soundFile,
            }); });
            var category = {
                id: categoryIndex + 1,
                name: categoryDir,
                slug: slugify(categoryDir),
                sounds: sounds,
            };
            var simpleCategory = {
                id: categoryIndex + 1,
                name: categoryDir,
                slug: slugify(categoryDir),
            };
            categories.push(category);
            simpleCategories.push(simpleCategory);
        }
    });
    fs.writeFileSync(categoriesOutputPath, JSON.stringify(simpleCategories, null, 4), 'utf-8');
    fs.writeFileSync(dataOutputPath, JSON.stringify(categories, null, 4), 'utf-8');
    console.log('JSON files have been created.');
}
generateJsonFiles();
