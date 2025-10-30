import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const student = {
  name: 'Firose Munna',
  Age: 25,
  Designation: 'Soft. Engineer',
  HomeTown: 'Nilphamari'
};

const students = [];

for (let i = 0; i < 800000; i++) {
  students.push({ id: i + 1, ...student });
}

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

const outputPath = path.join(publicDir, 'students.json');
fs.writeFileSync(outputPath, JSON.stringify(students, null, 2));

console.log(`students.json file created successfully at ${outputPath}`);