
import React, { useState } from 'react'; //, { useState } 
import '../styles/intro.css';

const Intro = () => {
  const initAd = [
    { 
      title: 'Thanks for using ETON.',
      content: 'You’re all logged out. So now what?',
      style: {
        background: 'white'
      }
    },
    {
      title: 'Using a Shared Computer?',
      content: `We've saved some of your preferences for the next time you log in, but if you'd like you can clear those now.`,
      style: {
        background: '#FDFAE5'
      }
    },
    {
      title: 'Do you have the apps?',
      img: '/logo192.png',
      content : `We’ve got apps for iPhone, iPad, Android phones, tablets, and watches. You probably have one of those.`,
      style: {
        background: '#BCD9EA'
      }
    }, {
      title: 'Follow us',
      content: `…on the Trello Blog, Twitter, and Facebook.
      We post all kinds of tips and updates, but not an annoying amount`,
      style: {
        background: 'white'
      }
    }, {
      title: `Share Trello to get free Trello Gold.`,
      content: `That’s right. For every member you get to sign up, you’ll get a free month of Trello Gold, up to 12 months. With Trello Gold you get three Power-Ups per board, custom backgrounds, stickers and emoji, 250MB attachments, and saved searches.

      Help us spread the word and get some free Gold.`,
      style: {
        background: '#F5EA92'
      }
    }
  ];

  return (
    <section className="ad-container">
      {
        initAd.map((ele, idx) =>{
          return (
            <article className="ad-item" key={idx} style={ele.style}> 
              { ele.img ? <img src={ ele.img } className="ad-img" ></img> : '' }
              <h1 className="ad-title"> {ele.title} </h1>
              <p className="ad-content"> {ele.content} </p>
            </article>
          )
        })
      }
    </section>
  )
}

export default Intro; 

