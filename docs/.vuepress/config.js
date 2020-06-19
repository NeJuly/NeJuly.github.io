module.exports = {
    theme: '@vuepress/theme-blog',
    title: 'NeJuly 个人博客',
    description: 'Take a daily note',
    head: [
        ['link', {rel: 'shortcut icon', href: '../../img/logo.ico'}]
    ], // 引入标签页小图标，但设置额没用，望告知
    themeConfig: {
        nav: [
            // {text: '主页', link: '/'},
            {text: 'Charles', link: '/charles/'},
            {text: 'Docker', link: '/docker/'},
            {text: 'Idea', link: '/idea/'},
            {text: 'Java', link: '/java/'},
            {text: 'Linux', link: '/linux/'},
            {text: 'Mysql', link: '/mysql/'},
            {text: 'Php', link: '/php/'},
            {text: 'Vultr', link: '/vultr/'},
            {text: 'Wechat', link: '/wechat/'},
            {text: '杂记', link: '/thing/'},
            {
                text: '标签',
                link: '/tag/',
            },
        ],
        directories:[
            {
                id: 'charles', // Unique id for current classifier
                dirname: 'charles', // Matched directory name
                itemLayout: 'charles', // Layout for matched pages.
                itemPermalink: '/charles/:year/:month/:day/:slug', // Permalink for matched pages.
            },
            {
                id: 'mysql', // Unique id for current classifier
                dirname: 'mysql', // Matched directory name
                itemLayout: 'mysql', // Layout for matched pages.
                itemPermalink: '/mysql/:year/:month/:day/:slug', // Permalink for matched pages.
            }
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
        globalPagination : {
            prevText:'上一页', // Text for previous links.
            nextText:'下一页', // Text for next links.
            lengthPerPage:'5', // Maximum number of posts per page.
            layout:'Pagination', // Layout for pagination page
        }
    },
};
