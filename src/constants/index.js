import {
  behance,
  instagram,
  taste_bugs,
  maybe_love,
  is_this_who_i_am,
  mellow_ma_deine_augen,
  i_hate_models,
  whatsapp,
  youtube,
  director,
  colour_tuneing,
  video_editing,
  movie_camera,
  email
} from '../assets';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Directing',
    Icon: director,
  },
  {
    title: 'Filming',
    Icon: movie_camera,
  },
  {
    title: 'Editing',
    Icon: video_editing,
  },
  {
    title: 'Color Grading',
    Icon: colour_tuneing,
  },
];

const socialLinks = [
  {
    name: 'WhatsApp',
    href: 'https://wa.link/amkbjm',
    icon: whatsapp,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/paraclituspictures/',
    icon: instagram,
  },
  {
    name: 'Behance',
    href: 'https://www.behance.net/genaldkominofilm',
    icon: behance,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@GenaldK',
    icon: youtube,
  },
  {
    name: 'Email',
    href: 'mailto:genaldfilm@gmail.com',
    icon: email,
  },
];

const projects = [
  {
    id: 'project-1',
    name: 'taste_bugs',
    // description: '',
    tags: [
      {
        name: 'taste_bugs',
        color: 'blue-text-gradient',
      },
      {
        name: 'movie',
        color: 'green-text-gradient',
      },
      {
        name: 'berlin',
        color: 'pink-text-gradient',
      },
    ],
    image: taste_bugs,
    demo: 'https://www.youtube.com/watch?v=Smx1_wq5AJY',
  },
  {
    id: 'project-2',
    name: 'maybe_love',
    // description: '',
    tags: [
      {
        name: 'maybe_love',
        color: 'blue-text-gradient',
      },
      {
        name: 'inspiration',
        color: 'green-text-gradient',
      },
      {
        name: 'berlin',
        color: 'pink-text-gradient',
      },
    ],
    image: maybe_love,
    demo: 'https://www.youtube.com/watch?v=njf0FCQD32Q',
  },
  {
    id: 'project-3',
    name: 'is_this_who_i_am',
    // description: '',
    tags: [
      {
        name: 'is_this_who_i_am',
        color: 'blue-text-gradient',
      },
      {
        name: 'inspiration',
        color: 'green-text-gradient',
      },
      {
        name: 'berlin',
        color: 'pink-text-gradient',
      },
    ],
    image: is_this_who_i_am,
    demo: 'https://www.youtube.com/watch?v=v0sNox0jUyE',
  },
  {
    id: 'project-4',
    name: 'deine_augen',
    // description: ``,
    tags: [
      {
        name: 'videoclip',
        color: 'blue-text-gradient',
      },
      {
        name: 'band',
        color: 'green-text-gradient',
      },
      {
        name: 'berlin',
        color: 'pink-text-gradient',
      },
    ],
    image: mellow_ma_deine_augen,
    demo: 'https://www.youtube.com/watch?v=4toZkKuMAr0&list=RD4toZkKuMAr0&start_radio=1',
  },
  {
    id: 'project-5',
    name: 'i_hate_models',
    // description:
    //   '',
    tags: [
      {
        name: 'i_hate_models',
        color: 'blue-text-gradient',
      },
      {
        name: 'dj',
        color: 'green-text-gradient',
      },
      {
        name: 'techno',
        color: 'pink-text-gradient',
      },
    ],
    image: i_hate_models,
    demo: 'https://www.instagram.com/p/DVdb0_0jHop/',
  },
];

export { services, socialLinks, projects };
