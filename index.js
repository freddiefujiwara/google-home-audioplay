#!/usr/bin/env node

let program = require('commander');
let pkg = require('./package');

let hostValue = undefined;
let urlValue = undefined;

program
    .version(pkg.version)
    .description(pkg.description)
    .usage('google-home-audioplay <host> <url>')
    .arguments('<host> <url>')
    .action(function(host,url){
        hostValue = host;
        urlValue = url;
    });
program.parse(process.argv);
if(typeof hostValue === 'undefined' || typeof urlValue === 'undefined'){
    console.error(program.usage());
    process.exit(1);
}

let GoogleHomeAudioplay = require('./lib/google-home-audioplay');
let ghs = new GoogleHomeAudioplay(hostValue,urlValue);
ghs.run()
    .then(function(){
    })
    .catch(function(){});
