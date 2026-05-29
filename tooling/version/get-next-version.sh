#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const semver = require('semver');

// 1. Lire la version actuelle
const corePkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
let version = corePkg.version;

// 2. Vérifier le mode PRE
let preTag = null;
if (fs.existsSync('./.changeset/pre.json')) {
    const preJson = JSON.parse(fs.readFileSync('./.changeset/pre.json', 'utf8'));
    if (preJson.mode === 'pre') {
        preTag = preJson.tag;
    }
}

const changesetDir = './.changeset';
let files = [];
if (fs.existsSync(changesetDir)) {
    files = fs.readdirSync(changesetDir);
}
let maxBump = 'none'; // none < patch < minor < major

const bumpLevels = { 'none': 0, 'patch': 1, 'minor': 2, 'major': 3 };

files.forEach(file => {
    if (file.endsWith('.md') && file !== 'README.md') {
        const content = fs.readFileSync(path.join(changesetDir, file), 'utf8');
        if (content.includes("'chanhdai.com': major") || content.includes('"chanhdai.com": major')) maxBump = 'major';
        else if (maxBump !== 'major' && (content.includes("'chanhdai.com': minor") || content.includes('"chanhdai.com": minor'))) maxBump = 'minor';
        else if (maxBump !== 'major' && maxBump !== 'minor' && (content.includes("'chanhdai.com': patch") || content.includes('"chanhdai.com": patch'))) maxBump = 'patch';
    }
});

// 4. Calculer la version suivante
if (maxBump === 'none') {
    process.stdout.write(version);
} else {
    let nextVersion;
    if (preTag) {
        // En mode pre, on incrémente le suffixe alpha
        nextVersion = semver.inc(version, 'prerelease', preTag);
    } else {
        nextVersion = semver.inc(version, maxBump);
    }
    process.stdout.write(nextVersion);
}
