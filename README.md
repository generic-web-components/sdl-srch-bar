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


##  Run the es6 version of the Demo (Assuming you installed it at SERVER_ROOT)
```
{SERVER_ROOT}/sdl-srch-bar/build-demo/es6-bundled/demo/index.html
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
     <!-- If using as a stand-alone-component:  use sdl-srch-bar-loader.js
    <script src="./node_modules/@sdl-web/sdl-srch-bar/build-component/sdl-srch-bar-loader.js"></script> -->

    <!-- If using in an existing polymer project:  use sdl-srch-bar.js directly-->
    <script type="import" src="@sdl-web/sdl-srch-bar/src/components/sdl-srch-bar.js"></script> 

    <!-- Now add sdl-srch-bar to html section -->
    <sdl-srch-bar id='srch-bar1' ajaxUrl='./data/srch-data.txt'>  

        <!-- Put whatever input fields (and styling) you want into this slot -->
      <form>
        <paper-input name="input1" label="Filter Search">
          <iron-icon icon="search" id="srch-icon" slot="prefix"></iron-icon>
        </paper-input>
      </form>
      
    </sdl-srch-bar>


    <!-- Finally, listen for change event -->
    <!-- <script>
        $('document').ready(function(){

          var srch1 = document.querySelector('#srch-bar1');
          srch1.addEventListener("changed", function(e) {
            // Do something with the e.detail.payload here if you specified ajaxUrl...
            // or 
            // Do something with the e.detail.formData here if you did not specify ajaxUrl...
          }, false);

        });
    </script> -->

    </script>
  </body>
</html>

```
