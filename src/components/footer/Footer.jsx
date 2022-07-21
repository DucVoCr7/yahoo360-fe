import React from 'react'
import './footer.scss'

function Footer() {

    return (
        <div className='footer'>
            <span className="footerGroup">
                <span className="footerItem">
                    <i className=" footerItemIcon bi bi-info-circle-fill"></i>
                    About Us
                </span>
                <span className="footerItem">
                    <i className=" footerItemIcon bi bi-shield-lock-fill"></i>
                    Privacy Policy
                </span>
                <span className="footerItem">
                    <i className=" footerItemIcon bi bi-file-earmark-text-fill"></i>
                    Terms & Conditions
                </span>
                <span className="footerItem">
                    <i className=" footerItemIcon bi bi-envelope-fill"></i>
                    Contact Us
                </span>
            </span>
            <span className="footerGroup">
                © 2022 Yahoo! 360°
            </span>
        </div>
    )
}
export default Footer