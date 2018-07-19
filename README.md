# \<sdl-srch-bar\>

Basic Search Bar Element

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element In Development Mode

```
$ cd sdl-srch-bar
$ polymer serve
```

## Build the sdl-srch-bar demo & component
```
$ ./sdlMake 
```

Once you run this build there will be two build directories created:  build-demo & build-component


##  Run the es6 version of the Demo 
```
http://localhost/sdl-srch-bar/build-demo/es6-bundled/demo/index.html
```

##  Include sdl-srch-bar-loader.js to use as stand-alone component 
See File: sdl-srch-bar/build-component/es6-bundled/demo/index.html
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">

    <title>sdl-srch-bar demo</title>
    <script type="module" src="../../sdl-srch-bar-loader.js"></script>

  </head>
  <body>
          <sdl-srch-bar id='srch-bar1' ajaxUrl='data/srch-data.txt'>  

            <form>
              <input name="input1" label="Filter Search">
            </form>
            
          </sdl-srch-bar>
    	<div id="message1"></div>
    <br><br><br>

    <script>
    addEventListener('DOMContentLoaded', function(){ 

        setTimeout(function(){ 
        var srch1 = document.querySelector('#srch-bar1');

          srch1.addEventListener("changed", function(e) {
            var message = document.querySelector('#message1');
            message.innerHTML = "<b><u>'changed' event fired:</u></b>&nbsp;&nbsp;&nbsp;";
            message.innerHTML += "<br>e.detail.formData = " + JSON.stringify(e.detail.formData);
            message.innerHTML += "<br>e.detail.payload = " + JSON.stringify(e.detail.payload);
          }, false);

        }, 1000);


      }, false);

    </script>
  </body>
</html>

```
