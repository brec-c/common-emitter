#Please Note:

Discontinued.  Please use [EventEmitter2](https://github.com/hij1nx/EventEmitter2) instead.  That's what I'm going to do.

#EventEmitter Everywhere… Excelsior!

Sorry, couldn't resist the alliteration.  One of the ironies of the emergence of NodeJS is that for all the glory it brings to Javascript it also is at odds with the place where Javascript has reigned supreme for many years, the browser.  Most of the NodeJS libraries are unavailable in the browser.  The Events module's EventEmitter was one of those features that exists NodeJS side but not in the browser.  This was mostly limiting not because the browser couldn't handle it but because writing code that could / should run everywhere needed to becareful to use common libraries.  __Common-Emitter__ is meant to help alleviate that issue. 

#Installation
npm install common-emitter

#Usage

Use exactly like you would EventEmitter.  When running in a NodeJS environment it actually just facilitates the requiring of EventEmitter.  But when running in a browser environment __Common-Emitter__ provides the common interface so you can write code that run everywhere Javascript does.

The excellent [Underscore](https://github.com/documentcloud/underscore) library is needed for the browser implementation.  This is *required* from within the __Common-Emitter__ code.  Using a server like [Proxy-Hem](https://github.com/brec-c/proxy-hem) or a server that uses [Stitch](https://github.com/sstephenson/stitch) will make it so this is a non-issue.  Otherwise, __Common-Emitter__ will check to see if '_' is in the window object so simply load the underscore script first and you should be fine.

