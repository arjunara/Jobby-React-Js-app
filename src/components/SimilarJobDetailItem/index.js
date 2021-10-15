import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobDetailItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="similar-list-item">
      <div className="company-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="designation-container">
          <h1 className="similar-designation">{title}</h1>
          <div className="rating-container">
            <BsStarFill className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="description">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobDetailItem
