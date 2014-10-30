My portfolio page 2013 with SUSY 2.0
===============================================

Tools :  
Ruby  
SASS  
COMPASS  
susy  
breakpoint  

---------------------------------------------------------
Files structure and connectioins:

Html pages :  
index.html  
work_generative.html  
work_IxD.html  
work_website.html  

All html pages require the following files.

External css files :  
./css/normalize.css  
./css/reset.css  
./css/style.css  

External font :  
[Nunito](http://fonts.googleapis.com/css?family=Nunito:400,700)  
[Oxygen](http://fonts.googleapis.com/css?family=Oxygen:400,700)

External script :  
./scripts/jquery-1.7.2.min.js  
./scripts/response.min.js  
./scripts/processing-1.4.1.min.js  
./scripts/workGrid.js  
./scripts/myScript.js  

---------------------------------------------------------
File description  
index.html : landing page  
work_generative.html : gallery of generative works  
work_IxD.html : gallery of interactive design works  
work_website.html : gallery of website design works

./css/normalize.css : see git.io/normalize  
./css/reset.css : html5doctor.com/html-5-reset-stylesheet/  
./css/style.css : main stylesheet compiled from ./sass/style.scss

External font Nunito : Rounded corner font, used in header title and contact icon  
External font Oxygen : Sens-serif font, main font 

./scripts/jquery-1.7.2.min.js : jquery library  
./scripts/response.min.js : maintain resposive image quality, see img tags in html files.  
./scripts/processing-1.4.1.min.js : processing.js library

./scripts/workGrid.js : scripts of interactive selected work section  
./scripts/myScript.js : main scripts

---------------------------------------------------------
Preparing Developing Environment:  
1. Install Ruby  
2. Install Compass, Sass, susy2.0, and breakpoint (newest version if possible)  
3. Install WampServer

---------------------------------------------------------
Editing sass with susy2.0  
1. Start command prompt with Ruby  
2. Use command line to set directory to the project directory  
3. Use command : sass --compass --watch sassFile:cssFile  
   For example : sass --compass --watch ./sass/style.scss:./css/style.css  
   This example will compile ./sass/style.scss, name it style.css, and put it in ./css/ 
