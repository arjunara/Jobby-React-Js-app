import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import FilterSection from '../FilterSection'
import Header from '../Header'
import JobCardItem from '../JobCardItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstantsList = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstantsList.initial,
    profileApiStatus: apiStatusConstantsList.initial,
    profileData: {},
    jobsData: [],
    searchInput: '',
    employmentArray: [],
    employmentString: '',
    changedSalaryRange: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsListDetails()
  }

  formattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  onClickRetryButton = () => {
    this.getProfileDetails()
  }

  onClickJobsRetryButton = () => {
    this.getJobsListDetails()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsListDetails()
  }

  changeCheckbox = employmentString => {
    console.log(employmentString)
    this.setState({employmentString}, this.getJobsListDetails)
  }

  changeSalaryRange = changedSalaryRange => {
    this.setState({changedSalaryRange}, this.getJobsListDetails)
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstantsList.inProgress})
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const modifiedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileApiStatus: apiStatusConstantsList.success,
        profileData: modifiedProfileData,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstantsList.failure,
      })
    }
  }

  getJobsListDetails = async () => {
    const {searchInput, employmentString, changedSalaryRange} = this.state
    this.setState({apiStatus: apiStatusConstantsList.inProgress})

    const profileApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentString}&minimum_package=${changedSalaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const jobsData = await response.json()
      const updatedData = jobsData.jobs.map(eachJob =>
        this.formattedData(eachJob),
      )
      this.setState({
        apiStatus: apiStatusConstantsList.success,
        jobsData: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstantsList.failure,
      })
    }
  }

  renderProfileCardSuccessView = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt="profile" className="profile-logo" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileCardFailureView = () => (
    <button
      type="button"
      className="retry-button"
      onClick={this.onClickRetryButton}
    >
      Retry
    </button>
  )

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsData} = this.state
    const isJobsDataNonEmpty = jobsData.length > 0
    return isJobsDataNonEmpty ? (
      <ul className="jobs-list-container">
        {jobsData.map(eachJob => (
          <JobCardItem key={eachJob.id} jobCardDetails={eachJob} />
        ))}
      </ul>
    ) : (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failure-image"
        />
        <h1 className="failure-title">No Jobs Found</h1>
        <p className="failure-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderJobsFailureView = () => (
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
        onClick={this.onClickJobsRetryButton}
      >
        Retry
      </button>
    </div>
  )

  JobsListSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstantsList.success:
        return this.renderJobsSuccessView()
      case apiStatusConstantsList.failure:
        return this.renderJobsFailureView()
      default:
        return this.renderLoading()
    }
  }

  profileSwitch = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstantsList.success:
        return this.renderProfileCardSuccessView()
      case apiStatusConstantsList.failure:
        return this.renderProfileCardFailureView()
      default:
        return this.renderLoading()
    }
  }

  render() {
    const {employmentArray, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-home-container">
            <div className="filter-section-container">
              <div className="search-sm-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  className="search-btn"
                  testid="searchButton"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <div className="profile-container">{this.profileSwitch()}</div>
              <FilterSection
                typeOfEmploymentList={employmentTypesList}
                salaryList={salaryRangesList}
                employmentArray={employmentArray}
                changeCheckbox={this.changeCheckbox}
                changeSalaryRange={this.changeSalaryRange}
              />
            </div>
            <div className="jobs-section-container">
              <div className="search-lg-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  className="search-btn"
                  testid="searchButton"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.JobsListSwitch()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
