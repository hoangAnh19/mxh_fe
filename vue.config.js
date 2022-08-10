module.exports = {
    publicPath:
        process.env.NODE_ENV === "production" ? "/MXH-VUE/" : "/MXH-VUE/",
    devServer: { proxy: "http://localhost:8000" },
};
