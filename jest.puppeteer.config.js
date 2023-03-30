module.exports = {
    server: {
        command: "npm run serve",
        port: 3000,
        launchTimeout: 10000,
        debug: true,
    },
    launch: {
        headless: true,
        slowMo: false,
        devtools: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    browserContext: 'default'
};