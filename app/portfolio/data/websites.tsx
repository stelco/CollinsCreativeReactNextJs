import skills from '@/app/portfolio/data/skills';

const websites = [
    {
        heading: 'MaxContact',
        value: 'I worked on the rebuild and legacy migration of the UI for bespoke contact centre software using VueJs version 3 and Typescript (Options & Composition API). The backend API was built using C# and .Net. Azure DevOps was used for version control and CI/CD.',
        value2: 'I also worked closely with the UI/UX designers converting Figma designs to code and ensuring the software was responsive and accessible.',
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
            skills[18],
            skills[20],
        ]
    },
    {
        heading: 'Destinology',
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
    }
];

export default websites;