import React from 'react'
import PropTypes from 'prop-types'


const RepoItems = ({repo}) => {
    return (
        <div className="card">
            <h3>
                <a href={repo.html_url}>{repo.name}</a>
            </h3>
            
        </div>
    )
}
RepoItems.propTypes = {
    repo: PropTypes.object.isRequired,
}

export default RepoItems
