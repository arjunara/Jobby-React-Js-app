import './index.css'

const FilterSection = props => {
  const onChangeCheckbox = event => {
    const {employmentArray, changeCheckbox} = props
    if (event.target.checked === true) {
      employmentArray.push(event.target.value)
    } else {
      const index = employmentArray.findIndex(
        each => each === event.target.value,
      )
      employmentArray.splice(index, 1)
    }
    changeCheckbox(employmentArray.join())
  }

  const onChangeSalaryRange = event => {
    const {changeSalaryRange} = props
    changeSalaryRange(event.target.value)
  }

  const renderTypeOfEmployment = () => {
    const {typeOfEmploymentList} = props
    return (
      <div>
        <h1 className="filter-heading">Type of Employment</h1>
        <ul>
          {typeOfEmploymentList.map(eachEmployment => (
            <li
              key={eachEmployment.employmentTypeId}
              className="option-container"
            >
              <input
                type="checkbox"
                className="checkbox"
                id={eachEmployment.employmentTypeId}
                value={eachEmployment.employmentTypeId}
                name={eachEmployment.label}
                onChange={onChangeCheckbox}
              />
              <label
                htmlFor={eachEmployment.employmentTypeId}
                className="label-text"
              >
                {eachEmployment.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryList} = props
    return (
      <div>
        <h1 className="filter-heading">Salary Range</h1>
        <ul>
          {salaryList.map(eachSalary => (
            <li key={eachSalary.salaryRangeId} className="option-container">
              <input
                type="radio"
                className="radio-button"
                id={eachSalary.salaryRangeId}
                value={eachSalary.salaryRangeId}
                name="radio"
                onChange={onChangeSalaryRange}
              />
              <label htmlFor={eachSalary.salaryRangeId} className="label-text">
                {eachSalary.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      {renderTypeOfEmployment()}
      <hr className="header-rule" />
      {renderSalaryRange()}
    </div>
  )
}

export default FilterSection
