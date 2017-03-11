module.exports = function(grunt) {

    var colors = require('colors');
    grunt.loadNpmTasks('grunt-shell');
    grunt.initConfig({
        shell: {
            report: {
                command: 'junit2html results.xml reports.html && open reports.html'
        },
        delete: {

                command: 'rm -rf screenshots'
        }
    }
});
    grunt.registerTask('report', ['shell:report']);
    grunt.registerTask('delete', ['shell:delete']);

    grunt.registerTask('default',function () {
        console.log('Welcome'.red);
        console.log("Run by casperjs test 'location of test' --verbose --log-level=debug --xunit=results.xml ".bold.underline);
    })






}