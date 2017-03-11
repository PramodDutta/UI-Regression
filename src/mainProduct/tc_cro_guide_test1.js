/**
 * Created by Promode on 10/03/17.
 */

var fs = require( 'fs' );
var path = fs.absolute(fs.workingDirectory);
console.log('Working Dir : '+ path );
var phantomcss = require( 'phantomcss' );

casper.test.begin('Taking screenshots for the different devices', function ( test ) {


    var viewportSizes = [
       //
        [320,568],
        [375,667],
        [411,731],
        [340,640],
        [1024,768],
        [1280,800],
        [1440,900]
    ];


    console.log('In Casper Test');

    // First Link Verify
    console.log('-----'+path+'/node_modules/phantomcss');
    phantomcss.init({

        rebase: casper.cli.get("rebase"),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        captureWaitEnabled: true,
        libraryRoot: path+'/node_modules/phantomcss',
        screenshotRoot: path + '/screenshots',
        failedComparisonsRoot: path + '/failures',
        addLabelToFailedImage: false,
        prefixCount: true

    });
    var url = 'http://pramoddutta.wingified.com/HM';

    casper.start();
    /**
     * Task to do
     * 1. Capture the Header Image and create a basline
     * 2. Header H1 tag. ( Introduction
     * 3. Table of contents and other part.
     *
     *
     *
     */

     //var url = casper.cli.args[0];

     casper.each(viewportSizes,function(self,viewportSizes,i){

         var width = viewportSizes[0];
         var height = viewportSizes[1];
         this.viewport(width, height);


         this.thenOpen(url, function() {
             this.echo('Opening at ' + width);

             //
             this.then( function () {
                 var name = 'main_container_'+width+'x'+height;
                 phantomcss.screenshot( ".main-container", name );
             } );


             this.then( function () {
                 var name = 'header-container_'+width+'x'+height;
                 phantomcss.screenshot( ".header-container", name );
             } );


             this.echo('Snapshot taken'+width+height);
         });



     });


     casper.then( function now_check_the_screenshots() {
        // compare screenshots
        phantomcss.compareAll();
    } );


    casper.run( function () {
        console.log( '\nTHE END.' );
        // phantomcss.getExitStatus() // pass or fail?
        casper.test.done();
    } );


});
