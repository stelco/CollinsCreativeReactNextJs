import skills from '@/app/portfolio/data/skills';
import { url } from 'inspector';

const aboutMe = 
    {
        title: 'About Me',
        heading: 'My name is Steven Collins and this is my Online Portfolio.',
        value: 'I am a professional Web Developer who has been in the creative industry for over 25 years. I specialise in Fully Responsive, User Friendly Front End UI Development and have a background in Contemporary Design Methodologies.',
        value2: 'I have a passion for creating beautiful, component based, functional websites and applications that are easy to use and visually appealing. I am always looking to learn new technologies and improve my skills.',
        image: '/meandollie.jpg',
        skills: skills,
        isWorkItem: false,
    };
    
const aboutPage =
    {
        title: 'About This Portfolio',
        heading: 'This is a React/Next.js app with Tailwind CSS',
        value: 'This is a Next.js app with Tailwind CSS, TypeScript, GraphQl and Heroicons. It is a simple portfolio site that showcases my more recent technical and design skills.',
        value2: 'It is built using the Dashboard page as a starting point and the components and data have been customised for my portfolio pages. It uses a PostGres SQL database for the Dashboard data and local JSON data for the Skills. It is a work in progress and I will be adding more features and content in the future.',
        image: '/nextjs-logo.png'
    };

    const aboutOldPage =
    {
        title: 'Legacy Portfolio',
        heading: 'Collins Creative Legacy Version',
        value: 'This is an the old version of my portfolio from around 15 years ago which I built using pure HTML, CSS and Vanilla Javascript.',
        value2: 'My skills have come a long way since then but I like to keep it here as a reminder of where I started!',
        url: 'http://stelco-001-site1.itempurl.com/'
    };

export { aboutMe, aboutPage, aboutOldPage };