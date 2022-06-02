module.exports = {
    publicPath:
        process.env.NODE_ENV === "production"
            ? "/MXH-VUE/" // Thay tên repository của các bạn vào đây nhé
            : "/MXH-VUE/",
    devServer: { proxy: "http://localhost:8000" },
};
