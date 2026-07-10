import React from 'react'
import { cocktailLists, mockTailLists } from '../constants/data'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Cocktails() {

  useGSAP(() => {
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#cocktails',
        start: 'top 30%',
        end: "bottom 80%",
        scrub: true,  
        // markers: true
      }
    })


    parallaxTimeline.fromTo('#c-left-leaf', {
      x: -200,
      y: -600,
      opacity:0
    }, {
      x: 0,
      y: 125,
      opacity:1
    }, 0)

    parallaxTimeline.fromTo('#c-right-leaf', {
      x: 200,
      y: -800,
      opacity: 0
    }, {
      x: 0,
      y: -250,
      opacity: 1
    }, 0)
  }, [])


  return (
    <div id='cocktails' className='noisy'>
        <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id='c-left-leaf' />
        <img src="/images/cocktail-right-leaf.png" alt="r-leaf" id='c-right-leaf' />

      <div className="list">
        <div className="popular">
          <h2>Most popular cocktails:</h2>
          <ul>
            {cocktailLists.map((drink) => (
              <li key={drink.key}>
                <div className='md:me-28'>
                  <h3>{drink.name}</h3>
                  <p>{drink.country} | {drink.detail}</p>
                </div>
                <span>- {drink.price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="loved">
          <h2>Most popular mocktails:</h2>
          <ul>
            {mockTailLists.map((drink) => (
              <li key={drink.key}> 
                <div className='md:me-28'>
                  <h3>{drink.name}</h3>
                  <p>{drink.country} | {drink.detail}</p>
                </div>
                <span>- {drink.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Cocktails