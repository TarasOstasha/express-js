var chokidar = require('chokidar');
var cmd=require('node-cmd');


// var watcher = chokidar.watch('file or dir', {ignored: /^\./, persistent: true});

// watcher
//   .on('add', function(path) {console.log('File', path, 'has been added');})
//   .on('change', function(path) {console.log('File', path, 'has been changed');})
//   .on('unlink', function(path) {console.log('File', path, 'has been removed');})
//   .on('error', function(error) {console.error('Error happened', error);})

  chokidar.watch('.', {ignored: ['node_modules/**/*', '.git/**/*']}).on('all', (event, path) => {
    console.log(event, path);  
    // cmd.get(
    //     'ng build',
    //     function(err, data, stderr){
    //         console.log('result of build : ',data)
    //     }
    // );
 
    cmd.run('ng build');
  });


