import heart from '../assets/heart.svg'
import "./FooterInfo.css"

function FooterInfo() {
    return (
        <>
            <div className="border-top pt-2">
                <span className="text-muted">Made with <img src={heart} className="heart-img"></img>. &copy; Copyright 2024, Elijah Hopp</span>
            </div>
        </>
    )
}

export default FooterInfo