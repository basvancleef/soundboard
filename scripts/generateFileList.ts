import * as fs from 'fs';
import * as path from 'path';

const soundsDir = path.join(__dirname, '../public/sounds');
const categoriesOutputPath = path.join(__dirname, '../public/categories.json');
const dataOutputPath = path.join(__dirname, '../public/data.json');

interface Sound {
  id: number;
  name: string;
  file: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  sounds: Sound[];
}

interface SimpleCategory {
  id: number;
  name: string;
  slug: string;
}

const categories: Category[] = [];
const simpleCategories: SimpleCategory[] = [];

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function generateJsonFiles() {
  const categoryDirs = fs.readdirSync(soundsDir);

  categoryDirs.forEach((categoryDir, categoryIndex) => {
    const categoryPath = path.join(soundsDir, categoryDir);

    if (fs.statSync(categoryPath).isDirectory()) {
      const soundFiles = fs.readdirSync(categoryPath);

      const sounds: Sound[] = soundFiles.map((soundFile, soundIndex) => ({
        id: soundIndex + 1,
        name: path.parse(soundFile).name,
        file: soundFile,
      }));

      const category: Category = {
        id: categoryIndex + 1,
        name: categoryDir,
        slug: slugify(categoryDir),
        sounds: sounds,
      };

      const simpleCategory: SimpleCategory = {
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
