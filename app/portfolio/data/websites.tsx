import skills from '@/app/portfolio/data/skills';

const websites = [
    //metadata
    {
        site_name: 'Collins Creative',
        title: 'Collins Creative | Websites',
        description: 'A collection of websites and applications I was involved in building during my various job roles and freelance projects built from scratch.',
        keywords: 'websites, web design, web development, joomla, wordpress, react, nextjs, vuejs, angular, tailwindcss, css, html, javascript, typescript, graphql, c#, .net, azure devops, git, bitbucket, gulp, responsive design, accessibility',
        authors: [{ name: 'Steven Collins' }],
        openGraph: {
            title: 'Collins Creative | Websites',
            description: 'A collection of websites and applications I was involved in building during my various job roles and freelance projects built from scratch.',
            url: 'https://www.collinscreative.co.uk/portfolio/websites',
            type: 'website',
            images: [
                {
                    site_name: 'Collins Creative',
                    url: 'https://www.collinscreative.co.uk/websites/maxcontact.jpg',
                    width: 296,
                    height: 167,
                    alt: 'Websites thumbnail',
                },
            ],
        }
    },
    {
        heading: 'NextJs Dashboard',
        url: 'https://github.com/stelco/ReactNextJsDashboard/tree/main/nextjs-dashboard',
        githubLink: true,
        value: 'This is a Next.js tutorial/course I recently completed. It is a Dashboard app I built using Tailwind CSS, TypeScript, GraphQl and Heroicons. I made quite a few customisations to the original tutorial and added some extra features like adding new customers and uploading profile images.',
        value2: 'I used this as a starting point for building this new portfolio site. You can find the code on my GitHub page from the link above.',
        image: '/websites/acme-dashboard.jpg',
        isWorkItem: true,
        skills: [
            skills[0],
            skills[1],
            skills[3],
            skills[4],
            skills[6],
            skills[7],
            skills[11],
            skills[13],
            skills[17],
            skills[18],
            skills[20],
        ],
        buttonLink: true,
        buttonLinkUrl: 'https://react-next-js-dashboard-hulx.vercel.app/',
        buttonLinkUrlBlank: true,
    },
    {
        heading: 'MaxContact',
        url: 'https://www.maxcontact.com',
        value: 'I worked on the rebuild and legacy migration of the UI for bespoke contact centre software using VueJs version 3 and Typescript (Options & Composition API). The backend API was built using C# and .Net. Azure DevOps was used for version control and CI/CD.',
        value2: 'I also worked closely with the UI/UX designers converting Figma designs to code and ensuring the software was responsive and accessible. You can see some of my work in the videos section below...',
        image: '/websites/maxcontact.jpg',
        isWorkItem: true,
        skills: [
            skills[0],
            skills[1],
            skills[3],
            skills[4],
            skills[5],
            skills[7],
            skills[8],
            skills[9],
            skills[11],
            skills[17],
            skills[18],
            skills[20],
        ],
        buttonLink: true,
        buttonLinkUrl: '/portfolio/ui-ux/videos',
    },
    {
        heading: 'Destinology',
        url: 'https://www.destinology.co.uk',
        value: 'I worked on the Front End UI/UX for this luxury holiday company. Built on a .Net MVC framework using HTML5, CSS3, Vanilla Javascript and Angular. Compiled using Gulp and version control using BitBucket.',
        value2: 'I also worked on the responsive design and accessibility of the site and worked closely with the design team to ensure the site was visually appealing and user friendly.',
        image: '/websites/destinology.jpg',
        isWorkItem: true,
        skills: [
            skills[0],
            skills[1],
            skills[2],
            skills[7],
            skills[9],
            skills[10],
            skills[15],
            skills[17],
            skills[19],
        ]
    },
    {
        heading: 'York Montessori',
        url: 'https://www.yorkmontessori.co.uk',
        value: 'This is a website I built for my brothers montessori nursery school. It uses the Joomla CMS with a bespoke design and back end admin for the client to update their own content',
        value2: 'The main requirements for this project was to make the site easy to update and maintain for the client and to ensure it was responsive and accessible.',
        image: '/websites/yorkmontessori.jpg',
        isWorkItem: true,
        skills: [
            skills[0],
            skills[1],
            skills[2],
            skills[7],
            skills[9],
            skills[10],
            skills[15],
            skills[17],
            skills[19],
        ]
    },
    {
        heading: 'Alpha Machine Tools Ltd',
        url: 'https://www.alphamachinetools.co.uk',
        value: 'A Joomla CMS driven website for an industrial machine tools company. The CMS back end uses a unique category system so the administrator can easily add new products.',
        image: '/websites/alphamachinetools.jpg',
        isWorkItem: true,
        skills: [
            skills[0],
            skills[1],
            skills[2],
            skills[14],
            skills[16],
            skills[17]
        ]
    },
    {
        heading: 'Oldham Roll Of Rememberance',
        url: 'https://www.oldhamwarmemorial.co.uk',
        value: 'A bespoke application built using PHP with a MySql back end. Includes an autocomplete search which queries the database and loads the selected image.',
        image: '/websites/oldhamwar.jpg',
        isWorkItem: true,
        skills: [
            skills[0],
            skills[1],
            skills[2],
            skills[12],
            skills[14],
            skills[16],
            skills[17]
        ]
    },
    {
        heading: 'Shenanigans Irish Bar',
        url: 'https://www.shenanigansliverpool.com',
        value: 'A Joomla CMS driven website for an Irish Bar in Liverpool. Includes custom built components for an events calendar. I also set up a front end admin system for this so the administrator can easily update content.',
        value2: 'This website has since been taken over and a lot of the design elements and content has been retained. I helped with the migration.',
        image: '/websites/shenanigans.jpg',
        isWorkItem: true,
        skills: [
            skills[0],
            skills[1],
            skills[2],
            skills[12],
            skills[14],
            skills[16],
            skills[17]
        ]
    },
    {
        heading: 'Direct Roof and Build Ltd',
        url: 'https://www.directroofandbuild.co.uk',
        value: 'A roofing company website I built using the Joomla CMS. The client wanted a simple, clean design with a gallery and contact form.',
        value2: 'The image gallery is hosted on Flickr and uses their API to pull in the images. The contact form uses a custom built module to send the form data to the client.',
        image: '/websites/directroofandbuild.png',
        isWorkItem: true,
        skills: [
            skills[0],
            skills[1],
            skills[2],
            skills[11],
            skills[12],
            skills[14],
            skills[16],
            skills[17]
        ]
    }
];

export default websites;