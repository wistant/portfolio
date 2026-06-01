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
        const pkgName = corePkg.name || "portfolio";
        if (content.includes(`'${pkgName}': major`) || content.includes(`"${pkgName}": major`)) maxBump = 'major';
        else if (maxBump !== 'major' && (content.includes(`'${pkgName}': minor`) || content.includes(`"${pkgName}": minor`))) maxBump = 'minor';
        else if (maxBump !== 'major' && maxBump !== 'minor' && (content.includes(`'${pkgName}': patch`) || content.includes(`"${pkgName}": patch`))) maxBump = 'patch';
    }
});

// 4. Calculer la version suivante
if (maxBump === 'none') {
    process.stdout.write(version);
} else {
    let nextVersion;
    if (preTag) {
        // En mode pre, on incrémente le suffixe en tenant compte du comportement de Changesets.
        // Si on change de tag (ex: alpha -> beta) dans le même cycle, Changesets n'a qu'un seul index global
        // et l'incrémente (ex: 1.0.3-alpha.0 -> 1.0.3-beta.1).
        const parsed = semver.parse(version);
        if (parsed && parsed.prerelease.length > 0) {
            const base = parsed.major + '.' + parsed.minor + '.' + parsed.patch;
            const currentIndex = parsed.prerelease[1];
            const nextIndex = Number(currentIndex) + 1;
            nextVersion = base + '-' + preTag + '.' + nextIndex;
        } else {
            nextVersion = semver.inc(version, 'prepatch', preTag);
        }
    } else {
        nextVersion = semver.inc(version, maxBump);
    }
    process.stdout.write(nextVersion);
}

