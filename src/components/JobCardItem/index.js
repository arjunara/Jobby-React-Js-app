import {Link} from 'react-router-dom'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCardItem = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobCardDetails
  return (
    <Link to={`jobs/${id}`} className="link-item">
      <li className="list-item">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="designation-container">
            <h1 className="designation">{title}</h1>
            <div className="rating-container">
              <BsStarFill className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="other-container">
          <div className="company-other-container">
            <div className="location-container">
              <MdLocationOn className="job-feature-icon" />
              <p className="label-text">{location}</p>
            </div>
            <div className="location-container">
              <BsBriefcaseFill className="job-feature-icon" />
              <p className="label-text">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCardItem
