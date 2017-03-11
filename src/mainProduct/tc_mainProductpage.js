/**
 * Created by Promode on 06/03/17.
 */
var fs = require( 'fs' );
var path = fs.absolute(fs.workingDirectory);
console.log('Working Dir : '+ path );
var phantomcss = require( 'phantomcss' );


casper.test.begin( 'Main Div Test Cases', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: path + '',
        screenshotRoot: path+ '/screenshots',
        failedComparisonsRoot: path + '/failures',
        addLabelToFailedImage: false,
        prefixCount: true

    } );

    casper.on( 'remote.message', function ( msg ) {
        this.echo( msg );
    } );

    casper.on( 'error', function ( err ) {
        this.die( "PhantomJS has errored: " + err );
    } );

    casper.on( 'resource.error', function ( err ) {
        casper.log( 'Resource load error: ' + err, 'warning' );
    } );
    /*
     The test scenario
     */

    casper.start( 'http://pramoddutta.wingified.com/bug.html?id=1');

    casper.viewport(1024, 800 );

    casper.then( function () {
        phantomcss.screenshot( "/html/body/div[2]/h1", 'H1_Tag' );
    } );

    casper.then( function () {
        phantomcss.screenshot( ".post_reply_button", 'btn-dynamic' );
    } );

    casper.then( function () {
        phantomcss.screenshot( "/html/body/form", 'upper-form' );
    } );

    // casper.then( function () {
    //     casper.click( '/html/body/div[2]' );
    //
    //     // wait for modal to fade-in
    //     casper.waitForSelector( '#myModal:not([style*="display: none"])',
    //         function success() {
    //             phantomcss.screenshot( '#myModal', 'coffee machine dialog' );
    //         },
    //         function timeout() {
    //             casper.test.fail( 'Should see coffee machine' );
    //         }
    //     );
    // } );


    casper.then( function now_check_the_screenshots() {
        // compare screenshots
        phantomcss.compareAll();
    } );

    /*
     Casper runs tests
     */
    casper.run( function () {
        console.log( '\nTHE END.' );
        // phantomcss.getExitStatus() // pass or fail?
        casper.test.done();
    } );
} );