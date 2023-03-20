  import * as React from 'react';
  import './App.css';
  import './dashboard.css'
  import bg from './imgs/bg2.jpg';
  import selectMenu from './audio/eff1.wav';
  export default function Dashboard() {
    const [backgroundColor] = React.useState('transparent');
    const [selectedCategory, setSelectedCategory] = React.useState('News');
    const [selectedSection, setSelectedSection] = React.useState('home');

    React.useEffect(() => {
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.backgroundImage = `url(${bg})`;
      document.body.style.backgroundSize = 'contain';
    }, [backgroundColor]);

    const [animeList, setAnimeList] = React.useState([]);
    const [mangaList, setMangaList] = React.useState([]);

    React.useEffect(() => {
      fetch('https://api.jikan.moe/v4/anime')
        .then(response => response.json())
        .then(data => {
          const truncatedAnimeList = data.data.slice(0, 16);
          setAnimeList(truncatedAnimeList);
        })
        .catch(error => console.log(error));
    }, []);
    

    React.useEffect(() => {
      fetch('https://api.jikan.moe/v4/manga')
        .then(response => response.json())
        .then(data => {
          const truncatedMangaList = data.data.slice(0, 16);
          setMangaList(truncatedMangaList);
        })
        .catch(error => console.log(error));
    }, []);

    const renderSection = () => {
      if (selectedSection === 'home') {
          if (selectedCategory === 'Anime') {
              // create the card elements
              const cards = animeList.map(anime => (
                  <div className='cards' key={anime.id}>
                    <img src={anime.images.jpg.image_url} alt={anime.title} />
                    <div className='details'>
                      <div>{anime.title}</div>
                    </div>
                  </div>
                ));
          
                // render the cards in the container
                return <div className='container-cards'>{cards}</div>;
        } else if (selectedCategory === 'Manga') {
              // create the card elements
              const cards = mangaList.map(manga => (
                  <div className='cards' key={manga.id}>
                    <img src={manga.images.jpg.image_url} alt={manga.title} />
                    <div className='details'>
                      <div>{manga.title}</div>
                    </div>
                  </div>
                ));
          
                // render the cards in the container
                return <div className='container-cards'>{cards}</div>;
        } else if (selectedCategory === "News") {
          return <div>Welcome user Liwa-dev</div>
        }
      } else if (selectedSection === 'user') {
        return (
          <div>Welcome to the User section</div>
        );
      } else if (selectedSection === 'help') {
        return (
          <div>Welcome to the Help section</div>
        );
      } else if (selectedSection === 'settings') {
        return (
          <div>section setting</div>
        );
      }
    };

    return (
      <div className="container2">
  <header>
    {selectedSection === 'home' ? (
      <ul>
        <li key='1'
          onClick={() => {
            setSelectedCategory('News');
            const audio = new Audio(selectMenu);
            audio.play();
          }}
          className={selectedCategory === 'News' ? 'selected' : ''}
        >
          News
        </li>
        <li key='2'
          onClick={() => {
            setSelectedCategory('Anime')
            const audio = new Audio(selectMenu);
            audio.play();
          }}
          className={selectedCategory === 'Anime' ? 'selected' : ''}
        >
          Anime
        </li>
        <li key='3'
          onClick={() => {
            setSelectedCategory('Manga')
            const audio = new Audio(selectMenu);
            audio.play();
          
          }}
          className={selectedCategory === 'Manga' ? 'selected' : ''}
        >
          Manga
        </li>
      </ul>
    ) : (
      <ul>
        <li key='4' className="disabled">News</li>
        <li key='5' className="disabled">Anime</li>
        <li key='6' className="disabled">Manga</li>
      </ul>
    )}

    <div className="user">
      <div className="pic">
        <img
          src="https://wallpapers.com/images/hd/shadow-boy-white-eyes-unique-cool-pfp-nft-13yuypusuweug9xn.jpg"
          alt=""
        ></img>
      </div>
      <div className="userAccount">Liwa-Dev</div>
    </div>
  </header>

        <nav>
          <i className={`fa-solid fa-house ${selectedSection === 'home' ? 'active' : ''}`} onClick={() => {
            setSelectedSection('home')
            const audio = new Audio(selectMenu);
            audio.play();
            }}></i>
          <i className={`fa-solid fa-circle-user ${selectedSection === 'user' ? 'active' : ''}`} onClick={() => {
            setSelectedSection('user')
            const audio = new Audio(selectMenu);
            audio.play();
            }}></i>
          <i className={`fa-solid fa-circle-question ${selectedSection === 'help' ? 'active' : ''}`} onClick={() => {
            setSelectedSection('help')
            const audio = new Audio(selectMenu);
            audio.play();
            }}></i>
          <i className={`fa-solid fa-gear ${selectedSection === 'settings' ? 'active' : ''}`} onClick={() => {
            setSelectedSection('settings')
            const audio = new Audio(selectMenu);
            audio.play();
            }}></i>
        </nav>

        
        <section>
          {renderSection()}
        </section>
      </div>
    );
  }
    