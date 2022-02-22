import React, {useState, useRef, useEffect} from 'react';
import {FaBars} from 'react-icons/fa';
import {links, social} from './data';
import logo from './logo.svg';

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false)
    const linksContainerRef = useRef(null)
    const linksRef = useRef(null)

    // i still dont quite get the mounting and unmounting of components causing the animations to not take place

    // this extra useEffect is to make sure that the data is always inline with the ui such that any update to the data will adjust the css accordingly
    // every time you click the button, check the data
    useEffect(() => {
        // check height for the links
        // getBoundingClientRect() gives you the exact height and width of the LINKS in px (dont confuse links with its container)
        const linksHeight = linksRef.current.getBoundingClientRect().height;

        // if showlinks button is clicked, set the height of the container to match the height of the links
        if(showLinks){
            linksContainerRef.current.style.height = `${linksHeight}px`
        }
        // if showlinks button is not clicked, set the height of the container to 0. which means to hide the container 
        else{
            linksContainerRef.current.style.height = '0px'
        }
    }, [showLinks])

    return(
        <nav>
            <div className='nav-center'>
                <div className='nav-header'>
                    <img src={logo} alt='logo' />
                    <button className='nav-toggle' onClick={() => setShowLinks(!showLinks)}><FaBars/></button>
                </div>
                <div className='links-container' ref={linksContainerRef}>
                   <ul className='links' ref={linksRef}>
                       {links.map((link) => <li key={link.id}><a href={link.url}>{link.text}</a></li>)}
                   </ul>
                </div>
                <ul className='social-icons'>
                    {social.map((app) => <li key={app.id}><a href={app.url}>{app.icon}</a></li>)}
                </ul>   
            </div>
        </nav>
    )
}

export default Navbar;

// this tutorial has done 3 approaches to animating the navbar
// 1. simple toggle
//      simply by checking if showlinks is true in the return statement and then rendering the whole list of links if it is
//   however, the animations when the button is clicked wont work because doing this mounts and unmounts the component instead(?)

// 2. class toggle
//      by using backticks in the classname attribute, i can conditionally change the class such that is showlinks is true, the css makes it such
//      that the container is shown. if not, it is hidden.
//      this is done by creating a separate a new class to show the container when the classname contains the word
//   by doing this, your container size will always be fixed, and it will be hard to gauge what px size is best for your contents. and if you were to 
//   add new contents, the container wont accomodate and the new stuff wont be in the container

// 3. useref toggle
//      shown above. useref doesnt change the classname but instead directly messes with the css styling of the referenced html tag. which is very
//      useful.