import './LandingCard.css'

function LandingCard(props) {
    return(
        <div className='landing-card'>
            <img src={props.imgLink}></img>
            <h3>{props.header}</h3>
            <p>{props.paragraph}</p>
        </div>
    );
}
export default LandingCard