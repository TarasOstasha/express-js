module.exports = {
    imgFilter(arr){
        return arr.filter(function (fileName) {
            const arr = fileName.split('.');
            const extention = arr[arr.length - 1];
            console.log(extention);
            return extention == 'jpg';

        });
    }
}
