import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="footer p-10 bg-base-200 text-base-content">
  <nav>
    <header className="footer-title">Company</header> 
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>

  </nav> 
  <nav>
    <header className="footer-title">Services</header> 
    <a className="link link-hover">Delivery</a>
    <a className="link link-hover">Help</a>
  </nav>
  <nav>
    <header className="footer-title">Legal</header> 
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer> 
<footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
  <aside className="items-center grid-flow-col">
    
    <p>&copy; 2023 ESSENTIALIST</p>
  </aside> 
  <nav className="md:place-self-center md:justify-self-end">
    <div className="grid grid-flow-col gap-4">
    <a target='blank' className="text-3xl" href="https://www.instagram.com/"><ion-icon name="logo-instagram"></ion-icon></a>
    <a target='blank' className="text-3xl" href="https://twitter.com/?lang=en"><ion-icon name="logo-twitter"></ion-icon></a>
    <a target='blank' className="text-3xl" href="https://www.pinterest.de/"><ion-icon name="logo-pinterest"></ion-icon></a>
    <a target='blank' className="text-3xl" href="https://www.facebook.com/"><ion-icon name="logo-facebook"></ion-icon></a>
    </div>
  </nav>
</footer>
    </div>
  )
}

export default Footer