const fs = require('fs');

const keys = JSON.parse(fs.readFileSync('all_keys.json', 'utf-8'));
const pairs = JSON.parse(fs.readFileSync('extracted_pairs.json', 'utf-8'));

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 20).replace(/^_|_$/g, '');
}

const enDict = {};
const trDict = {};

const pairMap = {};
for (let p of pairs) {
  let s = slugify(p.en);
  if (s) {
    pairMap[s] = p;
  }
}

let missing = 0;

for (let key of keys) {
  if (key.length <= 2) continue;
  let parts = key.split('.');
  if (parts.length !== 2) {
    enDict[key] = key;
    trDict[key] = key;
    continue;
  }
  let slugWithId = parts[1];
  let lastUnderscore = slugWithId.lastIndexOf('_');
  let slug = lastUnderscore > -1 ? slugWithId.substring(0, lastUnderscore) : slugWithId;
  
  if (pairMap[slug]) {
    enDict[key] = pairMap[slug].en;
    trDict[key] = pairMap[slug].tr;
  } else {
    // try finding by substring
    let found = false;
    for (let s in pairMap) {
      if (s.startsWith(slug) || slug.startsWith(s)) {
        enDict[key] = pairMap[s].en;
        trDict[key] = pairMap[s].tr;
        found = true;
        break;
      }
    }
    if (!found) {
      enDict[key] = slug.replace(/_/g, ' ') + ' (fix)';
      trDict[key] = slug.replace(/_/g, ' ') + ' (fix)';
      missing++;
    }
  }
}

fs.writeFileSync('en_reconstructed.json', JSON.stringify(enDict, null, 2));
fs.writeFileSync('tr_reconstructed.json', JSON.stringify(trDict, null, 2));
console.log(`Reconstructed! Missing/Fallback: ${missing} / ${keys.length}`);
