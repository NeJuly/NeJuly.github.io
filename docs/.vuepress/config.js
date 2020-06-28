module.exports = {
    theme: 'reco',
    title: '平凡的一天',
    description: 'Gentle to have, but not compromise, I want to be in quiet, not strong.',
    head: [
        ['link', {rel: 'shortcut icon', href: '/assets/img/logo.ico'}],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ], // 引入标签页小图标，但设置额没用，望告知
    themeConfig: {
        //关闭404 腾讯公益
        noFoundPageByTencent: false,
        type: 'blog',
        authorAvatar: '/assets/img/logo.png',
        // author
        author: 'Junely',
        huawei: true,

        mode: 'light', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
        modePicker: false, // 默认 true，false 不显示模式调节按钮，true 则显示
        // 博客配置
        blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                text: 'Category' // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: 'Tag'      // 默认文案 “标签”
            },
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
            { text: 'Contact', link: 'https://github.com/NeJuly/NeJuly.github.io', icon: 'reco-message' },
        ],
        friendLink: [
            {
                title: 'vuepress-theme-reco',
                desc: 'A simple and beautiful vuepress Blog & Doc theme.',
                logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
                link: 'https://vuepress-theme-reco.recoluan.com'
            },
            // {
            //     title: '午后南杂',
            //     desc: 'Enjoy when you can, and endure when you must.',
            //     email: 'recoluan@qq.com',
            //     link: 'https://www.recoluan.com'
            // },
            // ...
        ],
        //在所有页面中启用自动生成侧栏
        sidebar: 'auto',
        //默认的深度是 1，它将提取到 h2 的标题，设置成 0 将会禁用标题（headers）链接，同时，最大的深度为 2，它将同时提取 h2 和 h3 标题。
        sidebarDepth: 2,
        directories: [
            {id: 'java', dirname: 'java', itemPermalink: '/java/:year/:month/:day/:slug'},
            {id: 'linux', dirname: 'linux', itemPermalink: '/linux/:year/:month/:day/:slug'},
            {id: 'mysql', dirname: 'mysql', itemPermalink: '/mysql/:year/:month/:day/:slug'},
            {id: 'docker', dirname: 'docker', itemPermalink: '/docker/:year/:month/:day/:slug'},
            {id: 'php', dirname: 'php', itemPermalink: '/php/:year/:month/:day/:slug'},
            {id: 'idea', dirname: 'idea', itemPermalink: '/idea/:year/:month/:day/:slug'},
            {id: 'vultr', dirname: 'vultr', itemPermalink: '/vultr/:year/:month/:day/:slug'},
            {id: 'charles', dirname: 'charles', itemPermalink: '/charles/:year/:month/:day/:slug'},
            {id: 'wechat', dirname: 'wechat', itemPermalink: '/wechat/:year/:month/:day/:slug'},
            {id: 'thing', dirname: 'thing', itemPermalink: '/thing/:year/:month/:day/:slug'},
        ],
        footer: {
            contact: [
                {
                    type: 'github',
                    link: '/',
                },
                {
                    type: 'twitter',
                    link: '/',
                },
            ],
            copyright: [
                {
                    text: 'Privacy Policy',
                    link: '/',
                },
                {
                    text: 'MIT Licensed | Copyright © 2018-present Vue.js',
                    link: '/',
                },
            ],
        },
        lastUpdated: 'Last Updated',
        // 备案
        record: 'ICP 备案文案',
        recordLink: 'ICP 备案指向链接',
        cyberSecurityRecord: '公安部备案文案',
        cyberSecurityLink: '公安部备案指向链接',
        // 项目开始时间，只填写年份
        startYear: '2020'
    },
};
