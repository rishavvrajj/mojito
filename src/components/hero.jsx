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
            duration: 3,
            opacity: 0,
            ease: 'expo.inOut',
            stagger: 0.06
        })

        gsap.from(heroSplit.words, {
            opacity: 0,
            duration: 3,
            ease: "expo.inOut",
        });

        gsap.from(paragraphSplit.chars, {
            opacity: 0,
            yPercent: 100,
            duration: 2.8,
            ease: 'expo.inOut',
            stagger: 0.006,
            delay: 1,
        })

        gsap.from('video', {
            yPercent: 20,
            opacity: 0,
            duration: 2,
            ease: 'expo.inOut'
        })

        gsap.from('.right-leaf, .left-leaf', {
            opacity:0,
            yPercent: 10,
            ease: 'expo.inOut',
            duration:2,
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

        const startValue = isMobile ? 'top 50%' : '80% top';
        const endValue = isMobile ? '120% top' : 'top top';

        const videoTween = gsap.timeline({
            scrollTrigger: {
                trigger: '.video',
                start: 'top top',
                end: 'top top',
                // markers: true,
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
                    <div className='subtitle'>
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
        <div className='video'>
            <video ref={videoRef} src="/videos/input.mp4" muted playsInline preload='auto'></video>
        </div>
        </>
    )
}

export default Hero