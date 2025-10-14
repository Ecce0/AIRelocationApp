import { Link } from "react-router-dom"

interface CityCardProps {
  cityHeader: string
  cityLinks: string
  descriptionBox: any
}


const CityCard = ({ cityLinks, descriptionBox, cityHeader }: CityCardProps) => {

    return (
        <>
                <p>{descriptionBox}</p>
            <div>
                <li>
                    <h2>
                        <Link to={cityLinks}>{cityHeader}</Link>
                     </h2>
                     </li>
            </div>
        </>

    )
}
export default CityCard