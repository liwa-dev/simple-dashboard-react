import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Page1() {
    const navigate = useNavigate();
    let toggle = false;
    animation();

    function animation() {
      const anim1 = setInterval(() => {
        const line = document.querySelector('.line');
        const text = document.querySelector('.text');
        toggle = !toggle
        toggle? line.classList.add('up') : line.classList.remove('up')
        toggle? text.style.color = 'black' : text.style.color = 'white'
      }, 500);
      setTimeout(() => {
        const wlcm = document.querySelector('.wlcm');
        const text = document.querySelector('.text');
        text.style.top = '-20px'
        setTimeout(() => {
          text.style.opacity = '0'
          setTimeout(() => {
            text.style.top = '20px'
            wlcm.style.width = '30%'
            setTimeout(() => {
              text.style.opacity = '1'
              text.textContent = 'PERSONALIZING THE EXPERIENCE FOR YOU...'
              text.style.top = '0px'
              text.style.color = 'black'
              clearInterval(anim1);
              const line = document.querySelector('.line');
              line.classList.add('up')
              const anim2 = setInterval(() => {
                const text = document.querySelector('.text');
                toggle = !toggle
                toggle? line.style.opacity = '1' : line.style.opacity = '0'
                toggle? text.style.color = 'black' : text.style.color = 'white'
              }, 500);
              setTimeout(() => {
                  clearInterval(anim2);
                  setTimeout(() => {
                    wlcm.style.opacity = '0'
                    setTimeout(() => {
                      const bg = document.querySelector('body');
                      bg.style.transition = 'background .5s ease';
                      bg.style.background = 'black';
                      navigate('/dashboard', { replace: true });
                    }, 500);
                  }, 500);
                  setTimeout(() => {
                    text.textContent = '.'
                    wlcm.style.width = '20%'
                  }, 300);
                  text.style.top = '50px'
              }, 7000);
            }, 200);
          }, 100);
        }, 1000);
      }, 2000);
    }
      

    return (
        <div className='container'>
          <div className='wlcm'>
            <div className='msg'></div>
            <div className='text'>Welcome to AnimeList</div>
            <div className='line'></div>
          </div>
        </div>
      );
}
