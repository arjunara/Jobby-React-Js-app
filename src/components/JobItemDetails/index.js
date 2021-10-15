import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import SimilarJobDetailItem from '../SimilarJobDetailItem'
import './index.css'

const apiStatusConstantsList = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstantsList.initial,
    jobItemData: {},
    similarJobItemData: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  formattedSkillsList = data => ({
    imageUrl: data.image_url,
    name: data.name,
  })

  formattedSimilarList = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
    id: data.id,
  })

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobItemDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobItemDetailsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const similarJobs = data.similar_jobs.map(each =>
        this.formattedSimilarList(each),
      )
      const lifeAtCompany = {
        imageUrl: data.job_details.life_at_company.image_url,
        description: data.job_details.life_at_company.description,
      }
      const modifiedSkillsList = data.job_details.skills.map(eachSkill =>
        this.formattedSkillsList(eachSkill),
      )
      const modifiedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        lifeAtCompany,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skillsList: modifiedSkillsList,
        title: data.job_details.title,
      }
      this.setState({
        apiStatus: apiStatusConstantsList.success,
        jobItemData: modifiedData,
        similarJobItemData: similarJobs,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstantsList.failure,
      })
    }
  }

  onClickRetryJobDetails = () => {
    this.getJobItemDetails()
  }

  renderJobItemDetailsSuccessView = () => {
    const {jobItemData, similarJobItemData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skillsList,
      lifeAtCompany,
    } = jobItemData
    return (
      <div>
        <div className="job-item-details-container ">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="description-container">
            <h1 className="feature-heading">Description</h1>
            <a href={companyWebsiteUrl} className="visit-link">
              Visit
              <FiExternalLink />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="feature-heading">Skills</h1>
          <ul className="skill-list-container">
            {skillsList.map(each => (
              <li key={each.name} className="skill-list-item">
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skill-icon"
                />
                <p className="skill-name">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="feature-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-description">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <div className="similar-section">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-list-container">
            {similarJobItemData.map(eachJob => (
              <SimilarJobDetailItem
                similarJobDetails={eachJob}
                key={eachJob.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetailsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-title">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryJobDetails}
      >
        Retry
      </button>
    </div>
  )

  goToJobDetailsSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstantsList.success:
        return this.renderJobItemDetailsSuccessView()
      case apiStatusConstantsList.failure:
        return this.renderJobItemDetailsFailureView()
      default:
        return this.renderLoading()
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="job-item-details-bg-container">
          {this.goToJobDetailsSwitch()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
