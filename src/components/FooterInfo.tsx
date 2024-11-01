import heart from '../assets/heart.svg'
import "./FooterInfo.css"

function FooterInfo() {
    return (
        <>
            <div className="border-top pt-2">
                <span className="text-muted">Made with <img src={heart} className="heart-img"></img>. Copyright &copy; 2024 Elijah Hopp</span>
            </div>
        </>
    )
}

export default FooterInfo