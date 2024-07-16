const navListData = [
    {
      _id: 1,
      link: '/',
      name: `home`,
      current: 'hero',
      next: 'womens',
      active: true,
    },
    {
      _id: 2,
      link: '#womens',
      name: `womens`,
      current: 'womens',
      next: 'mens',
      active: false,
    },
    {
      _id: 3,
      link: '#mens',
      name: `mens`,
      current: 'mens',
      active: false,
    },
  
    {
      _id: 4,
      link: '#kids',
      name: `kids`,
      next: 'footer',
      active: false,
    },
  ];
  
  export default navListData;
  