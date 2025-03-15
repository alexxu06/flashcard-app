import './LandingCard.css'

function LandingCard(props) {
    return(
        <div className='landing-card'>
            {props.imgLink}
            <h3>{props.header}</h3>
            <p>{props.paragraph}</p>
        </div>
    );
}
export default LandingCard