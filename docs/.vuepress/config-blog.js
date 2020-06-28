module.exports = {
    theme: '@vuepress/theme-blog',
    title: 'NEJULY',
    description: 'Take a daily note',
    head: [
        ['link', {rel: 'shortcut icon', href: '/assets/img/logo.ico'}]
    ], // 引入标签页小图标，但设置额没用，望告知
    themeConfig: {
        nav: [
            // {text: '主页', link: '/'},
            {text: 'Java', link: '/java/'},
            {text: 'Linux', link: '/linux/'},
            {text: 'Mysql', link: '/mysql/'},
            {text: 'Docker', link: '/docker/'},
            {text: 'Php', link: '/php/'},
            {text: 'Idea', link: '/idea/'},
            {text: 'Vultr', link: '/vultr/'},
            {text: 'Charles', link: '/charles/'},
            {text: 'Wechat', link: '/wechat/'},
            {text: '杂记', link: '/thing/'},
            {text: '标签', link: '/tag/',},
        ],
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
        globalPagination: {
            prevText: '上一页', // Text for previous links.
            nextText: '下一页', // Text for next links.
            lengthPerPage: '5', // Maximum number of posts per page.
            layout: 'Pagination', // Layout for pagination page
        }
    },
};
