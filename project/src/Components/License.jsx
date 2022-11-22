import {licenseData} from "./License.Data.js"
import { Image } from "react-bootstrap"
import "./license.css"
export const License = () => { 
    return <div className="licenses">
        <h3>Licenses and Eligibility</h3>
        {
            licenseData?.map(data => {
                return <div className="license_container">
                    <div className="license_image--container">  <img src={data.image} alt = "license"/>  </div>
                    <div className="license_body">
                        <h5>{data.title}</h5>
                        <p>{ data.body}</p>
                    </div>
                </div>
            })
        }
    </div>
}