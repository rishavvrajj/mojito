import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { SplitText } from 'gsap/all'
import React, { useRef } from 'react'
import { useMediaQuery } from 'react-responsive';

function Hero() {
    const videoRef = useRef(null);
    const videoTimelineRef = useRef(null)

    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const heroSplit = new SplitText('.title', { type: 'chars, words' });
        const paragraphSplit = new SplitText('.subtitle', { type: 'chars, words' });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06
        })

        gsap.from(paragraphSplit.chars, {
            opacity: 0,
            yPercent: 100,
            duration: 0.8,
            ease: 'expo.Out',
            stagger: 0.006,
            delay: 1,
        })

        const leafTween = gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                // markers: true,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })

        leafTween.to('.right-leaf', { y: 200 }, 0)
        leafTween.to('.left-leaf', { y: -200 }, 0)

        const startValue = isMobile ? 'top 50%' : 'center 50%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        const videoTween = gsap.timeline({
            scrollTrigger: {
                trigger: '.videoWrapper',
                start: startValue,
                end: endValue,
                scrub: true,
                // pin: true,
                // onEnter: () => videoRef.current.play(),
                // onEnterBack: () => videoRef.current.play(),
                // onLeave: () => videoRef.current.pause(),
                // onLeaveBack: () => videoRef.current.pause(),
            }
        }); 

        videoRef.current.onloadedmetadata = () => {
            videoTween.to(videoRef.current, {
                currentTime: videoRef.current.duration
            })
        }
    }, [])

    return (
        <> <section id='hero' className='noisy'>
            <h1 className='title'>MOJITO</h1>

            <img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf' />
            <img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf' />

            <div className="body">
                <div className="content">
                    <div className='space-y-5 hidden md:block'>
                        <p>Cool. Crisp. Classic.</p>
                        <p>Sip the Spirit <br /> of Summer </p>
                    </div>
                    <div className="view-cocktails">
                        <p className='subtitle'>
                            Every cocktails on our menu is a blend of premium ingredients, creative, flair, and timeless recipes - designed to delight your senses.
                        </p>
                    </div>
                </div>
            </div>
        </section>
            <div className='videoWrapper absolute inset-0 z-0'>
                <video ref={videoRef} src="/videos/output.mp4" muted playsInline preload='auto'></video>
            </div>
        </>
    )
}

export default Hero