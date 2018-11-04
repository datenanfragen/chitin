module.exports = {
    plugins: [
        require('postcss-fonticons')({
            iconPath: 'assets/icons/',
        }),
        require('postcss-preset-env')({
            browsers: [ 'last 2 versions', '> 5%' ],
        }),
        require('cssnano')({}),
    ]
};
