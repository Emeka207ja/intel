import "./features.css"
const Features = ({image,title,body,alt}) => {
    return <div className="features_container">
       
        <div className="features_image--container">
            <img src={`${image}`} alt={ `${alt}`} />
        </div>

        <div className="features_title">
            <h3>{ title}</h3>
        </div>
        <div className="features_body">
            <p>{ body}</p>
        </div>
    </div>
}
export default Features