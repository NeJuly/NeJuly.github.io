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
            {
                text: '标签',
                link: '/tag/',
            },
        ],
        directories: [
            {
                id: 'java', // Unique id for current classifier
                dirname: 'java', // Matched directory name
                itemPermalink: '/java/:year/:month/:day/:slug', // Permalink for matched pages.
            },
            {
                id: 'linux', // Unique id for current classifier
                dirname: 'linux', // Matched directory name
                itemPermalink: '/linux/:year/:month/:day/:slug', // Permalink for matched pages.
            },
            {
                id: 'mysql', // Unique id for current classifier
                dirname: 'mysql', // Matched directory name
                itemPermalink: '/mysql/:year/:month/:day/:slug', // Permalink for matched pages.
            },
            {
                id: 'docker', // Unique id for current classifier
                dirname: 'docker', // Matched directory name
                itemPermalink: '/docker/:year/:month/:day/:slug', // Permalink for matched pages.
            },
            {
                id: 'php', // Unique id for current classifier
                dirname: 'php', // Matched directory name
                itemPermalink: '/php/:year/:month/:day/:slug', // Permalink for matched pages.
            },
            {
                id: 'idea', // Unique id for current classifier
                dirname: 'idea', // Matched directory name
                itemPermalink: '/idea/:year/:month/:day/:slug', // Permalink for matched pages.
            },
            {
                id: 'vultr', // Unique id for current classifier
                dirname: 'vultr', // Matched directory name
                itemPermalink: '/vultr/:year/:month/:day/:slug', // Permalink for matched pages.
            },
            {
                id: 'charles', // Unique id for current classifier
                dirname: 'charles', // Matched directory name
                itemPermalink: '/charles/:year/:month/:day/:slug', // Permalink for matched pages.
            },
            {
                id: 'wechat', // Unique id for current classifier
                dirname: 'wechat', // Matched directory name
                itemPermalink: '/wechat/:year/:month/:day/:slug', // Permalink for matched pages.
            },
            {
                id: 'thing', // Unique id for current classifier
                dirname: 'thing', // Matched directory name
                itemPermalink: '/thing/:year/:month/:day/:slug', // Permalink for matched pages.
            },
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
