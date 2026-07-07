import React from 'react'
import { navLinks } from '../constants/data'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Navbar() {
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: "bottom top",
                end: "bottom",
                // markers: true
            }
        });

        navTween.fromTo('nav', { 
            backgroundColor: 'transparent', 
            }, {
            backgroundColor: "rgba(0, 0, 0, 0.15)", // lighter tint
            backdropFilter: "blur(2px)", 
            opacity: 100,
            duration: 1,
            ease: 'expo.inOut ',
        })

        gsap.from('a,li', {
            y: -20,
            opacity: 0,
            ease: 'power1.inOut',
            duration: 1,
            stagger: 0.04,
        })
    });

  return (
    <nav>
        <div>
            <a href="/home">
                <img src="/images/logo.png" alt="logo" />
                <p>velvet pour</p>
            </a>

            <ul>
                {navLinks.map((link) => (
                    <li key={link.id}>
                        <a href={`#${link.id}`}>
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar